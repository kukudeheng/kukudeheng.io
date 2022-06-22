<template>
  <div>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view></router-view>
    <div class="box"></div>
    <div class="box1"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.box {
  width: 200px;
  height: 50px;
  background-color: aqua;
}
.box1 {
  width: 1020px;
  height: 50px;
  background-color: rgb(77, 255, 0);
}
</style>
