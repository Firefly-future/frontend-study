// 面向对象三步
// 1 构造函数模式 给不确定的实例添加信息
function Swiper(obj) {
    // 轮播大盒子
    this.el = this.getEl(obj.el);
    // 初始化高亮的下标
    this.activeIndex = obj.defaultIndex || 0;
    this.autoplay = obj.autoplay || false
    this.wait = obj.wait || 3000
    this.speed = obj.speed || 1500

    // 获取分页器盒子 决定是否按照图片个数生成分页器
    this.tabs = this.$('.swiper-pagination', this.el)
    // 获取所有的图片
    this.pics = this.gets('.swiper-slide', this.el)
    // 获取上下按钮
    this.prev = this.$('.swiper-button-prev', this.el)
    this.next = this.$('.swiper-button-next', this.el)
    // 根据指定的下标 初始化图片展示页面
    this.pics[this.activeIndex].classList.add('opacity')

    // 初始化 表示页面加载完毕后 需要具备哪些功能
    // 如是否需要分页器？是否自动轮播？上下按钮的点击等
    this.init()
}
// 2.原型模式 主打共享 提供方法  写所有功能
Swiper.prototype.init = function () {
    // 是否按照图片个数生成分页器
    this.tabs && this.setPagination()
    // 给上下按钮绑定点击事件
    this.prev && this.bindEvent()
    // 是否自动轮播
    this.autoplay && this.autoplayFn()
}

Swiper.prototype.autoplayFn = function () {
    this.timer = setInterval(this.nextImg.bind(this), this.wait)
    this.el.addEventListener('mouseover', () => clearInterval(this.timer))
    this.el.addEventListener('mouseout', () => this.timer = setInterval(this.nextImg.bind(this), this.wait))
}

//给上下按钮设置绑定点击事件
Swiper.prototype.bindEvent = function () {
    this.prev.addEventListener('click', () => {
        let i = this.activeIndex - 1
        if (i < 0) i = this.pics.length - 1
        this.changeTabLight(i)
    })
    this.next.addEventListener('click', this.nextImg.bind(this))
}
Swiper.prototype.nextImg = function () {
    let i = this.activeIndex + 1
    if (i > this.pics.length - 1) i = 0;
    this.changeTabLight(i)
}
// 设置分页器
Swiper.prototype.setPagination = function () {
    this.tabs.innerHTML = this.pics.map(item => `<span></span>`).join('')
    this.span = this.gets('span', this.tabs)
    this.span[this.activeIndex].classList.add('active')
    this.clickSpan()
}
// 设置点击分页器
Swiper.prototype.clickSpan = function () {
    this.span.forEach((span, i) => {
        span.addEventListener('click', () => {
            this.changeTabLight(i)
        })
    })
}
// 设置排他
Swiper.prototype.changeTabLight = function (i) {
    this.pics[this.activeIndex].classList.remove('opacity')
    this.span && this.span[this.activeIndex].classList.remove('active')
    this.activeIndex = i;
    this.pics[this.activeIndex].classList.add('opacity')
    this.pics[this.activeIndex].style.transition = `${this.speed}ms linear`
    this.span && this.span[this.activeIndex].classList.add('active')
}




Swiper.prototype.$ = function (el, parent) {
    parent = parent || document
    return parent.querySelector(el)
}
Swiper.prototype.gets = function (el, parent) {
    parent = parent || document
    return [...parent.querySelectorAll(el)]
}

// 获取元素 判断用户构建时 传递的参数 是元素对象还是类名
// 元素 直接返回  类名通过$(el)返回元素  否则抛出报错
Swiper.prototype.getEl = function (el) {
    if (el.nodeType === 1) {
        return el
    } else if (typeof el === 'string') {
        return this.$(el)
    } else {
        throw new Error('el参数不正确,maybe an element or className')
    }
}