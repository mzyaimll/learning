/*
 * @Autor: GeekMzy
 * @Date: 2021-12-03 11:01:16
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-03 14:46:31
 * @FilePath: \nodeProject\express\index.js
 */
const express = require('express')

let router = require('./router')

const app = express()

app.use(router)
app.listen(3000, () => console.log(`example app listening on port 3000!`))