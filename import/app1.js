import { counter, incCounter, c } from "./es6module.js";

c.add();
c.show();

require(["./common"], function(mod) {
  console.log(mod.counter, 'common1'); // 3
  mod.incCounter();
  console.log(mod.counter, 'common1'); // 3
});