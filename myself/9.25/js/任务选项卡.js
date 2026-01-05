// 模拟数据
var data = [
    { name: '《风筝》袁农明知郑耀先身份，为啥还非要杀他？真相扎心又现实', flag: true },
    { name: '61岁李连杰现身国产车店，接待仅有三名销售，全程搓手略显不悦', flag: false },
    { name: '关于预制菜，我觉得这位餐饮小老板看得最透彻', flag: true },
    { name: '断舍离3年后悟了：这些网红好物是鸡肋，买了占地方！', flag: false },
    { name: '多家饭店年夜饭已订满', flag: true },
    { name: '“皖K888888”被查', flag: false },
    { name: '雷军：小米非常缺人', flag: false }
]
// 表头日期
var date = new Date()
$('.daydate').innerHTML = date.toDateString()
// 渲染数据
var flag=false
var curI = 0;
DataFn(curI)

// 点击事件委托
$('.box').addEventListener('click', function (e) {
    var target = e.target || window.event.srcElement
    if (target.className === 'All') {
        curI = 0
        DataFn(curI)
    }
    if (target.className === 'Active') {
        curI = 1
        DataFn(curI)
    }
    if (target.className === 'Compeleted') {
        curI = 2
        DataFn(curI)
    }
    if (target.className === 'del') {
        // 查到并返回目标的下标
        var delI = data.findIndex(obj => {
            return obj.name === target.previousElementSibling.innerHTML
        })
        data.splice(delI, 1)
        DataFn(curI)
    }
    if (target.type === 'checkbox') {
        // find 查找并返回第一个满足条件的对象
        data.find(obj => {
            return obj.name === target.nextElementSibling.innerHTML
        }).flag=target.checked;
        DataFn(curI)
    }
})
// 键盘事件    回车13空格32 左上右下37 38 39 40
$('.Add').addEventListener('keydown', (e)=> {
    if(e.keyCode===13){
        var Add=$('.Add').value.trim()
        if(!Add)return alert('新增任务名称不能为空')
            data.push({name:Add,flag:false})
        curI=0
        // 添加数据后重新渲染
        DataFn(curI)
        // 清空增加文本框的值
        $('.Add').value=''
    }
})


// 封装渲染数据（状态）函数
function DataFn(state) {
    var curData = state === 0 ? data : data.filter((function (obj) {
        return state == 1 ? !obj.flag : obj.flag
    }))
    // 根据状态下标  找到选项卡类别，进行高亮
    $('.active') && $(".active").classList.remove('active')
    gets('.state span')[state].classList.add('active')
    $(".task").innerText = curData.length
    $('.addTask').innerHTML = curData.map(function (obj) {
        return `<p class="${obj.flag ? 'checked' : ''}">
        <input type="checkbox" ${obj.flag ? 'checked' : ''}>
        <strong>${obj.name}</strong><span class='del'>&times;</span>
        </p>
`
    }).join('')
}

function $(el, parent = document) {
    return parent.querySelector(el)
}
function gets(el, parent = document) {
    return [...parent.querySelectorAll(el)]
}

// 判断状态
// curI 0为全部 1为正在进行中 2为completed
// 声明一个变量数据 判断状态
// var curDate=state==0?data:data.filter(function(obj){
// return  state===1?!obj.flag:obj.flag
// })
// 给state下标对应数据添加高亮和独显
// $('.active')&&$('.active').classList.remove('active')
// gets('.state span')[state].classList.add('actice')
// 然后找变量数据中任务的数量 反哺给task的innerText中
// task.innerText=curData.length
// 然后渲染数据
// $('.addTask').innerHTML=CurData.map(function(e){
// return `<p class='${obj.flag?'checked':''}'>
// <input type="checkbox" >a <span>&times;</span></p> `
// })