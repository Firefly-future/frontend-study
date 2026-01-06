// 1 模拟数据
var data = ["java","教程","SEM","SEM基础","柚说","关键词","创意","公众号","排名","网络营销","SEM","网络推广","达内","效果","数据","SEO","DSP","百度网盟","百度DSP","广点通","智慧推","粉丝通","新媒体","微信","微博","问答","百科","博客","ASO","网站","着陆页","网站分析","电商","火焰","水纹","登录","大数据看板","雪花","时钟","鼠标跟随","gsap动画","粒子","播放器","canvas","svg","hover","文字","滑块","导航","红包","vue代码","react代码","bootstrap代码","一个存入","localstorage","待办","事项","便签","系统","视频剪辑","旅拍","社交","西藏","新疆","自驾游","组团游","小麻雀","快下来","找妈妈","乖 听话"];
console.log( data )  //70



// console.log( curData )
// 2 初始化数据 渲染
initDataRender();



// 4 点击换一换
$(".tabs").onclick = initDataRender

// 5 给展开 收起 按钮绑定点击事件
$(".toggleBtn").onclick = function(){
    // 判断按钮的内容
    // 判断downs的是否有show类   contains
}


function initDataRender(){
    // 由于要实现换一批功能 所以不能全部渲染 , 即只拿取一部分
    // 最少20条 最多40条
    // 在所有数据中 根据 下标 截取 作为当前数据  
    var sI = random( 0 , 29 ) , count = random( 20 , 40 )
    // console.log( sI , count )
    var curData = data.slice( sI , sI + count )
    // 3 渲染
    $(".allTag").innerHTML = curData.map(function(item){
        return `<li>${item}</li>`
    }).join("")
}


function random( min , max ){
    return Math.floor( Math.random() * ( max - min + 1 ) + min ) 
}


function $( el , parent = document ){
    return parent.querySelector(el)
}


function gets(el , parent = document ){
    return Array.from( parent.querySelectorAll(el) )
}