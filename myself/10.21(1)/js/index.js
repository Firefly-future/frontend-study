// 点击 进行切换
$all('.nav-item').forEach((item, index) => {
    item.addEventListener('click', () => {
        $('.nav-item.active').classList.remove('active')
        item.classList.add('active')
        $('.tab.show').classList.remove('show')
        $all('.tab')[index].classList.add('show')
        // $('section').classList.remove('show')
    })
})


async function Recommend() {
    try {
        const res = await axios.get(`http://39.96.210.90:5001/top/playlist/highquality`)
        // console.log(res)
        res.data.playlists.sort(() => Math.random() - 0.4)
        const list = res.data.playlists.slice(0, 6)
        // console.log(list)
        $('.recommend').innerHTML = list.map(item => {
            return `
             <div class="recommend-item" data-id="${item.id}">
                    <div style="pointer-events:none">
                        <img src="${item.coverImgUrl}" alt="">
                        <p>${item.name}</p>
                        <div class="bg"><i class='image'></i>${Int(item.playCount)}</div>
                    </div>
                </div> 
            `
        }).join('')
        $('.recommend').addEventListener('click', (e) => {
            if (e.target.classList.contains('recommend-item')) {
                const id = e.target.getAttribute('data-id')
                location.href = `./detail.html?id=${id}`
                // console.log(e.target)
            }
        })
    } catch (e) {
        console.log('请稍后重试')
    }
}
Recommend()


async function Newsong() {
    try {
        const res = await axios.get(`http://39.96.210.90:5001/personalized/newsong`)
        // console.log(res)
        $('.newsong').innerHTML = res.data.result.map((item, index) => {
            const artists = item.song.artists.map(v => v.name).join('/')
            return `
            <div class="newsong-item" data-id="${item.id}">
                    <div style='pointer-events:none'>
                        <div>
                        <div class="name">${item.song.name}</div>
                        <div class="artist"><i class='bg2'></i>${artists}</div>
                        <div class="bg1"></div>
                        </div>
                    </div>
            </div>
            `
        }).join('')
        $all('.newsong-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id')
                location.href = `./player.html?id=${id}`
            })
        })
    } catch (e) {
        console.log('请稍后重试');
    }
}
Newsong()

// 热歌榜
async function hotsong() {
    try {
        const res = await axios.get(`http://39.96.210.90:5001/playlist/detail?id=3778678`)
        // console.log(res)
        const time = new Date(res.data.playlist.updateTime)
        $('.updatetime').innerHTML = `更新日期： ${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`
        // console.log(time)
        $('.hot-song').innerHTML = res.data.playlist.tracks.slice(0, 20).map((item, index) => {
            const artists = item.ar.map(v => v.name).join('/')
            return `
            <div class="hot-item" data-id="${item.id}">
                    <div style="pointer-events: none">
                    <div class="page">${addZero(index + 1)}&nbsp;</div>
                        <div>
                            <div class="name">${item.name}</div>
                            <div class="artist"> <i class='bg2'></i>${artists} - ${item.al.name}</div>
                            <div class="bg1"></div>
                           
                        </div>
                    </div>
            </div>
            `
        }).join('')
        $all('.hot-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id')
                location.href = `./player.html?id=${id}`
            })
        })
    } catch (e) {
        console.log('请稍后重试')
    }
}
hotsong()

// 搜索历史
const historyList = JSON.parse(localStorage.getItem('history')) || []
// 添加历史记录
function addHistory(val) {
    const index = historyList.indexOf(val)
    if (index > -1) {
        historyList.splice(index, 1)
    }
    historyList.unshift(val)
    localStorage.setItem('history', JSON.stringify(historyList))
    renderHistory()
    // console.log(historyList)
}
// 删除历史记录
function removeHistory(val) {
    const index = historyList.indexOf(val)
    historyList.splice(index, 1)
    localStorage.setItem('history', JSON.stringify(historyList))
    renderHistory()
    // console.log(historyList)
}

// 渲染历史记录
function renderHistory() {
    $('.history').innerHTML = historyList.map(val => {
        return ` 
                <div class="history-item"  data-keyword="${val}">
                        <div style="pointer-events: none;" >
                            <span class="loading"></span>
                               <h3>${val}</h3>
                            <span class="close" data-keyword="${val}" ></span>
                        </div>
                </div>
                 `
    }).join('')
}
renderHistory()

// 历史记录点击事件
$('.history').addEventListener('click',e=>{
    if(e.target.classList.contains('history-item')){
        const id=e.target.getAttribute('data-keyword')
        // console.log(id)
        $('.input input').value=id
        showSearch(2)
        getResult(id)
        }
    else if(e.target.classList.contains('close')){
        e.stopPropagation()
        const id=e.target.getAttribute('data-keyword')

        removeHistory(id)
    }
})


// 搜索处
// 根据type数值 进行 搜索 建议 结果的切换
function showSearch(type) {
    $('.search').classList.remove('active')
    if (type === 0) {
        $('.search').classList.add('active')
        $('.close').classList.remove('show')
        $('.advice').classList.remove('active')
        $('.res').classList.remove('active')
    } else if (type === 1) {
        $('.advice').classList.add('active')
        $('.close').classList.add('show')
        $('.search').classList.remove('active')
        $('.res').classList.remove('active')
    } else if (type === 2) {
        $('.res').classList.add('active')
        $('.close').classList.add('show')
        $('.advice').classList.remove('active')
    }
}

