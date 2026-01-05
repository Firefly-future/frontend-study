<script setup>
const props = defineProps(['index', 'question', 'options', 'score', 'info', 'isSubmit'])
const letters = ['A', 'B', 'C', 'D']
const value = defineModel()

</script>

<template>
    <div class="question">
        <h3>{{ index + 1 }}. {{ question }}</h3>
        <ul>
            <li v-for="(item, i) in options" key="item">
                <input type="radio" :name="`question_${index}`" :id="`question_${index}_${i}`" :value="letters[i]"
                    :disabled="isSubmit" v-model="value"><label :for="`question_${index}_${i}`">
                    {{ letters[i] }}.{{ item }}
                </label>
            </li>
            <!-- {{ info.myAnswer }} -->
              <div v-if="isSubmit" :class="['answer',info.result===info.myAnswer?'green':'red']">
                正确答案：{{ info.result }}
              </div>
        </ul>

    </div>
</template>


<style lang="scss" scoped>
.question {
    padding: 15px;

    li {
        display: flex;
        padding: 5px;

        &:hover {
            background-color: #f5f5f5;
        }

        label {
            flex: 1;
        }

        input {
            margin-right: 5px;
        }
    }
    .answer{
        height: 30px;
        line-height: 30px;
        &.red{
            color: red;
        }
        &.green{
            color: green;
        }
    }
}
</style>