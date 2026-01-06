function $(el, parent = document) {
    return parent.querySelector(el)
}
function gets(el, parent = document) {
    return parent.querySelectorAll(el)
}


// 拖拽
var flag = false;//按住开关
var pos = null;//鼠标按住时距离自身的距离
// var origin={}//记录鼠标点击时距离页面的位置
var moveEl = null //记录移动的元素
var origin = null //记录元素初始时的位置

$('.box1').addEventListener('mousedown', (e) => {
    var target = e.target || window.event.srcElement
    if (target.nodeName === "LI") {
        flag = true;
        moveEl = target
        pos = { x: e.offsetX, y: e.offsetY }
        // console.log(moveEl)
        origin = { x: target.offsetX, y: target.offsetY }
    }
})
document.addEventListener('mousemove', (e) => {
    if (flag) {
        var l = e.pageX - pos.x
        var h = e.pageY - pos.y
        // console.log(l,h)
        moveEl.classList.add('show')
        // moveEl.style.position=`position:fixed;left:${l}px;top:${h}px`
        moveEl.style.position="fixed";
        moveEl.style.left=l+'px'
        moveEl.style.top=h+'px'
    }
})
document.addEventListener('mouseup', (e) => {
    if(!flag)return 
    flag = false;
    moveEl.classList.remove('show')
    // 获取box2 box3的位置
    var pos1=$('.box1').getBoundingClientRect()
    var pos2 = $('.box2').getBoundingClientRect()
    var pos3 = $('.box3').getBoundingClientRect()
    var num1=moveEl.firstElementChild.nextElementSibling.innerHTML*1
    var num2=moveEl.lastElementChild.innerHTML*1
    // console.log(num1,num2)
    if(e.pageX<=pos2.right&&e.pageX>=pos2.left&&e.pageY<=pos2.bottom&&e.pageY>=pos2.top&&num1>=90&&num2>=90){
        // moveEl.style.left=L1+'px'
        // moveEl.style.top=H1+'px'
        moveEl.style.position='static'
        $('.box2').appendChild(moveEl)
        return
    }else if(e.pageX<=pos3.right&&e.pageX>=pos3.left&&e.pageY<=pos3.bottom&&e.pageY>=pos3.top&&(num1<90||num2<90)){
        // moveEl.style.left=L2+'px'
        // moveEl.style.top=H2+'px'
        moveEl.style.position='static'
        $('.box3').appendChild(moveEl)
        return
    }else{
        // moveEl.style.cssText=`left:${origin.x}px;top:${origin.y}px`
        moveEl.style.position='static'
        moveEl.style.left=origin.x+'px'
        moveEl.style.top=origin.y+'px'
        $('.box1').appendChild(moveEl)
        return
    }
})