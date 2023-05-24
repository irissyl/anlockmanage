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
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
          title: '首页',
          icon: 'home',
          affix: true,
        },
      },
    ],
  },
  /* {
    path: "/test",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test/index"),
        meta: {
          title: "test",
          icon: "marker",
          permissions: ["admin"],
        },
      },
    ],
  }, */
  {
    path: '/contentSettings',
    component: Layout,
    redirect: 'noRedirect',
    name: 'contentSettings',
    meta: { title: '基础内容设置', icon: 'users-cog' },
    children: [
      {
        path: 'Campus',
        name: 'Campus',
        component: () => import('@/views/page/contentSettings/Campus/index'),
        meta: { title: '园区设置' },
      },
      {
        path: 'Building',
        name: 'Building',
        component: () => import('@/views/page/contentSettings/Building/index'),
        meta: { title: '楼栋设置' },
      },
      {
        path: 'Department',
        name: 'Department',
        component: () =>
          import('@/views/page/contentSettings/Department/index'),
        meta: { title: '部门设置' },
      },
    ],
  },

  {
    path: '/operatorManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'operatorManagement',
    meta: { title: '操作员管理', icon: 'person-booth' },
    children: [
      {
        path: 'operator',
        name: 'operator',
        component: () => import('@/views/page/operatorManagement/index'),
        meta: {
          title: '操作员列表',
          icon: 'person-booth',
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
    meta: { title: '办公室人员管理', icon: 'chalkboard-teacher' },
    children: [
      {
        path: 'office',
        name: 'office',
        component: () => import('@/views/page/officePersonnel/index'),
        meta: {
          title: '办公室人员列表',
        },
      },
    ],
  },
  {
    path: '/dormitoryPersonnel',
    component: Layout,
    redirect: 'noRedirect',
    name: 'dormitoryPersonnel',
    meta: { title: '宿舍人员管理', icon: 'home' },
    children: [
      {
        path: 'dormitory',
        name: 'dormitory',
        component: () => import('@/views/page/dormitoryPersonnel/index'),
        meta: {
          title: '宿舍人员列表',
        },
      },
    ],
  },
  {
    path: '/deviceManagement',
    component: Layout,
    redirect: 'noRedirect',
    name: 'deviceManagement',
    meta: { title: '智能设备管理', icon: 'unlock-alt' },
    children: [
      {
        path: 'DeviceStatistics',
        name: 'DeviceStatistics',
        component: () =>
          import('@/views/page/deviceManagement/DeviceStatistics/index.vue'),
        meta: { title: '设备统计' },
      },
      {
        path: 'lockDevice',
        name: 'lockDevice',
        component: () =>
          import('@/views/page/deviceManagement/lockDevice/index.vue'),
        meta: { title: '门锁设备' },
      },
      {
        path: 'GatewayDevice',
        name: 'GatewayDevice',
        component: () =>
          import('@/views/page/deviceManagement/GatewayDevice/index.vue'),
        meta: { title: '网关设备' },
      },
      {
        path: 'Water',
        name: 'Water',
        component: () =>
          import(
            '@/views/page/deviceManagement/Water_meter_equipment/index.vue'
          ),
        meta: { title: '水电表设备' },
      },
    ],
  },

  {
    path: '/roomListManagement',
    name: 'roomListManagement',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '房间管理', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: 'roomList',
        name: 'roomList',
        component: () => import('@/views/page/roomList/index'),
        meta: {
          title: '房间列表',
          // permissions: ['dormitory'],
        },
      },
    ],
  },
  {
    path: '/appointmentReview',
    name: 'appointmentReview',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '预约管理', icon: 'users-cog', permissions: ['admin'] },
    children: [
      {
        path: '/reserve',
        name: 'reserve',
        component: () => import('@/views/page/appointmentReview/index'),
        meta: {
          title: '预约审核',
          // permissions: ['dormitory'],
        },
      },
    ],
  },
  {
    path: '/systemSettings',
    component: Layout,
    redirect: 'noRedirect',
    name: 'systemSettings',
    meta: { title: '系统设置', icon: 'unlock-alt' },
    children: [
      {
        path: 'Networking',
        name: 'Networking',
        component: () => import('@/views/page/systemSettings/Networking/index'),
        meta: { title: '联网锁设置' },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/page/systemSettings/index'),
        meta: { title: '公司设置' },
      },
    ],
  },

  // {
  //   path: '/vab',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'Vab',
  //   alwaysShow: true,
  //   meta: { title: '组件', icon: 'box-open' },
  //   children: [
  //     {
  //       path: 'permissions',
  //       name: 'Permission',
  //       component: () => import('@/views/vab/permissions/index'),
  //       meta: {
  //         title: '角色权限',
  //         permissions: ['admin', 'editor'],
  //       },
  //     },
  //     {
  //       path: 'icon',
  //       component: EmptyLayout,
  //       redirect: 'noRedirect',
  //       name: 'Icon',
  //       meta: {
  //         title: '图标',
  //         permissions: ['admin'],
  //       },
  //       children: [
  //         {
  //           path: 'awesomeIcon',
  //           name: 'AwesomeIcon',
  //           component: () => import('@/views/vab/icon/index'),
  //           meta: { title: '常规图标' },
  //         },
  //         {
  //           path: 'colorfulIcon',
  //           name: 'ColorfulIcon',
  //           component: () => import('@/views/vab/icon/colorfulIcon'),
  //           meta: { title: '多彩图标' },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'table',
  //       component: () => import('@/views/vab/table/index'),
  //       name: 'Table',
  //       meta: {
  //         title: '表格',
  //         permissions: ['admin'],
  //       },
  //     },
  //     {
  //       path: 'map',
  //       component: () => import('@/views/vab/map/index'),
  //       name: 'Map',
  //       meta: {
  //         title: '地图',
  //         permissions: ['admin'],
  //       },
  //     },

  //     {
  //       path: 'webSocket',
  //       name: 'WebSocket',
  //       component: () => import('@/views/vab/webSocket/index'),
  //       meta: { title: 'webSocket', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'form',
  //       name: 'Form',
  //       component: () => import('@/views/vab/form/index'),
  //       meta: { title: '表单', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'element',
  //       name: 'Element',
  //       component: () => import('@/views/vab/element/index'),
  //       meta: { title: '常用组件', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/vab/tree/index'),
  //       meta: { title: '树', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/vab/nested/menu1/index'),
  //       name: 'Menu1',
  //       alwaysShow: true,
  //       meta: {
  //         title: '嵌套路由 1',
  //         permissions: ['admin'],
  //       },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           name: 'Menu1-1',
  //           alwaysShow: true,
  //           meta: { title: '嵌套路由 1-1' },
  //           component: () => import('@/views/vab/nested/menu1/menu1-1/index'),

  //           children: [
  //             {
  //               path: 'menu1-1-1',
  //               name: 'Menu1-1-1',
  //               meta: { title: '嵌套路由 1-1-1' },
  //               component: () =>
  //                 import('@/views/vab/nested/menu1/menu1-1/menu1-1-1/index'),
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       path: 'loading',
  //       name: 'Loading',
  //       component: () => import('@/views/vab/loading/index'),
  //       meta: { title: 'loading', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'backToTop',
  //       name: 'BackToTop',
  //       component: () => import('@/views/vab/backToTop/index'),
  //       meta: { title: '返回顶部', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'lodash',
  //       name: 'Lodash',
  //       component: () => import('@/views/vab/lodash/index'),
  //       meta: { title: 'lodash', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'smallComponents',
  //       name: 'SmallComponents',
  //       component: () => import('@/views/vab/smallComponents/index'),
  //       meta: { title: '小组件', permissions: ['admin'] },
  //     },

  //     {
  //       path: 'upload',
  //       name: 'Upload',
  //       component: () => import('@/views/vab/upload/index'),
  //       meta: { title: '上传', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'log',
  //       name: 'Log',
  //       component: () => import('@/views/vab/errorLog/index'),
  //       meta: { title: '错误日志模拟', permissions: ['admin'] },
  //     },
  //     {
  //       path: 'https://github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension',
  //       name: 'ExternalLink',
  //       meta: {
  //         title: '外链',
  //         target: '_blank',
  //         permissions: ['admin', 'editor'],
  //         badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'more',
  //       name: 'More',
  //       component: () => import('@/views/vab/more/index'),
  //       meta: { title: '关于', permissions: ['admin'] },
  //     },
  //   ],
  // },
  // {
  //   path: '/personnelManagement',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'PersonnelManagement',
  //   meta: { title: '配置', icon: 'users-cog' },
  //   children: [
  //     {
  //       path: 'userManagement',
  //       name: 'UserManagement',
  //       component: () =>
  //         import('@/views/personnelManagement/userManagement/index'),
  //       meta: { title: '用户管理' },
  //     },
  //     {
  //       path: 'roleManagement',
  //       name: 'RoleManagement',
  //       component: () =>
  //         import('@/views/personnelManagement/roleManagement/index'),
  //       meta: { title: '角色管理' },
  //     },
  //     {
  //       path: 'menuManagement',
  //       name: 'MenuManagement',
  //       component: () =>
  //         import('@/views/personnelManagement/menuManagement/index'),
  //       meta: { title: '菜单管理', badge: 'New' },
  //     },
  //   ],
  // },
  // {
  //   path: '/mall',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'Mall',
  //   meta: {
  //     title: '商城',
  //     icon: 'shopping-cart',
  //     permissions: ['admin'],
  //   },

  //   children: [
  //     {
  //       path: 'pay',
  //       name: 'Pay',
  //       component: () => import('@/views/mall/pay/index'),
  //       meta: {
  //         title: '支付',
  //         noKeepAlive: true,
  //       },
  //       children: null,
  //     },
  //     {
  //       path: 'goodsList',
  //       name: 'GoodsList',
  //       component: () => import('@/views/mall/goodsList/index'),
  //       meta: {
  //         title: '商品列表',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/error',
  //   component: EmptyLayout,
  //   redirect: 'noRedirect',
  //   name: 'Error',
  //   meta: { title: '错误页', icon: 'bug' },
  //   children: [
  //     {
  //       path: '401',
  //       name: 'Error401',
  //       component: () => import('@/views/401'),
  //       meta: { title: '401' },
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: { title: '404' },
  //     },
  //   ],
  // },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true,
  // },
]

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
