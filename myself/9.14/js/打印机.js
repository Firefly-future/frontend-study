// setInterval(function(){

// },milliSeconds)

// 获取元素
function $(el){
    return document.getElementsByTagName(el)
}
function $$(el){
    return document.getElementById(el)
}
// 模拟数据
var text1=$('text1')
var text2=$('text2')

var data=[
    {text1},
    {text2}
]
// 渲染数据
data.map(function(){
    return `${text1}   
            ${text2}`
})

$$(btn1).onclick = function(){
    
    return document.write(text2)
}
$$(btn2).onclick=function(){
    return 
}
$$(btn3).onclick=function(){
    return document.write(text2)
}