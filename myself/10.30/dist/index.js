const $ = (el, parent = document) => parent.querySelector(el)
const $all = (el, parent = document) => [...parent.querySelectorAll(el)]

// 当前用户信息
let currentUserInfo = null
// 当前文章列表
let articleList = []
// 当前要编辑的文章信息
let curUpdateArticle = null
async function init() {
    checkToken()
    $('.loading').classList.remove('hide')
    await getUserInfo()
    await getArticle()
    $('.loading').classList.add('hide')
}
init()
// 判断是否有token 没有直接退回登录页面
function checkToken() {
    const token = localStorage.getItem('token')
    if (!token) {
        alert('登录失效,请重新登录')
        location.href = './login.html'
    }
}
// checkToken()
// 点击退出登录,清楚token同时回退到登录页面
$('.logout').addEventListener('click', () => {
    localStorage.removeItem('token')
    alert('点击后退出登录')
    location.href = './login.html'
})

// 点击切换高亮同时对应页面显现
$all('nav span').forEach((item, index) => {
    item.addEventListener('click', () => {
        $('.active').classList.remove('active')
        item.classList.add('active')
        $('.show').classList.remove('show')
        $all('.tab-content')[index].classList.add('show')
    })
})

// 发布文章
$('.publish button').addEventListener('click', async () => {
    const title = $('.article-title').value.trim()
    const content = $('.article-content').value.trim()
    try {
        const res = await axios.post('/api/create/article', {
            title,
            content
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        console.log(res.data)
        if (res.data.code === 200) {
            alert('发布成功')
            $('.article-title').value = ''
            $('.article-content').value = ''
            // 切换至文章列表页面
            $all('nav span')[0].click()
            // 发布成功后刷新文章列表
            getArticle()
        } else {
            alert('res.data.message')
        }
    } catch (e) {
        console.log(e)
    }
})

// 获取用户信息
async function getUserInfo() {
    try {
        const res = await axios.get('/api/user/info', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(res)
        if (res.data.code === 200) {
            $('.user span').innerHTML = res.data.info.username
            currentUserInfo = res.data.info
            console.log(currentUserInfo)
        }
    } catch (e) {
        if (e.status === 401) {
            localStorage.removeItem('token')
            alert('登录信息失效，请重新登录')
            location.href = './login.html '
        }
    }
}
// getUserInfo()


// 获取文章列表
async function getArticle() {
    try {
        const res = await axios.get('/api/article/list', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(res)
        if (res.data.values.length === 0) {
            $('.empty').classList.remove('hide')
            // $('.list').innerHTML = ''
        } else {
            articleList = res.data.values   
            $('.empty').classList.add('hide')
        }
        renderArticle(res.data.values)
    } catch (e) {
        console.log(e)
    }
}
// getArticle()


// 渲染文章列表
function renderArticle(list) {
    $('.list').innerHTML = list.map(item => {
        let btnsStr = ''
        if (item.authorId === currentUserInfo.uid) {
            btnsStr = `
            <div class='article-action'>
             <button class='button primary update' data-id=${item.id}>编辑</button>
             <button class='button danger del' data-id=${item.id}>删除</button>
            </div>
            `
        }
        return `
        <div class='article-card'>
        <h3>${item.title}</h3>
        <div class='article-info'>
        <span>作者：${item.authorName}</span>
        <span>更新时间：${item.createTime}</span>
        </div>
        <p>${item.content}</p>
        ${btnsStr}
        </div>
        `
    }).join('')
}


// 绑定点击事件 以及端口 事件委托
$('.list').addEventListener('click', e => {
    const { target } = e
    if (target.classList.contains('del')) {
        const id = Number(target.getAttribute('data-id'))
        if (window.confirm('确定要删除此文章吗？')) {
            delArticle(id)
        }
    }
    if(target.classList.contains('update')){
        const id=Number(target.getAttribute('data-id'))
        updateArticle(id)
    }
})
$('.confirm').addEventListener('click',()=>{
    const title=$('.dialog-content input').value.trim()
    const content=$('.dialog-content textarea').value.trim()
})

// 删除
async function delArticle(id) {
    try {
        const res = await axios.post('/api/remove', {
            id
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (res.data.code === 200) {
            alert('删除成功')

            getArticle()
        } else {
            alert(res.data.message)
        }
    } catch (e) {
        console.log(e)
    }
}

// // 编辑
async function updateArticle({title,content}){
    try{
        const res=await axios.post('/api/update',{
            id:curUpdateArticle.id,
            title,
            content
        },{
            headers:{
                authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.data.code===200){
            getArticle()
        }else{
            alert(res.data.message)
        }
    }catch(e){
        console.log(e)
    }
}