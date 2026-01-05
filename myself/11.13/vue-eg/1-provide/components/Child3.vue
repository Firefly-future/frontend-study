<script>

import Child4 from './Child4.vue';
export default {
    components: {
        Child4
    },
    inject:['title','num']
}
</script>

<template>
    <div class="box3">
        <h5>{{ title }}的第一个组件的第一个组件的第一个组件</h5>
        <h4>num:{{ num }}</h4>
        <Child4></Child4>
    </div>

</template>

<style lang="scss" scoped>
.box3 {
    padding: 20px;
    border: 1px solid red;
}
</style>