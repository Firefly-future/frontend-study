<script>
import Bound from './components/Bound.vue';
export default {
  components:{
    Bound
  },
  data () {
    return {
      apple:{
        name:'红富士苹果',
        price:10,
        count:1
      }
    }
  },
  methods:{
    change({name,n}){
      this.apple.count+=n
    }
  }
}

</script>

<template>
  <div class="app">
    <button>++++</button>
    <Bound :name="apple.name" :price="apple.price" :count="apple.count" @change="change"></Bound>
  </div>
</template>

<style lang="scss">

h1{
  color: red;
}

</style>
