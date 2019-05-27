## 深入浅出 nodejs

node 在编译模块文件的过程中, 对获取的 JavaScript 文件内容进行了头尾包装:

```js
(function(exports, require, module, __filename, __dirname) {
  var math = require("math");
  exports.area = function(radius) {
    return Math.PI * radius * radius;
  };
});
```
