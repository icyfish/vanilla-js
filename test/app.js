lottie.loadAnimation({
  container: document.getElementById("lottie"), // the dom element that will contain the animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets3.lottiefiles.com/packages/lf20_QGcC2l.json' // the path to the animation json
});

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
