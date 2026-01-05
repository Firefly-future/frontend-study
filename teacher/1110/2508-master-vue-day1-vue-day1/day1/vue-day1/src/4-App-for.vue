<script>
export default {
  // 定义组件中的响应式数据，数据改变时组件会自动更新
  data () {
    return {
      title: '我是一个标题',
      list: ['a', 'b', 'c'],
      person: {
        name: '小明',
        age: 22,
        hobby: ['吃饭', '睡觉']
      }
    }
  }
}

// document.querySelector('ul').innerHTML = list.map(item => 
//   `<li>${item}</li>
// `).join('')

</script>

<template>
  <div class="box">
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="(item, index) in list" :key="item">
        <p>内容: {{ item }}</p>
        <p>下标: {{ index }}</p>
      </li>
    </ul>

    <!-- <ul>
      <li v-for="(item, index) in 'abcdefg'" :key="item">
        <p>内容: {{ item }}</p>
        <p>下标: {{ index }}</p>
      </li>
    </ul> -->

    <!-- <ul>
      <li v-for="(item, index) in 5" :key="item">
        <p>内容: {{ item }}</p>
        <p>下标: {{ index }}</p>
      </li>
    </ul> -->

    <!-- <ul>
      <li v-for="(val, key, index) in person" :key="key">
        <p>属性名: {{ key }}</p>
        <p>属性值: {{ val }}</p>
        <p>下标: {{ index }}</p>
      </li>
    </ul> -->
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
