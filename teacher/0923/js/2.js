var proI = -1 , cityI = -1 ;


// 1 省绑定事件
$(".pro").addEventListener("click" , function(e){
    var target = e.target || window.event.srcElement;
    // 判断事件源
    if( target.nodeName === "H3" ){
        // 让标题的下一个兄弟元素ul显示  且渲染省份li
        var ul = target.nextElementSibling;
        ul.classList.add("show")
        ul.innerHTML = data.map(function(obj,index){
            return `<li dataIndex="${index}">${obj.name}</li>`
        }).join("")
    }

    if( target.nodeName === "LI" ){
        // 让标题内容 修改为当前li的内容
        target.parentNode.previousElementSibling.innerText = target.innerText;
        // 列表消失
        target.parentNode.classList.remove("show")
        // 获取当前省的数据下标
        proI =  target.getAttribute("dataIndex");
        // 省份变化后, 城市 和 区重置
        $(".city h3").innerText = "请选择市"
        $(".area h3").innerText = "请选择区/县"
        $(".city ul").innerText = $(".area ul").innerText =  ""
        cityI = -1 ;
    }
})


// 2 市
$(".city").addEventListener("click" , function(e){
    var target = e.target || window.event.srcElement;
    // 判断事件源
    if( target.nodeName === "H3" ){
        // 让标题的下一个兄弟元素ul显示  且渲染省份li
        var ul = target.nextElementSibling;
        ul.classList.add("show")
        // 根据省拿到对象的city进行渲染
        if( proI > -1 ){
            ul.innerHTML = data[proI].city.map(function(obj , index){
                return `<li dataIndex="${index}">${obj.name}</li>`
            }).join("")
        }
    }

    if( target.nodeName === "LI" ){
        // 让标题内容 修改为当前li的内容
        target.parentNode.previousElementSibling.innerText = target.innerText;
        // 列表消失
        target.parentNode.classList.remove("show")
        // 获取城市下标 
        cityI = target.getAttribute("dataIndex");
        // 城市变化后  区县重置
        $(".area h3").innerText = "请选择区/县"
        $(".area ul").classList.remove("show")
    }
})

// 3 区
$(".area").addEventListener("click" , function(e){
    var target = e.target || window.event.srcElement;
    // 判断事件源
    if( target.nodeName === "H3" ){
        // 让标题的下一个兄弟元素ul显示  且渲染省份li
        var ul = target.nextElementSibling;
        ul.classList.add("show")
        if( cityI > -1 ){
            ul.innerHTML = data[proI].city[cityI].area.map(function(obj){
                return `<li>${obj}</li>`
            }).join("")
        }
    }

    if( target.nodeName === "LI" ){
        // 让标题内容 修改为当前li的内容
        target.parentNode.previousElementSibling.innerText = target.innerText;
        // 列表消失
        target.parentNode.classList.remove("show")
    }
})





