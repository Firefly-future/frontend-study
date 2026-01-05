<script>
function getByteLength(str) {
  let totalLength = 0
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)
    if (charCode < 0x007f) {
      totalLength += 1//ASCII字符占用一个字节
    } else if (charCode >= 0x0080 && charCode <= 0xffff) {
      totalLength += 2
    }
  }
  return totalLength
}
export default {
  created() {
    const savedComments = JSON.parse(localStorage.getItem('comments') || '[]')
    this.list = savedComments
  },
  data() {
    return {
      currentIndex: 0,
      img: [
        '../public/face1.gif',
        '../public/face2.gif',
        '../public/face3.gif',
        '../public/face4.gif',
        '../public/face5.gif',
        '../public/face6.gif',
        '../public/face7.gif',
        '../public/face8.gif'],
      num: 140,
      form: {
        username: '',
        textarea: '',
        img: '',
        time: new Date().toISOString().slice(0, 10)
      },
      list: []
    }
  },
  methods: {
    currentActive(index) {
      this.form.img = this.img[index]
      this.currentIndex = index
    },
    unshift() {
      if (!this.form.username.trim()) {
        alert('用户名为必填项')
      } else if (!this.form.textarea.trim()) {
        alert('随便说点什么吧')
      } else if (this.form.textarea.trim().length > 140) {
        alert('超出最大字数限制')
      } else {
        const comments = { ...this.form }
        console.log(comments)
        this.list.unshift(comments)
        const existingComments = JSON.parse(localStorage.getItem('comments') || '[]')
        existingComments.unshift(comments)
        localStorage.setItem('comments', JSON.stringify(existingComments))
        this.form.username = ''
        this.form.textarea = ''
        this.form.img = img[this.currentIndex]
      }
    },
    del(index) {
      this.list.splice(index, 1)
      localStorage.setItem('comments', JSON.stringify(this.list))
    }
  },
  computed: {
    len() {
      return Math.floor(140 - (getByteLength(this.form.textarea) / 2))
    }
  }
}
</script>

<template>
  <div class="container">
    <h5>来,说说你在做什么,想什么</h5>
    <div class="box">
      <input type="text" v-model.trim="form.username" required placeholder="请输入用户名">
      <img v-for="(item, index) in img" :src="item" :class="{ current: currentIndex === index }"
        @click="currentActive(index)" src="" alt="">
      <!-- <img src="https://www.jq22.com/demo/jquery-lyb20151124/img/face1.gif" alt="" class="current">
      <img src="https://www.jq22.com/demo/jquery-lyb20151124/img/face2.gif" alt="">
      <img src="https://www.jq22.com/demo/jquery-lyb20151124/img/face3.gif" alt="">
      <img src="https://www.jq22.com/demo/jquery-lyb20151124/img/face4.gif" alt="">
      <img src="https://www.jq22.com/demo/jquery-lyb20151124/img/face5.gif" alt="">
      <img src="https://www.jq22.com/demo/jquery-lyb20151124/img/face6.gif" alt="">
      <img src="https://www.jq22.com/demo/jquery-lyb20151124/img/face7.gif" alt="">
      <img src="https://www.jq22.com/demo/jquery-lyb20151124/img/face8.gif" alt=""> -->
    </div>
    <textarea placeholder="请输入留言" name="" id="" v-model="form.textarea"></textarea>
    <div class="form">
      <h3>
        {{ len >= 0 ? '还能输入' : '已超出' }}
        <span :class="{ red: len < 0 }">
          {{ Math.abs(len) }}</span>个字</h3><button
        @click="unshift"></button>
    </div>
    <div class="comment">
      <header>
        <h4>大家在说</h4>
      </header>
      <main>
        <ul>
          <li v-for="(val, index) in list" :key="val">
            <div class="comment-item">
              <!-- <div class="pic"><img src="https://www.jq22.com/demo/jquery-lyb20151124/img/face1.gif" alt=""></div> -->
              <div class="pic"><img :src="val.img" alt=""></div>
              <div class="content">
                <p><a href="">{{ val.username }}</a>：<span>{{ val.textarea }}</span></p>
                <p class="time-del">{{ val.time }}
                <p @click="del(index)">删除</p>
                </p>
              </div>
            </div>

          </li>
        </ul>
      </main>
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
  background: #A7AB8C;
  width: 100vw;
  height: 100vh;
}

.container {
  width: 400px;
  min-height: 500px;
  margin: 15px auto 0;
  border: 1px solid #ccc;
  background: #FFFFFF;
  padding: 10px 20px;

  h5 {
    font-weight: normal;
  }

  .box {
    margin: 5px 0 5px;
    display: flex;
    align-items: center;

    input {
      padding: 3px 4px;
      outline: none;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    img {
      width: 20px;
      margin-right: 5px;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0.5;

      &:hover {
        opacity: 1;
      }

      &.current {
        opacity: 1;
      }
    }
  }

  textarea {
    width: 100%;
    height: 80px;
    padding: 3px 4px;
    outline: none;
    border-radius: 10px;
    border: 1px solid #ccc;
    resize: none;
  }

  .form {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    h3 {
      font-size: 12px;
      color: #ccc;

      span {
        font-size: larger;
        font-style: italic;

        &.red {
          color: tomato;
        }
      }
    }

    button {
      // padding: 0px 25px;
      // border-radius: 5px;
      // background: radial-gradient(#96CF0F, #92CD12, #8AC61B);
      // color: #FFFFFF;
      // cursor: pointer;
      // border: 1px solid #ccc;
      // margin-left: 10px;

      // &.active {
      //   background: radial-gradient(#80be0f, #567c04, #96CF0F);
      // }
      background: url(../public/btn.png) no-repeat;
      // background-size: 112px 60px;
      border: 0;
      width: 112px;
      height: 30px;
      cursor: pointer;
      margin-left: 10px;
    }
  }

  .comment {
    margin-top: 10px;

    header {
      height: 24px;
      background: #E3EAEC;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      h4 {
        background: #FFFFFF;
        font-size: 12px;
        color: #000000;
        width: 80px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        margin-left: 20px;
        font-weight: normal;
      }
    }

    main {
      ul {
        li {
          padding: 5px 10px;
          min-height: 73px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          border-bottom: 1px dashed #A7AB8C;

          .comment-item {
            display: flex;
            align-items: center;
            width: 100%;
          }

          &:hover {
            background: #F5F5F5;

            .time-del p {
              display: block;
            }
          }

          .content {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            flex: 1;
          }

          .time-del {
            display: flex;
            justify-content: space-between;
            align-items: center;

            >p {
              font-size: 8px;
              color: #ccc;
              cursor: pointer;
              display: none;

              &:hover {
                color: blue;
                text-decoration: underline;
              }
            }
          }

        }
      }
    }
  }
}
</style>
