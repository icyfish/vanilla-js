// var mod = require("./lib");

// console.log(mod.counter); // 3
// mod.incCounter();
// console.log(mod.counter); // 3

require(["./common"], function(mod) {
  console.log(mod.counter, 'common'); // 3
  mod.incCounter();
  console.log(mod.counter, 'common'); // 3
});

import { counter, incCounter, c } from "./es6module.js";

console.log(counter, "es6module"); // 3
incCounter();
console.log(counter, "es6module"); // 4

c.add();
c.show();