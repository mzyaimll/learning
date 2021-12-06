/*
 * @Autor: GeekMzy
 * @Date: 2021-12-02 15:33:20
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-03 10:39:09
 * @FilePath: \nodeProject\node1\index.js
 */
var server = require('./server')
var router = require('./router')
var requestHandlers = require('./requestHandlers')

var handle = {}

handle['/'] = requestHandlers.start
handle['/start'] = requestHandlers.start
handle['/upload'] = requestHandlers.upload
handle['/show'] = requestHandlers.show

server.start(router.route, handle);