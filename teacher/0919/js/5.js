// 1 模拟数据
var data = [
    "金秋里 听历史的声息拂过耳畔",
    "美国再次一票否决安理会加沙决议新",
    "台风“米娜”将带来大暴雨、特大暴雨热",
    "公安部公布10起网络违法犯罪案例",
    "《731》所有日本角色均由日籍演员出演新",
    "高校捞80000斤鱼请全校师生吃",
    "端起历史的望远镜8中东之战 巴基斯坦成了最大赢家",
    "香港黄金盗窃案已拘捕12男1女热",
    "导演让刚出生女儿出演剖腹取婴镜头热",
    "《731》导演回应为何回避血腥场面",
    "男子转情人1340万 66岁原配起诉返还",
    "“中国三农”APP系假冒",
    "91岁细菌战幸存者观看《731》后发声热",
    "19岁女子腹痛就诊后2小时分娩",
    // "男童关家中半年死亡因被疑非亲生",
    // "多人因忘关闭自动续费被扣数千元热",
    // "胡塞武装：袭击以色列并命中军事目标",
    // "俄堪察加近海发生7.8级地震",
    // "奥巴马：我现在不是总统冲我喊没用"
]
var index = -1;   // 初始化下标

// 2 渲染
renderList(data)

// 3 给表单input 绑定聚焦 失焦事件
$(".inp").onfocus = function () {
    $(".list").classList.add("show")
    this.classList.add("status")
}
$(".inp").onblur = function () {
    $(".list").classList.remove("show")
    this.classList.remove("status")
}
// 4 给表单input绑定change事件  当内容发生改变时 搜索
$(".inp").onchange = function () {
    // 获取输入框的值  在所有数据中进行筛选匹配filter与该值相关的信息
    var val = this.value.trim();
    if (!val) return alert("请输入有效内容");
    var resData = data.filter(function (item) {
        // 返回数据每项长字符串中 是否 包含输入框指定的值
        return item.includes(val)
    })
    console.log(resData)
    // 判断返回的数据
    if (resData.length < 1) {
        $(".list").innerHTML = "无搜索结果<br>请换个关键字在试一试"
        return
    }
    // 将筛选匹配的数据 进行渲染
    renderList(resData)
}

// 5 给表单绑定键盘事件
$(".inp").onkeydown = function (e) {
    // e.keyCode 获取键码值
    // 常见键码值 左37 上38 右39 下40 回车13 空格32
    // console.log( e.key , e.keyCode )
    if (e.keyCode === 40) {
        var lis = [...$(".list").children];  // 获取list下的所有的元素子节点li
        $('.active') && $('.active').classList.remove('active')
        index++;  // 修改下标 来到下一项
        lis[index].classList.add("active")
        // 修改输入框的值 是当前列表li的内容
        $(".inp").value = lis[index].innerHTML;
        // 同时删除上一个下标的active
        if (index >= lis.length - 1) index = -1
    }if(e.keyCode===38){
        var lis = [...$(".list").children]
        if(index<=0)index=lis.length
        $('.active')&&$('.active').classList.remove('active')
        index--
        lis[index].classList.add('active')
        $('.inp').value=lis[index].innerHTML
    }
}


// 封装渲染函数
function renderList(data) {
    $(".list").innerHTML = data.map(function (item) {
        return `<li>${item}</li>`
    }).join("")
}



function $(el, parent = document) {
    return parent.querySelector(el)
}


function gets(el, parent = document) {
    return [...parent.querySelectorAll(el)]
}