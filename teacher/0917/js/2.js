
// 1 给添加按钮绑定点击事件
$(".addBtn").onclick = function(){
    // 获取输入框的值
    var val = $(".inpCon").value.trim();
    // 判断输入框的值为空
    if( !val ) return alert("待办事项不为空~请重新输入")
    // 创建一个div 即 一个待办事项 内容就是输入框的值  然后追加在tagCon元素中
    var div = document.createElement("div");
    div.innerHTML = `<p>${val}</p><span class="del">&times;</span>`
    $(".tagCon").appendChild( div )
    // 将输入框的值清空
    $(".inpCon").value = ""

    // 给每个待办事项中的内容p绑定点击事件
    // 由于待办内容较多 导致省略 无法查看全部信息
    // 此时绑定点击事件 为了查看详情  增强用户体验
    // 即 弹出一个div 盖在整个页面上
    var p = div.firstElementChild;
    // console.log( p )
    p.onclick = function(){
        var div = document.createElement("div");
        Object.assign( div.style , {
            width:"100%",
            height:"100%",
            position:"fixed",
            left:0,
            top:0,
            background:"rgba(0,0,0,.7)",
            color:"#FFF",
            padding:"100px 400px 0"
        } )
        // console.log( div )
        div.innerHTML = p.innerHTML;   // 等价于  div.textContent = p.innerHTML
        document.body.appendChild( div )

        setTimeout( function(){
            document.body.removeChild( div )
        } , 5000)
    }

    // 给每个待办中的删除span绑定事件
    var span = div.lastElementChild;
    span.onclick = function(){
        $(".tagCon").removeChild(span.parentNode)
    }
}


// 2 给删除所有代办绑定事件
$(".delAllBtn").onclick = function(){
    // 获取所有的代办事项div 一个一个删除  即从父元素中一个一个删除
    // gets("div" , $(".tagCon")).forEach(function(tagDiv){
    //     // console.log( tagDiv )
    //     $(".tagCon").removeChild( tagDiv )
    // })

    // 等价于  直接给tagCon赋值为""
    $(".tagCon").innerHTML = ""
}




function $( el , parent = document ){
    return parent.querySelector(el)
}


function gets(el , parent = document ){
    return Array.from( parent.querySelectorAll(el) )
}