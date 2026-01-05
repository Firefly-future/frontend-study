// 模拟数据
var usersName=['A','B','C','D','E','开始','F','G','H','I','J']
var questions=[
    '对象的静态方法',
    '基本数据类型',
    '选择器的优先级',
    '特殊的对象是哪个',
    '如何区分object与数组的类型',
    '如何合并对象',
    '字符串方法有哪些,参数是什么,有什么作用',
    '数组方法有哪些',
    '高阶函数的数组方法有哪些',
    '哪些数组方法会改变原数组',
    '如何创建对象,数组,字符串',
    '获取时间戳的方法有什么'
]
// 获取元素
function $(el){
    return document.getElementById(el)
}
// 渲染数据
// 获取userName的元素并放入页面中   map渲染数据
$("userName").innerHTML=usersName.map(function(name,index){
    return index===5? `<button id='start'>${name}</button>`:`<div>${name}</div>`
}).join('')

// 添加点击事件
$('start').onclick=function(){
    // 点名开始时 开始不可用
    $('start').disabled=true;
    $('start').style.opacity='.2'
    // 获取所有人员的div
    // 即获取标签元素
    var names=gets('div',$("userName"));
    // console.log(names)
    // 生成一个随机数下标，点击后找到对应的名字并且背景颜色状态发生变化
    // 添加计时器 动态化
    var time=setInterval(function(){
        names.forEach(function(user){
        user.style=''
    })
    var index=random(0,names.length-1)
    Object.assign(names[index].style,{
        background:'red',
        fontWeight:"bolder",
        color:'white'
    })
    },1000)
    // 五秒后停止点名 清除定时器
    setTimeout(function(){
        clearInterval(time)
        // 恢复开始状态
        $('start').disabled=false;
        $('start').style.opacity='1'
        // 停的那一刻  生成随机一个问题，根据下标将问题显示到最上面盒子中
        $('questions').innerHTML=questions[random(0,questions.length-1)]
    },5000)
}

function gets(el,parent=document){
    return Array.from(parent.getElementsByTagName(el))
}
// 随机数函数
function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}