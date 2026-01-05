<script>
export default {
    components: {
    },
    props: ['model-value','title','num']
}
</script>

<template>
    <div class="box1">
        <span>{{ title }}</span>
        <button @click="$emit('update:title',Math.random())">修改标题</button>
        <button @click="$emit('update:modelValue',modelValue-1)">num--</button>
        {{ modelValue }}
        <button @click="$emit('update:modelValue',modelValue+1)">num+</button>
    </div>
</template>

<style lang="scss" scoped>
.box1 {
    padding: 20px;
    border: 1px solid red;
}
</style>