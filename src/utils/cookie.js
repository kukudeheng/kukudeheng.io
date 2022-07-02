// 导入
import jscookie from 'js-cookie'
// 获取cookie
export function getcookie (key) {
  return jscookie.get(key)
}
// 存储cookie
export function setcookie (key, value) {
  jscookie.set(key, value)
}
// 删除
export function removecookie (key) {
  jscookie.remove(key)
}
