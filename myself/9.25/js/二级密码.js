function $(el, parent = document) {
    return parent.querySelector(el)
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// 运算符
var ysf = ['+', '*', '/']
// 两个随机数
var num1 = random(1, 10)
var num2 = random(1, 10)
// 随机运算符
var ysfI = random(0, ysf.length - 1)
// question框内文本
$('.question').innerText = num1 + ysf[ysfI] + num2 + '=?'

var resNum = resNum(num1, num2, ysf[ysfI])

// 模拟数据
var dataArr = new Array(9).fill(0).concat(['c', 0, '.'])
// 渲染数据
$('.num').innerHTML = dataArr.map(function (item, index) {
    return `<li>${index > 8 ? item : (index + 1)}</li>`
}).join('')

var box = $('.box')
box.addEventListener('click', function (e) {
    var target = e.target || window.event.srcElement
    if (target.nodeName === 'LI') {
        if (target.innerText === 'c') {
            return $('.res').innerText = ''

        }
        return $('.res').innerText += target.innerText

    }
    if (target.nodeName ==='BUTTON') {
        if (!$('.res').innerText) return alert('请输入后再解密')
        if ($('.res').innerText == resNum) {
            location.href = '多级任务栏.html'
        } else {
            alert('验证失败，请重试')
            return
        }
    }
})




// 封装一个结果函数
function resNum(n1, n2, rsf) {
    switch (rsf) {
        case '+':
            return n1 + n2
            break;
        case '*':
            return n1 * n2
            break;
        case '/':
            return n1 % n2 == 0 ? n1 / n2 : (n1 / n2).toFixed(2)
            break;
    }
}