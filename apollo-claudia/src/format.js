module.exports.formatClaudia = (req) => {
  const httpMethod = req.context.method;
  const accept = req.headers['Accept'] || req.headers['accept'];
  const path = req.proxyRequest.requestContext.path;
  const query = Object.entries(req.body).length ? req.body : req.queryString;
  return {
    httpMethod,
    accept,
    path,
    query,
  };
};
