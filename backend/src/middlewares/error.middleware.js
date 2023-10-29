const error = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: err.message,
      status,
      stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    },
  });
};

module.exports = error;
