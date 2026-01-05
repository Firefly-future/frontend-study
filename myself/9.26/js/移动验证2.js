function $(el,parent=document){
    return parent.querySelector(el)
}
function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
// 模拟数据
var data=[
    'https://www.jq22.com/demo/jshdyz202006191356/images/1.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/2.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/3.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/4.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/5.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/6.png'    
]
// 封装渲染数据的函数
function render(){
    // 获得下标
    var indexI=random(0,data.length-1)
    // 渲染进入
    $('.pic').src=data[indexI]
    // 给目标盒子 设置背景图
    $('.moveBox').style.backgroundImage=`url("${data[indexI]}")`
    var L=random(10,340)
    var P=random(10,290)
    // 给target盒子赋距离
    $('.moveBox').style.top=$('.target').style.top=P+'px'
    $('.moveBox').style.backgroundPositon=`${-L}px ${-P}px`
    $('.target').style.left=L+'px'
}

render()