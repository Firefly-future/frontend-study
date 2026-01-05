<script setup>
import {ref,readonly,isRef,reactive,toRef,toRefs,shallowRef} from 'vue'
const xm=readonly({name:'小明',age:23})
const num=ref(100)
const obj=reactive({name:'小王',age:22})
// const objName=obj.name
const objName=toRef(obj,'name') //此变量与obj.name关联
console.log(objName)
// const  objAsRefs=toRefs(obj)
// console.log(objAsRefs)
const  objAsRefs={
  name:toRef(obj,'name'),
  age:toRef(obj,'age')
}
console.log(objAsRefs)
const xh=shallowRef({
  name:'小红',
  info:{
    a:{
      b:{
        c:100
      }
    }
  }
})

const add=()=>{
  xh.value='xxxx'
  // xh.value.info.a.b.c++
  // console.log(xh.value.info.a.b.c)
}
</script>

<template>
  <div class="app">
  <button @click="xm.age++">按钮</button>
  {{ xm }}
  <hr>
  <button @click="obj.name=Date.now()"> 修改obj.name </button>
  <p>{{ obj }}</p>
  <p>{{ objName }}</p>
  <hr>
  <button @click="add">按钮</button>
  <p>{{ xh }}</p>
  </div>
</template>

<style lang="scss" scoped>
html,
body {
  background-color: #ccc;
}
</style>
