

function ProductPage(obj){
    // 将构建实例时 传递的参数【属性】 挂在各自的实例上
    this.data = obj.data  // 操作的数据
    this.copyData =  [...this.data] // 备份数据
    this.con = this.getEl(obj.con) // 商品大盒子
    this.page = this.getEl(obj.page) , // 页码值盒子
    this.box = this.getEl(obj.box) // 由于操作的元素较多 如页码值 上下页 按钮等  即借助事件委托给父元素
    this.size = this.$("#pageSize").value  // 每页条数
    this.curPage = 1 // 当前页
    this.curData = this.data.slice( (this.curPage - 1) * this.size , this.curPage * this.size )  // 根据每页条数 和 当前页码值 截取数据
    this.maxPage = Math.ceil( this.data.length / this.size )  // 根据数据总条数 和 每页条数 求最大页码值
    console.log(this)
    this.init() // 初始化
}


ProductPage.prototype.init = function(){
    this.renderCon()  // 渲染商品内容
    this.renderPage() // 渲染分页页码值
    this.prevNextBtnDisabled() // 页码值渲染结束 就要初始匹配 上下按钮的可用情况
    this.bindEvent()  // 绑定事件
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
    // 先重置页码值
    this.page.innerHTML = ""
    // 按照最大页码值 循环拼接生成页码值
    for( let i = 1 ; i <= this.maxPage ; i++ ){
        this.page.innerHTML += `<span>${i}</span>`
    }
    // 将渲染好的页码值 挂在实例上
    this.pages = this.gets("span" , this.page);
    // 在众多页码值中 找到当前页码值 添加高亮
    this.pages[this.curPage - 1].classList.add("active")
}


ProductPage.prototype.bindEvent = function(){
    this.box.addEventListener("click" , e => {
        // 获取事件源
        let target = e.target || window.event.srcElement;
        // 下一页
        if( target.className  === "next" ){
            this.curPage++ // 当前页码值++
            this.resetPageCon() // 重新匹配数据 且渲染 排他 判断按钮可用情况
        }
        // 上一页
        if( target.className === "prev" ){
            this.curPage--
            this.resetPageCon()
        }

        // 首页
        if( target.className === "first" ){
            this.curPage = 1
            this.resetPageCon()
        }
        
        // 尾页
        if( target.className === "last" ){
            this.curPage = this.maxPage;
            this.resetPageCon()
        }

        // 点击页码值
        if( target.nodeName === "SPAN" && target.parentNode.className === "page" ){
            this.curPage = +target.innerHTML;
            this.resetPageCon()
        }

        // 搜索
        if( target.className === "searchBtn" ){
            // 获取输入框的值
            let val = this.$(".inp").value.trim();
            // 判断输入框的值 为空 啥也不干
            if( !val ) return ;
            // 在众多数据中筛选匹配 与 输入框的值相关的信息数据
            const resData = this.data.filter(obj => obj.name.includes(val))
            if( resData.length === 0 ) return ;
            this.copyData = resData;
            // 重置页码值   避免下标出界
            this.curPage = 1;
            this.resetPageCon(  ) // 按照搜索后的数据 重新截取 且渲染
            // 重新计算最大页码值 重新渲染页码值
            this.maxPage =  Math.ceil( this.copyData.length / this.size ) 
            this.renderPage()
        }

        // 价格排序
        if( target.className === "priceBtn" ){
            this.copyData.sort( (a,b) => a.price - b.price )
            // console.log(this.copyData)
            this.resetPageCon()
        }

        // 商品名称排序
        if( target.className === "nameBtn" ){
            // 面试题: 给定一组人名，按照名字排序
            // const nameArr = ["白百合","薛之谦","张杰","陈奕迅","周深","李健"];
            // // 结果为: ["白百合","陈奕迅","李健","薛之谦","张杰","周深"]
            // // str.localeCompare(str) 将汉字转成拼音排序
            // nameArr.sort((a,b) => a.localeCompare(b) )

            this.copyData.sort( (a , b) => a.name.localeCompare(b.name) )
            this.resetPageCon()
        }
    })
    // 给下拉列表绑定change事件
    this.$("#pageSize").addEventListener("change", () => {
        // 让每页的条数 赋值为当前选择的条数
        this.size =  this.$("#pageSize").value;
        // console.log( this.size )
        this.curPage = 1
        this.resetPageCon()
        // 重新计算最大页码值 重新渲染页码值
        this.maxPage =  Math.ceil( this.copyData.length / this.size ) 
        this.renderPage()
    })
}

ProductPage.prototype.resetPageCon = function(  ){
    // 判断渲染数据 如果用户传了数据 就按照传入的数据渲染  否则按照全部数据渲染
    // data = data ? data : this.copyData;
    this.curData = this.copyData.slice( (this.curPage - 1) * this.size , this.curPage * this.size ) // 根据修改后的页码值 重新截取数据
    this.renderCon()  // 重新渲染
    this.$(".active",this.page).classList.remove("active")  // 排他 即 把之前高亮的页码值取消
    this.pages[this.curPage - 1].classList.add("active") // 页码值改变 重新匹配高亮
    this.prevNextBtnDisabled()
}

ProductPage.prototype.prevNextBtnDisabled = function(){
    // 边点击边判断 上下是否可以用
    this.$(".prev",this.box).disabled = this.curPage === 1 ;
    this.$(".next",this.next).disabled = this.maxPage === this.curPage ;
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