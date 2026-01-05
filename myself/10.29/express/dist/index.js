document.body.style.backgroundColor = '#9680dcff'

async function getList() {
    const res = await axios.get('/api/user/list?page=1&pagesize=10')
    console.log(res.data.values)
    document.querySelector('tbody').innerHTML = res.data.values.map(item => {
        return `
    <tr>
        <td>${item.id}</td>
        <td>${item.email}</td>
        <td>${item.address}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
        <td>${item.cname}</td>
        <td>
        <button class='edit' data-id=${item.id}>编辑</button>
        <button class='del' data-id=${item.id}>删除</button>
        </td>
    </tr>
    `
    }).join('')
}
getList()


document.querySelector('.create').addEventListener('click', async () => {
    const res = await axios.post('/api/create', {
        id: Date.now() + '1',
        email: 15616 + '@qq.com',
        address: '北京市海淀区',
        date: Date.now() * 1+'',
        time: Date.now()+'',
        cname: '小白'
    })
    console.log(res.data)
    if (res.data.code === 200) {
        getList()
    }
})

document.querySelector('table').addEventListener('click',async e=>{
    if(e.target.classList.contains('del')){
        const id=e.target.getAttribute('data-id')
        const res=await axios.post('/api/remove',{
            id
        })
        console.log(res.data)
        if(res.data.code===200){
            alert('删除成功')
            getList()
        }else{
            alert(res.data.message)
        }
    }
    if(e.target.classList.contains('edit')){
        const id=e.target.getAttribute('data-id')
        const res=await axios.post('/api/edit',{
            id,
            cname:'小蝶'+Math.floor(Math.random()*100)
        })
        console.log(res.data)
        if(res.data.code===200){
            alert('更新成功')
            getList()
        }else{
            alert(res.data.message)
        }
    }
})
