function $(el,parent=document){
    return parent.querySelector(el)
}

var box=$('.box')
console.log(box)
// 按住开关 true表示按住 
flag=false   //未按住
var pos=null;
var l=0;
var maxl=0;
// 拖拽三步走 按 移动 抬起 
box.addEventListener('mousedown',(e)=>{
    flag=true
    // 获取鼠标点击时距离自身的距离
    pos={
        x:e.offsetX,y:e.offsetY
    }
    console.log(pos)
})
box.addEventListener('mousemove',(e)=>{
    if(flag){
        // 移动的距离
        l=e.pageX-pos.x-box.offsetLeft
        // 移动的最大距离
        maxl=box.offsetWidth-$('.btn').offsetWidth
        console.log(l,maxl)
        if(l<=0)l=0
        if(l>=maxl)l=maxl
        $('.btn').style.left=l+'px'
        $('.bj').style.width=l+'px'
    }
})
box.addEventListener('mouseup',(e)=>{
    flag=false
    if(l<maxl){
        $('.btn').style.left=0
        $('.bj').style.width=0
        return
    }
        $('.btn').innerText='√'
        $('.bj').innerText='验证通过'

        var time=5
        var div=document.createElement('div')
        div.classList.add('tip')
        
        document.body.appendChild(div)
        var timer=setInterval(function(){
            time--
            if(time<1){
                clearInterval(timer)
                div.remove()
                location.href='./二级密码.html'
            }
            div.innerHTML=time+'秒后<br>将进入二级解锁页面'
        },1000)
        
})