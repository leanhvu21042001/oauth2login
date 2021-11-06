const path = require('path');

function upload(req, res, next) {
    try {
        if (!req.files) return res.status(400).json({
            success: false,
            message: "No file to upload"
        })

        const {avatar} = req.files;
        const fileName = avatar.md5 + avatar.size + avatar.name;
        avatar.mv(`${path.join(__dirname, "../uploads")}/users/${fileName}`);

        req.body.avatarName = fileName;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = upload;