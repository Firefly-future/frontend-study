<script>
import { getData } from './serve/index'
import Main from './components/Main.vue';
import Select from './components/Select.vue';
import Dialog from './components/Dialog.vue';
export default {
  components: {
    Main,
    Select,
    Dialog
  },
  data() {
    return {
      dataList: [],
      score: 0,
      show: false,
      answerStatus: [],
      isSubmit: false,
      userAnswer: []
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    async getDataList() {
      try {
        const res = await getData()
        console.log(res.data)
        this.dataList = res.data
      } catch (e) {
        console.log(e)
      }
    },
    // 交卷
    submit() {
      this.show=true
      this.isSubmit=true
    },
    // 更新用户答案和是否回答状态
    updateAnswerStatus(index, isAnswered, answer) {
      if(this.isSubmit) return 
      this.answerStatus[index] = isAnswered
      this.userAnswer[index] = answer
    },
    // 计算总分数
    getTotalScore() {
      let totalScore = 0
      const answerList={'A':0,'B':1,'C':2,'D':3}
      this.dataList.forEach((item, index) => {
        if (this.answerStatus[index] && this.userAnswer[index] && this.userAnswer[index] === answerList[item.result]) {
          totalScore += item.score
          console.log('用户答案',this.userAnswer[index],'正确答案',item.result)
        }
      })
      return totalScore
    }
  }
}
</script>

<template>
  <div class="app">
    <header>
      <h4>单选题，共<span>{{ dataList.length }}</span>题，每题<span>{{ score=100 / dataList.length }}</span>分</h4>
    </header>
    <main>
      <Main :dataList="dataList" :answerStatus="answerStatus" @updateAnswerStatus="updateAnswerStatus"></Main>
      <Select :dataList="dataList" :answerStatus="answerStatus" :isSubmit="isSubmit" @submit="submit"></Select>
    </main>
    <button @click="submit" :class="{'submit':isSubmit? 'submit' : ''}" :disabled="isSubmit">{{ isSubmit ? '已交卷' : '交卷' }}</button>
    <Teleport to="body">
      <Dialog :show="show" @close="show = false" :totalScore="getTotalScore"></Dialog>
    </Teleport>

  </div>
</template>

<style lang="scss" scoped>
.app {
  border: 1px solid #C5C5C5;
  padding: 20px 0;
  margin: 10px auto 0;
  width: 80%;

  header {
    background-color: #F6F6F6;
    padding: 10px 20px;
    margin-bottom: 10px;
  }
}

button {
  position: fixed;
  bottom: 0;
  right: 18%;
  padding: 5px 40px;
  background-color: #3B9ABA;
  color: #fff;
  cursor: pointer;
  &.submit {
    background-color: red;
  }
}
</style>
