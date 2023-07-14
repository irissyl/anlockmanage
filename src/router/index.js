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
          icon: 'home',
          affix: true,
          premissions: ['index/index'],
        },
      },

    ],
  },
  {
    path: '/info',
    name: 'info',
    component: Layout,
    redirect: 'noRedirect',
    meta: {
      title: '主菜单',
      icon: 'bars',
      premissions: ['info'],
    },
    children: [

      {
        path: 'buildManage',
        name: 'buildManage',
        meta: {
          title: '房屋管理',
          premissions: ['buildManage/index'],
          // badge: 'New',
        },
        component: {
          template: '<router-view/>',
        },
        children: [

          {
            path: 'build',
            name: 'build',
            component: () => import('@/views/main/buildManage/index.vue'),
            meta: {
              title: '房屋管理',
              premissions: ['build/index'],
              // badge: 'New',
            },
          },
        ]
      },
      {
        path: 'householdManage',
        name: 'householdManage',
        meta: {
          title: '人员管理',
          premissions: ['householdManage/index'],
        },
        component: {
          template: '<router-view/>',
        },
        children: [
          {
            path: 'Lowpressure',
            name: 'Lowpressure',
            component: () => import('@/views/main/householdManage/index.vue'),
            meta: {
              title: '人员管理',
              premissions: ['householdManage'],
              // badge: 'New',
            },
          },
          {
            path: 'remote',
            name: 'remote',
            component: () => import('@/views/main/householdManage/components/remote.vue'),
            meta: {
              title: '常规人员',
              premissions: ['householdManage/remote'],
              // badge: 'New',
            },
          },
          {
            path: 'printfinger',
            name: 'printfinger',
            component: () => import('@/views/main/householdManage/components/printfinger.vue'),
            meta: {
              title: '临时人员',
              premissions: ['householdManage/printfinger'],
              // badge: 'New',
            },
          },
          {
            path: 'bacth',
            name: 'bacth',
            component: () => import('@/views/main/householdManage/components/bacth.vue'),
            meta: {
              title: '批量分配',
              premissions: ['householdManage/bacth'],
              // badge: 'New',
            },
          },
        ]
      },
      {
        path: 'roomList',
        name: 'roomList',
        component: () => import('@/views/main/roomList/index'),
        meta: {
          title: '入住管理',
          premissions: ['OrganizationManage/index'],
          // badge: 'New',
        },
      },
      {
        path: 'BrowseRoom',
        name: 'BrowseRoom',
        meta: {
          title: '在住管理',
          premissions: ['/roomList'],
        },
        component: () => import('@/views/main/roomList/components/BrowseRoom.vue'),
        children: [
        ]
      },
      {
        path: 'author',
        name: 'author',
        component: () => import('@/views/main/author/index.vue'),
        meta: {
          title: '权限管理',
          premissions: ['author/index'],
        },
      },
      {
        path: 'DeviceManagement',
        name: 'DeviceManagement',
        meta: {
          title: '设备管理',
          icon: '',
          premissions: ['DeviceManagement'],
        },
        component: {
          template: '<router-view/>',
        },
        children: [
          {
            path: '/NB',
            name: 'NB',
            component: () => import('@/views/NewPage/DeviceManagement/NBdevice.vue'),
            meta: {
              title: 'NB设备',
              premissions: ['DeviceManagement/NB'],
            },
          },
          {
            path: '/WIFI',
            name: 'WIFI',
            component: () =>
              import('@/views/NewPage/DeviceManagement/WIFI.vue'),
            meta: {
              title: 'WIFI门锁',
              premissions: ['DeviceManagement/WIFI'],
            },
          },
          {
            path: '/Lora',
            name: 'Lora',
            component: () =>
              import('@/views/NewPage/DeviceManagement/Lora.vue'),
            meta: {
              title: 'Lora门锁',
              premissions: ['DeviceManagement/Lora'],
            },
          },
          {
            path: '/GatewayDevices',
            name: 'GatewayDevices',
            component: () =>
              import('@/views/NewPage/DeviceManagement/Water'),
            meta: {
              title: '水表采集器',
              premissions: ['DeviceManagement/GatewayDevice'],
            },
          },
          {
            path: '/GatewayMatching',
            name: 'GatewayMatching',
            component: () =>
              import('@/views/NewPage/DeviceManagement/GatewayDevice.vue'),
            meta: {
              title: '网关匹配',
              premissions: ['DeviceManagement/GatewayMatching'],
            },
          },
        ],
      },
      {
        path: 'DeviceManage',
        name: 'DeviceManage',
        component: () => import('@/views/NewPage/DeviceManagement/NB.vue'),
        meta: {
          title: '设备管理',
          premissions: ['DeviceManagement/NB'],
        },
      },
      {
        path: 'queryManage',
        name: 'queryManage',
        component: () => import('@/views/main/queryManage/index.vue'),
        meta: {
          title: '查询管理',
          icon: '',
          premissions: ['queryManage/index'],
        },
      },
      {
        path: 'PatrolManage',
        name: 'PatrolManage',
        component: () => import('@/views/main/PatrolManage/index.vue'),
        meta: {
          title: '巡更管理',
          icon: '',
          premissions: ['PatrolManage/index'],
        },
      },
      {
        path: 'RepairManagement',
        name: 'RepairManagement',
        component: () => import('@/views/main/RepairManagement/index.vue'),
        meta: {
          title: '报修管理',
          icon: '',
          premissions: ['RepairManagement/index'],
        },
      },
      {
        path: 'InstructionManagement',
        name: 'InstructionManagement',
        component: () => import('@/views/main/InstructionManagement/index'),
        meta: {
          title: '指令管理',
          icon: '',
          premissions: ['InstructionManagement/index'],
        },
      },
      {
        path: 'analysisManage',
        name: 'analysisManage',
        component: () => import('@/views/main/analysisManage/index.vue'),
        meta: {
          title: '统计分析',
          icon: '',
          premissions: ['analysisManage/index'],
        },
      },
      {
        path: 'configurationManage',
        name: 'configurationManage',
        component: () => import('@/views/main/configurationManage/index.vue'),
        meta: {
          title: '配置管理',
          icon: '',
          premissions: ['configurationManage/index'],
        },
      },
      {
        path: 'cardManage',
        name: 'cardManage',
        meta: {
          title: '门卡管理',
          premissions: ['card/index'],
        },
        component: {
          template: '<router-view/>',
        },
        children: [
          {
            path: 'card',
            name: 'card',
            component: () => import('@/views/main/card/index.vue'),
            meta: {
              title: '门卡信息编辑',
              premissions: ['card/cardEdit'],
              // badge: 'New',
            },
          },
          {
            path: 'lossCard',
            name: 'lossCard',
            component: () => import('@/views/main/card/components/lossCard.vue'),
            meta: {
              title: '门卡挂失',
              premissions: ['card/lossCard'],
              // badge: 'New',
            },
          },
          {
            path: 'CardReplacement',
            name: 'CardReplacement',
            component: () => import('@/views/main/card/components/CardReplacement.vue'),
            meta: {
              title: '补卡状态',
              premissions: ['card/CardReplacement'],
              // badge: 'New',
            },
          },
        ]
      },
    ]
  }
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
