module.exports.formatExpress = (req) => {
  const httpMethod = req.method;
  const accept = req.headers['Accept'] || req.headers['accept'];
  const path = req.path;
  const query = Object.entries(req.body).length ? req.body : req.query;
  return {
    httpMethod,
    accept,
    path,
    query,
  };
};
