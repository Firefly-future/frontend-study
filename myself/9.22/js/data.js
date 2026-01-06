var data = [
    {
        consignee: "胡一菲",
        area: "广东省广州市番禺区",
        address: "华洲街街道办事处",
        zipCode: "000000",
        tel: "12455688212"
    },
    {
        consignee: "张益达",
        area: "广东省广州市海珠区",
        address: "广州大道南1629号华南鞋业城",
        zipCode: "510000",
        tel: "156568532323"
    },
    {
        consignee: "曾小贤",
        area: "广东省广州市天河区",
        address: "体育西路维多利亚广场20楼良品铺子",
        zipCode: "510000",
        tel: "12345678910"
    }
]

// console.log($('tbody'))
// 渲染数据 
DataFn()
var flag = false   //标记是编辑还是添加  false添加 true 编辑
var modI = -1  //标记编辑下标
// console.log(DataFn())
// 给文档document作父元素委托事件
document.addEventListener("click", function (e) {
    // 获取事件源
    //         标准浏览器  
    //             W IE浏览器
    var target = e.target || window.event.srcElement
    // console.log(target)
    // 判断源
    // 上移
    if (target.className === 'up') {
        var tr = target.parentNode.parentNode
        if (!tr.previousElementSibling) return alert('您已经位居榜首了');
        $('tbody').insertBefore(tr, tr.previousElementSibling)
    }
    // 下移动
    if (target.className === 'down') {
        var tr = target.parentNode.parentNode
        if (!tr.nextElementSibling) return alert('您已经是最后了')
        $('tbody').insertBefore(tr, tr.nextElementSibling.nextElementSibling)
    }

    // 判断添加
    if (target.className === 'add') {
        $('.new').classList.add('show')
        $('.tit').innerText = '添加'
    }
    // 判断关闭或者取消
    if (target.className === 'close') {
        $('.new').classList.remove('show')
    }
    if (target.className === 'no') {
        $('.new').classList.remove('show')
    }
    // 判断点击确定
    // 判断输入内容
    if (target.className === 'ok') {
        var user = $('.user').value.trim();
        var area = $('.area').value.trim();
        var address = $('.address').value.trim();
        var cord = $('.cord').value.trim();
        var tel = $('.tel').value.trim();
        if (!user) return alert('请输入有效收货人')
        if (!area) return alert('请输入所在地')
        if (!address) return alert('请输入详细地址')
        if (!cord) return alert('邮编不能为空')
        if (isNaN(cord)) return alert('邮编应为纯数字')
        if (cord.length !== 6) return alert('邮编长度应该六位数')
        if (!tel) return alert('电话号码或手机号不能为空')
        if (isNaN(tel)) return alert('电话号码或手机号应为纯数字')
        if (tel.length !== 11) return alert('电话号码或者手机长度应为11位')
        if (tel[0] === "0" || tel[1] === "0" || tel[1] === "1" || tel[1] === "2") return alert('您输入的电话号码/手机号码有误')
        // 将输入的值放入表格中
        // var tr=document.createElement('tr')
        // tr.innerHTML=`
        //         <td>${user}</td>
        //         <td>${area}</td>
        //         <td>${address}</td>
        //         <td>${cord}</td>
        //         <td>${tel}</td>
        //         <td><span class="change">编辑</span>|<span class="up">上移</span>|<span class="del">删除</span>|<span
        //                 class="down">下移</span></td>
        //         <td><span class='mo'>默认地址</span></td>
        // `
        // // 同时清空输入的内容
        // $('.user').value=$('.area').value=$('.address').value=$('.cord').value=$('.tel').value=''
        // // 同时隐藏遮罩
        // $('.new').classList.remove('show')

        // 直接放入数据中 然后再进行页面渲染
        // data.push({
        //     consignee: user,
        //     area: area,
        //     address: address,
        //     zipCode: cord,
        //     tel: tel
        // })

        var obj = {
            consignee: user,
            area: area,
            address: address,
            zipCode: cord,
            tel: tel
        }
        if (flag) {
            data [modI] = obj
            flag = false
        } else {
           data.push(obj)
        }
        DataFn()
        // // 同时清空输入的内容
        $('.user').value = $('.area').value = $('.address').value = $('.cord').value = $('.tel').value = ''
        // // 同时隐藏遮罩
        $('.new').classList.remove('show')
    }
    // 点击编辑
    if (target.className === 'change') {
        flag = true; //打开开关，标记可编辑
        $('.new').classList.add('show')
        $('.tit').innerText = '编辑'
        // 获取这一行上的 自定义属性，作为当前的数据下标，获取对应的数据对象
        var tr = target.parentNode.parentNode;
        modI = tr.getAttribute('dataIndex')
        // console.log(modI)
        var obj = data[modI]
        // console.log(obj)
        // 将对象的键值作为元素的内容显示在页面
        $('.user').value = obj.consignee
        $('.area').value = obj.area
        $('.address').value = obj.address
        $('.cord').value = obj.zipCode
        $('.tel').value = obj.tel
    }
    // 点击删除，删除此行
    if(target.className==='del'){
        var tr=target.parentNode.parentNode
        tr.remove()
    }
    // 点击默认，将此行设置第一位同时 文本改为默认地址
    if(target.className==='mo'){
        // 排他
        $('.default')&&($('.default').innerText='设为默认')&&$('.default').classList.remove('default')
        target.classList.add('default')
        target.innerText='默认地址'
        // 同时位于第一行
        $('tbody').insertBefore(target.parentNode.parentNode,$('tbody').firstElementChild)
    }
    // 点击搜索
    if(target.className==='search'){
        var val=$('.inp').value.trim()
        if(!val)return alert('请输入姓名再搜索')
            var resData=data.filter(function(obj){
        return  obj.consignee.includes(val)
        })
        DataFn(resData)
    }
    // 重置
    if(target.className==='reset'){
        // 清空搜索栏的值
        $('.inp').value=''
        // 重新渲染所有函数
        DataFn()
    }
})







function DataFn(datas) {
    datas=datas?datas:data
    $('tbody').innerHTML = datas.map(function (obj, i) {
        return `
        <tr dataIndex=${i}>
            <td>${obj.consignee}</td>
            <td>${obj.area}</td>
            <td>${obj.address}</td>
            <td>${obj.zipCode}</td>
            <td>${obj.tel}</td>
            <td><span class="change">编辑</span>|<span class="up">上移</span>|<span class="del">删除</span>|<span class="down">下移</span></td>
            <td><span class='mo'>设为默认</span></td>
        </tr>
            `
    }).join('')
}
function $(el, parent = document) {
    return parent.querySelector(el)
}