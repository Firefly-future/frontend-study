function $(el, parent = document) {
    return parent.querySelector(el)
}
function gets(el, parent = document) {
    return parent.querySelectorAll(el)
}

var pos = { x: 87.5, y: 87.5 }
var flag = false//标记移动开关
var Pos = null//标记鼠标再li上按下的坐标位置
var moveEl = null//标记移动的元素
var origin = null //标记移动的元素初始位置
// 给nor 绑定鼠标滑过事件
// 鼠标滑过时 遮罩和big出现
$('.nor').addEventListener('mouseover', () => {
    $('.mask').classList.add('show')
    $('.big').classList.add('show')
})
// 滑出时消失
$('.nor').addEventListener('mouseout', () => {
    $('.mask').classList.remove('show')
    $('.big').classList.remove('show')
})
// 再给nor绑定鼠标移动事件 在鼠标移动时，遮罩跟随移动
$('.nor').addEventListener('mousemove', e => {
    // 计算移动距离
    var l = e.pageX - pos.x - $('.nor').offsetLeft - $('.box').offsetLeft
    var t = e.pageY - pos.y - $('.box').offsetTop
    // 求最大可移动范围
    var maxl = $('.nor').offsetWidth - $('.mask').offsetWidth
    var maxt = $('.nor').offsetHeight - $('.mask').offsetHeight
    // 判断边界范围、
    if (l <= 0) l = 0
    if (t <= 0) t = 0
    if (l >= maxl) l = maxl
    if (t >= maxt) t = maxt
    // 放大镜赋值移动
    $('.mask').style.cssText = `left:${l}px;top:${t}px`
    // 给大图赋值移动   margin 
    $('.big img').style.cssText = `margin-left:${-2 * l}px;margin-top:${-2 * t}px`
})
$('.small').addEventListener('click', (e) => {
    if (e.target.nodeName === 'LI') {
        $('.active').classList.remove('active')
        e.target.classList.add('active')
        // 同时修改nor与big地址
        // 获取目标地址
        // 查找最后一个/的位置 并从其后面第二位开始截取
        var src = e.target.firstElementChild.src
        var srcName = src.slice(src.lastIndexOf('/') + 2)
        $('.nor').firstElementChild.src = `./img/n${srcName}`
        $('.big').firstElementChild.src = `./img/b${srcName}`
    }
})

// 移动删除
$('.small').addEventListener('mousedown', (e) => {
    var target=e.target||window.event.srcElement
    if (target.nodeName === 'LI'){
        flag=true
        Pos={x:e.offsetX,y:e.offsetY}//距离li自身的位置
        // console.log(Pos)
        moveEl=target//移动元素
        origin={x:target.offsetLeft,y:target.offsetTop}
        console.log(origin)
    }
})
document.addEventListener('mousemove', (e) => {
    if(flag){
        //获取移动距离
        var l=e.pageX-Pos.x
        var h=e.pageY-Pos.y
        moveEl.style.cssText=`left:${l};top:${h};`
    }
})
document.addEventListener('mouseup', (e) => {
    flag=false
    // 获取垃圾桶的位置
    var lose=$('.rubbish').getBoundingClientRect()
    console.log(lose)
    //判断位置
    if(e.pageX>=lose.left&&e.pageX<=lose.right&&e.pageY>=lose.top&&e.pageY<=lose.bottom){
        alert('删除成功')
    }else{
        alert('未删除成功')
    }
})