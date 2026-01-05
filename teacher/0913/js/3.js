

var userName = ["黄富浩" ,"张汉" , "王乐华" ,"闫如玉" ,"张璐瑶" ,"开始","王灿超" ,"孟令辉" ,"胡馨" , "张润洁", "曲浩" , "项心怡" ];

var questions = [
    "数据类型的转换规则是什么?",
    "其他类型转数字有哪些方法?规则是什么?",
    "字符串有哪些方法?说出其参数和作用?",
    "哪些API会改变原数组?",
    "说出css选择器的权重值,从低到高描述?",
    "说出js的命名规范?",
    "数组提供了哪些高阶函数,说出作用?",
    "运算符有哪些?各自包含什么?",
    "说出创建数组的两种方式,区别是什么?",
    "循环有哪些?区别是什么?",
    "阻断循环的语句有什么,区别是什么?",
    "函数不确定参数和返回值用什么表示?",
    "如何将伪数组转换真数组?",
    "如何遍历对象?检测某个key是否存在使用什么?",
    "对象的静态方法有哪些?"
]


// 渲染人名
$("users").innerHTML = userName.map(function(name , index){
    return index === 5 ? `<button id="start">${name}</button>` : `<div>${name}</div>`
}).join("")

// 给开始绑定点击事件
$("start").onclick = function(){
    $("start").disabled = true;
    $("start").style.opacity = ".3"
    // 获取所有人员div
    var names = gets("div" , $("users"));
    // console.log( names )
    var timer = setInterval( function(){
        // 生成一个随机数下标 根据下标找到对应的人员 添加高亮[即修改状态 为红色背景 白色字 加粗]
        names.forEach(function(user){
            user.style = ""
        })
        // 排他  即 干掉别人  保留自己  即 把之前存在的高亮状态取消   给当前添加
        var index = random( 0 , names.length - 1 )
        // console.log( index , names[index])
        Object.assign( names[index].style , {
            background : "red" ,
            color : "white" , 
            fontWeight : 900
        } )
    }  , 100)

    // 5s后停止点名  即 清除定时器
    setTimeout(function(){
        clearInterval( timer )
        // 恢复开始状态
        $("start").disabled = false;
        $("start").style.opacity = 1
        // 停的那一刻 在问题数组中生成一个问题下标 根据下标找到问题  赋值页面标题问题
        $("question").innerHTML = questions[ random( 0 , questions.length - 1 ) ]
    } , 5000 )
}



function $(el){
    return document.getElementById(el)
}

function gets(el , parent = document){
    return Array.from( parent.getElementsByTagName(el) )
}

function random( min , max ){
    return Math.floor( Math.random() * (max - min + 1) + min)
}