import axios from 'axios'

// 根据打包模式不同获取的变量不一样
console.log('=========== 环境变量', process.env.NODE_ENV);
console.log('=========== 环境变量 ABC', process.env.ABC);
console.log('=========== 环境变量 BASE_URL', process.env.BASE_URL);

// 统一设置接口域名
// axios.defaults.baseURL = process.env.NODE_ENV  === 'development' ? 'http://39.96.210.90:5001' : 'https://zyx.music.com'
axios.defaults.baseURL = process.env.BASE_URL

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log('发送请求了', config);
    // 给所有接口的请求头添加 token
    // config.headers.authorization = '12343543124332332313'
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('接口数据返回成功', response);
    return response
  }, function (error) {
    if (error.status === 401) {
      location.href = './login.html'
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });



// 获取推荐歌单
export const getHighquality = () => {
  return axios.get('/top/playlist/highquality')
}

// 获取最新音乐
export const getNewSong = () => {
  return axios.get('/personalized/newsong')
}

// 获取热歌榜
export const getHotList = () => {
  return axios.get('/playlist/detail?id=3778678')
}

// 热搜列表
export const getSearchHot = () => {
  return axios.get('/search/hot')
}

// 搜索建议
export const getSearchSuggest = keywords => {
  return axios.get('/search/suggest', {
    params: {
      keywords,
      type: 'mobile'
    }
  })
}

// 搜索
export const searchResult = (keywords, offset) => {
  return axios.get('/cloudsearch', {
    params: {
      keywords,
      limit: 30,
      offset
    }
  })
}

// 获取歌单详情
export const getPlaylistDetail = id => {
  return axios.get('/playlist/detail', {
    params: {
      id
    }
  })
}

// 获取歌单评论
export const getPlaylistComment = id => {
  return axios.get('/comment/playlist', {
    params: {
      id
    }
  })
}

// 获取歌曲信息
export const getSongDetail = ids => {
  return axios.get('/song/detail', {
    params: {
      ids
    }
  })
}

// 获取歌曲红心数量
export const getSongRedCount = id => {
  return axios.get('/song/red/count', {
    params: {
      id
    }
  })
}

// 获取歌曲url
export const getSongUrl = id => {
  return axios.get('/song/url', {
    params: {
      id
    }
  })
}

// 获取歌曲歌词
export const getLyric = id => {
  return axios.get('/lyric', {
    params: {
      id
    }
  })
}

