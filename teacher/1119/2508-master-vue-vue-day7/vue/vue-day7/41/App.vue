<script setup>
import { getQuestionApi } from './services'
import { ref } from 'vue'
import Card from './components/Card.vue'
import Question from './components/Question.vue'
import SuccessDialog from './components/SuccessDialog.vue'

const questions = ref([])
const questionsListEl = ref(null)
const totalScore = ref(0)
const showSuccessDialog = ref(false)
const isDone = ref(false)

const getData = async () => {
  try {
    const res = await getQuestionApi()
    console.log(res.data)
    questions.value = res.data
  } catch(e) {
    console.log(e)
  }
}
getData()

const scrollToQuestion = (i) => {
  console.log(`跳转第 ${i} 题`)
  console.log(questionsListEl.value.children[i].offsetTop)
  
  document.documentElement.scrollTop = questionsListEl.value.children[i].offsetTop
}

const submit = () => {
  totalScore.value = questions.value.reduce((prev, val) => {
    return prev + (val.result === val.myAnswer ? val.score : 0)
  }, 0)
  showSuccessDialog.value = true
  isDone.value = true
}

</script>

<template>
  <div class="app">
    <div class="questions-wrap">
      <h2>单选题</h2>
      <div class="questions-list" ref="questionsListEl">
        <Question
          v-for="(item, index) in questions"
          :key="item.question"
          :index="index"
          :question="item.question"
          :options="item.options"
          :score="item.score"
          :info="item"
          :isDone="isDone"
          v-model="item.myAnswer"
        />
      </div>
    </div>
    <div class="right">
      <Card
        :list="questions"
        :isDone="isDone"
        @clickBtn="scrollToQuestion"
        @submit="submit"
      />
    </div>
  </div>
  <SuccessDialog
    v-if="showSuccessDialog"
    :score="totalScore"
    @close="showSuccessDialog = false"
  />
</template>

<style lang='scss' scoped>
.app {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.questions-wrap {
  border: 1px solid;
  flex: 1;
}
.right {
  width: 300px;
}
</style>
