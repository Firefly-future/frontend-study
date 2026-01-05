<script>
export default {
  props: ['list']
}
</script>

<template>
  <div class="cart-list">
    <div class="cart-content">
      <div class="cart-header">
        <b>购物车</b>
        <span>清空</span>
      </div>
      <ul class="list">
        <li v-for="food in list" :key="food.name">
          <div class="name">{{ food.name }}</div>
          <div class="price">¥{{ food.price }}</div>
          <div class="btns">
            <button>-</button>
            {{ food.count }}
            <button>+</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.cart-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: .5);
}
.cart-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: 48px;
  background: #fff;
}
.cart-header {
  background: #f3f5f7;
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  b {
    color: #333;
    font-weight: normal;
    font-size: 14px;
  }
  span {
    color: #00a0dc;
    font-size: 12px;
  }
}
.list {
  background: #fff;
  max-height: 300px;
  overflow: auto;
  li {
    display: flex;
    padding: 8px 10px;
    .price {
      flex: 1;
      margin: 0 10px;
      color: tomato;
      text-align: right;
    }
  }
}
</style>
