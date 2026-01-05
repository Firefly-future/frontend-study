<script>
export default {
    props: ['dataList', 'answerStatus', 'updateAnswerStatus'],
    data() {
        return {
            selectList: ['A', 'B', 'C', 'D'],
            questions: [],
            userAnswer: []
        }
    },
    created() {
        this.questions = this.dataList.map(item => ({
            ...item,
            selectedIndex: -1
        }))
    },
    methods: {
        selectIndex(que, index, Qindex) {
            que.selectedIndex = index
            // this.userAnswer[Qindex] = index
            this.$emit('updateAnswerStatus', Qindex, true,index)
        }
    }
}
</script>

<template>
    <div class="box">
        <div class="questions">
            <div class="question-item" v-for="(item, Qindex) in dataList" :key="item.question">
                <p><span>{{ Qindex + 1 }}</span><b>({{ item.score }}分)</b>{{ item.question }}</p>
                <ul>
                    <li v-for="(option, Oindex) in item.options" :key="option"
                        :class="{ 'active': Oindex === item.selectedIndex }" @click="selectIndex(item, Oindex, Qindex)">
                        <svg t="1763296221408" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="5510" width="200" height="200">
                            <path
                                d="M512.3 64c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448-200.6-448-448-448z m230.3 337.8L483.5 661c-15.9 15.9-41.7 15.9-57.6 0l-144-144c-15.9-15.9-15.9-41.7 0-57.6 15.9-15.9 41.7-15.9 57.6 0l115.2 115.2L685 344.2c15.9-15.9 41.7-15.9 57.6 0 15.9 15.9 15.9 41.7 0 57.6z"
                                p-id="5511" fill="#8a8a8a"></path>
                        </svg>
                        {{ selectList[Oindex] }}：{{ option }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.question-item {
    padding: 10px 20px;
    border-top: 5px solid #EDECED;

    span {
        background-color: #5992E5;
        color: #FEFDFF;
        padding: 6px;
        border-radius: 50%;
        margin-right: 10px;
    }

    li {
        margin: 5px 0;
        margin-left: 30px;
        height: 20px;
        line-height: 20px;
        user-select: none;
    }

    li:hover {
        background-color: #DFDFDF;
    }

    li.active {
        background-color: #5992E5;
        color: #FEFDFF;

        svg path {
            fill: #1afa29;
        }
    }
}
</style>