

import axios from 'axios'
import './player.scss'
import {
  $,
  $all,
  getQuery,
  formatDuration,
  formatLyricTime
} from "@/util/utils.js"

import {
  getSongDetailApi,
  getSongRedCountApi,
  getSongUrlApi,
  getLyricApi
} from "@/serve/serve.js"

const query = getQuery()

// 获取歌曲信息
async function getSongDetail() {
  try {
    const res = await getSongDetailApi(query.id)
    const song = res.data.songs[0]
    console.log('歌曲信息', song)
    $('.song-disc img').src = song.al.picUrl
    $('.song-name b').innerHTML = song.name
    $('.song-singer').innerHTML = song.ar.map(v => v.name).join('/')
  } catch(e) {
    console.log(e)
  }
}
getSongDetail()

// 获取歌曲红心数量
async function getSongRedCount() {
  try {
    const res = await getSongRedCountApi(query.id)
    console.log('红心数量', res.data.data.countDesc)
    $('.liked span').textContent = res.data.data.countDesc
  } catch(e) {
    console.log(e)
  }
}
getSongRedCount()



// 获取歌曲url
async function getSongUrl() {
  try {
    const res = await getSongUrlApi(query.id)
    console.log('歌曲url', res.data.data[0].url)
    $('audio').src = res.data.data[0].url
    if (res.data.data[0].freeTrialInfo) {
      $('.song-name span').innerHTML = 'vip'
    }
  } catch(e) {
    console.log(e)
  }
}
getSongUrl()


let lyric = []
// 获取歌曲信息
async function getLyric() {
  try {
    const res = await getLyricApi(query.id)
    // 格式化歌词
    lyric = res.data.lrc.lyric.split('\n').map(item => {
      const [time, text] = item.split(']')
      return {
        time: formatLyricTime(time.slice(1)),
        text
      }
    }).filter(item => item.text)
    console.log('歌词', lyric)
    $('.lyric-wrap').innerHTML = lyric.map(item => {
      return `
        <div class="lyric-row">
          <p>${item.text}</p>
        </div>`
    }).join('')

  } catch(e) {
    console.log(e)
  }
}
getLyric()


const playBtnImg = [
  'https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/34207669669/f020/7908/a749/34315097c835773c4e003e72fbbae607.png',
  'https://p6.music.126.net/obj/wonDlsKUwrLClGjCm8Kx/34207667955/0616/bd45/3537/50928579d6616a7f811d19da1162e149.png'
]
const audioEl = $('audio')
// 点击播放暂停
$('.play-icon').addEventListener('click', () => {
  if (audioEl.paused) {
    play()
  } else {
    pause()
  }
})
// 监听播放的进度
audioEl.addEventListener('timeupdate', () => {
  // 根据当前播放的位置去歌词中查找需要高亮的歌词下标
  const index = lyric.findIndex((item, index) => {
    if (!lyric[index + 1]) return true
    return audioEl.currentTime >= item.time && audioEl.currentTime < lyric[index + 1].time
  })
  // console.log('当前播放的位置', audioEl.currentTime, index)
  $('.lyric-wrap .active')?.classList.remove('active')
  $all('.lyric-row')[index]?.classList.add('active')
  $('.lyric-wrap').scrollTop = $all('.lyric-row')[index]?.offsetTop - 60

  // 修改当前播放进度
  $('.current').innerHTML = formatDuration(audioEl.currentTime)
  const progress = audioEl.currentTime / audioEl.duration
  console.log($('.line').clientWidth, progress)
  $('.hl-line').style.width = progress * 100 + '%'
  $('.hl-line i').style.left = $('.line').clientWidth * progress - 7 + 'px'
})
// 监听播放结束
audioEl.addEventListener('ended', () => {
  pause()
})

function play() {
  audioEl.play()
  $('.m-song-disk-play').src = playBtnImg[1]
  $('.song-disc').classList.remove('pause')
}
function pause() {
  audioEl.pause()
  $('.m-song-disk-play').src = playBtnImg[0]
  $('.song-disc').classList.add('pause')
}
// 倍速
$('.playback-rate').addEventListener('click', () => {
  audioEl.playbackRate += 0.5
  $('.playback-rate span').innerHTML = audioEl.playbackRate
})


// 监听音乐可以播放
audioEl.addEventListener('canplay', () => {
  console.log('歌曲总时长', audioEl.duration)
  $('.duration').innerHTML = formatDuration(audioEl.duration)
})

let isDown = false
// touch 事件，移动端手指触摸事件
$('.hl-line i').addEventListener('touchstart', e => {
  // e.touches[0] 存手指触摸位置的信息
  // console.log('========== 手指按下', e.touches[0])
  isDown = true
  $('.hl-line i').classList.add('isDown')
})

document.addEventListener('touchmove', e => {
  if (isDown) {
    // console.log('========== 手指移动', e.touches[0])
    // 手指的位置 - 进度条距离屏幕左侧的位置 === 小球应该在的位置
    let left = e.touches[0].pageX - $('.line').offsetLeft
    const maxLeft = $('.line').clientWidth
    if (left < 0) left = 0
    if (left > maxLeft) left = maxLeft
    $('.hl-line').style.width = left + 'px'
    $('.hl-line i').style.left = left - 7 + 'px'
    // 修改音乐位置
    audioEl.currentTime = left / maxLeft * audioEl.duration
  }
})

$('.hl-line i').addEventListener('touchend', e => {
  // console.log('========== 手指抬起')
  isDown = false
  $('.hl-line i').classList.remove('isDown')
})



// const obj = {
//   name: false,
//   age: false
// }

// console.log(obj.name)
// console.log(obj.name && obj.name.split('')) // && 前的变量会自动转换类型，转换后为false的直接返回变量
// console.log(obj.name?.split('')) // 可选链：? 前的变量为 null、undefined 时直接返回 undefined



