function random(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
var data=[
    {tit:"HTML5",percent:random(0,100)},
    {tit:"CSS3",percent:random(0,100)},
    {tit:"J-QUERY",percent:random(0,100)},
    {tit:" PHP",percent:random(0,100)}
]
console.log(data)
var box1=document.getElementById('box1')
box1.innerHTML=data.map(function(obj){
    return `<li>
    <h4>${obj.tit}</h4>
    <span>${obj.percent}</span>
    </li>`
}).join('')
var str='0123456789abcdefABCDEF'
function Col(str){
    var color='#'
    for(var i=0;i<6;i++){
        var index=random(0,str.length-1)
        color+=str[index]
    }return color
}
// console.log(Col(str))随机颜色
var span=document.getElementsByTagName('span')

for(var i=0;i<span.length;i++){
span[i].style.background= Col(str)
span[i].style.width=random(0,100)*100
}

