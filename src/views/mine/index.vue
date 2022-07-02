<template>
  <div class="mine">
    <div class="top">
      <img class="avatar" :src="useinfo.photo" alt="" />
      <div class="use-info">
        <div class="heima">{{ useinfo.name }}</div>
        <div class="riqi">{{ useinfo.birthday }}</div>
      </div>
    </div>
    <div class="middon">
      <div class="item">
        <van-icon class="icon" name="newspaper-o" />
        <div class="text">我的作品</div>
      </div>
      <div class="item">
        <van-icon class="icon" name="star-o" />
        <div class="text">我的收藏</div>
      </div>
      <div class="item">
        <van-icon class="icon" name="tosend" />
        <div class="text">阅读历史</div>
      </div>
    </div>
    <div class="bottom">
      <van-cell-group>
        <van-cell
          title="编辑资料"
          is-link
          icon="edit"
          to="/mine/enit"
        ></van-cell>
        <van-cell title="小智同学" is-link icon="chat-o" to="/chat"></van-cell>
        <van-cell title="系统设置" is-link icon="setting-o"></van-cell>
        <van-cell
          title="退出登录"
          is-link
          icon="warning-o"
          @click="exit"
        ></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userprofile } from '../../api/mine'
export default {
  data () {
    return {
      useinfo: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await userprofile()
      this.useinfo = res.data.data
      // console.log('用户信息', res)
    },
    // 退出点击
    exit () {
      this.$store.commit('logout')
    }
  },
   computed: {
      ...mapState(['userinfo'])
    },
}
</script>

<style lang="less" scoped>
.top {
  background-color: #3296fa;
  padding: 25px 10px;
  display: flex;
  align-items: center;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .use-info {
    color: white;
    font-size: 16px;

    .heima {
      font-weight: 700;
      margin-bottom: 5px;
      font-size: 20px;
    }
    .riqi {
      background-color: white;
      color: #3296fa;
    }
  }
}
.middon {
  display: flex;
  align-items: center;
  .item {
    flex: 1;
    padding: 20px 0;
    text-align: center;
    .icon {
      font-size: 26px;
      margin-bottom: 10px;
    }
    &:nth-child(1) {
      .icon {
        color: #8eabff;
      }
    }
    &:nth-child(2) {
      .icon {
        color: #ff3800;
      }
    }
    &:nth-child(3) {
      .icon {
        color: #ffaf46;
      }
    }
  }
}
</style>
