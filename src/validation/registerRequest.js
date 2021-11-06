const validateEmail = require("./validateEmail");

const validateRegister = (req, res, next) => {
    try {
        const {name, email, password, avatarName} = req.body;
        if (String(name).trim().length === 0 || name === undefined) {
            return res.status(400).json({success: false, message: "Name is empty!"});
        }

        if (!validateEmail(email) || email === undefined) {
            return res.status(400).json({success: false, message: "Invalid email address!"});
        }

        if (String(password).length === 0 || password === undefined) {
            return res.status(400).json({success: false, message: "Password is empty!"});
        }

    } catch (err) {
        return res.status(400).json({success: false, message: err.message});
    }
    next();
}

module.exports = validateRegister;