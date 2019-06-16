const express = require("express");
const path = require("path");

const app = express();

app.set('view engine', 'ejs');

/**
 * 
 * TODO: 
 * 
 * - app.use 与 app.get 的区别
 * 
 * [resource](https://www.jianshu.com/p/bfc13d5e5c03)
 */

/**
 *  __dirname, __filename
 * 
 * [resource](https://github.com/jawil/blog/issues/18);
 * 
 * dirname： 获得当前执行文件所在目录的完整目录名
 * filename： 获得当前执行文件的带有完整绝对路径的文件名
 * process.cwd()：获得当前执行 node 命令时候的文件夹目录名
 * ./： 文件所在目录
 * 
 */

console.log("__dirname：", __dirname);
console.log("__filename：", __filename);
console.log("process.cwd()：", process.cwd());
console.log("./：", path.resolve("./"));



app.use(function learnMiddleWare(req, res, next) {
  next();
});

app.use(function learnArguments() {
  let { req, res, next } = arguments[0];
  next();
});

app.use(function test(req, res, next) {
  console.log(111);
  next();
});

app.get("/home", function(req, res) {
  res.sendStatus(200);
  // res.render("home"); //when i visit home url, render the home view
});

app.listen(3000);
