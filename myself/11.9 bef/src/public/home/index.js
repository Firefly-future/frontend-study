import "./index.scss"
import "../img/icon-商品列表展示.png"
import "../img/上箭头.png"
import "../img/上箭头 (1).png"
import "../img/下箭头.png"
import "../img/下箭头 (1).png"
import "../img/四宫格.png"
// import "../detail/detail.js"
import { $, $all } from "@/util/util.js"

import { getZome, getNum, getNew } from "@/serve/serve.js"

// 点击切换高亮事件
$all('nav ul li').forEach(item => {
    item.addEventListener('click', () => {
        $all('nav ul li').forEach(item => {
            item.classList.remove('active')
        })
        item.classList.add('active')
    })
})

$('.zome').addEventListener('click', () => {
    getZomeList()
})
$('.num').addEventListener('click', () => {
    getNumList()
})
$('.new').addEventListener('click', () => {
    getNewList()
})

$('.inp').addEventListener('focus', () => {
    $('.container1').classList.add('show')
})


$('.goods').addEventListener('click',e=>{
    const {target}=e
    // console.log(target)
    if(target.classList.contains('item')){
        const id=target.getAttribute('data-id')
        // console.log(id)
        location.href=`../detail/detail.html?id=${id}`
    }
})


// getZomeList()
// getNumList()
getNewList()

// 获取综合
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

