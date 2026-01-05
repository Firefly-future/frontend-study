<script>
import Test from './components/Test.vue'
import MyInput from './components/MyInput.vue'

export default {
  components: {
    Test,
    MyInput
  },
  data () {
    return {
      num: 0,
      title: '标题',
      form: {
        user: '小明',
        age: 22,
        sex: '男'
      }
    }
  },
  methods: {
    changeNum(n) {
      // n: 子组件传入的数据
      this.num += n
    }
  }
}
</script>

<template>
  <div class="app">
    <h1>{{ title }}</h1>
    <input v-model="title" />
    <input type="text" :value="title" @input="e => title = e.target.value">
    <hr />

    <MyInput
      label="姓名"
      :model-value="form.user"
      @update:model-value="v => form.user = v"
    />
    <MyInput
      label="姓名"
      v-model="form.user"
    />
    <MyInput label="年龄" v-model="form.age" />
    <MyInput label="性别" v-model="form.sex" />
    <button>提交</button>
    {{ form }}

    <hr />
    <!-- <h2>num: {{ num }}</h2> -->
    <!-- <Test
      title="标题1111"
      :count="2"
      tipType="cc"
      @change="changeNum"
    /> -->
    <!--  @change="n => num += n" -->
  </div>
</template>

<style lang='scss' scoped>

</style>
