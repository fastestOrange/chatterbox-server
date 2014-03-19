/* Import node's http module: */
var http = require("http");
var importHandleRequest = require("./request-handler.js");
require("./http-helpers.js");
var handleRequest = importHandleRequest.handleRequest;
// var url = require('url');

var port = 3000;
var ip = "127.0.0.1";

var routes = {
  '/classes/messages': importHandleRequest.handleRequest,
  '/': 'client/index.html'
  //'/classes/users': importHandleRequest.handleUserRequest
};


var server = http.createServer(handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);


