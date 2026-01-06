

class Pagination extends Base {
  constructor({
    el,
    page = 1,
    pagesize = 10,
    total,
    pagesizeOptions = [5, 10, 15, 20],
    onChange
  }) {
    super()
    this.el = el
    this.page = page
    this.pagesize = pagesize
    this.total = total
    this.totalPage = Math.ceil(this.total / this.pagesize)
    this.pagesizeOptions = pagesizeOptions
    this.onChange = onChange
    this.init()
  }
  init() {
    this.el.innerHTML = `
      <div class="pagination-wrap">
        <button class="prev">上一页</button>
        <div class="pages"></div>
        <button class="next">下一页</button>
        <select>
          ${this.renderSelect()}
        </select>
        <span>共 ${this.total} 条</span>
      </div>
    `
    this.renderBtns()
    this.bindEvent()
  }
  renderSelect() {
    return this.pagesizeOptions.map(item => {
      return `<option ${this.pagesize === item ? 'selected' : ''} value="${item}">每页 ${item} 条</option>`
    }).join('')
  }
  renderBtns() {
    let inner = ''
    for (let i = 1; i <= this.totalPage; i ++) {
      inner += `<button class="page-btn ${this.page === i ? 'active' : ''}" data-page="${i}">${i}</button>`
    }
    this.$('.pages', this.el).innerHTML = inner
  }
  bindEvent() {
    this.$('.prev', this.el).addEventListener('click', () => {
      const page = this.page - 1
      this.changePage(page < 1 ? 1 : page)
    })
    this.$('.next', this.el).addEventListener('click', () => {
      const page = this.page + 1
      this.changePage(page > this.totalPage ? this.totalPage : page)
    })
    this.$('.pages', this.el).addEventListener('click', e => {
      if (e.target.classList.contains('page-btn')) {
        this.changePage(Number(e.target.getAttribute('data-page')))
      }
    })
    this.$('select', this.el).addEventListener('change', e => {
      this.page = 1
      this.pagesize = Number(e.target.value)
      this.totalPage = Math.ceil(this.total / this.pagesize)
      this.renderBtns()
      // 通知分页改变了
      this.onChange && this.onChange(this.page, this.pagesize)
    })
  }
  changePage(page) {
    this.page = page
    this.$('.active', this.el).classList.remove('active')
    this.$all('.pages button')[this.page - 1].classList.add('active')
    // 通知分页改变了
    this.onChange && this.onChange(this.page, this.pagesize)
  }
  updateTotal(total) {
    this.total = total
    // 总条数改变，重新计算总页数
    this.totalPage = Math.ceil(this.total / this.pagesize)
    this.$('span', this.el).innerHTML = `共 ${this.total} 条`
    // 判断当前高亮页数是否超过总页数，超过就更新高亮页数
    if (this.page > this.totalPage) {
      this.page = this.totalPage
      // 通知分页改变了
      this.onChange && this.onChange(this.page, this.pagesize)
    }
    this.renderBtns()
    
  }
}