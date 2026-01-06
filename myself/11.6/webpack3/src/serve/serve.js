
import axios from 'axios'

// 根据打包模式获取不同的变量
console.log('环境变量', process.env.NODE_ENV)
console.log('环境变量 ABC',process.env.ABC)
console.log('环境变量 BASE_URL',process.env.BASE_URL)

// 统一设置接口域名
// 通过判断添加
// axios.defaults.baseURL=process.env.NODE_ENV==='development'?"http://39.96.210.90:5001":"http://zyx.music.com"
// axios.defaults.baseURL=process.env.BASE_URL
axios.defaults.baseURL="http://39.96.210.90:5001"
// // 添加需求拦截器axios.interceptors.request.use(config=>{})
// axios.interceptors.request.use(config => {
//   // 在发送请求之前做些什么
//   config.headers['token']=localStorage.getItem('token')
//   return config
// }, error => {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })

// // 添加响应拦截器axios.interceptors.response.use(response=>{})
// axios.interceptors.response.use(response => {
//   // 2xx 范围内的状态码都会触发该函数。
//   // 对响应数据做点什么
//   return response
// }, error => {
//   // 超出 2xx 范围的状态码都会触发该函数。
//   // 对响应错误做点什么
//   return Promise.reject(error)
// })

// 获取推荐音乐单
export const getPlayList=()=>{
    return axios.get('/top/playlist/highquality')
}
// 获取最新音乐
export const getNewSongApi=()=>{
    return axios.get('/personalized/newsong')
}
// 获取热歌榜
export const getHotListApi=()=>{
    return axios.get('/playlist/detail?id=3778678')
}

// 获取热搜
export const getHotSearchListApi=()=>{
    return axios.get('/search/hot')
}

// 获取搜索建议
export const getSuggestListApi=keywords=>{
    return axios.get('/search/suggest',{
        params:{
            keywords,
            type:'mobile'
        }
    })
}
// 获取搜索接口
export const getSearchResultApi=(keywords,offset)=>{
    return axios.get('/cloudsearch', {
            params: {
                keywords,
                limit: 30,
                offset
            }
    })
}



// detail

// 获取歌单数据
export const getPlayListDetailApi=id=>{
    return axios.get('/playlist/detail',{
        params:{
            id
        }
    })
}
// 获取评论数据
export const getCommentListApi=(id)=>{
    return axios.get('/comment/playlist',{
        params:{
            id
        }
    })
}




// player

// 获取歌曲信息
export const getSongDetailApi=ids=>{
    return axios.get('/song/detail',{
        params:{
            ids
        }
    })
}

// 获取歌曲红心数量
export const getSongRedCountApi=id=>{
    return axios.get('/song/red/count',{
        params:{
            id
        }
    })
}

// 获取歌曲url
export const getSongUrlApi=id=>{
    return axios.get('/song/url',{
        params:{
            id
        }
    })
}

// 获取歌曲歌词信息
export const getLyricApi=id=>{
    return axios.get('/lyric',{
        params:{
            id
        }
    })
}