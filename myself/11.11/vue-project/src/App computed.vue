<script>
export default {
  data(){
    return {
      title:'我是标题',
      firstName:'小明',
      lastName:'王'
    }
  },
  computed:{
    fullName:{
      get(){
        return this.lastName + this.firstName
      },
      set(newVal){
        console.log(newVal)
        this.lastName=newVal[0]
        this.firstName=newVal.slice(1)
      }
    }
  },
  methods:{
    change(){
      this.fullName='诸葛大力'
    }
  }
}

</script>

<template>
<div class="box">
<p>姓氏：{{ lastName }} <input type="text" v-model="lastName"></p>
<p>名字：{{ firstName }} <input type="text" v-model="firstName"></p>
<button @click="change">fullName</button>
<p>姓名：{{ fullName }}</p>
</div>

</template>
<style lang="scss"></style>
