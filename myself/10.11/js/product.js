function ProductPage(obj) {
    this.data = obj.data
    this.copyData = [...this.data]
    this.box = this.getEl(obj.box) //整个大盒子
    this.con = this.getEl(obj.con) //商品盒子
    this.page = this.getEl(obj.page)//页码值盒子
    console.log(this)

    this.size = this.$('#pageSize').value//每页的条数
    this.curPage = 1//当前页
    this.curData = this.data.slice((this.curPage - 1) * this.size, this.curPage * this.size)//截取数据
    this.maxPage = Math.ceil(this.data.length / this.size)//根据每页的条数 确定最大页码值


    this.init()//初始化
}

ProductPage.prototype.init = function () {
    // 渲染商品内容
    this.renderCon()
    // 渲染页码值
    this.renderPage()
    // 初始匹配 上下按钮的可用情况
    this.prevnextBtnDisabled()
    // 绑定事件
    this.bindEvent()
}
ProductPage.prototype.bindEvent = function () {
    this.box.addEventListener('click', e => {
        let target = e.target || window.event.srcElement
        if (target.className === 'next') {
            this.curPage++
            this.resetPage()
        }
        if (target.className === 'prev') {
            this.curPage--
            this.resetPage()
        }
        if (target.className === 'first') {
            this.curPage = 1
            this.resetPage()
        }
        if (target.className === 'last') {
            this.curPage = this.maxPage
            this.resetPage()
        }
        if (target.nodeName = "SPAN" && target.parentNode.className === 'page') {
            this.curPage = +target.innerHTML
            this.resetPage()
        }
        if (target.className === 'searchBtn') {
            let val = this.$('.inp').value.trim()
            if (!val) return;
            const resData = this.data.filter(obj => obj.name.includes(val))
            if(resData.length===0){return}
            this.copyData=resData
            this.curPage=1
            this.resetPage()
            this.maxPage=Math.ceil(this.copyData.length/this.size)
            this.renderPage()
        }
        if(target.className==='nameBtn'){
            this.copyData.sort((a,b)=>a.name.localeCompare(b.name))
            this.resetPage()
        }
        if(target.className==='priceBtn'){
            this.copyData.sort((a,b)=>a.price-b.price)
            this.resetPage()
        }
    })
    this.$('#pageSize').addEventListener('change',()=>{
        this.size=this.$('#pageSize').value
        this.curPage=1
        this.resetPage()
        this.maxPage=Math.ceil(this.copyData.length/this.size)
        this.renderPage()
    })
}



ProductPage.prototype.resetPage = function () {
    // 根据获取后的页码值 重
    this.curData = this.copyData.slice((this.curPage - 1) * this.size, this.curPage * this.size)
    this.renderCon()
    this.$('.active', this.page).classList.remove('active')
    this.pages[this.curPage - 1].classList.add('active')
    this.prevnextBtnDisabled()
}

ProductPage.prototype.prevnextBtnDisabled = function () {
    this.$('.prev', this.box).disabled = this.curPage === 1
    this.$('.next', this.box).disabled = this.curPage === this.maxPage
}
ProductPage.prototype.renderPage = function () {
    this.page.innerHTML = ''
    for (let i = 1; i <= this.maxPage; i++) {
        this.page.innerHTML += `<span>${i}</span>`
    }
    this.pages = this.gets('span', this.page)
    this.pages[this.curPage - 1].classList.add('active')
}
ProductPage.prototype.renderCon = function () {
    this.con.innerHTML = this.curData.map(obj =>
        `
        <dl>
        <dt><img src="${obj.src}" alt=""></dt>
            <dd class="name">${obj.name}</dd>
            <dd class="des">${obj.des.map(item => `<span>${item}</span>`).join('')}</dd>
            <dd class="price"><span class='yen'>&yen;</span><span class='money'>${obj.price}</span></dd>
        </dl>
        `
    ).join('')
}








ProductPage.prototype.$ = function (el, parent) {
    parent = parent || document
    return parent.querySelector(el)
}
ProductPage.prototype.gets = function (el, parent) {
    parent = parent || document
    return [...parent.querySelectorAll(el)]
}

ProductPage.prototype.getEl = function (el) {
    if (el.nodeType === 1) { return el }
    else if (typeof el === 'string') { return this.$(el) }
    else { throw new Error('el参数错误 maybe an element or className') }
}


new ProductPage({
    data: createData(100),
    con: '.con',
    box: '.box',
    page: '.page'
})