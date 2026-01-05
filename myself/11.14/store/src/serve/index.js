import axios from "axios"

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL

// 获取店铺信息
export const getSeller=()=>{
    return axios.get('/sell/api/seller')
}
// 获取商品信息
export const getGoods=()=>{
    return axios.get('/sell/api/goods')
}
// 获取评价信息
export const getRatings=()=>{
    return axios.get('/sell/api/ratings')
}