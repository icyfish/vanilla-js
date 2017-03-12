## 01 - JavaScript Drum Kit

**keyCode**

[keyCode](keycode.info): 查询键盘码

**data-属性**

利用`data-somename`自己设定标签的属性, 能更容易地获取相关DOM元素
```js
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
```

也可以用`class='key-65'`的方法获取, 但是相比`data-`更麻烦.

**audio**

HTML5新增标签, 利用`audio.play();`播放所关联音频, 在音频播放过程中再调用`play`方法不会再次播放音频, 不是想要的结果, 可以这样解决: 在调用`audio.play();`之前将音频的当前播放位置设为0, `audio.currentTime = 0;`.


**transitionend**

[transitionend](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend) 事件, 在 CSS transition 结束后触发. 类似的事件还有[animationend](https://developer.mozilla.org/en-US/docs/Web/Events/animationend).
