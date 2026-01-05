function $(el, parent = document) {
    return parent.querySelector(el)
}

// 给父元素box委托绑定键盘事件
var box = $('.box')
box.addEventListener('keydown', function (e) {
    // 获取事件源
    // var target=e.target||window.event.srcElement
    var key = e.keyCode || window.event.keyCode
    // 判断事件源
    if (key === 13) {//键码值为13(回车) 表示添加任务，前提是输入框的值不能为空
        var task = $('.inp').value.trim()
        if (!task) return alert('添加的任务不能为空')
        // 创建li元素
        var li = document.createElement('li')
        li.innerHTML = `
            <input type="checkbox">
            ${task}
            <span class="cancel">&times;</span>
                `
        // 追加至 正在进行中的子节点中 给span赋值
        $('.ing').appendChild(li)
        $('.ingNum').innerText++
        // 同时清空输入的内容
        $('.inp').value = ''
    }
})
// 改变复选框的状态
box.addEventListener('change', function (e) {
    var target = e.target || window.event.srcElement
    if (target.type === 'checkbox') {
        target.checked ? $('.end').appendChild(target.parentNode) : $('.ing').appendChild(target.parentNode)
    } countFn()
})
// 点击x 取消对应任务
box.addEventListener('click', function (e) {
    // 获取事件源
    var target = e.target || window.event.srcElement
    if (target.className === 'cancel') {
        target.parentNode.remove() 
    } countFn()
})

// 封装数量函数
function countFn() {
    $('.ingNum').innerText = $('.ing').children.length-1
    $('.endNum').innerText = $('.end').children.length-1
}