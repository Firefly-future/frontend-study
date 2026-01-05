// tab 切换
$all('.nav-item').forEach((item, index) => {
  item.addEventListener('click', () => {
    $('.nav-item.active').classList.remove('active')
    item.classList.add('active')
    $('.tab-content.show').classList.remove('show')
    $all('.tab-content')[index].classList.add('show')
  })
})


// 推荐音乐
async function playlist() {
  try {
    const res = await axios.get('http://39.96.210.90:5001/top/playlist/highquality')
    res.data.playlists.sort(() => Math.random() - 0.4)
    const list = res.data.playlists.slice(0, 6)
    $('.recommend-song').innerHTML = list.map(item => {
      return `
        <div class="recommend-item" data-id="${item.id}">
          <div style="pointer-events: none">
            <img src="${item.coverImgUrl}" />
            <p>${item.name}</p>
            <div class="play-count">${formatPlayCount(item.playCount)}</div>
          </div>
        </div>
      `
    }).join('')
    $('.recommend-song').addEventListener('click', e => {
      if (e.target.classList.contains('recommend-item')) {
        const id = e.target.getAttribute('data-id')
        location.href = `./detail.html?id=${id}`
      }
    })
  } catch(e) {
    console.log('请求失败，请稍后重试！')
  }
}
playlist()

// 最新音乐
async function getNewSong() {
  try {
    const res = await axios.get('http://39.96.210.90:5001/personalized/newsong')
    $('.newsong').innerHTML = res.data.result.map(item => {
      const artists = item.song.artists.map(v => v.name).join('/')
      return `
        <div class="song" data-id="${item.id}">
          <div class="song-info">
            <div class="song-name">${item.name}</div>
            <div class="song-desc">
              ${artists} - ${item.song.album.name}
            </div>
          </div>
          <div class="play-icon"></div>
        </div>
      `
    }).join('')
    $all('.newsong .song').forEach(item => {
      item.addEventListener('click', e => {
        console.log('触发事件的元素', e.target)
        console.log('绑定事件的元素', e.currentTarget)
        const id = e.currentTarget.getAttribute('data-id')
        location.href = `./player.html?id=${id}`
      })
    })
  } catch(e) {
    console.log('请求失败，请稍后重试！')
  }
}
getNewSong()

// 热歌榜
async function getHotList() {
  try {
    const res = await axios.get('http://39.96.210.90:5001/playlist/detail?id=3778678')
    const time = new Date(res.data.playlist.updateTime)
    $('.update-time').innerHTML = `更新日期：${time.getMonth() + 1}月${time.getDate()}日`
    const hot = res.data.playlist.tracks.slice(0, 20)
    $('.hot-list').innerHTML = hot.map(item => {
      const artists = item.ar.map(v => v.name).join('/')
      return `
        <div class="song" data-id="${item.id}">
          <div class="song-info">
            <div class="song-name">${item.name}</div>
            <div class="song-desc">
              ${artists} - ${item.al.name}
            </div>
          </div>
          <div class="play-icon"></div>
        </div>
      `
    }).join('')
    $all('.hot-list .song').forEach(item => {
      item.addEventListener('click', e => {
        console.log('触发事件的元素', e.target)
        console.log('绑定事件的元素', e.currentTarget)
        const id = e.currentTarget.getAttribute('data-id')
        location.href = `./player.html?id=${id}`
      })
    })
  } catch(e) {
    console.log('请求失败，请稍后重试！')
  }
}
getHotList()




// 搜索
const historyList = JSON.parse(localStorage.getItem('history')) || []
// 添加搜索记录
function addHistory(val) {
  const index = historyList.indexOf(val)
  if (index > -1) {
    historyList.splice(index, 1)
  }
  historyList.unshift(val)
  localStorage.setItem('history', JSON.stringify(historyList))
  renderHistory()
}
// 删除搜索记录
function removeHistory(val) {
  const index = historyList.indexOf(val)
  historyList.splice(index, 1)
  localStorage.setItem('history', JSON.stringify(historyList))
  renderHistory()
}

// 渲染搜索历史
function renderHistory() {
  $('.history').innerHTML = historyList.map(val => `
    <div class="history-item" data-keyword="${val}">
      <div style="pointer-events: none;">
        <p class="border-b-0_5px">${val}</p>
        <span data-keyword="${val}"></span>
      </div>
    </div>
  `).join('')
}
renderHistory()

// 热搜
async function getHotSearchList() {
  try {
    const res = await axios.get('http://39.96.210.90:5001/search/hot')
    $('.hot ul').innerHTML = res.data.result.hots.map(item => {
      return `
        <li class="border-0_5px" data-keyword="${item.first}">${item.first}</li>
      `
    }).join('')
  } catch(e) {
    console.log('请求失败，请稍后重试！')
  }
}
getHotSearchList()

