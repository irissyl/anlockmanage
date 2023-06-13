/**
 * @author https://vue-admin-beautiful.com （不想保留author可删除）
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layouts'
import EmptyLayout from '@/layouts/EmptyLayout'
import { publicPath, routerMode } from '@/config'

Vue.use(VueRouter)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/401'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: { title: '首页', icon: 'home', premissions: ['index'] },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          // icon: 'home',
          affix: true,
          premissions: ['index/index'],
        },
      },
    ],
  },

  {
    path: '/contentSettings',
    component: Layout,
    redirect: 'noRedirect',
    name: 'contentSettings',
    meta: {
      title: '基础内容设置',
      icon: 'users-cog',
      premissions: ['contentSettings'],
    },
    children: [
      {
        path: 'Campus',
        name: 'Campus',
        component: () => import('@/views/page/contentSettings/Campus/index'),
        meta: { title: '园区设置', premissions: ['Campus/index'] },
      },
      {
        path: 'Building',
        name: 'Building',
        component: () => import('@/views/page/contentSettings/Building/index'),
        meta: { title: '楼栋设置', premissions: ['Building/index'] },
      },
      {
        path: 'Department',
        name: 'Department',
        component: () =>
          import('@/views/page/contentSettings/Department/index'),
        meta: { title: '部门设置', premissions: ['Department/index'] },
      },
    ],
  },
  {
    path: '/deviceManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'deviceManagement',
    meta: {
      title: '智能设备管理',
      icon: 'unlock-alt',
      premissions: ['deviceManagement'],
    },
    children: [
      {
        path: 'DeviceStatistics',
        name: 'DeviceStatistics',
        component: () =>
          import('@/views/page/deviceManagement/DeviceStatistics/index.vue'),
        meta: { title: '设备统计', premissions: ['DeviceStatistics/index'] },
      },
      {
        path: 'lockDevice',
        name: 'lockDevice',
        component: () =>
          import('@/views/page/deviceManagement/lockDevice/index.vue'),
        meta: { title: '门锁设备', premissions: ['lockDevice/index'] },
      },
      {
        path: 'GatewayDevice',
        name: 'GatewayDevice',
        component: () =>
          import('@/views/page/deviceManagement/GatewayDevice/index.vue'),
        meta: { title: '网关设备', premissions: ['GatewayDevice/index'] },
      },
      {
        path: 'Water',
        name: 'Water',
        component: () =>
          import(
            '@/views/page/deviceManagement/Water_meter_equipment/index.vue'
          ),
        meta: {
          title: '水电表设备',
          premissions: ['Water_meter_equipment/index'],
        },
      },
    ],
  },
  {
    path: '/operatorManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'operatorManagement',
    meta: {
      title: '操作员管理',
      icon: 'person-booth',
      premissions: ['operatorManagement'],
    },
    children: [
      {
        path: 'operator',
        name: 'operator',
        component: () => import('@/views/page/operatorManagement/index'),
        meta: {
          title: '操作员列表',
          icon: 'person-booth',
          premissions: ['operatorManagement/index'],
        },
      },
      {
        path: 'operatorHouse',
        name: 'operatorHouse',
        component: () =>
          import('@/views/page/operatorManagement/operatorHouse/index.vue'),
        meta: {
          title: '操作员房间权限',
        },
      },
    ],
  },
  {
    path: '/officePersonnel',
    component: Layout,
    redirect: 'noRedirect',
    name: 'officePersonnel',
    meta: {
      title: '人员管理',
      icon: 'chalkboard-teacher',
      premissions: ['officePersonnel'],
    },
    children: [
      {
        path: 'office',
        name: 'office',
        component: () => import('@/views/page/officePersonnel/index'),
        meta: {
          title: '办公室人员管理',
          premissions: ['officePersonnel/index'],
        },
      },
      {
        path: 'dormitory',
        name: 'dormitory',
        component: () => import('@/views/page/dormitoryPersonnel/index'),
        meta: {
          title: '宿舍人员管理',
          premissions: ['dormitoryPersonnel/index'],
        },
      },
    ],
  },
  {
    path: '/roomList',
    name: 'roomList',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '房间管理',
      icon: 'users-cog',
      premissions: ['roomList'],
    },
    children: [
      {
        path: 'roomList',
        name: 'roomList',
        component: () => import('@/views/page/roomList/index'),
        meta: {
          title: '房间列表',
          premissions: ['roomList/index'],
        },
      },
    ],
  },
  {
    path: '/appointmentReview',
    name: 'appointmentReview',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '预约管理',
      icon: 'calendar-alt',
      premissions: ['appointmentReview'],
    },
    children: [
      {
        path: '/reserve',
        name: 'reserve',
        component: () => import('@/views/page/appointmentReview/index'),
        meta: {
          title: '预约审核',
          premissions: ['appointmentReview/index'],
        },
      },
    ],
  },
  {
    path: '/systemSettings',
    component: Layout,
    redirect: 'noRedirect',
    name: 'systemSettings',
    meta: {
      title: '系统设置',
      icon: 'unlock-alt',
      premissions: ['systemSettings'],
    },
    children: [
      {
        path: 'Networking',
        name: 'Networking',
        component: () => import('@/views/page/systemSettings/Networking/index'),
        meta: { title: '联网锁设置', premissions: ['Networking/index'] },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/page/systemSettings/index'),
        meta: { title: '公司设置', premissions: ['systemSettings/index'] },
      },
    ],
  },
]

export const asyncRoutes = []

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})

export function resetRouter() {
  location.reload()
}

export default router
