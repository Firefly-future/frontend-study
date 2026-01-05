class Pagination extends Base {
    constructor(
        {   el,
            page=1,
            pagesize=10,
            total,
            paginationOptions = [5, 10, 15, 20] ,
            onChange}
    ) {
        super()
        this.el = el
        this.page = page
        this.pagesize = pagesize
        this.total = total
        this.totalPage=Math.ceil(this.total/this.pagesize)
        this.paginationOptions=paginationOptions
        this.onChange=onChange
        this.init()
    }
    init() {
        this.el.innerHTML = `
        <div class='pagination-wrap'>
        <button class='prev'>上一页</button>
        <div class='pages'></div>
        <button class='next'>下一页</button>
        <select>
        ${this.renderSelector()}
        </select>
        <span>共有${this.total}条</span>
        </div>
        `
        this.renderPages()
        this.bindEvent()
    }
    renderSelector() {
        return this.paginationOptions.map(item=>{
            return `<option ${this.pagesize===item?'selected':''} value='${item}'>每页${item}条</option>`
        }).join('')
    }
    renderPages() {
        let inner=''
        for(let i=1;i<=this.totalPage;i++){
            inner+= `<button class='page-btn ${this.page===i?'active':''}' dataId='${i}'>${i}</button>`
        }
        this.$('.pages',this.el).innerHTML=inner
    }
    bindEvent(){
        this.$('.prev',this.el).addEventListener('click',()=>{
            // this.page--
            const page=this.page-1
            this.changePage(page<1?1:page)
            // this.$('.active',this.el).classList.remove('active')
            // if(page<1)this.page=1
            // this.gets('.pages button',this.el)[this.page-1].classList.add('active')
        })
        this.$(".next",this.el).addEventListener('click',()=>{
            // this.page++
            const page=this.page+1
            this.changePage(page>this.totalPage?this.totalPage:page)
            // this.$('.active',this.el).classList.remove('active')
            // if(this.page>this.totalPage)this.page=this.totalPage
            // this.gets('.pages button',this.el)[this.page-1].classList.add('active')
        })
        this.$('select',this.el).addEventListener('change',e=>{
            this.page=1
            this.pagesize=Number(e.target.value)
            this.totalPage=Math.ceil(this.total/this.pagesize)
            this.renderPages()
            this.onChange&&this.onChange(this.page,this.pagesize)
        })
        this.$('.pages',this.el).addEventListener('click',e=>{
            // if(e.target.classList.contains('page-btn')){
            // const id=e.target.getAttribute('dataId')*1
            // this.page=id
            // this.$('.active',this.el).classList.remove('active')
            // this.gets('.pages button',this.el)[this.page-1].classList.add('active')}
            if(e.target.classList.contains('page-btn')){
                this.changePage(e.target.getAttribute('dataId')*1)
            }
        })
    }
    changePage(page){
        this.page=page
        this.$('.active',this.el).classList.remove('active')
        this.gets('.pages button',this.el)[this.page-1].classList.add('active')
        this.onChange&&this.onChange(this.page,this.pagesize)
    }
    updateTotal( total){
        this.total=total
        this.totalPage=Math.ceil(this.total/this.pagesize)
        this.$('span',this.el).innerHTML=`共${this.total}条`
        if(this.page>this.totalPage){
            this.page=this.totalPage
            this.onChange&&this.onChange(this.page,this.pagesize)
        }
        this.renderPages()
    }
}