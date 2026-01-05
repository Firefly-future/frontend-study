
const query = getQuery()

// 获取歌曲信息
async function getSongDetail() {
  try {
    const res = await axios.get('http://39.96.210.90:5001/song/detail', {
      params: {
        ids: query.id
      }
    })
    const song = res.data.songs[0]
    console.log('歌曲信息', song)
    $('.song-disc img').src = song.al.picUrl
    $('.song-name').innerHTML = song.name
    $('.song-singer').innerHTML = song.ar.map(v => v.name).join('/')
  } catch(e) {
    console.log(e)
  }
}
getSongDetail()


// 获取歌曲url
async function getSongUrl() {
  try {
    const res = await axios.get('http://39.96.210.90:5001/song/url', {
      params: {
        id: query.id
      }
    })
    console.log('歌曲url', res.data)
  } catch(e) {
    console.log(e)
  }
}
getSongUrl()


// 获取歌曲信息
async function getLyric() {
  try {
    const res = await axios.get('http://39.96.210.90:5001/lyric', {
      params: {
        id: query.id
      }
    })
    console.log('歌词', res.data.lrc)
    $('.lyric-wrap').innerHTML = res.data.lrc.lyric

  } catch(e) {
    console.log(e)
  }
}
getLyric()