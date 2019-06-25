// document.body.addEventListener(
//   "mousedown",
//   () => {
//     console.log("useCapture_body");
//   },
//   true
// );

// document.getElementById("i").addEventListener(
//   "mousedown",
//   () => {
//     console.log("useCapture_i");
//   },
//   true
// );

// https://time.geekbang.org/column/article/90485

document.body.addEventListener(
  "mousedown",
  () => {
    console.log("no_useCapture_body");
  },
  // false
);

// document.getElementById("i").addEventListener(
//   "mousedown",
//   () => {
//     console.log("no_useCapture_i");
//   },
//   // false
// );
