class Table extends Base {
    constructor({ el, columns, data }) {
        super()
        this.el = el
        this.columns = columns
        this.data = data


        this.init()
    }
    init() {
        this.el.innerHTML = `
        <table>
        <thead>
        <tr></tr>
        </thead>
        <tbody>
        </tbody>
        </table>
        `
        this.renderHead()
        this.renderBody()
    }
    renderHead() {
        this.$('thead tr', this.el).innerHTML = this.columns.map(cols => {
            return `
            <th>${cols.title}</th>
            `
        }).join('')
    }
    renderBody() {
        this.$('tbody', this.el).innerHTML = this.data.map(item => {
            const tds = this.columns.map(col => {
                if (col.getInfo) {
                    return `<td>${col.getInfo(item)}</td>`
                }
                return `<td>${item[col.dataIndex]}</td>`
            }).join('')
            return `<tr>${tds}</tr>`
        }).join('')
    }
    update(data) {
        this.data = data
        this.renderBody()
    }
}