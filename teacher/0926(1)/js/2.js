
// 初始化 鼠标在放大镜上的位置为中心点  即 类似之前的摁下位置
var pos = { x : 87.5 , y : 87.5 }
var flag = false ; // 标记移动开关
var selfPos = null ; // 记录鼠标在li上摁下的位置坐标 用于计算移动距离
var moveEl = null ;  // 记录移动的元素 
var originPos  = null ; // 记录移动元素的原位置 用于归位


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
    // console.log( l  , t)

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
        $(".active") && $(".active").classList.remove("active")
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

// 由于左侧的众多缩略小图 都可以删除
// 即 都可以在小图上 摁下 移动 抬起
$(".smPic").addEventListener("mousedown" , e => {
    var target = e.target || window.event.srcElement;
    // 判断事件源li
    if( target.nodeName === "LI" ){
        flag = true ; // 标记可移动
        selfPos = { x : e.offsetX , y : e.offsetY } ; // 鼠标在li上摁下的位置坐标
        moveEl = target ; // 移动元素
        originPos = { l : target.offsetLeft , t : target.offsetTop }
        console.log( originPos )
        // console.log( e.pageX )
        // console.log( selfPos.x )
    }
})

document.addEventListener("mousemove" , e => {
    if( flag ){
        // console.log( e.pageX )
        // 计算移动距离
        var l = e.pageX - selfPos.x;
        var t = e.pageY - selfPos.y;
        // 给移动元素赋值移动
        moveEl.style.cssText = `position:fixed;left:${l}px;top:${t}px;z-index:1;`
    }
})

document.addEventListener("mouseup" , e => {
    if( !flag ) return ;
    flag = false
    // 获取垃圾桶的位置
    // el.getBoundingClientRect() 返回元素的大小及其相对于视口的位置
    var rubPos = $(".rubbishBox").getBoundingClientRect();
    // console.log( rubPos )
    // 判断鼠标是否 进入垃圾桶的范围
    if( e.pageX > rubPos.left && e.pageX < rubPos.right && e.pageY > rubPos.top && e.pageY < rubPos.bottom ){
        moveEl.remove()
        $(".delCount").innerHTML++
    }else {
        moveEl.style.cssText = `left:${originPos.l}px; top:${originPos.t}px`
    }
    
})


function $(el){
    return document.querySelector(el)
}


function gets(el){
    return [...document.querySelectorAll(el)]
}