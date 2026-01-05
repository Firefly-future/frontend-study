class Table extends Base{
    constructor({el,columns,data}){
        super()
        this.el=el
        this.columns=columns
        this.data=data

        this.init()
    }
    init(){
        this.el.innerHTML=`
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
    renderHead(){
        this.$('thead tr',this.el).innerHTML=this.columns.map(item=>{
            return `
            <th>${item.title}</th>
            `
        }).join('')
    }
    renderBody(){
        this.$('tbody',this.el).innerHTML=this.data.map(item=>{
            const tds=this.columns.map(col=>{
                if(col.info){return `<td>${col.info(item)}</td>`}
                else{return `<td>${item[col.dataIndex]}</td>`}
            }).join('')
            return `<tr>${tds}</tr>`
        }).join('')
    }
}