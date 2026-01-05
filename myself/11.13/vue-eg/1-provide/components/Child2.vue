<script>

import Child3 from './Child3.vue';
export default {
    components: {
        Child3
    },
    inject:['title','num']
}

</script>

<template>
    <div class="box2">
        <h5>{{ title }}的第一个组件的第一个组件</h5>
        <h4>num:{{ num }}</h4>
        <Child3></Child3>
    </div>

</template>

<style lang="scss" scoped>
.box2 {
     padding: 20px;
    border: 1px solid red;
}
</style>