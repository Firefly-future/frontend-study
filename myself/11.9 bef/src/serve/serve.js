const axios = require('axios')

// 获取综合
export const getZome=()=> {
    return axios.get('http://localhost:3000/bw/api/zome')
}
// 获取销量
export const getNum=()=> {
    return axios.get('http://localhost:3000/bw/api/num')
}
// 获取上新
export const getNew=()=> {
    return axios.get('http://localhost:3000/bw/api/new')
}