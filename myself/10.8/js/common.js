function $(el,parent=document){
    return parent.querySelector(el)
}
function gets(el,parent=document){
    return parent.querySelectorAll(el)
}

function fontSize(){
    var clientW=document.documentElement.clientWidth
    var scale=clientW/375
    document.documentElement.style.fontSize=scale*100+'px'
}
fontSize()
window.onresize=fontSize