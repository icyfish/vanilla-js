let PENDING = 0;
let FULFILLED = 1;
let REJECTED = 2;

function Promise() {
  // 状态机:

  // 存储当前的状态, 可以是 pending fulfilled rejected
  let state = PENDING;

  // 存储结果, 顺利完成的返回值或者未顺利完成的异常值
  let value = null;

  // 存储 成功 或者 失败的处理函数 调用 then 或者是 done 时触发
  let handlers = [];

  // 变化:

  function fulfill(result) {
    state = FULFILLED;
    value = result;
  }

  function reject(error) {
    state = REJECTED;
    value = error;
  }
  // https://www.promisejs.org/implementing/
  function resolve(result) {
    try {
      var then = getThen(result);
      if (then) {
        doResolve(then.bind(result), resolve, reject);
        return;
      }
      fulfill(result);
    } catch (e) {
      reject(e);
    }
  }
}
