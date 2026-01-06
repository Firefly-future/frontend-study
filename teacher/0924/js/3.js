// 拖拽三步走  摁下  移动  抬起

// 开关变量 标记是否摁下  摁下方可移动
var flag = false ;
var pos = null; // 记录鼠标摁下时的坐标位置信息

$(".monkey").addEventListener("mousedown" , function( e ){
    console.log(e.target)
    flag = true ; // 打开开关 标记移动
    pos = {
        x : e.offsetX, y : e.offsetY
    }
    // console.log(pos)
})

$(".monkey").addEventListener("mousemove" , function(e){
    if( flag ){
        // 计算移动距离
        // 用鼠标距离页面的坐标信息 - 鼠标摁下距离自身的 = 移动的
        var l = e.pageX - pos.x;
        var t = e.pageY - pos.y ;
        // 求最大移动范围
        var maxl = document.documentElement.clientWidth - $(".monkey").offsetWidth;
        var maxt = document.documentElement.clientHeight - $(".monkey").offsetHeight;

        // 判断边界
        if( l <= 0 ) l = 0
        if( t <= 0 ) t = 0
        if( l >= maxl ) l = maxl
        if( t >= maxt ) t = maxt

        // 给monkey盒子赋值跟随鼠标移动
        $(".monkey").style.marginLeft = l + "px"
        $(".monkey").style.marginTop = t + "px"

        console.log(l)
    }
})

$(".monkey").addEventListener("mouseup" , function(){
    flag = false
})






function $(el){
    return document.querySelector(el)
}