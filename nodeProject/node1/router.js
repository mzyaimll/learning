/*
 * @Autor: GeekMzy
 * @Date: 2021-12-02 16:58:26
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-03 10:56:13
 * @FilePath: \nodeProject\node1\router.js
 */
function route(handle, pathname, res, req) {
  console.log(`About to route a req for ${pathname}`)
  if (typeof handle[pathname] === 'function') {
    handle[pathname](res, req);
  } else {
    console.log("No req handler found for" + pathname)
    res.writeHead(404, { "Content-type": "text/plain" })
    res.write("404 Not found")
    res.end()
  }
}

exports.route = route