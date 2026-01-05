

function ProductPage(obj){
    // 将构建实例时 传递的参数【属性】 挂在各自的实例上
    this.data = obj.data  // 操作的数据
    this.con = this.getEl(obj.con) // 商品大盒子
    this.page = this.getEl(obj.page) , // 页码值盒子
    this.box = this.getEl(obj.box) // 由于操作的元素较多 如页码值 上下页 按钮等  即借助事件委托给父元素
    this.size = obj.size || 15 // 每页条数
    this.curPage = 1 // 当前页
    this.curData = this.data.slice( (this.curPage - 1) * this.size , this.curPage * this.size )  // 根据每页条数 和 当前页码值 截取数据
    this.maxPage = Math.ceil( this.data.length / this.size )  // 根据数据总条数 和 每页条数 求最大页码值
    console.log(this)
    this.init() // 初始化
}


ProductPage.prototype.init = function(){
    this.renderCon()  // 渲染商品内容
    this.renderPage() // 渲染分页页码值
}


ProductPage.prototype.renderCon = function(){
    this.con.innerHTML = this.curData.map(obj => `
    <dl>
        <dt><img src="${obj.src}" alt=""></dt>
        <dd class="name">${obj.name}</dd>
        <dd class="des">${obj.des.map(item => `<span>${item}</span>`).join("")}</dd>
        <dd class="price"><span class="yen">&yen;</span><span class="money">${obj.price}</span></dd>
    </dl>
    `).join("")
}

ProductPage.prototype.renderPage = function(){
    // 按照最大页码值 循环拼接生成页码值
    for( let i = 1 ; i <= this.maxPage ; i++ ){
        this.page.innerHTML += `<span>${i}</span>`
    }
}


ProductPage.prototype.$ = function( el , parent ){
    parent = parent || document;
    return parent.querySelector(el)
}



ProductPage.prototype.gets = function( el , parent ){
    parent = parent || document;
    return [...parent.querySelectorAll(el)]
}

// 获取元素 判断用户构建时传递的参数是元素对象 还是类名
// 若元素直接返回 若类名 通过$返回元素  否不是抛出报错
ProductPage.prototype.getEl = function(el){
    if( el.nodeType === 1 ){
        return el
    }else if( typeof el === "string" ){
        return this.$(el)
    }else{
        throw new Error("el参数不正确,maybe an element or className")
    }
}







new ProductPage({
    data : createData(111) , // 操作的数据
    con : ".con", // 商品大盒子
    page : ".page" , // 页码值盒子
    box : ".box" // 由于操作的元素较多 如页码值 上下页 按钮等  即借助事件委托给父元素
})

// 页码值    每页条数    开始下标    结束下标
//   1           8          0          8
//   2           8          8          16
//   3                      16         24
//   4                      24         32

//   1          10          0           10
//   2          10          10          20

// 开始 = (页码值 - 1) * 条数
// 结束 = 页码值 * 条数