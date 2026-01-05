<script>
export default {
  data() {
    return {
      list:['a','b','c','d']
    }
  },
  methods:{
    remove(){
      this.list.shift()
      console.log(this.list)

      this.$nextTick()
      .then(res=>{
        console.log(document.querySelector('ul').innerHTML)
      })
    }
  }
}
</script>

<template>
  <div class="box">
    <button @click="remove">删除第一个</button>
    <ul>
      <li v-for="(item,index) in list" :key="item">
        <input type="checkbox">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  overflow-x: hidden;
  overflow-wrap: break-word;
}

.box {
  width: 100vw;
  background-color: orange;

  h1 {
    color: red;
  }
}

.child {
  width: 200px;
  height: 30px;
}

.red {
  background: red;
}

.black {
  background-color: black;
}
</style>
