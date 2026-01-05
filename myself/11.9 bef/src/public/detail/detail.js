
import "./detail.scss"
import { $ } from "@/util/util.js"



$('.container').innerHTML=`
    <h1></h1>
    <div class="pic"></div>
`




async function getZomeList() {
    try {
        const res = await getZome()
        console.log(res.data)
        renderData(res.data)
        // $('.goods').innerHTML=res.data.data.items.map(item=>{
        //     return `
        //     <div class="item">
        //         <img src="${item.img}"alt="">
        //         <p>${item.title}</p>
        //         <p>月销量${item.sold}</p>
        //         <p>${item.price}</p>
        //     </div>
        //     `
        // }).join('')
    } catch (e) {
        console.log(e)
    }
}
// 调用综合接口



// 获取销量
async function getNumList() {
    try {
        const res = await getNum()
        console.log(res.data)
        renderData(res.data)
        // $('.goods').innerHTML=res.data.data.items.map(item=>{
        //     return `
        //     <div class="item">
        //         <img src="${item.img}"alt="">
        //         <p>${item.title}</p>
        //         <p>月销量${item.sold}</p>
        //         <p>${item.price}</p>
        //     </div>
        //     `
        // }).join('')
    } catch (e) {
        console.log(e)
    }
}

// 获取上新
async function getNewList() {
    try {
        const res = await getNew()
        console.log(res.data)
        renderData(res.data)
        // $('.goods').innerHTML=res.data.data.items.map(item=>{
        //     return `
        //     <div class="item">
        //         <img src="${item.img}"alt="">
        //         <p>${item.title}</p>
        //         <p>月销量${item.sold}</p>
        //         <p>${item.price}</p>
        //     </div>
        //     `
        // }).join('')
    } catch (e) {
        console.log(e)
    }
}

function renderData(list) {
    $('.goods').innerHTML = list.data.items.map(item => {
        return `
            <div class="item" data-id="${item.item_id}">
               <div style="pointer-events: none;">
                <img src="${item.img}"alt="">
                <p>${item.title}</p>
                <p>月销量${item.sold}</p>
                <p>${item.price}</p>
                </div>
            </div>
            `
    }).join('')
}
