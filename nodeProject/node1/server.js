/*
 * @Autor: GeekMzy
 * @Date: 2021-12-02 16:12:11
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-03 10:57:45
 * @FilePath: \nodeProject\node1\server.js
 */
var http = require("http")
var url = require("url")

function start(route, handle) {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, res, req);
  }

  http.createServer(onRequest).listen(8888)
  console.log('server has started.')
}

exports.start = start