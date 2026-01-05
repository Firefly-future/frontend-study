<script setup>
import { ref ,reactive} from 'vue';
// reactive定义变量     
// 只能定义对象和数组类型的
// 不能重新赋值 只能修改内部的数据
// 不需要通过value获取
const list = ref([1,2,3,4,5])
let arr=reactive([4,5,6,7,8,9,10])
const obj=reactive({name:'小明',age:22})

const change=()=>{
  console.log(list.value.map(v=>v+'1'))
  console.log(arr.map(v=>v+'1'))

  list.value=[]
  arr=[]

  setTimeout(()=>{
    list.value.push(111)
  },1000)
}

const change2=()=>{
  arr=reactive([1,1,1,1,1,1])
  arr.push(Math.random())
  obj.name=Math.random()
}

</script>

<template>
<div class="app">
<p>{{ list }}</p>
<p>{{ arr }}</p>
<p>{{ obj }}</p>
<ul>
  <li v-for="(item,index) in arr" :key="index">{{ item }}</li>
</ul>
<button @click="change">修改数据</button>
<button @click="change2">修改数据按钮</button>
</div>
</template>

<style lang="scss" scoped>
html,
body {
  background-color: #ccc;
}
</style>
