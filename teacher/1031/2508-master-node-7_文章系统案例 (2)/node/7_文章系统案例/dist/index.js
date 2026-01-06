const $ = el => document.querySelector(el)
const $all = el => [...document.querySelectorAll(el)]

// 当前用户信息
let currentUserInfo = null
// 当前文章列表
let articleList = []
// 当前要编辑的文章信息
let curUpdateActicle = null

async function init() {
  checkAuth()
  $('.loading').classList.remove('hide')
  await getUserInfo()
  await getArticles()
  $('.loading').classList.add('hide')
}
init()


// 退出登陆
$('.logout').addEventListener('click', () => {
  localStorage.removeItem('token')
  location.href = './login.html'
  alert('退出成功')
})

// tab 切换
$all('nav span').forEach((span, index) => {
  span.addEventListener('click', () => {
    $('.active').classList.remove('active')
    span.classList.add('active')
    
    $('.show').classList.remove('show')
    $all('.tab-content')[index].classList.add('show')
  })
})

// 发布文章
$('.publish button').addEventListener('click', () => {
  const title = $('.article-title').value.trim()
  const content = $('.article-content').value.trim()
  createArticle(title, content)
})

// 删除和编辑按钮
$('.list').addEventListener('click', e => {
  const { target } = e
  if (target.classList.contains('del')) {
    // 获取要删除的文章 ID，二次确认提示
    const id = Number(target.getAttribute('data-id'))
    if (window.confirm('确定要删除此文章吗？')) {
      delArticle(id)
    }
  } else if (target.classList.contains('update')) {
    // 获取要编辑的文章 ID，展示弹窗
    const id = Number(target.getAttribute('data-id'))
    showUpdateDialog(id)
  }
})

// 编辑弹窗取消按钮
$('.dialog .cancel').addEventListener('click', () => {
  $('.dialog').classList.remove('show')
  curUpdateActicle = null
  $('.dialog input').value = ''
  $('.dialog textarea').value = ''
})

// 编辑弹窗确定按钮
$('.dialog .confirm').addEventListener('click', () => {
  const params = {
    title: $('.dialog input').value.trim(),
    content: $('.dialog textarea').value.trim()
  }
  updateArticle(params)
})

// 判断是否有token
function checkAuth() {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('登陆信息失效，请重新登陆！')
    location.href = './login.html'
  }
}

// 获取用户信息
async function getUserInfo() {
  try {
    // 把 token 通过请求头传给接口
    const res = await axios.get('/api/user/info', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(res.data)
    if (res.data.code === 200) {
      $('.user span').innerHTML = res.data.info.username
      currentUserInfo = res.data.info
    }
  } catch(e) {
    if (e.status === 401) {
      localStorage.removeItem('token')
      alert('登陆信息失效，请重新登陆！')
      location.href = './login.html'
    }
  }      
}

// 渲染文章列表
function renderArticles(list) {  
  $('.list').innerHTML = list.map(item => {
    let btnsStr = ''
    if (item.authorId === currentUserInfo.uid) {
      btnsStr = `
        <div class="article-action">
          <button class="button primary update" data-id="${item.id}">编辑</button>
          <button class="button danger del" data-id="${item.id}">删除</button>
        </div>
      `
    }
    return `
      <div class="article-card">
        <h3>${item.title}</h3>
        <div class="article-info">
          <span>作者：${item.authorName} </span>
          <span>更新时间：${new Date(item.updateTime).toLocaleString()}</span>
        </div>
        <p>${item.content}</p>
        ${btnsStr}
      </div>
    `
  }).join('')
}

// 获取文章列表
async function getArticles() {
  try {
    const res = await axios.get('/api/article/list', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (res.data.values.length === 0) {
      $('.empty').classList.add('show')
    } else {
      $('.empty').classList.add('hide')
      // 渲染文章列表
      articleList = res.data.values
      renderArticles(res.data.values)
    }
  } catch(e) {
    console.log(e)
  }
}

// 发布文章
async function createArticle(title, content) {
  try {
    const res = await axios.post(
      '/api/article/create',
      {
        title,
        content
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    if (res.data.code === 200) {
      alert('发布成功')
      $all('nav span')[0].click()
      getArticles()
    } else {
      alert(res.data.message)
    }
  } catch(e) {
    console.log(e)
  }
}

// 删除文章
async function delArticle(id) {
  try {
    const res = await axios.post(
      '/api/article/remove',
      {
        id
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    if (res.data.code === 200) {
      alert('删除成功')
      getArticles()
    } else {
      alert(res.data.message)
    }
  } catch(e) {
    console.log(e)
  }
}

// 展示编辑弹窗，反显内容
function showUpdateDialog(id) {
  // 展示弹窗
  $('.dialog').classList.add('show')
  // 根据 id 查找对应的文章数据
  curUpdateActicle = articleList.find(v => v.id === id)
  // 弹窗表单反显内容
  $('.dialog input').value = curUpdateActicle.title
  $('.dialog textarea').value = curUpdateActicle.content
}

// 编辑文章
async function updateArticle({ title, content }) {
  try {
    const res = await axios.put(
      '/api/article/update',
      {
        id: curUpdateActicle.id,
        title,
        content
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    if (res.data.code === 200) {
      alert('更新成功')
      getArticles()
      $('.dialog .cancel').click()
    } else {
      alert(res.data.message)
    }
  } catch(e) {
    console.log(e)
  }
}