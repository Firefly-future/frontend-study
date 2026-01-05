<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { formatTime } from '@/utils/util'
const props = defineProps(['list', 'isSubmit'])
const emits = defineEmits(['submit', 'clickBtn'])

// 倒计时
const time = ref(7200)
const id = setInterval(() => {
    time.value--
    if (time.value <= 0) {
        time.value = 0
        emits('submit')
        clearInterval(id)
    }
}, 1000)
// 点击交卷 同时停止定时器
const handleSubmit=()=>{
    clearInterval(id)
    emits('submit')
}
onBeforeUnmount(() => {
    clearInterval(id)
})

</script>

<template>
    <div class="card">
        <div class="card-header">
            <p>答题卡</p>
            <p>{{ formatTime(time) }}</p>
        </div>
        <div class="card-main">
            <button v-for="(item, index) in list" :key="index" :class="{
                active: item.myAnswer,
                red: isSubmit && item.myAnswer !== item.result
            }" @click="emits('clickBtn', index)">{{ index + 1 }}</button>
        </div>
        <div class="card-footer">
            <button @click="handleSubmit" :disabled="isSubmit">{{ isSubmit ? '已交卷' : '交卷' }}</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    width: 300px;
    min-height: 300px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
}

.card-header {
    display: flex;
    align-items: center;
    height: 40px;

    p {
        flex: 1;
        text-align: center;
    }

    border-bottom: 1px solid;
}

.card-main {
    flex: 1;
    padding: 25px;

    button {
        width: 25px;
        height: 25px;
        margin: 5px;

        &.active {
            background-color: aqua;
        }

        &.red {
            background-color: red;
            color: #fff;
        }
    }
}

.card-footer {
    border-top: 1px solid;
    padding: 10px;

    button {
        width: 100%;
        height: 30px;
    }
}
</style>