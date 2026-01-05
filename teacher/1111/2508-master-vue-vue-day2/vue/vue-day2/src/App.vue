<script>
const avatarList = [
  "https://www.jq22.com/demo/jquery-lyb20151124/img/face1.gif",
  "https://www.jq22.com/demo/jquery-lyb20151124/img/face2.gif",
  "https://www.jq22.com/demo/jquery-lyb20151124/img/face3.gif",
  "https://www.jq22.com/demo/jquery-lyb20151124/img/face4.gif",
  "https://www.jq22.com/demo/jquery-lyb20151124/img/face5.gif",
  "https://www.jq22.com/demo/jquery-lyb20151124/img/face6.gif",
  "https://www.jq22.com/demo/jquery-lyb20151124/img/face7.gif",
  "https://www.jq22.com/demo/jquery-lyb20151124/img/face8.gif"
]

function getByteLength(str) {
  let totalLength = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode < 0x007f) {
      totalLength += 1; // ASCII字符占用一个字节
    } else if (charCode >= 0x0080 && charCode <= 0xffff) {
      totalLength += 2; // 一个字节的UTF-8字符占用两个字节
    }
  }
  return totalLength;
}

export default {
  data () {
    return {
      avatarList,
      activeIndex: 0,
      form: {
        username: '',
        msg: ''
      },
      messageList: JSON.parse(localStorage.getItem('messageList')) || []
    }
  },
  methods: {
    submit() {
      if (!this.form.username || !this.form.msg) {
        alert('请输入用户名和消息！')
        return
      }
      this.messageList.push({
        ...this.form,
        avatar: this.avatarList[this.activeIndex],
        id: Date.now(),
        time: new Date().toLocaleString()
      })
      this.form.msg = ''
    },
    remove(index) {
      console.log('删除');
      this.messageList.splice(index, 1)
    }
  },
  watch: {
    messageList: {
      handler() {
        localStorage.setItem('messageList', JSON.stringify(this.messageList))
      },
      deep: true
    }
  },
  computed: {
    len() {
      return Math.floor(160 - (getByteLength(this.form.msg) / 2))
    }
  }
}
</script>

<template>
  <div class="wrap">
    <div class="form">
      <h2>来 , 说说你在做什么 , 想什么</h2>
      <div class="user">
        <input type="text" v-model.trim="form.username" placeholder="请输入用户名">
        <ul>
          <li
            v-for="(item, index) in avatarList"
            :key="item"
            :class="{ active: activeIndex === index }"
            @click="activeIndex = index"
          >
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
      <textarea v-model.trim="form.msg" placeholder="请输入留言" name="" id=""></textarea>
      <div class="submit">
        <div class="desc">
          {{ len >= 0 ? '还能输入' : '已超出'}}
          <span :class="{ red: len < 0 }">{{ Math.abs(len) }}</span>
          个字
        </div>
        <button @click="submit">广播</button>
      </div>
    </div>
    <div class="list">
      <h2>大家说</h2>
      <div class="message-list">
        <div
          class="message"
          v-for="(item, index) in messageList"
          :key="item.id"
        >
          <div class="avatar">
            <img :src="item.avatar" alt="">
          </div>
          <div class="content">
            <div class="msg-info">
              <span>{{ item.username }}:</span>
              {{ item.msg }}
            </div>
            <div class="time">
              <span>{{ item.time }}</span>
              <span class="remove" @click="remove(index)">删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
li {
  list-style: none;
}
body {
  background: #a8ab8f;
  padding: 20px;
}
.wrap {
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  width: 500px;
  margin: 0 auto;
}
.form {
  h2 {
    font-size: 16px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    height: 120px;
    resize: none;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #a8ab8f;
  }
}
.user {
  display: flex;
  margin-bottom: 10px;
  input {
    width: 220px;
    height: 30px;
    outline: none;
    padding: 0 8px;
    border-radius: 5px;
    border: 1px solid #a8ab8f;
  }
  ul {
    display: flex;
    li {
      width: 30px;
      height: 30px;
      margin-left: 5px;
      opacity: 0.5;
      border-radius: 3px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      &:hover, &.active {
        opacity: 1;
        border: 1px solid salmon;
      }
    }
  }
}
.submit {
  display: flex;
  justify-content: flex-end;
  line-height: 30px;
  button {
    margin-left: 10px;
    width: 100px;
    height: 30px;
  }
  .desc {
    color: #999;
    span {
      font-weight: bold;
      font-size: 20px;
      padding: 0 5px;
    }
    .red {
      color: #ff6600;
    }
  }
}
.list {
  margin-top: 10px;
  h2 {
    font-size: 16px;
    font-weight: normal;
    background: #e3eaec;
    line-height: 35px;
    padding-left: 16px;
  }
}
.message {
  display: flex;
  padding: 10px;
  border-bottom: 1px dashed #a8ab8f;
  &:hover {
    background: #ebebe6;
    .remove {
      display: block;
    }
  }
}
.avatar {
  width: 50px;
  height: 50px;
  border: 1px solid #a8ab8f;
  border-radius: 3px;
  overflow: hidden;
  img {
    width: 50px;
    height: 50px;
  }
}
.content {
  padding-left: 10px;
  flex: 1;
}
.msg-info {
  font-size: 14px;
}
.time {
  font-size: 12px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  .remove {
    display: none;
    cursor: pointer;
  }
}
</style>
