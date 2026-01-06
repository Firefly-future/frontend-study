function $(el, parent = document) {
    return parent.querySelector(el)
}
function gets(el, parent = document) {
    return [...parent.querySelectorAll(el)]
}

// 给头像绑定点击事件
gets(".box1 img").forEach(function (img) {
    img.onclick = function () {
        $('.opacity') && $('.opacity').classList.remove('opacity')
        this.classList.add('opacity')
    }
})
// 给广播绑定点击事件
$('.publish').onclick = function () {
    var user = $('.input').value.trim(),
        pic = $('.opacity'),
        say = $('.say').value.trim();
    // 创建时间对象  之后放入time处
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds()
    // console.log(pic)
    // 判断user处是否有填写内容
    if (!user) return alert('昵称内容不能为空')
    // 判断say区内容是否为空
    if (!say) return alert('请随便说点什么吧~')
    // 判断字符是否不小于6
    if (say.length < 6) return alert('请输入至少六个字符的评价 感谢！')
    // 判断是否选择头像
    if (!pic) return alert('请选择一个头像吧')
    // 条件全部达成 进行下一步
    // 将输入的昵称、评论、头像输入到下方评论区
    // 创建一个div  在tell的子元素节点
    var div = document.createElement(div)
    div.innerHTML = `
                <img src="${pic.src}" alt="">
                <a href="">${user}评论了:</a>
                <p>${say}</p>
                <div class="time">时间：${year}年${month}月${day}日 ${hour}:${minute}:${second}</div>
                <span>删除</span>
                `
    $('.tell').insertBefore(div, $('.tell').firstChild)
    // 创建一个         
    //        people+1
    $('.people').innerText=$('.tell').children.length
    // 同时清空 点击的头像、输入的昵称、输入的评论
    $('.input').value = '';
    $('.say').value = '';
    $('.opacity').classList.remove('opacity');
    $('.count').innerText = '140';
    // 给删除键绑定点击事件
    var del = $('.tell span')
    del.onclick = function () {
         $('.tell').removeChild(this.parentNode )    
        $('.people').innerText=$('.tell').children.length
    }
     
}

// 评论区输入内容时，对应count数量减少
$('.say').oninput = function () {
    $('.count').innerText = 140 - this.value.length
}