function $(el, parent = document) {
    return parent.querySelector(el)
}
function gets(el, parent = document) {
    return [...parent.querySelectorAll(el)]
}
// 模拟数据
var data = [
    { user: '曾小贤', add: '广东省 广州市 天河区', address: '体育西路维多利亚广场20楼良品铺子', pass: '510000', tel: '12345678910' },
    { user: '张益达', add: '广东省 广州市 海珠区', address: '广州大道南1629号华南鞋业城', pass: '510000', tel: '156568532323' },
    { user: '胡一菲', add: '广东省 广州市 番禺区', address: '华洲街街道办事处', pass: '000000', tel: '12455688212' },
    { user: '秦羽墨', add: '广东省 广州市 白云区', address: '广州大道南1629号华南鞋业城', pass: '510000', tel: '156568532323' },
    { user: '吕子乔', add: '广东省 广州市 荔湾区', address: '华洲街街道办事处', pass: '000000', tel: '12455688212' }
]

var xinxi = $('.xinxi')
// console.log(xinxi)
// 渲染数据
DataFn(data)

// 点击新增按钮弹出输入框需要填写对应信息
// 其中 邮编必须为6位数字 电话必须为11位纯数字 其它不做要求
// console.log(div)
// 给增加按钮点击绑定事件
$('h3 span').onclick = function () {
    // location.assign('新增信息.html')
    $('.xinzeng').classList.add('show')
}
// 再 点击x或者取消 隐藏xinzeng
$('.xinzeng span').onclick = function () {
    $('.xinzeng').classList.remove('show')
}
$('.xinzeng .btn1').onclick = function () {
    $('.xinzeng').classList.remove('show')
}
// 给提交绑定点击事件
$('.btn2').onclick = function () {
    var in1 = $('.in1').value.trim();
    var in2 = $('.in2').value.trim();
    var in3 = $('.in3').value.trim();
    var in4 = $('.in4').value.trim();
    var in5 = $('.in5').value.trim();
    if (!in1) return alert('收货人不能为空')
    if (!in2) return alert('邮编不能为空')
    if (isNaN(in2)) return alert('邮编必须为纯数字')
    if (in2.toString().length !== 6) return alert('邮编长度必须为6')
    if (!in3) return alert('所在地区不能为空')
    if (!in4) return alert('电话/手机不能为空')
    if (isNaN(in4)) return alert('电话/手机必须为纯数字')
    if (in4.toString().length !== 11) return alert('电话/手机长度必须为11')
    if (!in5) return alert('详细地址不能为空')
    // 提交 将所输入的信息添加入页面中
    // 创建节点追加至页面中
    var ul = document.createElement('ul')
    ul.innerHTML = `
                    <li>${in1}</li>
                    <li>${in3}</li>
                    <li>${in5}</li>
                    <li>${in2}</li>
                    <li>${in4}</li>
                    <li><span class="change">修改</span>|<span class="shan">删除</span></li>
                    <li><button>设为默认</button></li>
                `
    xinxi.appendChild(ul)
    // shan();
    // xiu();
    // mo();
    // 同时输入的内容清空
    $('.in1').value = '';
    $('.in2').value = '';
    $('.in3').value = '';
    $('.in4').value = '';
    $('.in5').value = '';
    // 同时隐藏新增栏
    $('.xinzeng').classList.remove('show')

}
// 创建节点追加至页面中
// var ul = document.createElement('ul')
// ul.innerHTML = `
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li></li>
//                     <li><span class="change">修改</span>|<span class="shan">删除</span></li>
//                     <li><button>设为默认</button></li>
//                 `
// 给每个删除绑定点击事件
// console.log(gets('.shan'))
shan()
function shan() {
    gets('.xinxi ul li .shan').forEach(function (eve) {
        eve.onclick = function () {
            xinxi.removeChild(this.parentNode.parentNode)
        }
    })
}
xiu()
// 给每个修改绑定点击事件
// function xiu() {
//     gets('.xinxi ul li .change').forEach(function (ev) {
//         ev.onclick = function () {
//             xinxi.insertBefore(this.parentNode.parentNode, this.parentNode.parentNode.previousSibling)
//         }
//     })
// }
function xiu() {
    gets('.xinxi ul li .change').forEach(function (ev,index) {
        ev.onclick = function () {
            var change=this.parentNode.parentNode
            if(index>0)
            xinxi.insertBefore(change, change.previousSibling)
        }
    })
}

mo()
// 给每个设为默认绑定点击事件
function mo() {
    gets('.xinxi ul li button').forEach(function (every) {
        every.onclick = function () {
            xinxi.insertBefore(this.parentNode.parentNode, xinxi.firstElementChild)
        }
    })
}




function DataFn(data) {
    xinxi.innerHTML = data.map(function (obj) {
        return `
                    <ul>
                    <li>${obj.user}</li>
                    <li>${obj.add}</li>
                    <li>${obj.address}</li>
                    <li>${obj.pass}</li>
                    <li>${obj.tel}</li>
                    <li><span class="change">修改</span>|<span class="shan">删除</span></li>
                    <li><button>设为默认</button></li>
                    </ul>
                    `
    }).join('')
}