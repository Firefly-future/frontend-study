// 由于操作元素较多  可借助事件委托绑给父元素
// 通过判断e.target事件源 来分辨操作的元素是谁 要执行什么样的操作即可

// 1 渲染
render()

var flag = false;  // 标记是添加 还是 编辑   false添加   true编辑
var modI = -1 ;    // 记录编辑下标

document.addEventListener("click" , function(e){
    // 1 获取事件源
            // 标准浏览器       IE浏览器获取
    var target = e.target || window.event.srcElement;
    
    // 2 判断源
    // 上移  即插在当前这一行tr的上一个tr的前面
    if( target.className === "up" ){
        var tr = target.parentNode.parentNode;  // 获取移动的这一行

        // 判断当前这一行已经是第一行 即 没有上一个兄弟元素
        if(!tr.previousElementSibling) return alert("您已经位居榜首🐂");
        $("tbody").insertBefore( tr , tr.previousElementSibling )
    }

    // 下移 是插在下一个兄弟元素的下一个兄弟元素的前面
    if( target.className === "down" ){
        var tr = target.parentNode.parentNode;
        if(!tr.nextElementSibling) return alert("您已经垫底啦😅")
        $("tbody").insertBefore( tr , tr.nextElementSibling.nextElementSibling )
    }

    // 添加按钮  显示遮罩
    if( target.className === "addBtn" ){
        $(".mark").classList.add("show")
        $(".subhead").innerText = "添加"
    }

    // 取消 和 关闭  遮罩消失
    if( target.className === "no" || target.className === "close" ){
        $(".mark").classList.remove("show")
    }

    // 确认添加
    if( target.className === "ok" ){
        // 获取输入框所有用户信息的值
        var user = $(".user").value.trim() ,
            area = $(".area").value.trim() ,
            address = $(".address").value.trim(),
            code = $(".code").value.trim() ,
            tel = $(".tel").value.trim() ;
        if( !user ) return alert("请输入收货人")
        if( !area ) return alert("请输入所在地")
        if( !address ) return alert("请输入详细地址")
        if( !code ) return alert("请输入邮编")
        if( code.length !== 6 ) return alert("请输入六位数字的邮编")
        if( !tel ) return alert("请输入电话")
        if( tel.length !== 11 ) return alert("请输入11位的手机号")
        if( tel[0] !== "1" || tel[1] === "0" || tel[1] === "1" || tel[1] === "2" ) return alert("您输入的电话有误")

        // if( flag ){ // 编辑
        //     alert("modify")
        //     console.log( modI , data[modI] )
        //     data[modI] = {
        //         consignee : user,
        //         area : area ,
        //         address : address ,
        //         zipCode : code ,
        //         tel : tel
        //     }
        // } else { // 添加
            
        //     // 以上校验都全部通过 创建一行tr  且里面的信息是输入框的值  然后追加在tbody的最后
        //     alert("add")

        //     // var tr = document.createElement("tr");
        //     // tr.innerHTML = `
        //     //     <td>${user}</td>
        //     //     <td>${area}</td>
        //     //     <td>${address}</td>
        //     //     <td>${code}</td>
        //     //     <td>${tel}</td>
        //     //     <td><span>编辑</span><span>删除</span><span>上移</span><span>下移</span></td>
        //     //     <td>设为默认</td>
        //     // `
        //     // $("tbody").appendChild( tr )
        //     // // 清空输入框的值  且 遮罩消失
        //     // $(".user").value = $(".area").value = $(".address").value = $(".code").value = $(".tel").value = "";
        //     // $(".mark").classList.remove("show")

        //     // 直接对数据操作   即 将用户信息存入一个对象 直接渲染页面即可 
        //     data.push({
        //         consignee : user,
        //         area : area ,
        //         address : address ,
        //         zipCode : code ,
        //         tel : tel
        //     })
        //     // console.log( data )
            
        // }
        var obj = {
            consignee : user,
            area : area ,
            address : address ,
            zipCode : code ,
            tel : tel
        }
        

            if(flag) {
                data[modI] = obj
                flag = false
            }else {
                data.push(obj)
            }
            render()
            // 清空输入框的值  且 遮罩消失
            $(".user").value = $(".area").value = $(".address").value = $(".code").value = $(".tel").value = "";
            $(".mark").classList.remove("show")
    }

    // 点击编辑
    if( target.className === "modify" ){
        flag = true ;// 打开开关 标记可编辑
        $(".mark").classList.add("show")
        $(".subhead").innerText = "编辑";
        // 获取这一行上的自定义属性 作为当前的数据下标 获取对应的数据对象 
        var tr = target.parentNode.parentNode;
        modI = tr.getAttribute("dataIndex")
        var obj = data[ modI ];
        // 将对象的键值 作为元素的内容显示在页面
        $(".user").value = obj.consignee
        $(".area").value = obj.area
        $(".address").value = obj.address
        $(".code").value = obj.zipCode
        $(".tel").value = obj.tel
    }

    // 删除
    if( target.className === "del" ){
        var index = target.parentNode.parentNode.getAttribute("dataIndex");
        // 根据下标 删除数据 重新渲染 
        data.splice( index , 1 );
        render()
    }

    // 设置默认地址
    if( target.className === "current" ){
        // 排他
        $(".default") && ($(".default").innerText = "设为默认") && $(".default").classList.remove("default")
        // 给当前添加
        target.classList.add("default")
        target.innerText = "默认地址"
        // 将默认地址这一行 插入整个地址的最前面 即 第一个元素子节点的前面
        $("tbody").insertBefore( target.parentNode.parentNode , $("tbody").firstElementChild )
    }

    // 查询
    if( target.className === "search" ){
        // 获取输入框的值
        var val = $(".inp").value.trim();
        if( !val ) return alert("请输入内容");
        // 在所有数据对象中 筛选匹配filter与val值相关includes的信息 重新渲染
        var resData = data.filter(function(obj){
            return  obj.consignee.includes(val)
        })
        // console.log( resData )
        render( resData )
    }

    // 重置
    if( target.className === "reset" ){
        // 清空输入框的值
        $(".inp").value = ""
        // 重新渲染所有数据
        render()
    }
})


function render( datas ){
    datas = datas ? datas : data
    $("tbody").innerHTML = datas.map(function(obj , i){
        return `
        <tr dataIndex="${i}">
            <td>${obj.consignee}</td>
            <td>${obj.area}</td>
            <td>${obj.address}</td>
            <td>${obj.zipCode}</td>
            <td>${obj.tel}</td>
            <td><span class="modify">编辑</span><span class="del">删除</span><span class="up">上移</span><span class="down">下移</span></td>
            <td><span class="current">设为默认</span></td>
        </tr>
        `
    }).join("")
}



function $(el){
    return document.querySelector(el)
}