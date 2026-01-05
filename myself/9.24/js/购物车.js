function $(el, parent = document) {
    return parent.querySelector(el)
}
// 封装渲染函数
function Data() {
    $('tbody').innerHTML = datas.map(function (data, idx) {
        return ` <tr>
                    <td><input type="checkbox" name="" id=""></td>
                    <td><img src="${data.img}" alt=""><a href="${data.link}">${data.name}</a></td>
                    <td>￥<b class='price'>${data.price}</b></td>
                    <td><span class="decrease">-</span>
                        <input type="text" class="inp" value='1' data-max=${data.max}>
                        <span class="add">+</span>
                    </td>
                    <td>￥<b class='tota'>${data.price}</b></td>
                    <td><em class="cang">移入收藏</em>|<em class="del" data-id=${idx}>删除</em></td>
            </tr>
                `
    }).join('')
}
// 渲染数据
Data()
var inpss=$('tbody').querySelectorAll('input[type=text]')
var checks=$('tbody').querySelectorAll('input[type=checkbox]')
var checkAll=$('.checkall')
// console.log(inpss,checks,checkAll)
// 给tbody父元素绑定事件委托
$('tbody').addEventListener('click', function (e) {
    var target = e.target || window.event.srcElement
    // 添加删除
    if (target.nodeName === 'SPAN') {
        var inps = target.parentNode.querySelector('input')
        var inpNum = inps.value * 1
        var max = inps.getAttribute('data-max')
        if (target.classList.contains('add')) {
            if (inpNum >= max) {
                return alert('达到最大购买数量')
            }
            inpNum++
            inps.value = inpNum

        } else {
            var id = target.parentNode.parentNode.lastElementChild.lastElementChild.getAttribute('data-id')
            if (inpNum === 1) {
                if (confirm('确定要删除此商品吗')) {
                    datas.splice(id, 1)
                    Data()
                }
            } else {
                inpNum--
                inps.value = inpNum
            }
        }
       showCount()
    } if(target.className='del'){
            target.parentNode.parentNode.remove()
        }
        
})
// 计算总价
function totalPrice(inpss){
    var price=inpss.parentNode.previousElementSibling.lastElementChild.innerHTML
    var tota=inpss.parentNode.nextElementSibling.lastElementChild
    tota.innerHTML=inpss.value*price
}
// 显示总价
function showCount(){
    inpss.forEach(function(inp){
        totalPrice(inp)
    })
}
showCount();

var total=0;
var count=0
function showCountTotal(check){
    if(!check.checked) return;
    var tr=check.parentNode.parentNode,
    num=tr.querySelector('input[type=text]').value*1
    price=tr.querySelector('.price').innerHTML*1
    count+=num
    total+=num*price
    $('num').innerHTML=count
    $('.tot').innerHTML=total
}

function showAll(inps){
    var nn=0;
    var tt=0;
    checks.forEach((check))
}