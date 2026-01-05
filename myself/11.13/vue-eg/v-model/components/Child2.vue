<script>
import Child3 from './Child3.vue';
export default {
    components: {
        Child3
    },
    props: ['label','modelValue']
}
</script>

<template>
    <div class="box1">
        <span>{{ label }}</span>
        <input type="text" 
        :value="modelValue"
        @input="e=>$emit('update:modelValue',e.target.value)"
        >
        <Child3></Child3>
    </div>
</template>

<style lang="scss" scoped>
.box1 {
    padding: 20px;
    border: 1px solid red;
}
</style>