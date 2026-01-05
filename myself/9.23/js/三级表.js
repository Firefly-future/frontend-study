function $(el, parent = document) {
    return parent.querySelector(el)
}
var proI = -1, cityI = -1
// 绑定省事件
$('.pro').addEventListener('click', function (e) {
    // 获取事件源
    var target = e.target || window.event.srcElement
    if (target.nodeName === "H3") {
        var ul = target.nextElementSibling
        ul.classList.add('show')
        ul.innerHTML = data.map(function (obj, index) {
            return `
                <li dataIndex='${index}'>${obj.name}</li>
                `
        }).join('')
    }
    if (target.nodeName === 'LI') {
        // 标题内容修改为当前li的内容
        target.parentNode.previousElementSibling.innerText = target.innerText
        // 同时 隐藏
        target.parentNode.classList.remove('show')
        // 获取当前省份对应的下标
        proI = target.getAttribute('dataIndex')
        // 省份变化后，城市和区重置
        $('.city h3').innerText = '市'
        $('.area h3').innerText = '区/县'
        $('.city ul').innerText = $('.area ul').innerText = ''
        $('.city ul').classList.remove('show')
        $('.area ul').classList.remove('show')
        cityI = -1
    }
})
// 绑定市事件
$('.city').addEventListener('click', function (e) {
    // 获取事件源
    var target = e.target || window.event.srcElement
    if (target.nodeName === "H3") {
        var ul = target.nextElementSibling
        ul.classList.add('show')
        if (proI > -1) {
            ul.innerHTML = data[proI].city.map(function (obj, index) {
                return `
                <li dataIndex='${index}'>${obj.name}</li>
                `
            }).join('')
        }
    }
    if (target.nodeName === 'LI') {
        // 标题内容修改为当前li的内容
        target.parentNode.previousElementSibling.innerText = target.innerText
        // 同时 隐藏
        target.parentNode.classList.remove('show')
        // 获取城市下标
        cityI = target.getAttribute('dataIndex')
        // 城市变化后区县重置
        $('.area h3').innerText = '区/县'
        $('.area ul').classList.remove('show')
        $('.pro ul').classList.remove('show')
    }
})
// 绑定区事件
$('.area').addEventListener('click', function (e) {
    // 获取事件源
    var target = e.target || window.event.srcElement
    if (target.nodeName === "H3") {
        var ul = target.nextElementSibling
        ul.classList.add('show')
        if (cityI > -1) {
            ul.innerHTML = data[proI].city[cityI].area.map(function (obj) {
                return `
                <li>${obj}</li>
                `
            }).join('')
        }
    }
    if (target.nodeName === 'LI') {
        // 标题内容修改为当前li的内容
        target.parentNode.previousElementSibling.innerText = target.innerText
        // 同时 隐藏
        target.parentNode.classList.remove('show')
        $('.pro ul').classList.remove('show')
        $('.city ul').classList.remove('show')
    }
})