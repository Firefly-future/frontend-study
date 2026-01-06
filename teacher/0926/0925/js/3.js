
// 1 模拟数据
var data = [
    { name : "新疆维吾尔自治区70周年庆祝大会" , flag : true },
    { name : "福建舰即将入列？国防部回应" , flag : false} ,
    { name : "谁给桦加沙踩了“刹车”打了“转向”" , flag : false} ,
    { name : "净网：2人非法破解无人机系统被查处" , flag : true} ,
    { name : "26元的鸡排为何能吃出60元的情绪价值" , flag : false} ,
    { name : "国防部回应中国是否在建第四艘航母" , flag : false} 
]


// 2 显示今天的日期
//    date.toDateString()  返回一个标识本地日期字符串 
//    结果因浏览器而异: Thu Sep 25 2025 -> 英文环境   
//                      星期四 9月26日 2025 -> 中文环境
$(".dayDate").innerHTML = new Date().toDateString()

// 3 初始化一个状态下标  用来标记当前的位置状态 0all  1未完成  2已完成
var curI = 0;
renderTask( curI )


// 4 事件委托绑定事件
// 根据判断target 来决定下一步操作的内容
$(".wrap").addEventListener("click" , e => {
    // 获取事件源
    var target = e.target || window.event.srcElement;
    if( target.className === "All" ){
        curI = 0
    }
    if( target.className === "Active" ){
        curI = 1
    }
    if( target.className === "Completed" ){
        curI = 2
    }
    // 删除
    if( target.className === "del" ){
        // 在众多数据的name中匹配 与 删除一致的信息下标
        var delI = data.findIndex( obj => {
            console.log( target.previousElementSibling.innerHTML )
            return obj.name === target.previousElementSibling.innerHTML;
        } )
        // console.log( delI )
        data.splice( delI , 1 )
    }
    // 复选框
    if( target.type === "checkbox" ){
        // 在众多数据中 查找与当前点击一致的内容 返回下标
        // 根据下标找到 数据对象   对象的flat修改状态
        // var index = data.findIndex(obj => {
        //     return obj.name === target.nextElementSibling.innerHTML
        // })
        // data[index].flag = !data[index].flag;

        // 等价于 find直接找对象
        data.find( obj => {
            return obj.name === target.nextElementSibling.innerHTML
        } ).flag = target.checked;
        console.log( data )
        

        // 注意: 不能使用渲染的数据下标
        // 初始全部数据没问题  但是切换筛选后  下标对应错误

    }
    renderTask( curI )
})

// 5 给输入框绑定键盘事件  判断回车添加任务
$(".taskName").addEventListener("keydown" , e => {
    if( e.keyCode === 13 ){
        // 获取输入框的值
        var task = $(".taskName").value.trim();
        // 判断未输入有效内容
        if( !task ) return alert("请输入有效任务内容")
        // 给数据添加一项任务信息对象
        data.push( {name : task , flag : false} )
        // 将状态初始下标重置 来到全部
        curI = 0;
        // 渲染
        renderTask( curI )
        // 清空任务输入框的值 
        $(".taskName").value = ""
    }
})



// 封装渲染函数
function renderTask( state ){
    // 由于全部 和 完成 和 未完成 都需要渲染
    // 所以 我们根据传递的参数来判断当前的状态是全部 还是 完成 还是未完成
    // 0 全部  1未完成  2已完成  只有0是全部  而1和2都需要筛选数据
    // 1表示 false   2 表示true
    // var curData = state === 0 ? data : data.filter(obj => state === 1 ? !obj.flag : obj.flag);
    var curData = state === 0 ? data : data.filter(obj => {
        return state === 1 ? !obj.flag : obj.flag
    })
    // 根据状态下标 找到选项卡类别 进行高亮
    $(".active") && $(".active").classList.remove("active")
    gets(".tabs span")[state].classList.add("active")
    // console.log( curData )
    // 修改任务数量
    $(".taskCount").innerText = curData.length ;
    // 渲染任务
    $(".taskCon").innerHTML = curData.map(obj => {
        return  `
        <p class="${obj.flag ? 'checked' : ''}">
            <input type="checkbox" ${obj.flag ? 'checked' : ''}>
            <strong>${obj.name}</strong>
            <span class="del">&times;</span>
        </p>
        `
    }).join("")
}


function $(el){
    return document.querySelector(el)
}


function gets(el){
    return [...document.querySelectorAll(el)]
}