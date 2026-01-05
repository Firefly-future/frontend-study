// 面向对象三步
// 1构造函数模式
function Swiper(obj) {
    // 获取轮播大盒子
    this.el = this.getEl(obj.el);
    // 初始化高亮的下标
    this.activeIndex = obj.defaultIndex || 0;
    // 获取分页器盒子 
    this.tabs = this.$('.swiper-pagination', this.el)
    // 获取所有图片
    this.pics = this.gets('.swiper-slide', this.el)
    // 获取上下按钮
    this.prev = this.$('.swiper-button-prev', this.el)
    this.next = this.$('.swiper-button-next', this.el)

    this.autoplay=obj.autoplay||false
    this.wait=obj.wait||3000
    this.speed=obj.speed||1500
    this.init()
}

// 2.原型模式

Swiper.prototype.init = function () {
    this.tabs && this.setPagination()
    this.prev && this.bindEvent()
    this.autoplay&&this.autoplayFn()
}

Swiper.prototype.autoplayFn=function(){
    this.timer=setInterval(this.nextImg.bind(this),this.wait)
    this.el.addEventListener('mouseover',()=>clearInterval(this.timer))
    this.el.addEventListener('mouseout',()=>this.timer=setInterval(this.nextImg.bind(this),this.wait))
}

Swiper.prototype.bindEvent = function () {
    this.prev.addEventListener('click', () => {
        let i = this.activeIndex - 1
        if (i < 0) i = this.pics.length - 1
        this.changeTabLight(i)
    })
    this.next.addEventListener('click', this.nextImg.bind(this))
}
Swiper.prototype.nextImg=function(){
        let i = this.activeIndex + 1
        if (i > this.pics.length - 1) i = 0
        this.changeTabLight(i)
}
Swiper.prototype.setPagination = function () {
    // 更具图片数量添加分页器数量
    this.tabs.innerHTML = this.pics.map(item => `<span></span>`).join('')
    this.span = this.gets('span', this.tabs)
    this.span[this.activeIndex].classList.add('active')
    this.clickSpan()
}
Swiper.prototype.clickSpan = function () {
    this.span.forEach((item, i) => {
        item.addEventListener('click', () => {
            this.changeTabLight(i)
        })
    })
}
Swiper.prototype.changeTabLight = function (i) {
    this.pics[this.activeIndex].classList.remove('opacity')
    this.span && this.span[this.activeIndex].classList.remove('active')
    this.activeIndex = i
    this.pics[this.activeIndex].classList.add('opacity')
    this.pics[this.activeIndex].style.transition=`${this.speed}ms linear`
    this.span && this.span[this.activeIndex].classList.add('active')
}

// 获取元素
Swiper.prototype.$ = function (el, parent) {
    parent = parent || document
    return parent.querySelector(el)
}
Swiper.prototype.gets = function (el, parent) {
    parent = parent || document
    return [...parent.querySelectorAll(el)]
}
// 检测获取的元素 元素直接返回 ，类名获取元素 其它扔出错误
Swiper.prototype.getEl = function (el) {
    if (el.nodeType === 1) {
        return el
    } else if (typeof el === 'string') {
        return this.$(el)
    } else {
        throw new Error('el参数不正确,maybe an  element or className')
    }
}