var proI = -1 , cityI = -1 ;
// 1 省绑定事件
$(".pro").addEventListener("click" , function(e){
    renderUl(e)
})
$(".city").addEventListener("click" , function(e){
    renderUl(e)
})
$(".area").addEventListener("click" , function(e){
    renderUl(e)
})


function renderUl(e){
    var target = e.target || window.event.srcElement;
    // 判断事件源
    if( target.nodeName === "H3" ){
        // 让标题的下一个兄弟元素ul显示  且渲染省份li
        var ul = target.nextElementSibling;
        ul.classList.add("show")
        // var dataArr = cityI > 0 ? data[proI].city[cityI].area : proI > 0 ? data[proI].city : data;
        var bol = target.parentNode.classList.contains("pro");
        var dataArr = bol ? data : cityI > -1 ? data[proI].city[cityI].area : proI > 0 ? data[proI].city : [];
        ul.innerHTML = dataArr.map(function(obj,index){
            return `<li dataIndex="${index}">${typeof obj === "string" ? obj : obj.name}</li>`
        }).join("")
        console.log( proI , cityI)
        // -1 -1
        // 3  1
    }

    if( target.nodeName === "LI" ){
        // 让标题内容 修改为当前li的内容
        target.parentNode.previousElementSibling.innerText = target.innerText;
        // 列表消失
        target.parentNode.classList.remove("show")
        // 获取数据下标
        // 判断当前点击的li是省 就给省下标赋值
        if( target.parentNode.parentNode.classList.contains("pro") ) {
            proI = target.getAttribute("dataIndex")
            cityI = -1
        }
        if( target.parentNode.parentNode.classList.contains("city") ) cityI = target.getAttribute("dataIndex")
    }
}



function $(el){
    return document.querySelector(el)
}