// 获取元素
function $(el, parent = document) {
    return parent.querySelector(el)
}
function gets(el, parent) {
    parent=parent||document
    return Array.from(parent.querySelectorAll(el))
}
// 模拟数据
var data = [
    "java", "教程", "SEM", "SEM基础", "柚说", "关键词", "创意", "公众号", "排名", "网络营销", "SEM", "网络推广", "达内", "效果", "数据", "SEO", "DSP", "百度网盟", "百度DSP", "广点通", "智慧推", "粉丝通", "新媒体", "微信", "微博", "问答", "百科", "博客", "ASO", "网站", "着陆页", "网站分析", "电商"
]
console.log(data.length)
// 随机标签 
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// 初始化数据
dataFn()
// 点击换一换// 给换一换绑定点击事件
$('.btn').onclick = function () {
    // 点击后 所有数据需要发生改变
    dataFn()
}

function dataFn() {
    mycon()
    $('.box2').innerHTML=''
    $('.tip').classList.remove('shower')
    var sI = random(0, 12)
    var eI = random(13, 33)
    var ResData = data.slice(sI, eI)
    // 获取随机10-20个标签
    // 渲染数据
    $('.con').innerHTML = ResData.map(function (item) {
        return `<div>${item}</div>`
    }).join('')


// 再给收起标签库处绑定点击事件
// 点击后 内容同时变成展开标签库
$('.box3').onclick = function () {
    // 判断 文本内容是展开还是收起标签库 同时对应去除show或者添加show
    // if(this.innerText==='收起标签库'){
    //     $('.con').classList.add('show')
    //     $('.box3').innerText='展开标签库'
    // }else{
    //     $('.con').classList.remove('show')
    //     $('.box3').innerText='收起标签库'
    // }

    // 判断 $('.con')是否含有show   没有则添加 有则删除 同时对应的box3处文本进行更换
    // if (!$('.con').classList.contains('show')) {
    //     $('.con').classList.add('show')
    //     $('.box3').innerText = '展开标签库'
    // } else {
    //     $('.con').classList.remove('show')
    //     $('.box3').innerText = '收起标签库'
    // }

    //三元判断
    $('.con').classList.toggle('show')?$('.box3').innerText='展开标签库':$('.box3').innerText='收起标签库'
}

// 给标签库绑定点击事件，点击后标签会出现在我的标签中
gets('.con div').forEach(function(tag){
    tag.onclick=function(){
        // 判断点击的目标标签是否已添加 selected状态
        if(!this.classList.contains('selected')){
        //   未添加的能不能添加进去 取决于我的标签是否达到了上限
        if(gets('.box2 div').length>=8){
            // 若达到上限，则出现提示
            $('.tip').classList.add('shower')
            return;
        }
        // 创建一个盒子 放点击的元素 在我的标签box2中
        // var div = document.createElement('div')
        // div.innerText = this.innerText

        // 克隆一个
        var div=this.cloneNode(true)
        $('.box2').appendChild(div)
        console.log($('.box2').appendChild(div))
        // 同时添加已点的状态
        this.classList.add('selected')
    }else{//已添加需回退删除 即从我的标签纸查找与正在点击一致
    // 的标签进行删除
    gets('.box2 div').forEach(function(Tag){
        if(Tag.innerText===tag.innerText){
            $('.box2').removeChild(Tag)
            // 同时去掉已点击的状态
            tag.classList.remove('selected')
        }
    })
    $('.tip').classList.remove('shower')
    }
    mycon()
}
})

// console.log(gets('.con div'))

}

// 我的标签点击事件
function mycon(){
    // 获取我的标签
    var myco=gets('.box2 div')
    console.log(myco)
    // 循环我的标签，给每个标签绑定点击事件
    myco.forEach(function(div){
        // console.log(div)
        div.onclick=function(){
            $('.box2').removeChild(div)
            // 同时去掉所有的标签中与之对应的浅状态
            gets('.con div').forEach(function(di){
                if(di.innerHTML===div.innerHTML){
                    di.classList.remove('selected')
                    $('.tip').classList.remove('shower')
                }
            })
        }
    })
}






































































































// // 给换一换绑定点击事件
// $('.btn').onclick = function () {
//     // 点击后 所有数据需要发生改变
//     dataFn()
// }
// // 再给收齐标签库处绑定点击事件
// // 点击后 内容同时变成展开标签库
// $('.box3').onclick = function () {
//     // 判断 文本内容是展开还是收起标签库 同时对应去除show或者添加show
//     // if(this.innerText==='收起标签库'){
//     //     $('.con').classList.add('show')
//     //     $('.box3').innerText='展开标签库'
//     // }else{
//     //     $('.con').classList.remove('show')
//     //     $('.box3').innerText='收起标签库'
//     // }

//     // 判断 $('.con')是否含有show   没有则添加 有则删除 同时对应的box3处文本进行更换
//     // if (!$('.con').classList.contains('show')) {
//     //     $('.con').classList.add('show')
//     //     $('.box3').innerText = '展开标签库'
//     // } else {
//     //     $('.con').classList.remove('show')
//     //     $('.box3').innerText = '收起标签库'
//     // }

//     //三元判断
//     $('.con').classList.toggle('show')?$('.box3').innerText='展开标签库':$('.box3').innerText='收起标签库'
// }

// // 给标签库绑定点击事件，点击后标签会出现在我的标签中
// gets('.con div').forEach(function(tag){
//     tag.onclick=function(){
//         // 创建一个盒子 放点击的元素 在我的标签box2中
//         var div = document.createElement('div')
//         div.innerText = this.innerText
//         $('.box2').appendChild(div)
//         // 同时添加已点的状态
//         this.classList.add('selected')
    
// }})

// // console.log(gets('.con div'))