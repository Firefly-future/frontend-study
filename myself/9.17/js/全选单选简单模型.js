// 获取元素
function $(el) {
    return document.querySelector(el)
}
function gets(el, parent) {
    parent = parent || document
    return Array.from(parent.querySelectorAll(el))
}

// 模拟数据
var data = [
    // {
    //     id1: "All",
    //     id2: "All",
    //     lable: "SelectorAll",
    //     name: "name",
    //     Email: "Email",
    //     phone: "phone",
    //     Mobile: "Mobile"
    // },
    {
        id1: "one",
        id2: "one",
        lable: "+",
        name: "Gary Coleman",
        Email: "gary.coleman21@example.com",
        phone: "(398) - 332 - 5385",
        Mobile: "(888) - 677 - 3719"
    },
    {
        id1: "two",
        id2: "two",
        lable: "+",
        name: "Rose Parker",
        Email: "rose.parker16@example.com",
        phone: "(293)-873-2247",
        Mobile: "(216)-889-4933",
    },
    {
        id1: "three",
        id2: "three",
        lable: "+",
        name: "Chloe Nelson",
        Email: "chloe.nelson18@example.com",
        phone: "	(957)-213-3499",
        Mobile: "(	207)-516-4474"
    },
    {
        id1: "four",
        id2: "four",
        lable: "+",
        name: "Eric Bell",
        Email: "eric.bell16@example.com",
        phone: "(897)-762-9782",
        Mobile: "(565)-627-3002"
    }
]
// 渲染数据  按指定操作         map
$('.box2').innerHTML = data.map(function (obj) {
    return `
    <div><input type="checkbox" name="" id="${obj.id1}" class='ALL'><label for="${obj.id2}">${obj.lable}</label></div>
            <div>${obj.name}</div>
            <div>${obj.Email}</div>
            <div>${obj.phone}</div>
            <div>${obj.Mobile}</div>
            `
}).join('')
// console.log($('.all'))
// console.log(gets('.ALL'))
// console.log(gets('div'))

// 点击全选按钮 所有复选框被选中
$('.all').onclick = function () {
    // 获取box2下的所有复选框 gets('.ALL')
    gets('.ALL').forEach(function (everyinput) {
        // 全选即每个复选框选中
        everyinput.checked = $('.all').checked
    })
}
// 有一个复选框未选中 全选状态消失
// 循环每个复选框 分别赋予点击事件
gets('.ALL').forEach(function (every) {
    every.onclick = function () {
        // 数组的every 返回布尔值 一假全假 全真才真
        $('.all').checked = gets('.ALL').every(function (box) {
            return box.checked
        })
    }
})