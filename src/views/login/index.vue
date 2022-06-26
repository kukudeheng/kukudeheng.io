<template>
  <div>
    <van-nav-bar title="登录"></van-nav-bar>
    <van-form ref="from">
      <van-field
        :rules="rules.mobile"
        v-model="form.mobile"
        label="手机号"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        :rules="rules.code"
        v-model="form.code"
        label="验证码"
        placeholder="请输入验证码"
      ></van-field>
    </van-form>
    <div class="too">
      <van-button
        :loading="loading"
        loading-text="加载中..."
        round
        type="info"
        block
        @click="submit"
        >点击登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { authorizations } from '../../api/login'
export default {
  data () {
    return {
      loading: false,
      form: {
        mobile: '16637046798',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '必填', trigger: 'onBlur' },
          {
            // pattern:/^1[3-9]\d{9}$/,
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '请输入正确的手机号',
            trigger: 'onChange'
          }
        ],
        code: [
          { required: true, message: '必填', trigger: 'onBlur' },
          {
            pattern: /^\d{6}$/,
            message: '请输入六位数验证码',
            trigger: 'onChange'
          },
          {
            // validator:value=>{
            //   return  value==='246810'
            // },
            // message:'验证码错误',
            // trigger:'onChange',
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.from
        .validate()
        .then(async () => {
          console.log('通过')
          this.loading = true
          try {
            const res = await authorizations(this.form)
            console.log('接口返回值', res)
            this.$store.commit('setToken',res.data.data)
            this.$toast.success('登录成功')
            // 跳转到首页
            // 有回跳地址就跳转到跳转地址，没有就跳转到首页
            this.$router.push(this.$route.query.back || '/')
          } catch (error) {
            // this.$toast.fail(error.response.data.message);
            console.log(error)
          } finally {
            this.loading = false
          }
        })
        .catch(() => {
          console.log('失败')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
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
