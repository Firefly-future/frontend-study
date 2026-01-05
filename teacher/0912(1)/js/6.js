// 1 模拟数据
var data = [
    { user : "黄富浩" , age : 24, address : "河北" , scores : scoreFn( randomNum(1 , 6) )  },
    { user : "张汉" , age : 23, address : "河北" , scores : scoreFn( randomNum(1 , 6) )  },
    { user : "王乐华" , age : 24, address : "河北" , scores : scoreFn( randomNum(1 , 6) )  },
    { user : "闫如玉" , age : 24, address : "山西" , scores : scoreFn( randomNum(1 , 6) )  },
    { user : "张璐瑶" , age : 24, address : "山西" , scores : scoreFn( randomNum(1 , 6) )  },
    { user : "王灿超" , age : 22, address : "河南" , scores : scoreFn( randomNum(1 , 6) )  },
    { user : "孟令辉" , age : 23, address : "山东" , scores : scoreFn( randomNum(1 , 6) )  },
    { user : "胡馨" , age : 23, address : "江西" , scores : scoreFn( randomNum(1 , 6) )  }
]

console.log( data )

// 2 获取元素
var users = document.getElementById("users");

// 3 渲染数据
users.innerHTML = data.map( function( obj ){
    // es5 "" 字符串拼接  注意引号对应 且 不允许换行
        // return "<li class=>" + 变量 + "</li>" 
        // return "<li><span>"+张三+"
        // </span><span>"+18+"</span>
        // <span>"+河南+"</span><span>+"+98+"</span><span>98</span></li>"

    // es6 `` 模板字符串  它的书写与html完全一致  插值: ${}
    //        注意: 模板字符串中 禁止注释
    return `<li>
                <span class="total">${ obj.scores.reduce(function(prev,cur){
                    return prev + cur
                } , 0) }</span>
                <span>${obj.user}</span>
                <span>${obj.age}</span>
                <span>${obj.address}</span>
                ${ obj.scores.map(function(score){
                    return `<span>${score}</span>`
                }).join("") }
            </li>`
} ).join("")

// reduce(function( prev , cur , index  ){})  数组方法  求和器
// var arr = [9,5,3,1];
// var res = arr.reduce( function(prev , cur , index ) {
//     console.log( prev , cur , index  )
//     // 若只有一个回调函数参数
//         // 该函数第一次执行: prev 接收arr[0]  cur接收 arr[1]  -> 9  5
//         // 之后的每一次: prev是上一次函数的返回值  cur继续向后迭代 -> undefined 3  -> 
//         //                                                        -> undefined 1
//     // 若接收两个参数
//         // 该函数第一次执行: prev 接收第二个参数 cur接收 arr[0]  -> 0  9
//         // 之后的每一次: prev是上一次函数的返回值  cur继续向后迭代 -> undefined 3  -> 
//     return prev + cur
// } , 0 )
// console.log( res )


// 封装成绩函数
function scoreFn( n = 2 ){
    var resArr = [];  // 成绩数组
    // 按照指定的成绩数量生成数据数组
    for( var i = 0 ; i < n ; i++ ){
        resArr.push( randomNum( 60 , 100 ) )
    }
    return resArr
}

// 封装随机数函数
function randomNum( min , max ){
    return Math.floor( Math.random() * ( max - min + 1 ) + min )
}