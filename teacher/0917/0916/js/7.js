
// 1 模拟数据
var data = [
    {
        tit : "Diseño web" ,
        con : ["PhotoShop" , "HTML" , "CSS", "Javascript"],
    },
    {
        tit : "Desarrollo front-end" ,
        con : ["HTML5+CSS3" , "进阶Javascript" , "小程序开发", "服务器端开发" ,  "框架集锦"],
    },
    {
        tit :  "Diseño responsive",
        con : ["弹性盒" , "网格布局" , "栅格布局" , "媒体响应" , "rem布局"]
    },
    {
        tit : "Orther" ,
        con : ["运维测试" ,  "视频剪辑"]
    }
]

// 2 渲染数据
$(".menu").innerHTML = data.map(function(obj){
    return `
        <div class="type">
            <h3>${obj.tit}</h3>
            <div class="list">
                ${obj.con.map(function(item){
                    return `<p>${item}</p>`
                }).join("")}
            </div>
        </div>
    `
}).join("")

// 3 给每一个标题绑定点击事件
gets(".menu h3").forEach(function(h3){
    // console.log(h3)
    h3.onclick = function(){
        // 排他
        $(".show") && $(".show").classList.remove("show")
        h3.nextElementSibling.classList.add("show")
    }
})


function $( el , parent = document ){
    return parent.querySelector(el)
}


function gets(el , parent = document ){
    return Array.from( parent.querySelectorAll(el) )
}