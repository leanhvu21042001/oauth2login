const UserModel = require('./../models/user.model');
const userModel = new UserModel();
const {v4: uuidv4} = require("uuid");
const bcrypt = require("bcrypt");
const bcryptConfig = require("../config/bcryptConfig");
const {generateAccessToken, generateRefreshToken, refreshVerify} = require("../helpers/generateToken");
const jwt = require("jsonwebtoken");

const AuthController = {};

AuthController.Register = async (req, res) => {
    const {name, email, password, avatarName} = req.body;

    // check for duplicate email in database.
    const duplicate = await userModel.findOne_email(email);

    if (duplicate) {
        return res.status(409).json({success: false, message: "Email is already in use!"});
    }

    try {
        // encrypt the password
        const hashPassword = bcrypt.hashSync(password, bcryptConfig.saltRounds);

        // new user.
        const newUser = {
            id: uuidv4()
            , name: name
            , email: email
            , hash_password: hashPassword
            , avatar: avatarName ? avatarName : null
        }

        await userModel.create(newUser);

        return res.status(201).json({success: true, message: `New user '${name}' created`});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

AuthController.Login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // find user by email
        const userByEmail = await userModel.findOne_email(email);

        // check is user existing in database.
        if (userByEmail === null) {
            return res.status(401).json({success: false, message: `Please register before login!`});
        }

        // compare client password with from database
        const match = bcrypt.compareSync(password, userByEmail['hash_password']);

        // check is password compare success.
        if (match) {

            const payload = {
                id: userByEmail.id,
                name: userByEmail.name,
                email: userByEmail.email,
                avatar: userByEmail.avatar,
                created_at: userByEmail.created_at,
            }
            const accessToken = generateAccessToken(payload);

            const refreshToken = generateRefreshToken(payload);
            // save refresh_token into the database with current user.
            await userModel.update({refresh_token: refreshToken}, userByEmail.id);
            res.cookie('jwt', refreshToken, {httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000});

            return res.json({success: true, message: "Login successfully!", accessToken: `Bearer ${accessToken}`});
        } else {
            return res.status(401).json({success: false, message: `Password incorrect`});
        }
    } catch (err) {
        return res.status(500).json({success: false, message: "Error login"});
    }

}

AuthController.Logout = async (req, res) => {
    try {
        const cookies = req.cookies;

        // check is email invalid
        if (!cookies?.jwt) return res.sendStatus(204);

        jwt.verify(
            cookies.jwt,
            process.env.REFRESH_TOKEN_SECRET, //  || "your refresh token secret"
        )

        // get user by refresh token
        const refreshToken = cookies.jwt;
        const userByRefreshToken = await userModel.findOne_refreshToken(refreshToken);
        // check is user valid.
        if (!userByRefreshToken) {
            res.clearCookie('jwt', {httpOnly: true, sameSite: "None", secure: true});
            return res.status(403).json({success: false, message: "You have logout after that!"});
        }

        // delete refresh_token in database.
        await userModel.update({refresh_token: ''}, userByRefreshToken.id);
        res.clearCookie('jwt', {httpOnly: true, sameSite: "None", secure: true,});

        return res.sendStatus(204);
        // return res.json({ success: true, message: "Logout successfully!" });

    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

AuthController.RefreshToken = async (req, res) => {

    try {
        // get cookies from request.
        const cookies = req.cookies;

        // check is existing jwt or empty.
        if (!cookies?.jwt) {
            return res.sendStatus(204);
        }
        // get user by refresh token
        const refreshToken = cookies.jwt;
        const userByRefreshToken = await userModel.findOne_refreshToken(refreshToken);

        // check is user exist.
        if (!userByRefreshToken) return res.sendStatus(403);

        const accessToken = refreshVerify(refreshToken, userByRefreshToken);

        if (accessToken === undefined) {
            return res.sendStatus(403);
        } else {
            return res.json({success: true, message: "Authenticated", accessToken: `Bearer ${accessToken}`});
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = AuthController;