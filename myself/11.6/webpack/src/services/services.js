import axios from 'axios'





//根据打包模式不同 获取的变量不同
console.log('环境变量', process.env.NODE_ENV)
console.log('环境变量ABC', process.env.ABC)
console.log('环境变量BASE_URL', process.env.BASE_URL)

// 统一配置接口域名
// axios.defaults.baseURL=process.env.NODE_ENV='development'?'http://39.96.210.90:5001':"http://zyx.music.com"
// axios.defaults.baseURL = 'http://39.96.210.90:5001'
// axios.defaults.baseURL = process.env.BASE_URL

// // 添加请求拦截器
// axios.interceptors.request.use(function(config){
//     // 在发送请求前做些什么
//     console.log('发送请求了',config)
//     // 给所有接口的请求头添加token
//     // config.headers.authorization='foeohgiaughgrgjpflkbklnnnz'
//     return config;
// },function(error){
//     // 对请求错误做些什么
//     return Promise.reject(error)
// } 
// )

// // 添加响应拦截器
// axios.interceptors.response.use(function(response){
//     // 对相应数据做点儿什么
//     console.log('接口数据返回成功',response)
//     return response
// },function (error) {
//     if(error.status===401){
//         location.href='./login.html'
//     }
//     return  Promise.reject(error)
// }
// )

// 获取歌单
export const getPlaylist = () => {
    return axios.get(`http://39.96.210.90:5001/top/playlist/highquality`)
}

// 获取新歌
export const getNewSongApi = () => {
    return axios.get(`http://39.96.210.90:5001/personalized/newsong`)
}

// 热歌榜
export const getHotSongApi = () => {
    return axios.get(`http://39.96.210.90:5001/playlist/detail?id=3778678`)
}

// 热门搜索
export const getHotsearch = () => {
    return axios.get('http://39.96.210.90:5001/search/hot')
}

// 热搜建议
export const getSuggest = keywords => {
    return axios.get(`http://39.96.210.90:5001/search/suggest`, {
        params: {
            keywords,
            type: "mobile"
        }
    })
}
// 搜索记录
export const getSearch = (keywords, offset) => {
    return axios.get('http://39.96.210.90:5001/cloudsearch', {
        params: {
            keywords,
            limit: 30,
            offset
        }
    })
}
// 获取歌单详情
export const getDetail = id => {
    return axios.get('http://39.96.210.90:5001/playlist/detail', {
        params: {
            id
        }
    })
}

// 获取评论列表
export const getComment = id => {
    return axios.get('http://39.96.210.90:5001/comment/playlist', {
        params: {
            id
        }
    })
}
// 获取基础信息
export const getBoundApi = ids => {
    return axios.get('http://39.96.210.90:5001/song/detail?', {
        params: {
            ids
        }
    })
}

//获取红心数量
export const getRedHeartCount = id => {
    return axios.get('http://39.96.210.90:5001/song/red/count',
        {
            params: {
                id: query.id
            }
        }
    )
}
// 获取评论数量
export const getCommentCount = id => {
    return axios.get('http://39.96.210.90:5001/comment/music',
        {
            params: {
                id
            }
        }
    )
}

// 获取歌词数量
export const getLyricApi = id => {
    return axios.get(`http://39.96.210.90:5001/lyric`, {
        params: {
            id
        }
    })
}
// 获取歌曲信息 
export const getSongUrlApi = id => {
    return axios.get('http://39.96.210.90:5001/song/url', {
        params: {
            id
        }
    })
}