const $ = el => document.querySelector(el)
const $all = el => [...document.querySelectorAll(el)]

let currentUserInfo=null

checkToken()
// 退出按钮
$('.logout').addEventListener('click', () => {
    localStorage.removeItem('token')
    location.href = './login.html'
})

//判断是否有token  没有直接回退到登录页面
function checkToken() {
    if (!localStorage.getItem('token')) {
        alert('登录信息失效，请重新登录')
        location.href = './login.html'
    }
}

// 点击切换高亮
$all('nav .tab-content').forEach((item, index) => {
    item.addEventListener('click', () => {
        $('.active').classList.remove('active')
        item.classList.add('active')

        $('.show').classList.remove('show')
        $all('.tab')[index].classList.add('show')
    })
})

// 获取用户信息
async function getUserInfo(){
    try{
        // 将 token 通过请求头传给后端
        const res=await axios.get('/api/user/info',{
            headers:{
                authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(res)
        if(res.data.code===200){
            $('.user span').innerHTML=res.data.info.username
            currentUserInfo=res.data.info
        }
    }catch(e){
        if(res.data.code===401){
            localStorage.removeItem('token')
            alert('登录信息失效，请重新登录')
            location.href='./login.html'
        }
    }
}


// 发布文章
$('.publish button').addEventListener('click',()=>{
    const title=$('.publish .title').value.trim()
    const content=$('textarea').value.trim()
    createArticle()
})
// 创建文章
async function createArticle(title,content){
    try{
        const res=await axios.post('/api/create',{
            title,
            content
        },{
            headers:{
                authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.data===200){
            alert('发布成功')
            $all('.tab-content')[0].click()
            getArticle()
        }else{
            alert(res.data.message)
        }
    }catch(e){
        console.log(e)
    }
}

// 获取文章列表

async function getArticle(){
    try{
        const res=await axios.get('/api/article/list',{
            headers:{
                authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        renderArticle()
    }catch(e){
        console.log(e)
    }
}

// 渲染文章列表
function renderArticle(list){
    $('.list').innerHTML=list.map(item=>{
        let btnsStr=''
        if(item.authorId===currentUserInfo.uid){
            btnsStr=`
            <div class="article-action">
            <button>编辑</button>
            <button>删除</button>
            </div>
            `
        }
        return `
        <div class='article-card'>
        <h3>${item.title}</h3>
        <div class="article-info">
        <span>作者:${item.authorName}</span>
        <span>更新时间:${new Date(item.updateTime).toLocaleString()}</span>
        </div>
        <p>${item.content}</p>
        ${btnsStr}
        `
    }).join('')
}