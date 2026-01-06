



class Table extends Base {
  constructor({ el, columns, data }) {
    super()
    this.el = el
    this.columns = columns
    this.data = data
    // console.log(columns)
    // console.log(data)
    this.init()
  }
  init() {
    this.el.innerHTML = `
      <table class="table-wrap">
        <thead>
          <tr></tr>
        </thead>
        <tbody></tbody>
      </table>
    `
    this.renderHead()
    this.renderBody()
  }
  renderHead() {
    this.$('thead tr', this.el).innerHTML = this.columns.map(item => {
      return `
        <th>${item.title}</th>
      `
    }).join('')
  }
  renderBody() {
    this.$('tbody', this.el).innerHTML = this.data.map(item => {
      // 有几个表头就生成几个 td
      const tds = this.columns.map(col => {
        if (col.render) {
          return `<td>${col.render(item)}</td>`
        }
        return `<td>${item[col.dataIndex]}</td>`
      }).join('')

      // data有几条数据就生成几行
      return `<tr>${tds}</tr>`
    }).join('')
  }
  update(data) {
    this.data = data
    this.renderBody()
  }
}
