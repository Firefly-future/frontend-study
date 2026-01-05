import { $, $all } from '@/utils/utils.js'
import {
  getHotList as getHotListApi,
} from '@/services'

// 热歌榜
async function getHotList() {
  try {
    const res = await getHotListApi()
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