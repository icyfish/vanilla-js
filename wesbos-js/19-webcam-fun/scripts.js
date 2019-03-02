const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// 安全区域(secure origin)才可获取打开webcam权限
// 因此需要在localhost或者是https下才可正常使用该app

