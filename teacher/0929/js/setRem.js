
function setRem(){
    // 1 获取设备宽
    var clientW =  document.documentElement.clientWidth;
    // 2 计算比例
    var scale = clientW / 375 ;
    // 3 设置根元素的尺寸大小 
    document.documentElement.style.fontSize = scale * 100 + "px"
    // console.log(clientW)
}

setRem()

window.onresize = setRem;