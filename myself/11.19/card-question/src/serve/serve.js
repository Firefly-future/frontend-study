import axios from 'axios'

export const getQuestionsData=()=>{
    return axios.get('http://39.96.210.90:3000/api/exam_questions')
}