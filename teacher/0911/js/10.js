// 1 获取元素
// var startBtn = document.getElementById("start"),
//     endBtn = document.getElementById("end") ;

var timer = null ;

// 1 给机选一注按钮绑定点击事件
$("start").onclick = function(){
    // 按钮禁用
    $("start").disabled = true
    // var beforeArr = [] ; // 存储前区号码值
    // // 由于去重 所以未知循环次数while  即 只要数组长度不满足5  就要循环
    // while( beforeArr.length < 5 ){
    //     var  num = randomNum( 1 , 35 );  // 随机号码
    //     // 判断当前号码 没有再数组中出现  给数组push当前号码 
    //     if( beforeArr.indexOf( num ) === -1 ){
    //         beforeArr.push( num )
    //     }
    // }

    // console.log( beforeArr )

    // var afterArr = [] ; // 存储后区号码值
    // // 由于去重 所以未知循环次数while  即 只要数组长度不满足2  就要循环
    // while( afterArr.length < 2 ){
    //     var  num = randomNum( 1 , 12 );  // 随机号码
    //     // 判断当后号码 没有再数组中出现  给数组push当后号码 
    //     if( afterArr.indexOf( num ) === -1 ){
    //         afterArr.push( num )
    //     }
    // }
    // console.log( afterArr )

    // 通过观察生成红色号码数组 和 蓝色号码数组的逻辑一致
    // 只有部分参数不一致  即 区间 个数 存储的数组(忽略)  此时设置为参数
    // 即 封装函数  实现该特定功能
    
    // 设置定时器 按照指定的间隔时间   不断的给前区 后区 生成球号  不断的渲染页面
    timer = setInterval(function(){
        var beforeArr = createArr( 1 , 35 , 2 );  // 前区号码值
        var afterArr = createArr( 1 , 12 , 7 )    // 后区号码值
        // console.log( beforeArr , afterArr )
        // 根据生成的号码值 给对应的元素 进行渲染
        renderLi( $("beforeArea") , beforeArr )
        renderLi( $("aftersArea") , afterArr )
    } , 100)
}


// 2 给停止绑定事件
$("end").onclick = function(){
    // 清除定时器
    clearInterval( timer )
    // 机选可用
    $("start").disabled = false
}



function createArr( min , max , n ){
    var numArr = [] ; // 存储球号数组
    // 只要numArr的长度不满足n
    while( numArr.length < n ){
        var  num = randomNum( min , max );  // 随机号码
        // 判断当后号码 没有再数组中出现  给数组push当后号码 
        if( numArr.indexOf( num ) === -1 ){
            numArr.push( num )
        }
    }
    // 升序处理
    numArr.sort(function( a,b ) { return a-b })
    return numArr
}


// 渲染函数
function renderLi( el , data ){
    el.innerHTML = data.map(function(ballNum){
        return "<li>" + zero( ballNum ) + "</li>"
    }).join("")
}


// 封装获取元素的函数
function $( el , parent ){
    parent = parent || document;
    return parent.getElementById(el)
}

function gets( el , parent ){
    parent = parent || document;
    return Array.prototype.slice.call( parent.getElementsByTagName(el) )
}

// 补零函数
function zero( n ){
    return n < 10 ? '0' + n : n;
}

// 随机数函数
function randomNum( min , max ){
    return Math.floor( Math.random() * ( max - min + 1 ) + min )
}