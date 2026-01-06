import { ref } from 'vue'
import { getQuestionApi } from '../services'

export const useQuestions = () => {
  const questions = ref([])
  const loading = ref(false)
  const getData = async () => {
    try {
      loading.value = true
      const res = await getQuestionApi()
      questions.value = res.data
    } catch(e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }

  return {
    questions,
    loading,
    getData
  }
}
