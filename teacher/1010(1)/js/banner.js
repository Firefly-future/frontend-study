

// 1 构造函数 即 实例属性
// 写的是各自实例的基本信息 如 操作哪个元素  是否自动轮播  多久切换一次  淡入淡出动画执行多久等
function Swiper( obj ){
    this.el = this.getEl( obj.el ); // 轮播的大盒子
    this.activeIndex = obj.defaultIndex || 0; // 初始高亮下标
    this.autoplay = obj.autoplay || false ; // 是否自动轮播
    this.wait = obj.wait || 3000 ; // 切换的时间
    this.speed = obj.speed || 1500 ; // 动画时间

    // 获取分页器盒子 决定是否按照图片个数生成分页器
    this.tabs = this.$(".swiper-pagination" , this.el);
    // 获取所有的图片
    this.pics = this.gets( ".swiper-slide" , this.el ) ; 
    // 获取上下按钮
    this.prev = this.$(".swiper-button-prev" , this.el)
    this.next = this.$(".swiper-button-next" , this.el)
    // 根据指定的下标 初始化图片展示页面
    this.pics[this.activeIndex].classList.add("opacity")
    



    // 初始化 表示页面加载完毕后 需要具备哪些功能  如是否需要分页器？ 是否自动轮播？ 上下按钮点击等？
    this.init()
    console.log(this)
}




// 2 原型对象 即 实例方法
// 主打共享  写的是所有功能  如自动轮播 点击事件等

Swiper.prototype.init = function(){
    // 是否按照图片个数生成分页器
    this.tabs && this.setPagination()
    // 给上下按钮绑定点击事件
    this.prev && this.bindEvent()
    // 是否自动轮播
    this.autoplay && this.autoplayFn()
}

// 自动轮播  相当于 按照指定的间隔时间  执行点击下一张
Swiper.prototype.autoplayFn = function(){
    // this -> 将window 指向实例
    this.timer = setInterval(this.nextImg.bind(this) , this.wait )
    this.el.addEventListener("mouseover" , () => clearInterval(this.timer))
    this.el.addEventListener("mouseout" , () => this.timer = setInterval(this.nextImg.bind(this) , this.wait ))
}

// 上下按钮绑定事件
Swiper.prototype.bindEvent = function(){
    this.prev.addEventListener("click" , () => {
        // 存储当前下标
        let i = this.activeIndex - 1;
        // 判断已经是第一张 从最后一张开始
        if( i < 0 ) i = this.pics.length - 1;
        this.changeTabLight(i)

        // 是否可以写成以下代码？？？  能不能生效取决于 以下的排他是下标排他 还是 获取高亮元素取消排他
        // this.changeTabLight( --this.activeIndex )
    })
    //                                    this -> 将事件源 指向实例
    this.next.addEventListener("click" , this.nextImg.bind(this))
}

// 下一张
Swiper.prototype.nextImg = function(){
    let i = this.activeIndex + 1;
    if( i > this.pics.length - 1 ) i = 0;
    this.changeTabLight(i)
}


// 设置分页器
Swiper.prototype.setPagination = function(){
    // 设置分页器 根据指定的初始下标 添加高亮
    // this.tabs.innerHTML = this.pics.map( (item,index) => `<span class="${index === this.activeIndex ? 'active' : ''}"></span>` ).join("")

    // 设置分页器 
    this.tabs.innerHTML = this.pics.map( item => `<span></span>` ).join("")
    // 将渲染的分页页器 进行获取挂在各自的实例上
    this.span = this.gets("span" , this.tabs);
    // 根据指定的初始下标 添加高亮
    this.span[this.activeIndex].classList.add("active")
    // 设置分页器点击
    this.clickSpan()
}
// this  执行上下文的环境对象 -> 谁调用 指向谁
//       如何确定this指向
//           1 是否是箭头函数 -> 箭头没有this[不能修改] 查看父级挂靠的环境对象
//           2 是否修改了this -> 写谁是谁[call , apply , bind]
//           3 谁调用 指向谁

Swiper.prototype.clickSpan = function(){
    this.span.forEach( (span,i) => {
        span.addEventListener("click" , () => {
            // 排他函数
            this.changeTabLight(i)
        })
    } )
}


Swiper.prototype.changeTabLight = function(i){
    this.pics[this.activeIndex].classList.remove("opacity");
    this.span && this.span[this.activeIndex].classList.remove("active")
    // this.$(".opacity",this.el).classList.remove("opacity")
    // this.$(".active",this.el).classList.remove("active")
    // 让下标修改为当前
    this.activeIndex = i;
    // 根据下标找到当前元素进行添加
    this.pics[this.activeIndex].classList.add("opacity");
    this.pics[this.activeIndex].style.transition = `${this.speed}ms linear`
    this.span && this.span[this.activeIndex].classList.add("active")
}



Swiper.prototype.$ = function( el , parent ){
    parent = parent || document;
    return parent.querySelector(el)
}



Swiper.prototype.gets = function( el , parent ){
    parent = parent || document;
    return [...parent.querySelectorAll(el)]
}

// 获取元素 判断用户构建时传递的参数是元素对象 还是类名
// 若元素直接返回 若类名 通过$返回元素  否不是抛出报错
Swiper.prototype.getEl = function(el){
    if( el.nodeType === 1 ){
        return el
    }else if( typeof el === "string" ){
        return this.$(el)
    }else{
        throw new Error("el参数不正确,maybe an element or className")
    }
}


