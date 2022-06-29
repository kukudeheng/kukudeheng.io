import moment from 'moment'
moment.locale('zh-cn')
const obj = {
  formatData: (val, val2) => {
    const diffTime = moment().diff(moment(val), 'hours')
    if (diffTime < 1) {
      return '刚刚'
    } else if (diffTime <= 24) {
      return '一天内'
    } else {
      return val
    }
  }
}

export default {
  install (Vue) {
    Object.entries(obj).forEach(item => {
      Vue.filter(item[0], item[1])
    })
  }
}
