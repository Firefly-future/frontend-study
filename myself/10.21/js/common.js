const $=(el,parent=document)=>parent.querySelector(el)
const $all=(el,parent=document)=>[...parent.querySelectorAll(el)]

const Int=(n)=>{
    if(n>100000000){
        return (n/100000000).toFixed(1)+'亿'
    }
    else if(n>10000){
        return (n/10000).toFixed(1)+'万'
    }
}