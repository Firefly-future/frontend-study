<script>
export default {
    props:['articles'],
    methods :{
        change(index){
            this.$emit('changeIndex',index)
        }
    }
}

</script>

<template>
<div class="list">
      <nav><span class="article active">文章列表</span><span class="custom">自定义</span></nav>
      <div class="right">
        <header>
          <input type="text"> <button class="search">查找</button>
        </header>
        <main>
          <div class="list-box">
            <div class="list-item" v-for="(item,index) in articles" :key="index" @click="change(index)">
              <h6>{{ item.title }}</h6>
            </div>
          </div>
        </main>
      </div>
    </div>
</template>

<style lang="scss" scoped>

.list {
  nav {
    height: 20px;
    font-size: 13px;
    span {
      padding: 3px;
      padding-bottom: 0;
      cursor: pointer;
      border: 1px solid #ccc;
      border-bottom: none;
      border-radius: 5px;
    }
  }
}

.right {
  width: 140px;
  height: 200px;
  border: 1px solid #ccc;

  header {
    height: 20px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px 0 0 0;
    margin-bottom: 5px;

    input {
      height: 20px;
      width: 80px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 0 5px;
      outline: none;
    }

    button {
      font-size: 10px;
      height: 20px;
      width: 40px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #247AD2;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .list-box {
    border: 1px solid #ccc;
    height: 175px;
    overflow-y: scroll;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 5px;

    .list-item {
      height: 20px;
      font-size: 13px;
      padding: 3px;
      font-weight: normal;
      cursor: pointer;

      &:hover {
        background-color: #ADCE89;
        color: #fff;
      }
    }
  }
}

.active{
    background-color: #ADCE89;
    color: #fff;
}
</style>