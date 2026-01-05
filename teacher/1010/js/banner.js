

// 1 构造函数 即 实例属性
// 写的是各自实例的基本信息 如 操作哪个元素  是否自动轮播  多久切换一次  淡入淡出动画执行多久等
function Swiper( obj ){
    this.el = this.getEl( obj.el ); // 轮播的大盒子
    this.activeIndex = obj.defaultIndex || 0; // 初始高亮下标

    // 获取分页器盒子 决定是否按照图片个数生成分页器
    this.tabs = this.$(".swiper-pagination" , this.el);
    // 获取所有的图片
    this.pics = this.gets( ".swiper-slide" , this.el ) ; //所有图片


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
}

// 设置分页器
Swiper.prototype.setPagination = function(){
    this.tabs.innerHTML = this.pics.map( (item,index) => `<span class="${index === this.activeIndex ? 'active' : ''}"></span>` ).join("")
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


