// 给按钮绑定  摁下  移动  抬起

var flag = false ; // 摁下标记开关变量   
var pos = null; // 用于记录坐标信息
var l = maxl = 0 ; // 计算移动过距离 和 计算最大可移动距离
$(".btn").addEventListener("mousedown" , e => {
    flag = true ; // 开关打开 标记可移动
    pos = { x : e.offsetX , y : e.offsetY } // 鼠标摁下时距离自身的位置坐标  后于后期移动计算距离
})


$(".btn").addEventListener("mousemove" , e => {
    // 判断开关打开 方可移动
    if( flag ){
        // 借助 pageX 可以 实时获取鼠标距离页面的位置信息
        // 计算移动的左侧距离
        l = e.pageX - pos.x - $(".box").offsetLeft;
        // 求最大移动距离
        maxl = $(".box").offsetWidth - $(".btn").offsetWidth;

        // 判断边界
        if( l <= 0 ) l = 0;
        if( l >= maxl ) l = maxl;
        console.log( l )
        // 给按钮 和 绿色条 赋值
        $(".btn").style.left = $(".moveBar").style.width =  l + "px"
    }
})


$(".btn").addEventListener("mouseup" , () => {
    // 关闭开关 停止移动
    flag = false;
    // 判断校验通过与否
    // 即 判断绿色条的宽度 是否为最大可移动距离
    //    或 按钮距离定位父元素的左侧距离 是否为最大移动距离
    if( l < maxl ) {
        $(".btn").style.left = $(".moveBar").style.width = 0;
        return 
    }
    $(".btn").style.left = $(".moveBar").style.width = l + "px"
    $(".btn").innerText = "√"
    $(".moveBar").innerText = "验证通过"

    // 创建元素
    var time = 5;
    var div = document.createElement("div");
    div.classList.add("tip")
    document.body.appendChild(div)
    var timer = setInterval(() => {
        time--
        if( time < 1 ){
            clearInterval( timer )
            div.remove()
            location.href = "./2计算器.html"
        }
        div.innerHTML = time + "s后<br>进入二级解密"
    } , 1000)
    div.innerHTML = time + "s后<br>进入二级解密"
    

    // $(".btn").style.left = $(".moveBar").style.width = l < maxl ? '0px' : `${l}px`
})







function $(el){
    return document.querySelector(el)
}