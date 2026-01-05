<script>

import Child5 from './Child5.vue';
export default {
    components: {
        Child5
    },
    inject: ['title', 'num', 'changeTitle', 'changeNum']
}

</script>

<template>
    <div class="box4">
        <h4>{{ title }}</h4>
        <button @click="changeTitle(Math.random())">修改标题</button>
        <hr>
        </hr>
        <button @click="changeNum(-1)">num-</button>
        <h3>num:{{ num }}</h3>
        <button @click="changeNum(1)">num+</button>
        <Child5></Child5>
    </div>
</template>

<style lang="scss" scoped>
.box4 {
    padding: 20px;
    border: 1px solid red;
}
</style>