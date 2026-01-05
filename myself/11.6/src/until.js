




export const arr=[1,23,4]

export const addZero=n=>n>=10?n:'0'+n

export default ['adwadddddawddssssvvvvfrwhttopokoy']

export const loadImg=(url,{width}={width:100})=>{
    const img=new Image()
    img.src=url
    img.width=width
    img.onload=()=>{
        document.body.appendChild(img)
    }
}


