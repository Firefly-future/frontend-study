// 随机颜色
function Col(str){
    var color='#'
    for(var i=1;i<=5;i++){
        var index=random(0,str.length-1)
        color+=str[index]
    }return color
}
// 随机数函数
function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
// 获取元素
function $(el,parent){
    parent=parent||document
    return parent.getElementById(el)
}
// 随机数
function num(str){
    var res=''
    for(var i=1;i<=5;i++){
        var index=random(0,str.length-1)
        res+=str[index]
    }return res
}
// 模拟数据
var str=["0","1","2","3","4","5","6","7","8","9",
    "a","b","c","d","e","f",'g','h','i','j','k',
    'l','m','n','o','p','q','r','s','t','u','v',
    'w','x','y','z','A','B','C','D','E','F','G',
    'H','I','J','K','L','M','N','O','P','Q','R',
    'S','T','U','V','W','X','Y','Z']
// 渲染数据
$('box').innerHTML=str.map(function(){
    return num(str)
}).join('')
$('box').onclick=function(){
    return $('btn').style.backgroundColor=Col(str)
}