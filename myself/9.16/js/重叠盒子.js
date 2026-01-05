// 获取元素
function $(el){
    return document.querySelector(el)
}
function gets(el){
    return document.querySelectorAll(el)
}
//模拟数据
var data=[
    { tit:'人物',
      con:['历史','痕迹','遗址','信息']
    },
    { tit:'人物',
      con:['历史','痕迹','遗址','信息']
    },
    { tit:'人物',
      con:['历史','痕迹','遗址','信息']
    },
    { tit:'人物',
      con:['历史','痕迹','遗址','信息']
    }
]
// 渲染数据
$('.box').innerHTML=data.map(function(obj){
    return`
         <h3>${obj.tit}</h3>
        <div class="list">
            ${obj.con.map(function(item){
                return `<p>${item}</p>`
            }).join('')}
        </div>  
    `
}).join('')
// 给每一个标题绑定点击事件
gets('h3').forEach(function(h3){
    h3.onclick=function(){
        $('.show')&&$('.show').classList.remove('show')
        h3.nextElementSibling.classList.add('show')
    }
})

