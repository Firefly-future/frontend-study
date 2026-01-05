async function getList () {
  const res = await axios.get('/api/user/list?page=1&pagesize=5')
  console.log(res.data.values)
  document.querySelector('tbody').innerHTML = res.data.values.map(item => {
    return `
      <tr>
        <td>${item.index}</td>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.address}</td>
        <td>${item.email}</td>
        <td>
          <button class="update" data-id="${item.id}">编辑</button>
          <button class="del" data-id="${item.id}">删除</button>
        </td>
      </tr>
    `
  }).join('')
}
getList()

document.querySelector('.create').addEventListener('click', async () => {
  // const res = await axios.post('/api/create', 'name=王小明&age=23')

  const res = await axios.post('/api/create', {
    name: '王小明' + Math.random(),
    age: 22,
    gender: 1,
    address: '北京市'
  })
  console.log(res.data)
  if (res.data.code === 200) {
    getList()
  }
  
})

document.querySelector('table').addEventListener('click', async e => {
  if (e.target.classList.contains('del')) {
    const id = e.target.getAttribute('data-id')
    const res = await axios.post('/api/user/remove', {
      id
    })
    console.log(res.data)
    if (res.data.code === 200) {
      alert('删除成功')
      getList()
    } else {
      alert(res.data.msg)
    }
  } else if (e.target.classList.contains('update')) {
    const id = e.target.getAttribute('data-id')
    const res = await axios.post('/api/user/update', {
      id,
      age: Math.floor(Math.random() * 100),
      name: '小明' + Math.floor(Math.random() * 100)
    })
    console.log(res.data)
    if (res.data.code === 200) {
      alert('修改成功')
      getList()
    } else {
      alert(res.data.msg)
    }
  }
})