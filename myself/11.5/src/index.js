
// CommonJS node 模块化规范
// 引入 require
// 抛出 module.exports

// ES Module js 的模块化规范
// 引入 import
import './scss/style.scss'  //引入样式
import './b.js'             //不需要抛出变量 直接执行此文件

import {addZero} from './until.js'//引入文件中单独抛出的变量

import {version} from './until.js' //引入文件中单独抛出的变量

import{ loadImg }from './until.js' //引入文件中单独抛出的变量

import {arr as arr1} from './until.js' //引入与此页相同的变量arr  使用as修改变量名字

import * as all from './until.js' //将次文件中抛出的所有变量放到一个对象中

// import abc from './until.js'  //引入文件中默认抛出的变量

import img1 from './img/2.png'
import img2 from './img/爱如此刻永恒.webp'
import img3 from './img/3.png'

loadImg(img1)
loadImg(img2)
loadImg(img3)
// import './until.js'       

console.log(arr1)
console.log(addZero(8))
// console.log(abc)
console.log(version)
console.log(loadImg())


const arr=100

setTimeout(()=>{
    console.log(arr)
},100)
