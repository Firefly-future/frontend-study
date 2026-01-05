<script>
export default {
  // 定义组件中的响应式数据，数据改变时组件会自动更新
  data () {
    return {
      title: '我是一个标题',
      show: true,
      num: 0,
      list: ['a', 'b', 'c'],
      person: {
        name: '小明',
        age: 22,
        hobby: ['吃饭', '睡觉']
      },
      eventName: 'click'
    }
  },
  // 定义方法
  methods: {
    add () {
      // this: 组件实例对象，可以访问 data 中的数据和 methods 中的函数
      this.num++
      console.log('add函数执行了', this.num)
    },
    changeTitle (e) {
      this.title = e.target.value
    },
    push () {
      this.list.push(Math.random())
    },
    update (index) {
      this.list[index] = Math.random()
    }
  }
}
</script>

<template>
  <div class="box">
    <h1>{{ title }}</h1>
    <!-- <input type="text" v-on:input="changeTitle"> -->
    <!-- <input type="text" @input="changeTitle"> -->
    <input type="text" @input="e => title = e.target.value">
    <hr />
    <div>
      <button @click="num--">-</button>
      {{ num }}
      <button v-on:click="add">+</button>
      <!-- <button v-on:[eventName]="add()">+</button>
      <input type="text" @input="e => eventName = e.target.value"> -->
    </div>
    <hr />
    <button @click="push">添加数据</button>
    <ul>
      <li v-for="(item, index) in list" :key="item">
        <p>
          内容: {{ item }}
          <button @click="list.splice(index, 1)">删除</button>
          <button @click="update(index)">修改</button>
        </p>
      </li>
    </ul>
  </div>
</template>


<style lang="scss">
.box {
  background: #ccc;
  h1 {
    color: red;
  }
}
.child {
  width: 100px;
  height: 100px;
}
.red {
  background: red;
}
.green {
  background: green;
}
.yellow {
  background: yellow;
}
.orange {
  background: orange;
}
</style>
