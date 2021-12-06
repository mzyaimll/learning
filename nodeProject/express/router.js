/*
 * @Autor: GeekMzy
 * @Date: 2021-12-03 14:44:30
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-03 14:50:10
 * @FilePath: \nodeProject\express\router.js
 */
var express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
  res.send('您好，中国')
})
router.get('/login', (req, res) => res.send(`<h1>login</h1>`))

router.get('/register', (req, res) => res.send(`<h1>register</h1>`))

router.use('/public/', express.static('./public'))

module.exports = router