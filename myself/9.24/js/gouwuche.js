function $(el, parent = document) {
    return parent.querySelector(el)
}
// 渲染函数
Data()
var Tot=$('.tot')
var n=$('.num')
// 获取tbody下所有的输入框
var inps=$('tbody').querySelectorAll('input[type=text]')
// 获取tbody下所有的复选框
var checks=$('tbody').querySelectorAll('input[type=checkbox]')
// 获取全选框
var cl=$('.checkall')
// 给tbody作为父元素 事件委托
$('tbody').addEventListener('click', function (e) {
    var target = e.target || window.event.srcElement
    if (target.nodeName === 'SPAN') {
        // 获取文本框
        var inp = target.parentNode.querySelector('input')
        var inpValue = inp.value * 1
        var max = inp.getAttribute('data-max')
        if (target.classList.contains('add')) {
            if (inpValue >= max) return alert('达到购买上限' + max + '件')
            inpValue++
            inp.value = inpValue
        } if (target.classList.contains('decrease')) {
            var id = target.parentNode.parentNode.lastElementChild.lastElementChild.getAttribute('data-id')
            if(inpValue===1){
                if(confirm('确定要删除该商品吗')){
                    datas.splice(id,1)
                    Data()
                }
            }else{
                inpValue--
                inp.value=inpValue
            }
        }
    }
})

// 显示每个商品的总价格
function showCount(){
    inps.forEach(function(inp){
        coumputeTotal(inp)
    })
}
showCount()

// 给给个input绑定input事件
inps.forEach(function(inp){
    inp.addEventListener('input',function(e){
        coumputeTotal(inp)
        showAll()
    })
})

// 计算价格函数
function coumputeTotal(inp){
      var price=inp.parentNode.previousElementSibling.lastElementChild.innerHTML
      var tota=inp.parentNode.nextElementSibling.lastElementChild
            tota.innerHTML=inp.value*price
}

// 选中
var count=0
var tot=0
checks.forEach(function(check){
    check.addEventListener('change',function(){
        showCountTotal(check)
    })
})

// 显示所有选中商品的价格和数量函数
function showCountTotal(check){
    if(!check.checked) return
    var tr=check.parentNode.parentNode
        num=tr.querySelector('input[type=text]')
        price=tr.querySelector('.price').innerHTML*1
        count+=num
        tot+=num*price
        n.innerHTML=count
        Tot.innerHTML=tot
}
function showAll(inp){
    
}













// // 计算单个商品的总金额
// $('tbody').addEventListener('change',function(e){
//     var target=e.target||window.event.srcElement
//     if(target.nodeName==='SPAN'){
//         if(target.classList.contains('inp')){
          
//         }
//     }
// })


























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

