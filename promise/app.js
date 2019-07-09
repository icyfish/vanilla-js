// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("FULFILLED");
//   }, 1000);
// });

// https://juejin.im/post/5b83cb5ae51d4538cc3ec354

// 判断变量否为function
const isFunction = variable => typeof variable === "function";

// 定义Promise的三种状态常量
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error("MyPromise must accept a function as a parameter");
    }
    this._status = PENDING;
    this._value = undefined;

    try {
      handle(this._resolve, this._reject);
    } catch (err) {
      this._reject(err);
    }
  }
  // 添加resovle时执行的函数
  _resolve(val) {
    if (this._status !== PENDING) return;
    this._status = FULFILLED;
    this._value = val;
  }
  // 添加reject时执行的函数
  _reject(err) {
    if (this._status !== PENDING) return;
    this._status = REJECTED;
    this._value = err;
  }
}
