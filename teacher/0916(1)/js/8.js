
// 1 模拟数据
var data = [
    {
        src : "https://www.jq22.com/demo/jquerylbt202008171135/img/t1.png" ,
        des : "小魔王孙颖莎霸榜世一166周",
        tit : "内心强大"
    },
    {
        src : "https://www.jq22.com/demo/jquerylbt202008171135/img/t2.png" ,
        des : "豌豆冲冲冲~王楚钦重返世一",
        tit : "顶峰详见"
    },
    {
        src : "https://www.jq22.com/demo/jquerylbt202008171135/img/t3.png" ,
        des : "柴犬教书先生",
        tit : "问:旺不旺"
    },
    {
        src : "https://www.jq22.com/demo/jquerylbt202008171135/img/t4.png" ,
        des : "羊驼婶~",
        tit : "tui~"
    }
]

var tabStr = "" ; // 预留一个拼接分页的字符串
// 2 渲染数据
$(".pics").innerHTML = data.map(function(obj){
    tabStr += `<span></span>`
    return `
        <li>
            <img src="${obj.src}" alt="" title="${obj.tit}">
            <p>${obj.des}</p>
        </li>
    `
}).join("")
// 将拼接好的分页器span放在元素中
$(".tabs").innerHTML = tabStr;

// 3 获取所有的图片 和 分页器
var pics = gets(".pics li");
var tabs = gets(".tabs span");

// 4 初始化高亮的下标
var initI = 0;


// 5 根据初始化下标 展示图片  和  高亮的分页器
pics[initI].classList.add("opacity")
tabs[initI].classList.add("active")

// 6 给每一个分页器绑定点击事件  实现对图片 和 高亮的切换
tabs.forEach(function( span , index ){
    span.onclick = function(){
        // 排他
        // 先把图片和高亮取消
        $(".opacity").classList.remove("opacity")
        $(".active").classList.remove("active")

        // 给当前的添加
        span.classList.add("active")
        pics[index].classList.add("opacity")
    }
})

// 7 给上下绑定点击事件
$(".next").onclick = function(){
    // 让高亮的下标++
    initI++
    // 判断 如果 已经是最后一张  将从0开始
    if( initI >= pics.length ) initI = 0
    // 排他
    // 先把图片和高亮取消
    $(".opacity").classList.remove("opacity")
    $(".active").classList.remove("active")

    // 给当前的添加
    tabs[initI].classList.add("active")
    pics[initI].classList.add("opacity")
}

$(".prev").onclick = function(){
    // 让高亮的下标--
    initI--
    // 判断 如果 已经是第一张  将从length-1最后开始
    if( initI <= 0 ) initI = pics.length - 1
    // 排他
    // 先把图片和高亮取消
    $(".opacity").classList.remove("opacity")
    $(".active").classList.remove("active")

    // 给当前的添加
    tabs[initI].classList.add("active")
    pics[initI].classList.add("opacity")
}


// 开启自动轮播  即 按照指定的间隔事件  执行点击下一张的操作
// setInterval(function(){
//     // 让高亮的下标++
//     initI++
//     // 判断 如果 已经是最后一张  将从0开始
//     if( initI >= pics.length ) initI = 0
//     // 排他
//     // 先把图片和高亮取消
//     $(".opacity").classList.remove("opacity")
//     $(".active").classList.remove("active")

//     // 给当前的添加
//     tabs[initI].classList.add("active")
//     pics[initI].classList.add("opacity")
// } , 3000 )




function $( el , parent = document ){
    return parent.querySelector(el)
}


function gets(el , parent = document ){
    return Array.from( parent.querySelectorAll(el) )
}