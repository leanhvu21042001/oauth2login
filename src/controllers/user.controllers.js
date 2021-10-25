const UserModel = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
const UserController = {};
const bcrypt = require("bcrypt");
const validateEmail = require("../validation/validateEmail");
const bcryptConfig = require("../config/bcryptConfig");
const { generateAccessToken, generateRefreshToken, refreshVerify } = require("../helpers/generateToken");


UserController.Register = async (req, res) => {
  const { name, email, password, avatarName } = req.body;

  // check for duplicate email in database.
  const duplicate = await UserModel.findOne_email(email);

  if (duplicate) {
    return res.status(409).json({ success: false, message: "Email is already in use!" });
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

    await UserModel.create(newUser);

    return res.status(201).json({ success: true, message: `New user '${name}' created` });
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message })
  }
}

UserController.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check is email invalid
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address!" });
    }

    // check is empty!
    if (String(password).length === 0) {
      return res.status(400).json({ success: false, message: "Password is empty!" });
    }

    // find user by email
    const userByEmail = await UserModel.findOne_email(email);

    // check is user existing in database.
    if (userByEmail === null) {
      return res.status(401).json({ success: false, message: `Please register before login!` });
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
      await UserModel.update({ refresh_token: refreshToken }, userByEmail.id);
      res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });

      return res.json({ success: true, message: "Login successfully!", accessToken: `Bearer ${accessToken}` });
    } else {
      return res.status(401).json({ success: false, message: `Password incorrect` });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Error login" });
  }

}

UserController.Logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    // check is email invalid
    if (!cookies?.jwt) return res.status(204).json({ success: false, message: "Can't logout!" });

    // get user by refresh token
    const refreshToken = cookies.jwt;
    const userByRefreshToken = await UserModel.findOne_refreshToken(refreshToken);

    // check is user valid.
    if (!userByRefreshToken) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: "None", secure: true });
      return res.status(403).json({ success: true, message: "You have logout after that!" });
    }

    // delete refresh_token in database.
    await UserModel.update({ refresh_token: '' }, userByRefreshToken.id);
    res.clearCookie('jwt', { httpOnly: true, sameSite: "None", secure: true, });

    return res.status(204);
    // return res.json({ success: true, message: "Logout successfully!" });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

UserController.RefreshToken = async (req, res) => {

  // get cookies from request.
  const cookies = req.cookies;

  // check is existing jwt or empty.
  if (!cookies?.jwt) {
    return res.status(401).json({ success: false, message: "Refresh token is empty!" });
  }
  // get user by refresh token
  const refreshToken = cookies.jwt;
  const userByRefreshToken = await UserModel.findOne_refreshToken(refreshToken);

  // check is user exist.
  if (!userByRefreshToken) return res.sendStatus(403);

  const accessToken = refreshVerify(refreshToken, userByRefreshToken);

  if (accessToken === undefined) {
    return res.sendStatus(403);
  } else {
    return res.json({ success: true, message: "Authenticated", accessToken });
  }

  //#region 
  // jwt.verify(
  //   refreshToken,
  //   process.env.REFRESH_TOKEN_SECRET || "your refresh token secret",
  //   (err, decoded) => {
  //     if (err || userByRefreshToken.id !== decoded.id) return res.sendStatus(403);
  //     const payload = {
  //       id: userByRefreshToken.id,
  //       name: userByRefreshToken.name,
  //       email: userByRefreshToken.email,
  //       avatar: userByRefreshToken.avatar,
  //       created_at: userByRefreshToken.created_at,
  //     }
  //     const accessToken = generateAccessToken(payload);
  //     // const accessToken = jwt.sign(
  //     //   payload,
  //     //   process.env.ACCESS_TOKEN_SECRET || "your access token secret",
  //     //   { expiresIn: '5m' }
  //     // )
  //     return res.json({ success: true, message: "Authenticated", accessToken });
  //   }
  // )
  //#endregion 
}


module.exports = UserController;