// 热门搜索
async function HotSearch() {
    try {
        const res = await axios.get('http://39.96.210.90:5001/search/hot')
        console.log(res)
        $('.search-item').innerHTML = res.data.result.hots.map(item => {
            return `<span data-keyword="${item.first}">${item.first}</span>`
        }).join('')
    } catch (e) {
        console.log('请稍后重试')
    }
}
HotSearch()
// 热门搜索 绑定点击事件
$('.search-item').addEventListener('click', e => {
    // console.log(e.target)
    if (e.target.nodeName === `SPAN`) {
        const id = e.target.getAttribute('data-keyword')
        $('.input input').value = id
        showSearch(2)
        getResult(id)
    }
})
const query = getQuery()
// 搜索建议
async function adviceList(keywords) {
    try {
        const res = await axios.get(`http://39.96.210.90:5001/search/suggest`, {
            params: {
                // id: query.id,
                keywords,
                type: "mobile"
            }
        })
        console.log(res)
        const match = res.data.result.allMatch || []
        $('.suggest-first span').innerHTML = `${keywords}`
        $('.suggest-item').innerHTML = match.map(item => {
            return `
                        <div class="suggest-opts" data-keyword="${item.keyword}">
                            <div style="pointer-events: none;">
                                <span class="loading"></span>
                                <h3>${item.keyword}</h3>
                            </div>
                        </div>
            `
        }).join('')
    } catch (e) {
        console.log('请稍后重试')
    }
}
// 搜索建议绑定点击事件
$('.suggest-item').addEventListener('click', e => {
    if (e.target.classList.contains('suggest-opts')) {
        const id = e.target.getAttribute('data-keyword')
        $('.input input').value = id
        showSearch(2)
        getResult(id)
    }
})

// 点击x
$('.border .close').addEventListener('click', e => {
    showSearch(0)
    $('.input input').value = ''
    $('.input input').focus()
})

// 搜索框
$(".input input").addEventListener('focus', e => {
    // console.log(e.target)
    if (e.target.value) {
        showSearch(1)
        adviceList(e.target.value)
    }
})

// 防抖 连续多次添加只调用最后一次
let timeoutId = null
$('.input input').addEventListener('input', e => {
    if (e.target.value) {
        showSearch(1)
        if (timeoutId) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            adviceList(e.target.value)
        }, 1000)
    } else {
        showSearch(0)
    }
})

// 按下回车展示搜索结果

$('.input input').addEventListener('keydown', e => {
    if (e.target.value && e.keyCode === 13) {

        getResult(e.target.value)
        showSearch(2)
    }
})


let page = 1
let finish = false
async function getResult(keywords) {
    // 判断keywords是否存在 并赋值
    if (keywords) {
        page = 1
        $('.result-item').innerHTML = ''
    } else {
        keywords = $('.input input').value.trim()
    }
    try {
        // 存搜索记录
        addHistory(keywords)
        const res = await axios.get('http://39.96.210.90:5001/cloudsearch', {
            params: {
                keywords,
                limit: 30,
                offset: (page - 1) * 30
            }
        })
        // console.log(res)
        const data = res.data.result.songs
        console.log('当前页：', page, '已加载：', $('.result-item').children.length, '总数：', res.data.result.songCount);
        // console.log(offset,limit)
        // console.log(data)
        $('.result-item').innerHTML += data.map(item => {
            const artists = item.ar.map(v => v.name).join('/')
            // console.log(artists)
            return `
                        <div class="result-opts">
                            <div style="pointer-events: none;">
                                <span class="loading"></span>
                                <div class="name">
                                    <h3>${item.name}</h3>
                                    <div>
                                        <span></span>
                                        <h5>${artists} - W${item.al.name}</h5>
                                    </div>
                                </div>
                                <span class="close"></span>
                            </div>
                        </div>
            `
        }).join('')
        // 判断是否加载完成
        finish = $('.result-item').children.length >= res.data.result.songCount
        console.log(res.data.result.songCount)
        console.log($('.result-item').children.length)
        console.log(page)
    } catch (e) {
        console.log('请稍后重试')
    }
}

// $('main').addEventListener('scroll', e => {
//     // console.log(e)
//     if ($('.res').classList.contains('active')) {
//         // console.log($('.res').classList.contains('show'), document.documentElement.scrollTop, document.documentElement.clientHeight, document.documentElement.scrollHeight)
//         const { scrollTop, clientHeight, scrollHeight } = e.target
//         if ( !finish && scrollTop + clientHeight >= scrollHeight) {
//             console.log('滑到底部了')
//             page++
//             getResult()
//         }
//     }
// })

let scrollTimeout;
$('main').addEventListener('scroll', e => {
    if ($('.res').classList.contains('active')) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const { scrollTop, clientHeight, scrollHeight } = e.target;
            if (!finish && scrollTop + clientHeight >= scrollHeight - 10) {
                console.log('加载下一页');
                page++;
                getResult();
            }
        }, 200);
    }
});