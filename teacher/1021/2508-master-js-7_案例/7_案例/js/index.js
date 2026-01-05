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
    console.log(list)
    
    $('.recommend-song').innerHTML = list.map(item => {
      return `
        <div class="recommend-item">
          <img src="${item.coverImgUrl}" />
          <p>${item.name}</p>
          <div class="play-count">${formatPlayCount(item.playCount)}</div>
        </div>
      `
    }).join('')
  } catch(e) {
    alert('请求失败，请稍后重试！')
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
        <div class="song">
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
  } catch(e) {
    alert('请求失败，请稍后重试！')
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
    console.log(hot)
    
    $('.hot-list').innerHTML = hot.map(item => {
      const artists = item.ar.map(v => v.name).join('/')
      return `
        <div class="song">
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
  } catch(e) {
    alert('请求失败，请稍后重试！')
  }
}
getHotList()
