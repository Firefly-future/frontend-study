//1 获取元素通过类名
function $(el) {
    return document.querySelector(el)
}
function gets(el) {
    return Array.from(document.querySelectorAll(el))
}
//2 模拟数据
var data = [
    {
        h: '鲨鲨鱼鲸',
        tit: '鲨鲨鱼鲸',
        src: "https://www.jq22.com/demo/jquerylbt202008171135/img/t1.png"
    },
    {
        h: '三重豌豆',
        tit: '三重豌豆',
        src: "https://www.jq22.com/demo/jquerylbt202008171135/img/t2.png"
    },
    {
        h: '柴柴萌犬',
        tit: '柴柴萌犬',
        src: "https://www.jq22.com/demo/jquerylbt202008171135/img/t3.png"
    },
    {
        h: '羊羊驼子',
        tit: '羊羊驼子',
        src: "https://www.jq22.com/demo/jquerylbt202008171135/img/t4.png"
    },
]
//4 预留一个换页器
var strChange = ''
//3 渲染数据
$('.box1').innerHTML = data.map(function (obj) {
    strChange += `<span></span>`
    return `
    <div class="box2">
            <h3>${obj.h}</h3>
            <p><img src=${obj.src} alt="" title=></p>
        </div> 
        `
}).join('')
//5 元素中放入换页器
$('.box3').innerHTML = strChange
//6获取所有的图片与换页器
var pic = gets('.box1 .box2')
var change = gets('.box3 span')
//
//7 初始化高亮下标
var inde = 0;
// 再预留一个计时器
var timer = null;
//8 初始化下标展示高亮的分页器和图片!!
pic[inde].classList.add('opacity')
change[inde].classList.add('active')

//9 给每一个分页器绑定点击事件
change.forEach(function (span, index) {
    span.onclick = function () {
        // 排他 干掉别人 保留自己
        //先把图片和高亮取消
        $('.opacity').classList.remove('opacity')
        $('.active').classList.remove('active')
        inde=index
        // 给分页器绑定高亮
        span.classList.add('active')
        // 同时图片显示
        pic[index].classList.add('opacity')
    }
})

//10 给下一个绑定点击事件
$('.btn2').onclick = function () {
    // 排他 干掉别人 保留自己
    //先把图片和高亮取消
    inde++
    // 如果下标到最大长度，从零开始
    if (inde >= pic.length) inde = 0
    $('.opacity').classList.remove('opacity')
    $('.active').classList.remove('active')

    // 给分页器绑定高亮
    change[inde].classList.add('active')
    // 同时图片显示
    pic[inde].classList.add('opacity')
}
//11 给上一个绑定点击事件
$('.btn1').onclick = function () {
    inde--
    if (inde <= 0) inde = pic.length - 1
    $('.active').classList.remove('active')
    $('.opacity').classList.remove('opacity')
    change[inde].classList.add('active')
    pic[inde].classList.add('opacity')
}
// 12 设置定时器 自动轮播
timer = setInterval(function () {
    inde++
    // 如果下标到最大长度，从零开始
    if (inde >= pic.length) inde = 0
    $('.opacity').classList.remove('opacity')
    $('.active').classList.remove('active')

    // 给分页器绑定高亮
    change[inde].classList.add('active')
    // 同时图片显示
    pic[inde].classList.add('opacity')
}, 2000)
// 鼠标滑过停止自动轮播
$('.box1').onmouseover = function () {
    clearInterval(timer)
}
$('.box1').onmouseout = function () {
    timer = setInterval(function () {
        var index = inde + 1
        if (index > pic.length - 1) index = 0
        $('.opacity').classList.remove('opacity')
        $('.active').classList.remove('active')
         inde=index 
        // 给分页器绑定高亮
        change[index].classList.add('active')
        // 同时图片显示
        pic[index].classList.add('opacity')
    }, 2000)
}