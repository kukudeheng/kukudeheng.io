<template>
<div>
  <van-nav-bar title="登录"></van-nav-bar>
<van-field  label="手机号"></van-field>
<van-field  label="验证码"></van-field>
<div class="too">
  <van-button round type="info" block>酷酷的恒</van-button>
</div>
</div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.van-nav-bar{

    // 导航栏背景颜色
    background-color: #3196fa !important;

    // 导航栏标题颜色为白色
    ::v-deep.van-nav-bar__title {

        color: #fff;
    }
}
.too {
  padding: 10px 15px;
}
</style>