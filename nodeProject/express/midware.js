/*
 * @Autor: GeekMzy
 * @Date: 2021-12-03 11:50:55
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-03 14:35:08
 * @FilePath: \nodeProject\express\midware.js
 */
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// app.use((req, res) => {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

// app.post('/post', (req, res) => {
//   const result = req.body
//   console.log(result.username)
//   res.send(result)
// })

app.engine('art', require('express-art-template'))

app.get('/', (req, res) => {
  res.render('login.art', {
    title: '这里是登录页面'
  })
})

app.listen(3000, () => console.log(`example app listening on port 3000!`))


