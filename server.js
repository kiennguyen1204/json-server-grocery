const jsonServer = require("json-server");
const jsonServerAuth = require("json-server-auth");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000; // Fallback cho local

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

// Chỉ gọi server.listen() một lần
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Export the Server API
module.exports = server;
