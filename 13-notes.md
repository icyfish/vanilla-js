## 13 - Slide in on Scroll

**console.count()**

在某个函数体内加入`console.count();`, 可以计算该函数被调用的次数, 生产环境中不可使用.

```js
function checkSlide(e){
  console.count(e);
};
```

在此例中发现执行次数过多, 会引起性能问题, 因此需要利用以下debounce函数降低事件执行频率.(lodash库中内置debounce函数)

**debounce**

```js
function debounce(func, wait = 20, immediate = true) {  
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
window.addEventListener('scroll', debounce(checkSlide));
```

**Window.scrollY**

`var y = window.scrollY;`

y是竖直方向上滑动后距离顶部的px值.

**Window.innerHeight**

`var intViewportHeight = window.innerHeight;`

intViewportHeight是浏览器视窗高度, innerHeight是只读属性, 没有默认值.

**HTMLElement.offsetTop**

`topPos = element.offsetTop;`

topPos是element相对于其offsetParent元素顶部的距离, 在本例中是图片顶部与页面顶部距离(固定).
