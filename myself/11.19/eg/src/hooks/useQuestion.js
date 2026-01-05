import { getQuestion } from "@/serve/serve";
import { ref } from "vue";

export const useQusetion = () => {
  const questions = ref([]);
  const loading = ref(false);
  const getData = async () => {
    try {
      loading.value = true;
      const res = await getQuestion();
      console.log(res.data);
      questions.value = res.data;
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  };
  return {
    questions,
    loading,
    getData,
  };
};
