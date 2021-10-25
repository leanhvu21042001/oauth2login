const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address!" });
    }

    if (String(password).length === 0) {
      return res.status(400).json({ success: false, message: "Password is empty!" });
    }

  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next();
}

module.exports = validateLogin;