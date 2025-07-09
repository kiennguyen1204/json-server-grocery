const jsonServer = require("json-server");
const jsonServerAuth = require("json-server-auth");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);

const rules = jsonServerAuth.rewriter({
  // Permission rules
  users: 600,
  products: 644,
});

server.db = router.db;
server.use(rules);
server.use(jsonServerAuth);
server.use(router);

server.listen(port);

server.listen(process.env.PORT || 5000, () => {
  console.log("JSON Server is running");
});

// Export the Server API
module.exports = server;
