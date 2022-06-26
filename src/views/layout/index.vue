<template>
  <div> 
    <router-view></router-view>
    <van-tabbar route v-if="!$route.meta.noTob">
      <van-tabbar-item icon='home-o' to='/layout/home'>首页</van-tabbar-item>
      <van-tabbar-item icon='chat-o' to='/layout/question'>问答</van-tabbar-item>
      <van-tabbar-item icon='video-o' to='/layout/video'>视频</van-tabbar-item>
      <van-tabbar-item icon='friends-o' to='/layout/mine'>我的</van-tabbar-item>
    </van-tabbar>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>