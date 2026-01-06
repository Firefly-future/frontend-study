
// 初始化 鼠标在放大镜上的位置为中心点  即 类似之前的摁下位置
var pos = { x : 87.5 , y : 87.5 }

// 给norPic绑定鼠标滑过 显示遮罩和大图区
$(".norPic").addEventListener("mouseover" , () => {
    $(".mask").classList.add("show")
    $(".bigPic").classList.add("show")
})


// 给norPic绑定鼠标离开 遮罩和大图区消失
$(".norPic").addEventListener("mouseout" , () => {
    $(".mask").classList.remove("show")
    $(".bigPic").classList.remove("show")
})


// 给norPic绑定鼠标移动 让遮罩跟随鼠标移动 且大图区的图片的位置移动
$(".norPic").addEventListener("mousemove" , e => {
    // 计算移动距离
    var l = e.pageX - pos.x - $(".norPic").offsetLeft - $(".box").offsetLeft;
    var t = e.pageY - pos.y - $(".box").offsetTop;
    // 求最大可移动范围
    var maxl = $(".norPic").offsetWidth - $(".mask").offsetWidth;
    // 判断范围边界
    if( l <= 0 ) l = 0
    if( t <= 0 ) t = 0
    if( l >= maxl ) l = maxl
    if( t >= maxl ) t = maxl
    console.log( l  , t)

    // 放大镜赋值移动
    $(".mask").style.cssText = `left:${l}px; top:${t}px`

    // 给右侧大图的位置 进行移动  移动多少？
    // 一倍图350  大图区700  350 : 700   1 : 2  即放大镜移动1px 大图需要2px
    $(".bigPic img").style.cssText = `margin-left:${-2 * l}px ; margin-top:${-2 * t}px`

})

// 给左侧饿缩略小图绑定鼠标滑过事件
$(".smPic").addEventListener("click" , e => {
    if( e.target.nodeName === "LI" ){
        // console.log(e.target)
        $(".active").classList.remove("active")
        e.target.classList.add("active")
        // 获取当前点击图片的路径
        var src = e.target.firstElementChild.src;
        // 检测最后一次/出现的位置
        var srcName = src.slice( src.lastIndexOf("/") + 2 );
        // console.log(src )
        // 修改路径
        $(".norPic img").src = `./img/n${srcName}`
        $(".bigPic img").src = `./img/b${srcName}`
    }
    
})


function $(el){
    return document.querySelector(el)
}


function gets(el){
    return [...document.querySelectorAll(el)]
}