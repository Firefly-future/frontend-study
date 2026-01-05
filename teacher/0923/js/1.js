// 1 给输入框绑定键盘事件 摁下
$(".inp").addEventListener("keydown" , function(e){
    // 获取键码值
    var key = e.keyCode || window.event.keyCode;
    // 判断键码值为回车13 表示添加任务  前提是 输入框的值不为空
    if( key === 13 ){
        var task = this.value.trim();
        if( !task ) return alert("添加任务不为空~");

        // 创建任务
        var li = document.createElement("li");
        li.innerHTML = `<input type="checkbox">
                        ${task}
                        <span class="del">&times;</span>`;
        // console.log( li )
        // 追加在正在进行中  且数量++  或者是赋值为li的长度
        $(".ing").appendChild( li )
        $(".ingNum").innerText++
        // 清空输入框
        $(".inp").value = ""
    }  
})

// 之前 获取正在进行的li  和 完成的li 循环绑定  操作元素较多 且 绑定的事件程序较多

// 之前优化 -> 在创建好的li里面 直接获取复选框 和 删除直接绑定
//             那么这里也是 创建一个绑定一个 操作元素较多 事件程序较多
// 区别: 22 页面加载完毕需要获取绑定一次  然后添加一次 需要重新获取 再绑定事件
//       24 随时创建  随时绑  不需要重新获取


// 现在 借助事件委托 只操作一个父元素 且 添加一个事件程序 且随时添加随时有相应的事件处理
$(".box").addEventListener("change" , function(e){
    // 获取事件源
    var target = e.target || window.event.srcElement;
    // 判断事件源 checkbox
    if( target.type === "checkbox" ){
        // 判断当前复选框的状态是 选中去到完成 未选中来到进行
        target.checked ? $(".ed").appendChild( target.parentNode ) : $(".ing").appendChild(target.parentNode)
        countFn()
    }
})

$(".box").addEventListener("click" , function(e){
    // 获取事件源
    var target = e.target || window.event.srcElement;
    // 判断事件源是删除span
    if( target.className === "del" ){
        // 注意: 在原生es5中  删除只有一种方法 那就是父.removeChild(子)
        // 而删除是  进行 和 完成都可以删除  所有这里需要确定的父元素的是进行ing 还是 完成ed
            // if( target.parentNode.parentNode.className === "ing" ){
            //     $(".ing").removeChild( target.parentNode )
            // }else {
            //     $(".ed").removeChild( target.parentNode )
            // }

        // Jquery.js中的删除  el.remove()
        target.parentNode.remove()
        countFn()
    }
})


// 封装数量函数
function countFn(){
    $(".ingNum").innerText = $(".ing").children.length;
    $(".edNum").innerText = $(".ed").children.length;
}

function $(el){
    return document.querySelector(el)
}