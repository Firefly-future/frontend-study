<script>
import Child3 from './Child3.vue';

export default{
    props:['num'],
    components:{
        Child3
    },
    data(){
        return {
            
        }
    }
}
</script>

<template>
<div class="box">
    <h2>组件2</h2>
    <p>{{ num }}</p>
</div>
</template>

<style lang="scss" scoped>


</style>