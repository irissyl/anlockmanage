/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description 登录、获取用户信息、退出登录、清除accessToken逻辑，不建议修改
 */

import Vue from 'vue'
import { getUserInfo, login, logout, listMenuItem } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/utils/accessToken'
import { resetRouter } from '@/router'
import { title, tokenName } from '@/config'

const state = () => ({
  accessToken: getAccessToken(),
  username: '',
  avatar: '',
  permissions: [],
  menuList: [],
  scene: '',
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
  menuList: (state) => state.menuList,
  scene: (state) => state.scene,
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUsername(state, username) {
    state.username = username
  },
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  },
  setMenuList(state, menuList) {
    console.log(menuList, 'menuList')
    state.menuList = menuList
  },
  setScene(state, scene) {
    console.log(scene, 'menuList')
    state.scene = scene
  },
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async login({ commit }, userInfo) {
    const data = await login(userInfo)
    const accessToken = data[tokenName]
    const scene = data.scene
    console.log(data[tokenName], accessToken, data, scene, 'data2222')
    if (scene && scene == '办公室') {
      if (accessToken) {
        commit('setAccessToken', accessToken)
        const hour = new Date().getHours()
        const thisTime =
          hour < 8
            ? '早上好'
            : hour <= 11
            ? '上午好'
            : hour <= 13
            ? '中午好'
            : hour < 18
            ? '下午好'
            : '晚上好'
        Vue.prototype.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
      } else {
        Vue.prototype.$baseMessage(
          `登录接口异常，未正确返回${tokenName}...`,
          'error'
        )
      }
    } else {
      Vue.prototype.$baseMessage('请使用办公室账号登录!', 'error')
    }
  },
  async getUserInfo({ commit, state }) {
    const { data } = await getUserInfo(state.accessToken)
    if (!data) {
      Vue.prototype.$baseMessage('验证失败，请重新登录...', 'error')
      return false
    }
    let { permissions, username, avatar } = data
    if (permissions && username && Array.isArray(permissions)) {
      commit('setPermissions', permissions)
      commit('setUsername', username)
      commit('setAvatar', avatar)
      return permissions
    } else {
      Vue.prototype.$baseMessage('用户信息接口异常', 'error')
      return false
    }
  },
  async logout({ dispatch }) {
    try {
      await logout(state.accessToken)
    } catch (error) {
      console.log(error)
    }
    await dispatch('resetAccessToken')
    await resetRouter()
  },
  async getMenuItemList({ commit }) {
    const result = await listMenuItem()
    if (result.data && result.data.length >= 0) {
      console.log(result, 'result')
      commit('setMenuList', result.data)
    }
  },
  resetAccessToken({ commit }) {
    commit('setPermissions', [])
    commit('setAccessToken', '')
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