// 搜索建议
async function getSuggestList(keywords) {
  try {
    $('.search-suggest h3').innerHTML = `搜索：“”`
    $('.search-suggest ul').innerHTML = '<div class="loading"></div>'
    const res = await axios.get('http://39.96.210.90:5001/search/suggest', {
      params: {
        keywords,
        type: 'mobile'
      }
    })
    const allMatch = res.data.result.allMatch || []
    $('.search-suggest h3').innerHTML = `搜索：“${keywords}”`
    $('.search-suggest ul').innerHTML = allMatch.map(item => {
      return `
        <li data-keyword="${item.keyword}">
          <p class="border-b-0_5px">${item.keyword}</p>
        </li>
      `
    }).join('')
  } catch(e) {
    console.log('请求失败，请稍后重试！')
  }
}


// 搜索框
$('.search-input').addEventListener('focus', e => {
  if (e.target.value) {
    // 获取焦点并且有值就展示搜索建议
    changeList(1)
    getSuggestList(e.target.value)
  }
})
let timeoutId = null
$('.search-input').addEventListener('input', e => {
  if (e.target.value) {
    // 输入时有值就展示搜索建议
    changeList(1)
    // 添加防抖：连续多次调用只执行最后一次
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      // 调用接口
      getSuggestList(e.target.value)
    }, 1000)
  } else {
    // input 清空时展示默认搜索页面
    changeList(0)
  }
})
$('.search-input').addEventListener('keydown', e => {
  if (e.target.value.trim() && e.keyCode === 13) {
    // 点击回车展示搜索结果
    changeList(2)
    getSearchResult(e.target.value)
  }
})
$('.clear-icon').addEventListener('click', () => {
  changeList(0)
  $('.search-input').value = ''
  $('.search-input').focus()
})


function startSearch(keyword) {
  $('.search-input').value = keyword
  changeList(2)
  getSearchResult(keyword)
}

// 点击搜索建议列表开始搜索
$('.search-suggest ul').addEventListener('click', e => {
  if (e.target.nodeName === 'LI') {
    const keyword = e.target.getAttribute('data-keyword')
    startSearch(keyword)
  }
})
// 点击热搜
$('.hot ul').addEventListener('click', e => {
  if (e.target.nodeName === 'LI') {
    const keyword = e.target.getAttribute('data-keyword')
    startSearch(keyword)
  }
})
// 点击历史记录
$('.history').addEventListener('click', e => {
  if (e.target.classList.contains('history-item')) {
    const keyword = e.target.getAttribute('data-keyword')
    // console.log(keyword)
    startSearch(keyword)
  } else if (e.target.nodeName === 'SPAN') {
    const keyword = e.target.getAttribute('data-keyword')
    removeHistory(keyword)
  }
})

// 点击搜素结果跳转播放页面
$('.search-result').addEventListener('click', e => {
  console.log(e.target)
  if (e.target.classList.contains('result-item-box')) {
    const id = e.target.getAttribute('data-id')
    console.log(id)
    location.href = './player.html?id=' + id
  }
})

// 切换搜索页面的列表
function changeList(type) {
  $('.search-list.show').classList.remove('show')
  if (type === 0) {
    $('.search-default').classList.add('show')
    $('.clear-icon').classList.remove('show')
  } else if (type === 1) {
    $('.search-suggest').classList.add('show')
    $('.clear-icon').classList.add('show')
  } else if (type === 2) {
    $('.clear-icon').classList.add('show')
    $('.search-result').classList.add('show')
  } 
}


// 1.   offset: 0
// 2.   offset: 30
// 3.   offset: 60
let page = 1
let finish = false
// 搜索结果
async function getSearchResult(keywords) {
  // 传参数表示搜索新的歌曲需要重置列表喝页数，没传参数表示时上拉加载
  if (keywords) {
    page = 1
    $('.search-result').innerHTML = ''
  } else {
    keywords = $('.search-input').value.trim()
  }
  try {
    // 存搜索记录
    addHistory(keywords)
    // 调用搜索接口
    // $('.search-result').innerHTML = '<div class="loading"></div>'
    const res = await axios.get('http://39.96.210.90:5001/cloudsearch', {
      params: {
        keywords,
        limit: 30,
        offset: (page - 1) * 30
      }
    })
    console.log(res.data.result)
    $('.search-result').innerHTML += res.data.result.songs.map(item => {
      const ar = item.ar.map(v => v.name).join('/')
      return `
        <div class="result-item-box" data-id="${item.id}">
          <div class="border-b-0_5px result-item">
            <div class="song-info">
              <div class="song-name">${item.name}</div>
              <div class="song-desc">
                ${ar} - ${item.al.name}
              </div>
            </div>
            <div class="song-icon"></div>
          </div>
        </div>
      `
    }).join('')
    // 判断是否加载完成
    finish = $('.search-result').children.length >= res.data.result.songCount
  } catch(e) {
    console.log('请求失败，请稍后重试！')
  }
}
// 滚动事件，上拉加载
$('main').addEventListener('scroll', (e) => {
  if ($('.search-result').classList.contains('show')) {
    const { scrollTop, clientHeight, scrollHeight } = e.target
    if (!finish && scrollTop + clientHeight >= scrollHeight) {
      console.log('滚动到底部了')
      page++
      getSearchResult()
    }
  }
})