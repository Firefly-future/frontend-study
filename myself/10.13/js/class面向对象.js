class Popup {
    constructor() {
    }
    $(el, parent = document) { return parent.querySelector(el) }
    gets(el, parent = document) { return [...parent.querySelector(el)] }
    createEl(){
        const box=document.createElement('div')
        box.className='tip'
        box.innerHTML=`
        <div>
        
        </div>
        `
    }
    clickFn() {
        document.addEventListener('click', (e) => {
            let target = e.target || window.event.srcElement
            if(target.className==='tit'){

            }
        })
    }
}
const popup = new Popup()
document.addEventListener('click', (e) => {
    let target = e.target || window.event.srcElement

})