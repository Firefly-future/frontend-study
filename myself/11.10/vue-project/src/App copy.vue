<script>

export default {
  data() {
    return {
      title: '这是<span style="color:#fff">vue</span> ',
      num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      number: 100,
      show: true,
      list: {
        name: '小明',
        age: '22',
        gender: '男'
      },
      form:{
        name:'小明',
        age:21,
        gender:1,
        married:true,
        city:'beijing',
        hobby:['唱歌'],
        remark:'我是默认备注'
      }
    }
  },
  methods: {
    add() {
      this.number++
    },
    push() {
      this.num.push(Math.random())
    },
    update(index) {
      this.num[index] = Math.random()
    },
    log(text) {
      alert(text)
    },
    submit(){
      console.log(this)
      console.log(this.$refs.title.getBoundingClientRect())
      console.log(this.$refs.title)
      console.log(document.querySelector('h1'))
    }
  }
}
</script>

<template>
  <div class="box">
    <h1 ref="title">{{ title }}</h1>
    <button @click="submit">提交</button>
    <!-- <p>姓名：<input type="text" v-model.trim.lazy="form.name"></p>
    <p>年龄：<input type="text" v-model.number="form.age"></p>
    <p>性别：
      <input type="radio" id="man" name="gender" value="1" v-model="form.gender"><label for="man">男</label>
      <input type="radio" id="woman" name="gender" value="0" v-model="form.gender"><label for="woman">女</label>
    </p>
    <p>
      已婚：<input type="checkbox" v-model="form.married">
    </p>
    <p>
      城市：<select name="" id="" v-model="form.city">
        <option value="beijing">北京</option>
        <option value="tianjin">天津</option>
        <option value="chongqing">重庆</option>
        <option value="shanghai">上海</option>
      </select>
    </p>
    <p>
      爱好：
      <input type="checkbox"  id="sing" v-model="form.hobby"   value="唱歌"><label for="sing">唱歌</label>
      <input type="checkbox"  id="dance" v-model="form.hobby"   value="跳舞"><label for="dance">跳舞</label>
      <input type="checkbox"  id="rap" v-model="form.hobby"   value="rap"><label for="rap">Rap</label>
      <input type="checkbox"  id="back" v-model="form.hobby"   value="篮球"><label for="back">篮球</label>
    </p>
     <p>
      备注：
      <textarea name="" id="" v-model="form.remark"></textarea>
     </p>
     <button @click="submit">提交</button>
     <div>{{ form }}</div> -->




    <!-- <a href="http://baidu.com" @click.prevent="log('a标签')">链接</a>
    <div class="child" @click.self="log('按钮集合')">
      <button @click="log('按钮一')">按钮一</button>
      <button @click="log('按钮二')">按钮二</button>
      <button @click.once="log('按钮三')">按钮三</button>
    </div>
    <div class="child" :style="[{background:'#defb53',width:'300px',height:'150px' },{border:'5px solid'}]"></div> -->


    <!-- <h1 v-text="title"></h1> -->


    <!-- <h1 v-html="title"></h1>
    <ul>
      <li v-for="(val, index) in num" :key="val">
        <p>值：{{ val }}</p>
        <p>下标：{{ index }}</p>
      </li>
    </ul> -->
    <!-- <div>
      <ul>
        <li v-for="(val, key, index) in list" :key="key">
          <p>属性：{{ key }}</p>
          <p>值：{{ val }}</p>
          <p>下标：{{ index }}</p>
        </li>
      </ul>
    </div> -->
    <!-- <div v-show="show" class="child red"></div>
    <div v-if="number > 50 && num < 70" class="child black" name="if"></div>
    <div v-else-if="number >= 70 && num < 100" class="child black" name="else if"></div>
    <div v-else class="child black" name="else"></div> -->


    <!-- <div>
      <button>修改标题</button>
      <input type="text" @input="e => title = e.target.value">
      <button @click="number--">-</button>
      {{ number }}
      <button v-on:click="number++">+</button>
      <button v-on:click="add">+</button>
    </div> -->



    <!-- <div>
      <ul>
        <li v-for="(val, index) in num" :key="val">
          <p>
            <span>{{ val }}</span>|||
            <span>{{ index }}</span>
            <button @click="update(index)">修改</button>
            <button @click="num.splice(index,1)">删除</button>
            <button @click="push">添加</button>
          </p>
        </li>
      </ul>
    </div> -->
    
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
