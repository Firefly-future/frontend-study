
// 1 给发布按钮绑定点击事件
$(".publish").onclick = function(){
    // 获取输入框的值  注意; 在事件外面获取永远是空字符串  即是后期输入也获取不到
    // 因为 页面加载完成时 就要去获取  那时候用户还没有输入
    var userName = $(".userName").value.trim() ,  // 用户名
        sayCon = $(".sayCon").value.trim() ,      // 说的话
        pic = $(".opacity") ;                     // 头像

    // 分别对 以上信息 作出校验
    if( !userName ) return alert("请输入用户名");
    if( !sayCon ) return alert("请随便说点什么吧~");
    // 判断评论的个数 不少于 10
    if( sayCon.length < 10 ) return alert("最少输入10个字符~");
    if( !pic ) return alert("请选择一个头像");

    // 若以上条件都没有被阻断  则表示都输入且正确
    // 那么就要创建一条评论 然后头像就是选择的头像
    // 用户就是用户名,内容就是说的话,发布的时间就是成功那一个的日期时间
    // 最后 将创建的评论追加在sayBox评论区    
    // 注意: 最新评论应该在最上面  即 插在第一个元素子节点的前面

    // 创建日期对象
    var date = new Date() ,
        month= zero( date.getMonth() + 1 ),
        day = zero( date.getDate() ) ,
        hour = zero( date.getHours() ) ,
        minute = zero( date.getMinutes() ) ;

    var div = document.createElement("div");
    div.classList.add("sayItem")
    div.innerHTML = `
        <img src="${pic.src}" alt="">
        <div class="sayInfo">
            <h4><a href="#">${userName}:</a>${sayCon}</h4>
            <p>${month}月${day}日 ${hour}:${minute} <span>删除</span></p>
        </div>
    `
    // $(".sayBox").appendChild(div)
    $(".sayBox").insertBefore( div , $(".sayBox").firstElementChild )

    // 发布成功 将用户信息清空 即 重置
    $(".userName").value = $(".sayCon").value = ""
    $(".opacity").classList.remove("opacity")
    $(".count").innerText = "140"

    // 让评论的人数 重新计算  
    $(".people").innerText = $(".sayBox").children.length;

    // 删除评论   即在创建的div中 获取删除span 直接给当前绑定  即  不需获取所有循环绑定
    // 因为没创建一条评论  只有一个删除  创建完直接给这一个预留绑定点击事件即可
    var del = $("span" , div);
    console.log( del )
    del.onclick = function(){
        $(".sayBox").removeChild( this.parentNode.parentNode.parentNode )
        // 重新计算评论人数
        $(".people").innerText = $(".sayBox").children.length;
    }
}


// 给头像绑定事件
gets(".header img").forEach(function(img){
    img.onclick = function(){
        $(".opacity") && $(".opacity").classList.remove("opacity")
        this.classList.add("opacity")
    }
})

// 给说的话 即文本域绑定input输入事件  执行给可输入字符赋值
$(".sayCon").oninput = function(){
    $(".count").innerText = 140 - this.value.length
}


function zero( n ){
    n = n.toString();
    return n[1] ? n : '0' + n
}


function $( el , parent = document ){
    return parent.querySelector(el)
}


function gets(el , parent = document ){
    return [...parent.querySelectorAll(el) ]
}