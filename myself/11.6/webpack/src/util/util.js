export const $=(el,parent=document)=>parent.querySelector(el)

export const $all=(el,parent=document)=>[...parent.querySelectorAll(el)]


export const Int=(n)=>{
    if(n>100000000){
        return (n/100000000).toFixed(1)+'亿'
    }
    else if(n>10000){
        return (n/10000).toFixed(1)+'万'
    }else{
        return n
    }
}

export const addZero=(n)=>{
    return n<10? '0'+n:n
}

export const getQuery=()=>{
    return location.search.slice(1).split('&').reduce((prev,item)=>{
        const [key,val]=item.split('=')
        prev[key]=decodeURIComponent(val)
        return prev
    },{})
}


export const formatDuration=second=>{
    const m=addZero(Math.floor(second/60))
    const s=addZero(Math.floor(second%60))
    return `${m}:${s}`
}

export const formatLyricTime=timeStr=>{
    const [m,s]=timeStr?timeStr.split(':'):[]
    return m * 60 + +s
}