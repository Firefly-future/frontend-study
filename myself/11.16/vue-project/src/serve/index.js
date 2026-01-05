import axios from 'axios'

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL

export const getData=()=>{
    return axios.get('/api/api/exam_questions')
}