
// 1 模拟数据
var data = [
    "胜利纪念日外交，向世界传递信心和力量",
    "习近平眼中的“好老师” 央视快评",
    "8月份核心CPI继续回升 PPI同比降幅收窄",
    "摇滚乐唱进课堂 特岗教师守望乡村教育",
    "铭记历史 缅怀先烈",
    "互联护苗2025",
    "投身乡村教育事业，“无声”奉献胜有声",
    "为构建人类命运共同体不断注入新动力",
    "2025年服贸会在京启幕 各国客商为何纷至沓来？",
    "戈壁追风、算力新城 活力新疆向绿向新",
    "乌克兰政府大楼7日遭袭，究竟是谁干的？",
    "外资银行“抢滩”消费贷市场 释放何种信号？",
    "多个省份首富今年换人 其中有两位“85后” 什么信号",
    "史上最丑与丑上最薄：iPhone17系列背后的新战事",
    "法国多地发生大规模示威，抗议削减财政支出",
    "王毅同美国务卿鲁比奥通电话：美方言论干涉中国内政",
    "甲骨文“爆裂增长”幕后：OpenAI的5年合同...",
    "三条红线、九大乱象，六部门重拳“整顿”车圈",
    "民警张进军被网友“扒”出来了，而且还有后续"
]

// 2  获取元素
var list = document.getElementById("list"); // 列表
var btn = document.getElementById("btn");  // 搜索按钮
var inp = document.getElementById("inp");  // 输入框
var all = document.getElementById("All");   // 全选

// 3 渲染数据  即 指定操作  map
// 初始化渲染所有数据
renderFn( data )


// 4 点击搜索 进行筛选匹配 filter
btn.onclick = function(){
    // 获取输入框的值  去除前后导空格  空白字符是无效的
    var val = inp.value.trim();
    // 判断未输入
    if( !val ) return alert("请输入有效信息")
    // 再所有数据中 筛选 匹配 与输入框的值 相关的信息
    var resData = data.filter( function(item){
        // 即 再数组每一项中 匹配 是否包含输入框指定的值
        return item.includes(val)
    } )
    console.log( resData )
    // 将搜索匹配的数据 进行渲染页面
    renderFn( resData )
}

// 5 点击全选按钮
all.onclick = function(){
    // 获取list下的所有复选框
    // es5 伪数组转真数组  
        // Array.prototype.slice.call(伪数组)
    var checkbox = list.getElementsByTagName("input");
    checkbox = Array.prototype.slice.call( checkbox );
    // console.log( checkbox )
    // 让list下的每一个复选框的状态 与 当前全选的状态一致
    checkbox.forEach(function(everyBox){
        everyBox.checked = all.checked
    })
}




// 封装渲染函数
function renderFn( data ){
    list.innerHTML = data.map(function(item){
        return '<li><input type="checkbox">' + item + '</li>'
    }).join("")


    // 注意:先渲染  后获取  再操作
    // 获取列表下的所有的input
    var checkbox = list.getElementsByTagName("input");
    checkbox = Array.prototype.slice.call( checkbox );
    // 给每一个input绑定点击事件
    checkbox.forEach(function(everyBox){
        everyBox.onclick = function(){
            // 全选的状态结果 取决于 列表下的所有input的状态 全真为真 一假为假
            all.checked = checkbox.every(function(box){
                return box.checked
            })
        }
    })
}