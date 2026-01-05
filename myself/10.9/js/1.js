// 面向对象 三步走
// 1构造函数模式
function Tabs(obj) {
    // 将不确定的基础属性填写在构造的函数 对应的实例上
    this.data = obj.data
    this.navEl = obj.navEl
    this.mainEl = obj.mainEl
    // 初始化高亮的下标
    this.curI = obj.curI || 0
    // 初始化页面
    this.init()
}
// 2原型模式（共享）
Tabs.prototype.init = function () {
    this.render()
    this.bindEvent()
}
Tabs.prototype.render = function () {
    let navStr = ''
    this.mainEl.innerHTML = this.data.map((obj, index) => {
        navStr += `<span class='${this.curI === index ? "active" : ""}'>${obj.tit}</span>`
        return `
        <section class="${this.curI === index ? 'show' : ''}">
        <ul>
        ${obj.con.map((item, index) => `<li><span>${index + 1}</span>${item}</li>`).join('')}
        </ul>
        </section>
        `
    }).join('')
    this.navEl.innerHTML = navStr;
    this.tits = [...this.navEl.children]
    this.cons = [...this.mainEl.children]
}
Tabs.prototype.bindEvent = function () {
    this.tits.forEach((tit, index) => {
        tit.addEventListener('click', () => {
            this.curI = index
            this.changeTab()
        })
    })
}
Tabs.prototype.changeTab = function () {
    const active = this.navEl.querySelector('.active')
    const show = this.mainEl.querySelector('.show')
    active.classList.remove('active')
    show.classList.remove('show')

    this.tits[this.curI].classList.add('active')
    this.cons[this.curI].classList.add('show')
}

const sinaTab = new Tabs({
    data,
    navEl: document.querySelector('nav'),
    mainEl: document.querySelector('main')
})