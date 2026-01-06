

var  ysf = ["+" , "*" , "/"];

// 页面初始化问题
var num1 = random( 1 , 1000 );  // 操作第一个数
var num2 = random( 1 , 1000 );  // 操作第二个数
var ydfI = random( 0 , ysf.length - 1 );  // 运算符下标
$(".question").innerText = num1 + ysf[ydfI] + num2 +  " = ?"

var box=$('.box')
box.addEventListener('click',function(e){
    var target=e.target||window.event.srcElement
    if(target.nodeName==='LI'){
        if(target.innerText==='c'){$('.res').innerText=''}
        else{
        $('.res').innerText+=target.innerText}
    }
    if(target.nodeName==='BUTTON'){
        if(!$('.res').innerText)return alert('未输入内容，请重试')
        if($('.res').innerText===(num1+ysf[ydfI]+num2)){
        return location.href='http://baidu.com'
        }else{return alert('验证失败，请重试')}
    }
})






function random( min , max ){
    return Math.floor(Math.random() * ( max - min + 1 ) + min)
}

function $(el){
    return document.querySelector(el)
}