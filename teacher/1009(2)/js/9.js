// 面向对象三步走
// 1 构造函数模式  将不确定的基本信息(属性) 写在构造函数上
function Tabs( obj ){
    // 将传递的基本信息 分别挂在各自的实例上 this
    this.data = obj.data
    this.navEl = obj.navEl
    this.mainEl = obj.mainEl;
    this.curI = obj.curI || 0;  // 初始化高亮的下标
    // 是否自动切换
    this.autoTab = obj.tab || false ; 
    this.eventType = obj.type || "click",
    // 初始化页面 
    this.init()
}



// 2 原型模式 [主打共享] 该方法给实例准备
// 初始化
Tabs.prototype.init = function(){
    // 渲染
    this.render()
    // 绑定事件
    this.bindEvent()
    // 是否自动切换
    this.autoTab && this.autoTabFn()
}

Tabs.prototype.render = function(){
    // 渲染主体内容 顺带把标题分类拼接好
    let navStr = "";
    this.mainEl.innerHTML = this.data.map((obj,ind) => {
        navStr += `<span class="${this.curI === ind ? 'active' : ''}">${obj.tit}</span>`
        return `
                <section class="${this.curI === ind ? 'show' : ''}">
                    <ul>
                        ${obj.con.map((item,index) => `<li><span>${index + 1}.</span>${item}</li>`).join("")}
                    </ul>
                </section>
    `
    }).join("")

    this.navEl.innerHTML = navStr;
    // 渲染结束  将类别span  和  内容section 进行获取 挂在各自的实例上
    this.tits = [...this.navEl.children];
    this.cons = [...this.mainEl.children];
    // console.log( this )
}

Tabs.prototype.bindEvent = function(){
    this.tits.forEach((tit , index) => {
        tit.addEventListener(this.eventType , () => {
            // 修改初始化的下标为当前点击的
            this.curI = index
            // 排他
            this.changeTab()
        })
    })
}

Tabs.prototype.changeTab =  function(){
    const active = this.navEl.querySelector(".active");
    const show = this.mainEl.querySelector(".show");
    active.classList.remove("active")
    show.classList.remove("show")

    this.tits[this.curI].classList.add("active")
    this.cons[this.curI].classList.add("show")
}

Tabs.prototype.autoTabFn = function(){
    // 开启定时器
    setInterval(() => {
        // 初始化下标++
        this.curI++
        // 判断已经是最后一页  从0开始
        if( this.curI > this.tits.length - 1 ) this.curI = 0;
        console.log( this.curI )
        this.changeTab()
    } , 3000 )
}






