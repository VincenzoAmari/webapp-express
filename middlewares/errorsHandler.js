function errorsHandler(err, req, res, next) {
  res.status(500);
  res.json({
    error: "Errors Handler",
    message: "errore interno al server",
  });
}

module.exports = errorsHandler;
