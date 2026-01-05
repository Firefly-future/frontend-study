// 由于操作元素较多  可借助事件委托绑给父元素
// 通过判断e.target事件源 来分辨操作的元素是谁 要执行什么样的操作即可

// 1 渲染
render()


document.addEventListener("click", function (e) {
    // 1 获取事件源
    // 标准浏览器       IE浏览器获取
    var target = e.target || window.event.srcElement;

    // 2 判断源
    // 上移  即插在当前这一行tr的上一个tr的前面
    if (target.className === "up") {
        var tr = target.parentNode.parentNode;  // 获取移动的这一行

        // 判断当前这一行已经是第一行 即 没有上一个兄弟元素
        if (!tr.previousElementSibling) return alert("您已经位居榜首🐂");
        $("tbody").insertBefore(tr, tr.previousElementSibling)
    }

    // 下移 是插在下一个兄弟元素的下一个兄弟元素的前面
    if (target.className === "down") {
        var tr = target.parentNode.parentNode;
        if (!tr.nextElementSibling) return alert("您已经垫底啦😅")
        $("tbody").insertBefore(tr, tr.nextElementSibling.nextElementSibling)
    }

    // 添加按钮  显示遮罩
    if (target.className === "addBtn") {
        $(".mark").classList.add("show")
    }

    // 取消 和 关闭  遮罩消失
    if (target.className === "no" || target.className === "close") {
        $(".mark").classList.remove("show")
    }

    // 确认添加
    if (target.className === "ok") {
        // 获取输入框所有用户信息的值
        var user = $(".user").value.trim(),
            area = $(".area").value.trim(),
            address = $(".address").value.trim(),
            code = $(".code").value.trim(),
            tel = $(".tel").value.trim();
        if (!user) return alert("请输入收货人")
        if (!area) return alert("请输入所在地")
        if (!address) return alert("请输入详细地址")
        if (!code) return alert("请输入邮编")
        if (code.length !== 6) return alert("请输入六位数字的邮编")
        if (!tel) return alert("请输入电话")
        if (tel.length !== 11) return alert("请输入11位的手机号")
        if (tel[0] !== "1" || tel[1] === "0" || tel[1] === "1" || tel[1] === "2") return alert("您输入的电话有误")
        // 以上校验都全部通过 创建一行tr  且里面的信息是输入框的值  然后追加在tbody的最后
        alert("yes success next")

        // var tr = document.createElement("tr");
        // tr.innerHTML = `
        //     <td>${user}</td>
        //     <td>${area}</td>
        //     <td>${address}</td>
        //     <td>${code}</td>
        //     <td>${tel}</td>
        //     <td><span class="modify">编辑</span><span class="del">删除</span><span class="up">上移</span><span class="down">下移</span></td>
        //     <td class="current">设为默认</td>
        // `
        // $("tbody").appendChild( tr )
        // // 清空输入框的值  且 遮罩消失
        // $(".user").value = $(".area").value = $(".address").value = $(".code").value = $(".tel").value = "";
        // $(".mark").classList.remove("show")

        // 直接对数据操作   即 将用户信息存入一个对象 直接渲染页面即可 
        data.push({
            consignee: user,
            area: area,
            address: address,
            zipCode: code,
            tel: tel
        })
        // console.log( data )
        render()
        // 清空输入框的值  且 遮罩消失
        $(".user").value = $(".area").value = $(".address").value = $(".code").value = $(".tel").value = "";
        $(".mark").classList.remove("show")
    }
    // 点击搜索 展示包含有目标字符串的行
    if (target.className === 'search') {
        var inp = $('.inp').value.trim()
        if (!inp) return alert('请输入有效昵称')
        var tR = gets('tbody tr')
        tR.forEach(function (item) {
            if (!item.innerText.includes(inp)) {
                item.classList.add('opacity')
            }
        })
    // 点击重置 重置输入内容
    if(target.className==='reset'){
        // var inp=$('.inp').value.trim()
        $('.inp').value=''
    }
    }
    // 点击设为默认 放到第一行
    if (target.className === 'current') {
        var Tr = target.parentNode
        $('tbody').insertBefore(Tr, $('tbody').firstElementChild)
    }
    // 点击删除 删除整行
    if (target.className === 'del') {
        $('tbody').removeChild(target.parentNode.parentNode)
    }
    // 点击编辑 弹出带有此行信息的窗口
    if (target.className === 'modify') {
        $(".mark").classList.add("show")
    }
})







function render() {
    $("tbody").innerHTML = data.map(function (obj) {
        return `
        <tr>
            <td>${obj.consignee}</td>
            <td>${obj.area}</td>
            <td>${obj.address}</td>
            <td>${obj.zipCode}</td>
            <td>${obj.tel}</td>
            <td><span class="modify">编辑</span><span class="del">删除</span><span class="up">上移</span><span class="down">下移</span></td>
            <td class="current">设为默认</td>
        </tr>
        `
    }).join("")
}



function $(el) {
    return document.querySelector(el)
}
function gets(el) {
    return [...document.querySelectorAll(el)]
}