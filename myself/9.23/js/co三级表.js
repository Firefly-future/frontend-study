function $(el, parent = document) {
    return parent.querySelector(el)
}


var proI = -1; var cityI = -1
// 分别给省市区绑定点击事件
$('.pro').addEventListener('click', function (e) {
    var target = e.target || window.event.srcElement
    if (target.nodeName === 'H3') {
        var ul = target.nextElementSibling
        ul.classList.add('show')
        ul.innerHTML = data.map(function (obj, index) {
            return `<li dataIndex='${index}'>${obj.name}</li>`
        }).join('')
    }
    if (target.nodeName === 'LI') {
        // h3内容与目标内容一致
        target.parentNode.parentNode.innerText = target.innerText
        target.parentNode.classList.remove('show')
        // 一致后隐藏
        // 得到目标数据下标
        proI = target.getAttribute('dataIndex')
        cityI=1
    }
})


$('.city').addEventListener('click', function (e) {
    var target = e.target || window.event.srcElement
    if (target.nodeName === 'H3') {
        var ul = target.nextElementSibling
        ul.classList.add('show')
        if (proI > -1) {
            ul.innerHTML = data[proI].city.map(function (obj, index) {
                return `<li dataIndex='${index}'>${obj.name}</li>`
            }).join('')
        }
    }
    if (target.nodeName === 'LI') {
        target.parentNode.parentNode.innerText = target.innerText
        target.parentNode.classList.remove('show')
        cityI = target.getAttribute('dataIndex')

    }
})


$('.area').addEventListener('click', function (e) {
    var target = e.target || window.event.srcElement
    if (target.nodeName === 'H3') {
        var ul = target.nextElementSibling
        ul.classList.add('show')
        if (cityI > -1) {
            ul.innerHTML = data[proI].city[cityI].area.map(function (obj) {
                return `<li>${obj}</li>`
            }).join('')
        }
    }
    if (target.nodeName === 'LI') {
        target.parentNode.parentNode.innerText = target.innerText
        target.parentNode.classList.remove('show')
    }
})