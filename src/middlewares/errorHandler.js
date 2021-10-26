const errorHandler = (err, req, res) => {
  // console.error(err.stack);
  return res.status(500).json({ success: false, message: err.message });
}

module.exports = errorHandler;