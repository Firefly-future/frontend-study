
import { $, $all, formatPlayCount } from '@/utils/utils.js'
import {
  getHighquality,
  getNewSong as getNewSongApi,
} from '@/services'

// 推荐音乐
async function playlist() {
  try {
    const res = await getHighquality()
    console.log('=================', res);
    
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
    console.log('请求失败，请稍后重试！', e)
  }
}
playlist()

// 最新音乐
async function getNewSong() {
  try {
    const res = await getNewSongApi()
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

