## callback


## event loop in javascript

heap: memory allocation

stack: execution context 

single thread means only one call stack

browser is more than just the runtime

setTimeout 中的函数被置于任务队列 (task queue) 等待栈中的函数执行完后, event loop 将任务队列中的函数置于栈中执行. 

micro task


## RUN-TO-COMPLETION

current task finished next task begins 
