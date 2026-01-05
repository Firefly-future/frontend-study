
function Change(type){
    $('.search.show').classList.remove('show')
    if(type===0){
        $('.search').classList.add('show')
        $('.border .pic2').classList.remove('show')
    }
    if(type===1){
        $('.suggest').classList.add('show')
        $('.border .pic2').classList.add('show')
    }
    if(type===2){
        $('.res').classList.add('show')
        $('.border .pic2').classList.add('show')
    }
}

// 渲染热门搜索
async function hotSearch(){
    try{
        const res=await axios.get('http://39.96.210.90:5001/search/hot')
        console.log(res)
        $('.search-hot').innerHTML=res.data.result.hots.map(item=>{
            return `
            <li data-id="${item.first}">${item.first}</li>
            `
        }).join('')
    }catch(e){
       console.log('请稍后重试') 
    }
}
hotSearch()

// 搜索框中有值后切换至建议页面 按下回车后切换到结果页面
// 聚焦事件
$('inp')
function tab(){
    if($('.inp').value){
        Change(1)
    }else(
        Change(0)
    )
}
tab()