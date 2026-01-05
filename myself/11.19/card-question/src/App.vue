<script setup>
import { ref } from 'vue';
import Question from './components/Question.vue';
import Card from './components/Card.vue';
import Dialog from './components/Dialog.vue';
import { getQuestionsData } from './serve/serve';


const questions = ref([])
const isShow = ref(false)
const totalScore = ref(0)
const isSubmit = ref(false)
const questionsEl = ref(null)

const getData = async () => {
    try {
        const res = await getQuestionsData()
        console.log(res.data)
        questions.value = res.data
    } catch (e) {
        console.log(e)
    }
}
getData()
// 跳转至对应题目
const scrollToQuestion=i=>{
    console.log(`跳转至第${i}题`)
    console.log(questionsEl.value.children[i].offsetTop)
    document.documentElement.scrollTop=questionsEl.value.children[i].offsetTop
}

// 交卷
const submit = () => {
    totalScore.value = questions.value.reduce((prev, val) => {
        return prev + (val.result === val.myAnswer ? val.score : 0)
    }, 0)
    isShow.value = true
    isSubmit.value = true
}
</script>
<template>
    <div class="app">
        <div class="questions-wrap">
            <h2>单选题，共{{ questions.length }}题，每题{{ questions[0]?.score }}分</h2>
            <div class="question-list" ref="questionsEl">
                <Question v-for="(item, index) in questions" :key="item.questions" :index="index"
                    :question="item.question" :options="item.options" :score="item.score" :info="item"
                    v-model="item.myAnswer" :isSubmit="isSubmit"></Question>
            </div>
        </div>
        <div class="right">
            <Card :list="questions" @submit="submit" :isSubmit="isSubmit" @clickBtn="scrollToQuestion"></Card>
        </div>
    </div>
    <Dialog v-if="isShow" :score="totalScore" @close="isShow = false"></Dialog>
</template>

<style scoped>
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
