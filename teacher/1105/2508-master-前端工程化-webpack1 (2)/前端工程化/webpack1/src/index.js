// CommonJS node中的模块化规范
// 引入 require
// 抛出 module.exports

// ES Module js的模块化规范
// 引入 import
import './scss/style.scss' // 引入样式
import './b.js' // 不需要抛出变量，直接执行此文件
// import abc from './uitl.js' // 引入文件中默认抛出的变量
// import { addZero, version } from './uitl.js' // 引入文件中单独抛出的变量
// import util, { addZero, version } from './uitl.js' // 同时使用
// import * as all from './uitl.js' // 把此文件中抛出的所有变量放到一个对象中
import { arr as arr1, loadImg } from './uitl.js' // 修改变量名
import img1 from './img/img1.webp'
import img2 from './img/img2.jpg'
import img3 from './img/img3.jpeg'


console.log(img1)
console.log(img2)
console.log(img3)
loadImg(img1)
loadImg(img2)
loadImg(img3)



// console.log(addZero(8), version)

// console.log('util抛出的数据', util)
// console.log(all)
// console.log(arr1)





// const arr = 100

// setTimeout(() => {
//   console.log(arr, '我是index.js ===========');
// })

// const list = [1,2,3,4,5,6,7]

// document.querySelector('ul').innerHTML = list.map(item => `
//   <li>${item}</li>
// `).join('')