<script>
// const time1=setTimeout({},2000)

export default {
  data() {
    return {
      Index: 0,
      title: ['🔽', '🔼'],
      list: [
        '张三',
        '李四',
        '王五',
        '马六',
        '赵四',
        '王二'
      ],
      checkedItems: []
    }
  },
  created() {
    // 初始化 checkedItems，默认都是 false
    this.checkedItems = new Array(this.list.length).fill(false);
  },
  computed: {
    selectedText() {
      const selected = []
      this.list.forEach((item, index) => {
        if (this.checkedItems[index]) {
          selected.push(item)
        }
      })
      return selected
    }
  },
  methods: {
    change() {
      this.Index = this.Index === 1 ? 0 : 1
    },
    toggleCheckbox(index) {
      this.checkedItems[index] = !this.checkedItems[index]
    },
    removeSelected(value){
      const index=this.list.indexOf(value)
      if(index !== -1){
        this.checkedItems[index]=false
      }
    }
  }
}

</script>

<template>
  <div class="box">
    <h4>xm-select下拉框多选带搜索实例</h4>
    <div class="select" @click="change()"><span v-if="selectedText.length === 0">请选择</span>
      <span class="selected" v-else v-for="(value, index) in selectedText" :key="value">{{ value }} <i @click.stop="removeSelected(value)">x</i></span>
      <span class="up-down">{{ title[Index] }}</span>
    </div>
    <div v-show="Index === 1" class="down-show">
      <i></i><input type="text" placeholder="请选择" class="inp" >
      <ul>
        <li v-for="(item, index) in list" :key="item" @click="toggleCheckbox(index)">
          <div><input type="checkbox" :id="index" name="" v-model="checkedItems[index]"><label :for="index">
              {{ item }}</label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}

html,
body {
  // width: 100vw;
  // height: 100vh;
  background-color: #FFFFFF;
  padding: 10px;
}

.select {
  padding: 5px 0;
  margin-top: 7px;
  opacity: 0.5;
  width: 400px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  position: relative;
  .up-down {
    position: absolute;
    right: 0;
    top: 0;
  }

  &:hover {
    cursor: pointer;
    border-color: bisque;
  }
}

.down-show {
  min-height: 36px;
  width: 400px;
  position: relative;
  border: 1px solid rgba($color: #000000, $alpha: .1);
  padding: 0 10px;

  i {
    display: block;
    position: absolute;
    background-image: url(../public/图标_搜索图标-01.png);
    background-repeat: no-repeat;
    width: 16px;
    height: 36px;
    left: 13px;
    top: 7px;
    background-size: contain;
    cursor: pointer;
  }

  .inp {
    width: 100%;
    padding: 3px 0;
    padding-left: 20px;
    outline: none;
    border: none;
    border-bottom: 1px solid;
    border-bottom-color: rgba($color: #000000, $alpha: .1);
  }

  ul {
    max-height: 150px;
    overflow-y: auto;

    li {
      div {
        pointer-events: none;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }

      &:hover {
        background-color: #F2F2F2;
        cursor: pointer;
      }
    }
  }
}

.selected {
  margin-left: 3px;
  background-color: #009688;
  color: #FFFFFF;
  padding: 0 7px;
}
</style>
