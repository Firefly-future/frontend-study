const $ = el => document.querySelector(el)
const $all = el => [...document.querySelectorAll(el)]


let currentUserInfo = null

async function init() {
  checkAuth()
  await getUserInfo()
  await getArticles()
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
        <div class="acticle-action">
          <button>编辑</button>
          <button>删除</button>
        </div>
      `
    }

    return `
      <div class="acticle-card">
        <h3>${item.title}</h3>
        <div class="acticle-info">
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
