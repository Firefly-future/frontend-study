
// 初始运算符号
var  ysf = ["+" , "*" , "/"];

// 1 页面初始化问题
var num1 = random( 1 , 10 );  // 操作第一个数
var num2 = random( 1 , 10 );  // 操作第二个数
var ysfI = random( 0 , ysf.length - 1 );  // 运算符下标
var resNum = resNumFn( num1 , num2 , ysf[ysfI] )
console.log( resNum )
$(".question").innerText = num1 + ysf[ysfI] + num2 +  " = ? "


// 2 渲染键码值 按键  
// 先创建长度9的空数组 进行0填充 在合并清除 0 .
var keyArr = new Array(9).fill(0).concat(["C",0,"."]);
$(".keyInfo").innerHTML = keyArr.map((item , index) => {
    return `<li>${index > 8 ? item : index + 1}</li>`
}).join("")

// 3 由于按键较多 事件委托
$(".box").addEventListener("click" , e => {
    // 获取事件源
    var target = e.target || window.event.srcElement;
    // 按键li 给结果res赋值  注意只有c是清空
    if( target.nodeName === "LI" ){
        if( target.innerText === "C" ){
            $(".res").innerText = ""
            return 
        }
        $(".res").innerText += target.innerText
    }
    // 解密校验按钮 button
    if( target.nodeName === "BUTTON" ){
        // 获取结果的内容值
        var val = $(".res").innerText;
        // 判断没有结果值
        if( !val ) return alert("请输入运算结果~")
        // 判断输入的结果是否正确
        if( $(".res").innerText != resNum ) return alert("验证码不正确")
        // 走到这里 表示输入结果 且 结果正确 即将进入 任务首页
        alert("success next 🎉")
        location.href = "./3任务选项卡.html"
    }
})



// 封装结果函数
// 该函数主要是判断运算符号 来决定是 + * / 等  最后得出结果
// 而 针对多分枝  可以使用switch语句
function resNumFn( n1 , n2 , ysf ){
    switch( ysf ){
        case "+":
            return n1 + n2
        break;

        case "*":
            return n1 * n2
        break;

        case "/": 
            // 注意: 未必整除  未整除的保留两位小数  且实现四舍五入
            // 即 1.485 -> 1.49   1.412 -> 1.14
            // 14 / 7 = 2 ... 0
            // num.toFxied(n) 按指定小数位数n进行四舍五入,返回字符串;
            //                n的取值是0-20,默认是0表示没有小数
            return n1 % n2 === 0 ? n1 / n2 : (n1 / n2).toFixed(2)
        break;
    }
}


function random( min , max ){
    return Math.floor(Math.random() * ( max - min + 1 ) + min)
}

function $(el){
    return document.querySelector(el)
}