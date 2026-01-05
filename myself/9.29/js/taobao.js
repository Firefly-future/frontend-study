function fontSize(){
    var clientW=document.documentElement.clientWidth
    // 获取设备宽度
    var scale=clientW/375
    // 获取缩放比例
    document.documentElement.style.fontSize=scale*100+'px'
    // 将文本字体大小进行1:100缩放
}
fontSize()
window.onresize=fontSize