

export const $=(el,parent=document)=>parent.querySelector(el)

export const arr=100

export const addZero=n=>n>10?n:'0'+n

export const loadImg=(url,{width}={width:100})=>{
    const img=new Image()
    img.src=url
    img.width=width
    img.onload=()=>{
        document.body.appendChild(img)
    }
}


// 抛出默认

export default[1,2,3]