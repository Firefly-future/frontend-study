function $(el, parent = document) {
    return parent.querySelector(el)
}
function gets(el, parent = document) {
    return parent.querySelectorAll(el)
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// 模拟数据
var data = [
    'https://www.jq22.com/demo/jshdyz202006191356/images/1.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/2.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/3.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/4.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/5.png',
    'https://www.jq22.com/demo/jshdyz202006191356/images/6.png'
]

// 渲染数据
DataFn()

// 拖拽三步 按  移 抬 
var flag = false//判断按住 true 抬false 按住可移动
var pos = {}

$('.moveBtn').addEventListener('mousedown', (e) => {
    flag = true
    pos = { x: e.offsetX, y: e.offsetY }
})
$('.moveBtn').addEventListener('mousemove', (e) => {
    if (flag) {
        // 移动距离
        var l=e.pageX-pos.x-$('.bar').offsetLeft
        // 最大移动距离
        var maxl=$('.bar').offsetWidth-$('.moveBtn').offsetWidth-10
        // 判断移动范围
        if(l<=10)l=10
        if(l>=maxl)l=maxl
        // 移动盒子与移动按钮的移动距离
        $('.moveBtn').style.left=$('.moveBox').style.left=l+'px'
    }
})
$('.moveBtn').addEventListener('mouseup', (e) => {
    flag = false
    // 目标盒子距离定位父容器左侧距离
    var TB=$('.targetBox').offsetLeft
    // 移动盒子距离定位父容器左侧距离
    var MB=$('.moveBox').offsetLeft
    // 判断移动在目标2像素左右
    if(TB<=MB+2&&TB>=MB-2){
        $('.tip').classList.add('show','success')
        $('.tip').innerHTML='恭喜你 验证通过了~'
        $('.moveBtn').innerHTML=`···`
        setTimeout(()=>{
        $('.tip').classList.remove('show','success')
        $('.tip').innerHTML=''
        $('.moveBtn').innerHTML=`|||`
        DataFn()
        $(".moveBox").style.left=$('.moveBtn').style.left=10+'px'
        },3000)

        return
        
    }else{
         $('.tip').classList.add('show','fail')
         $(".tip").innerHTML='失败了  再来一次吧'
        //  同时位置归零
        setTimeout(()=>{
        $('.tip').classList.remove('show','fail')
        $('.tip').innerHTML=''
        $(".moveBox").style.left=$('.moveBtn').style.left=10+'px'
        },1500)
        return 
    }
})
$("span").addEventListener('click',()=>{
    DataFn()
})




function DataFn() {
    // 得到下标
    var indexI = random(0, data.length - 1)
    // 图片为下标对应图片
    $('.pic').src = data[indexI]
    // 同时moveBox的图与之对应
    $('.moveBox').style.backgroundImage = `url(${data[indexI]})`
    // 设置滑块的位置范围  与 目标位置范围
    var L = random(70, 320)
    var P = random(10, 100)
    $('.moveBox').style.top = $('.targetBox').style.top = P + 'px'
    $('.targetBox').style.left = L + 'px'
    $('.moveBox').style.backgroundPosition = `${-L}px ${-P}px`
}