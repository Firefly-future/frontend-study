function $(el,parent=document){
    return parent.querySelector(el)
}
var data=[
    {name:0,nime:'消息1',type:'系统消息',time1:'2021-4-19 12:44:10',time2:'2021-4-19 12:44:10'},
    {name:1,nime:'消息2',type:'活动消息',time1:'2021-4-19 12:44:10',time2:'2021-4-19 12:44:10'},
    {name:2,nime:'消息3',type:'活动消息',time1:'2021-4-19 12:44:10',time2:'2021-4-19 12:44:10'}
]
function DataFn(){
    $('tbody').innerHTML=data.map(function(obj){
        return `
            <tr>
                <td>${obj.name}</td>
                <td>${obj.nime}</td>
                <td>${obj.type}</td>
                <td>${obj.time1}</td>
                <td>${obj.time2}</td>
                <td><button>查看</button></td>
            </tr>
        `
    }).join('')
}
DataFn()

// 给左侧列表绑定点击事件
$('.list').addEventListener('click',function(e){
    var target=e.target||window.event.srcElement
    if(target.nodeName==="LI"){
        
        if(target.innerHTML==='消息列表'){
            $('.active')&&$('.active').classList.remove('active')
            target.classList.add('active')
        }if(target.innerHTML==='发布列表'){
            $('.active')&&$('.active').classList.remove('active')
             target.classList.add('active')
        }
    }
})