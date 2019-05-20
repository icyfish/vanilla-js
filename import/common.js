// var counter = 3;
// function incCounter() {
//   counter++;
// }

// module.exports = {
//   counter: counter,
//   incCounter: incCounter
// };

define(function(require, exports, module) {
  var counter = 3;
  function incCounter() {
    counter++;
  }

  module.exports = {
    counter: counter,
    // get counter() {
    //   return counter;
    // },
    incCounter: incCounter
  };
});
