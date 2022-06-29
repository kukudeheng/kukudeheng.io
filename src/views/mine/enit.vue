<template>
  <div class="enit">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.push('/layout/mine')"
    ></van-nav-bar>
    <!-- 修改图片布局 -->
    <van-uploader :before-read="beforeread" :after-read="afterread">
      <div class="tu">
        <img class="xzq" :src="userinfo.photo" alt="" />
      </div>
    </van-uploader>

    <van-cell-group>
      <van-cell
        title="名称"
        :value="userinfo.name"
        is-link
        @click="nameShow = true"
      />
      <van-cell
        title="性别"
        @click="genderShow = true"
        :value="userinfo.gender | genders"
        is-link
      />
      <van-cell
        title="生日"
        :value="userinfo.birthday"
        is-link
        @click="birthdayShow = true"
      />
    </van-cell-group>
    <van-popup v-model="nameShow" style="width:80%">
      <h3 class="title">修改昵称</h3>
      <van-field class="field" v-model.trim="name"></van-field>
      <div class="btn">
        <van-button class="btn-item" @click="nameShow = false">取消</van-button>
        <van-button class="btn-item" @click="nameSubmit"
          ><span style="color:red">确定</span></van-button
        >
      </div>
    </van-popup>
    <!-- 性别修改 -->
    <van-popup v-model="genderShow" style="width:100%" position="bottom">
      <van-nav-bar
        title="修改性别"
        left-text="取消"
        @click-left="genderShow = false"
      ></van-nav-bar>
      <van-cell title="男" is-link @click="genderSubmit(0)"></van-cell>
      <van-cell title="女" is-link @click="genderSubmit(1)"></van-cell>
    </van-popup>
    <!-- 修改生日 -->
    <!-- v-model:当前的时间值（时间对象） -->
    <!-- type：时间类型，默认data，年月日选择 -->
    <!-- title：标题 -->
    <!-- min-data：最小时间 -->
    <!-- max-data：最大时间 -->
    <van-popup v-model="birthdayShow" position="bottom" @closed="birthdayadd">
      <van-datetime-picker
        v-model="birthday"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="birthdayShow = false"
        @confirm="birthdaySubmit"
      ></van-datetime-picker>
    </van-popup>
    <!-- 裁剪图片 -->
    <div class="crop" v-if="cropShow">
      <VueCropper
        :img="imgBase64"
        ref="cropper"
        autoCrop
        autoCropWidth="200px"
        autoCropHeight="200px"
        fixed
      ></VueCropper>
      <div class="crop-btn">
        <van-button class="crop-item" style="color:red" @click="cropSubmit"
          >裁剪</van-button
        >
        <van-button class="crop-item" @click="cropShow = false"
          >取消</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 导入moment
import moment from 'moment'
// 导入api
import { userprofilePatch, userPhotoPatch } from '../../api/mine'
// 引入 Vue Cropper
import { VueCropper } from 'vue-cropper'
export default {
  components:{
VueCropper
  },
  data () {
    return {
      nameShow: false,
      genderShow: false,
      name: this.$store.state.userinfo.name,
      minDate: new Date('1979-01-01'),
      maxDate: new Date(),
      birthday: new Date(this.$store.state.userinfo.birthday),
      birthdayShow: false,
      cropShow: false,
      imgBase64: ''
    }
  },
  computed: {
    ...mapState(['userinfo'])
  },
  created () {
    // this.$store.dispatch('getuserinfo')
  },

  mounted () {},

  methods: {
    async setUser (key, value) {
      // console.log(111)
      if (value === this.userinfo[key] || value === '') {
        this.$toast.fail('请修后再提交')
        return
      }
      await userprofilePatch({
        [key]: value
      })
      this.$toast.success('修改成功')
      this[key + 'Show'] = false
      this.$store.commit('setuserinfo', {
        ...this.userinfo,
        [key]: value
      })
    },
    // 修改昵称
    async nameSubmit () {
      this.setUser('name', this.name)
    },
    // 修改性别
    async genderSubmit (num) {
      this.setUser('gender', num)
      // if (num === this.userinfo.gender) {
      //   this.$toast.fail('请修后再提交')
      //   return
      // }
      // // 调用接口修改性别
      // await userprofilePatch({
      //   gender: num
      // })
      // // 提示一下
      // this.$toast.success('修改性别成功')
      // // 关闭弹窗
      // this.genderShow = false
      // // 通过mutations方法更新用户信息
      // this.$store.commit('setuserinfo', {
      //   ...this.userinfo,
      //   gender: num
      // })
    },
    // 关闭弹出层且动画结束后触发
    birthdayadd () {
      this.birthday = new Date(this.$store.state.userinfo.birthday)
    },
    // 修改生日
    birthdaySubmit () {
      this.setUser(
        'birthday',
        moment(this.birthday).format('YYYY-MM-DD'),
        'birthdayShow'
      )
    },
    // 图片上传前的限制
    beforeread (file) {
      const typeArr = ['image/png', 'image/jpeg']
      const limitType = typeArr.includes(file.type)
      if (!limitType) {
        this.$toast.fail('请上传png或jpg的图片')
      }
      const limitSize = file.size / 1024 / 1024 < 1
      if (!limitSize) {
        this.$toast.fail('请上传1MB以内的图片')
      }
      return limitType && limitSize
    },
    // 上传后的处理
    afterread (res) {
      this.cropShow = true
      this.imgBase64 = res.content
      // console.log('afterread', res)
    },
    // 裁切方法
    cropSubmit () {
      this.$refs.cropper.getCropBlob(async res => {
        const formData = new FormData()
        formData.append('photo', res)
        const res2 = await userPhotoPatch(formData)
        this.$store.commit('setuserinfo', {
          ...this.userinfo,
          photo: res2.data.data.photo
        })
        this.$toast.success('更新头像成功')
        // 关闭弹窗
        this.cropShow = false
        // console.log(res2)
      })
    }
  },
  // 监听器
  watch: {
    nameShow: {
      handler (newval) {
        if (!newval) {
          this.name = this.$store.state.userinfo.name
        }
      }
    }
  },
  // 过滤器
  filters: {
    genders (val) {
      return val === 0 ? '男' : '女'
    }
  }
}
</script>

<style lang="less" scoped>
.tu {
  text-align: center;
  width: 100vw;
  .xzq {
    text-align: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 10px 0;
    // background-size: cover;
    object-fit: cover;
  }
}
.title {
  text-align: center;
  padding: 15px;
}
.van-popup {
  border-radius: 20px;
}
.field {
  border-top: 1px solid white;
}
.btn {
  display: flex;
  .btn-item {
    flex: 1;
  }
}
// 图片裁剪样式
.crop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  .crop-btn {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    justify-content: space-between;
    .crop-item {
      flex: 1;
    }
  }
}
</style>
