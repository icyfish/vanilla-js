## 02 - JS + CSS Clock

**transform: rotate**

通过`transform: rotate(30deg)`改变旋转角度值制造时钟走动效果, 但直接这样应用旋转的圆心并不是时钟的中心, 而是各个指针的中点, 因此需要改变`transform-origin`的值至100%, 默认值为50%.

再改变旋转角度默认值使其处于0时的位置: `transform: rotate(90deg)`.

`transition: all 0.05s`: 添加过渡效果, 使指针的旋转更平滑. `transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);`改变旋转效果.
