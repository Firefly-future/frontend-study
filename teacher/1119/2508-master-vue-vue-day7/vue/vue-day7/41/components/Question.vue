<script setup>
const props = defineProps(['question', 'options', 'score', 'index', 'info', 'isDone'])
const letters = ['A', 'B', 'C', 'D']

const value = defineModel()

</script>

<template>
  <div class="question">
    <h3>{{ index + 1 }}. {{ question }} ({{ score }}分)</h3>
    <ul>
      <li v-for="(item, i) in options" :key="item">
        <input
          type="radio"
          :name="`question_${index}`"
          :id="`question_${index}_${i}`"
          :value="letters[i]"
          :disabled="isDone"
          v-model="value"
        >
        <label :for="`question_${index}_${i}`">
          {{ letters[i] }}. {{ item }}
        </label>
      </li>
    </ul>
    <div v-if="isDone" :class="['answer', info.result === info.myAnswer ? 'green' : 'red']">
      正确答案：{{ info.result }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
.question {
  padding: 15px;
  li {
    padding: 5px;
    display: flex;
    &:hover {
      background: #ccc;
    }
    label {
      flex: 1;
      cursor: pointer;
    }
  }
  input {
    margin-right: 10px;
  }
}
.answer {
  padding: 10px 0;
}
.green {
  color: green;
}
.red {
  color: tomato;
}
</style>
