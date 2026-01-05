<script>
export default {
  data() {
    return {
      num:0,
      title:localStorage.getItem('title')||'我是标题',
      obj:{
        name:'小明',
        hobby:['吃饭','睡觉']
      }
    }
  },
  watch:{
    // title(newVal,oldVal){
    //   console.log('title改变了',newVal,oldVal)
    //   localStorage.setItem('title',this.title)
    // },
    // obj(newVal){
    //   console.log('obj改变了',newVal)
    // },
    // 要监听对象内部属性修改 需添加深度监听
    obj:{
      handler(newVal){
        console.log('obj改变了',newVal)
      },
      deep:true
    }
  },
  methods:{
    fn(){
      this.$watch('num',(newNum)=>{
        console.log('num改变了',newNum)
      })
    }
  }
}
</script>

<template>
<div class="box">
  <h1>{{ title }}</h1>
  <input type="text" v-model.trim="title">
  <button @click="title='默认标题'">重置</button>
<hr/>

<input type="text" v-model="obj.name">
<button @click="obj={}">赋值obj</button>
<button @click="obj.hobby[0]=Math.random()">修改hobby</button>
<p>{{ obj }}</p>

<hr/>

<button @click="num++">num点击次数：{{ num }}</button>
<button @click="fn">创建一个监听</button>
</div>

</template>
<style lang="scss"></style>
