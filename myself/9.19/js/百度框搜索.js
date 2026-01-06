function $(el, parent = document) {
    return parent.querySelector(el)
}
function gets(el, parent) {
    parent = parent || document
    return [...parent.querySelectorAll(el)]
}

// 模拟数据
var data = [
    "必应搜索", "抖音", "京东", "豆包-AI助手", "阿里1688", "梦玩游戏·传奇", "爱奇艺", "精品游戏", "携程旅行", "天猫", "4366游戏", "9377游戏", "秘塔AI", "淘宝热卖", "腾讯元宝AI", "更多......"
]
// 设置初始下标
var index = -1;
// 渲染数据
dataFn(data)
// 添加聚焦事件
$('.se').onfocus = function () {
    // 聚焦之后应该显示列表
    $('.lis').classList.add('show')
}
// 取消聚焦之后列表应该隐藏
$('.se').onblur = function () {
    $('.lis').classList.remove('show')
}
// 绑定表单change事件
$('.se').onchange = function () {
    // 判断列表中是否有输入框中输入的文字 
    // 若有 则显示
    // 否则  显示 无搜索内容，换个内容再试一次 吧
    // 判断是否含有内容 需循环每个列表 includes判断
    // 先获取输入的值
    var val = $('.se').value.trim()
    if (!val) return alert('输入内容不可为空')
    var strData = data.filter(function (item) {
        return item.includes(val)
    })
    if (strData.length < 1) {
        $('.lis').innerHTML = '无搜索结果，换个词再搜搜看吧~'
        return
    }
    // 重置下标
    index = -1
    // 将获取到的数据进行渲染
    dataFn(strData)
}
// 点击搜索也应该有一样的效果
$('.btn').onclick = function () {
    // 判断列表中是否有输入框中输入的文字 
    // 若有 则显示
    // 否则  显示 无搜索内容，换个内容再试一次 吧
    // 判断是否含有内容 需循环每个列表 includes判断
    // 先获取输入的值
    var val = $('.se').value.trim()
    if (!val) return alert('输入内容不可为空')
    var strData = data.filter(function (item) {
        return item.includes(val)
    })
    if (strData.length < 1) {
        $('.lis').innerHTML = '无搜索结果，换个词再搜搜看吧~'
        return
    }
    // 重置下标
    index = -1
    // 将获取到的数据进行渲染
    dataFn(strData)
}
// 聚焦事件之后按键盘上下键应该可以选择列表中的内容
// 并且搜索框内文字应于当前列表选中文字一致
// 绑定键盘事件
$('.se').onkeydown = function (e) {
    if (e.keyCode === 40) {
        var lis = gets('li', $('.lis'))
        // console.log(lis)
        // 需要添加下标 在点击事件外添加
        if (index > lis.length - 1) index = -1
        $('.active') && $('.active').classList.remove('active')
        index++
        lis[index].classList.add('active')
        $('.se').value = lis[index].innerHTML
    } else if (e.keyCode === 38) {
        var lis = gets('li', $('.lis'))

        if (index < 0) index = lis.length
        $('.active') && $('.active').classList.remove('active')
        index--
        lis[index].classList.add('active')
        $('.se').value = lis[index].innerHTML
    }
}








function dataFn(data) {
    $('.lis').innerHTML = data.map(function (item) {
        return `
    <li>${item}</li> `
    }).join('')
}