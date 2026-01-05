
// 1 数据
var data = [
    "https://www.jq22.com/demo/jshdyz202006191356/images/1.png",
    "https://www.jq22.com/demo/jshdyz202006191356/images/2.png",
    "https://www.jq22.com/demo/jshdyz202006191356/images/3.png",
    "https://www.jq22.com/demo/jshdyz202006191356/images/4.png",
    "https://www.jq22.com/demo/jshdyz202006191356/images/5.png",
    "https://www.jq22.com/demo/jshdyz202006191356/images/6.png"
];

var flag = false ; 
var pos = null ;

// 2 初始化
render()


// 3 点击刷新 
$(".refresh").addEventListener("click" , render)


// 4 给按钮绑定摁下 移动  抬起
$(".moveBtn").addEventListener("mousedown" , e => {
    flag = true 
    pos = { x : e.offsetX , y : e.offsetY }
})

$(".moveBtn").addEventListener("mousemove" , e => {
    if( flag ){
        // 计算移动距离
        var l = e.pageX - pos.x - $(".bar").offsetLeft;

        // 求最大移动范围
        var maxl = $(".bar").offsetWidth - $(".moveBtn").offsetWidth - 10;
        // 判断边界
        if( l <= 10 ) l = 10
        if( l >= maxl ) l = maxl

        // 赋值滑块移动
        $(".moveBox").style.left = $(".moveBtn").style.left =  l + "px"
    }
})

$(".moveBtn").addEventListener("mouseup" , e => {
    flag = false;
    var tP = $(".targetBox").offsetLeft;    // 90  88  89
    var mP = $(".moveBox").offsetLeft;
    // 判断目标位置 与 滑动位置是否一致  允许1-2px的误差
    if( mP >= tP - 2 && mP <= tP + 2 ){
        alert("success")
        $(".tip").classList.add("tipShow" , "success");
        $(".tip").innerHTML = "校验成功~ 稍后刷新"
        setTimeout(() => {
            render()
            $(".tip").classList.remove("tipShow" , "success")
            location.href = "./2放大镜.html"
        } , 2000 )
    }else {
        alert("fail")
        $(".tip").classList.add("tipShow" , "fail");
        $(".tip").innerHTML = "校验失败~ 你的眼睛不是尺😜"
        setTimeout(() => {
            $(".tip").classList.remove("tipShow" , "fail")
        } , 1000 )
    }
    // 重置移动盒子和按钮
    $(".moveBox").style.left = $(".moveBtn").style.left = "10px"
})


// 渲染函数
function render(){
    // 生成一个随机数 作为数据下标 赋值页面图片初始化
    var initI = randomNum( 0 , data.length - 1 ); // 图片路径下标
    $(".pic").src = data[initI]  // 赋值图片路径页面显示  
    $(".moveBox").style.backgroundImage = `url(${data[initI]})`  // 滑块与展示图片一致

    // 设置滑块的位置  与 目标位置
    var t = randomNum( 10 , 105 );
    var tL = randomNum( 80 , 330 )
    $(".moveBox").style.top = $(".targetBox").style.top = t + "px"
    $(".targetBox").style.left = tL + "px"
    $(".moveBox").style.backgroundPosition = `${-tL}px ${-t}px`
}


function randomNum( min , max ){
    return Math.floor( Math.random() * (max - min + 1) + min);
}



function $(el){
    return document.querySelector(el)
}


function gets(el){
    return [...document.querySelectorAll(el)]
}