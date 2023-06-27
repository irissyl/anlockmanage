/**
 * ..author https://vue-admin-beautiful.com （不想保留author可删除）
 * ..description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
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
        component: () => import('@/views/main/buildManage/index.vue'),
        meta: {
          title: '建筑管理',
          premissions: ['buildManage/index'],
          // badge: 'New',
        },
      },
      {
        path: 'roomList',
        name: 'roomList',
        component: () => import('@/views/main/roomList/index'),
        meta: {
          title: '房间管理',
          premissions: ['roomList/index'],
          // badge: 'New',
        },
      },
      {
        path: 'householdManage',
        name: 'householdManage',
        component: () => import('@/views/main/householdManage/index.vue'),
        meta: {
          title: '住户管理',
          premissions: ['householdManage/index'],
        },
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
        path: 'card',
        name: 'card',
        component: () => import('@/views/main/card/index.vue'),
        meta: {
          title: '门卡管理',
          premissions: ['card/index'],
        },
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

      // {
      //   path: 'DeviceManagement',
      //   name: 'DeviceManagement',
      //   meta: {
      //     title: '设备管理',
      //     icon: '',
      //     premissions: ['DeviceManagement'],
      //   },
      //   component: {
      //     template: '<router-view/>',
      //   },
      //   children: [
      //     {
      //       path: '/NB',
      //       name: 'NB',
      //       component: () => import('@/views/NewPage/DeviceManagement/NB.vue'),
      //       meta: {
      //         title: '设备管理',
      //         premissions: ['DeviceManagement/NB'],
      //       },
      //     },
      //     {
      //       path: '/WIFI',
      //       name: 'WIFI',
      //       component: () =>
      //         import('@/views/NewPage/DeviceManagement/WIFI.vue'),
      //       meta: {
      //         title: 'WIFI门锁',
      //         premissions: ['DeviceManagement/WIFI'],
      //       },
      //     },
      //     {
      //       path: '/Lora',
      //       name: 'Lora',
      //       component: () =>
      //         import('@/views/NewPage/DeviceManagement/Lora.vue'),
      //       meta: {
      //         title: 'Lora门锁',
      //         premissions: ['DeviceManagement/Lora'],
      //       },
      //     },
      //     {
      //       path: '/GatewayDevices',
      //       name: 'GatewayDevices',
      //       component: () =>
      //         import('@/views/NewPage/DeviceManagement/GatewayDevice.vue'),
      //       meta: {
      //         title: '网关信息',
      //         premissions: ['DeviceManagement/GatewayDevice'],
      //       },
      //     },
      //     {
      //       path: '/GatewayMatching',
      //       name: 'GatewayMatching',
      //       component: () =>
      //         import('@/views/NewPage/DeviceManagement/GatewayMatching.vue'),
      //       meta: {
      //         title: '网关匹配',
      //         premissions: ['DeviceManagement/GatewayMatching'],
      //       },
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   path: '/AlarmInformation',
  //   name: 'AlarmInformation',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '报警信息',
  //     icon: 'bell',
  //     premissions: ['AlarmInformation'],
  //   },
  //   children: [
  //     {
  //       path: 'Lowpressure',
  //       name: 'Lowpressure',
  //       component: () =>
  //         import('@/views/NewPage/AlarmInformation/Lowpressure.vue'),
  //       meta: {
  //         title: '低压报警',
  //         premissions: ['AlarmInformation/Lowpressure'],
  //         // badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'Keylock',
  //       name: 'Keylock',
  //       component: () => import('@/views/NewPage/AlarmInformation/Keylock.vue'),
  //       meta: {
  //         title: '按键锁定',
  //         premissions: ['AlarmInformation/Keylock'],
  //         // badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'Abnormal',
  //       name: 'Abnormal',
  //       component: () =>
  //         import('@/views/NewPage/AlarmInformation/Abnormal.vue'),
  //       meta: {
  //         title: '进出异常',
  //         premissions: ['AlarmInformation/Abnormal'],
  //         // badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'Antiprying',
  //       name: 'Antiprying',
  //       component: () =>
  //         import('@/views/NewPage/AlarmInformation/Antiprying.vue'),
  //       meta: {
  //         title: '防撬报警',
  //         premissions: ['AlarmInformation/Antiprying'],
  //         // badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'VirtualShutdown',
  //       name: 'VirtualShutdown',
  //       component: () =>
  //         import('@/views/NewPage/AlarmInformation/VirtualShutdown.vue'),
  //       meta: {
  //         title: '虚关报警',
  //         premissions: ['AlarmInformation/VirtualShutdown'],
  //         // badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'Offline',
  //       name: 'Offline',
  //       component: () => import('@/views/NewPage/AlarmInformation/Offline.vue'),
  //       meta: {
  //         title: '离线报警',
  //         premissions: ['AlarmInformation/Offline'],
  //         // badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'Dooropen',
  //       name: 'Dooropen',
  //       component: () =>
  //         import('@/views/NewPage/AlarmInformation/Dooropen.vue'),
  //       meta: {
  //         title: '门锁常开',
  //         premissions: ['AlarmInformation/Dooropen'],
  //         // badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'Doorlock',
  //       name: 'Doorlock',
  //       component: () =>
  //         import('@/views/NewPage/AlarmInformation/Doorlock.vue'),
  //       meta: {
  //         title: '门开报警',
  //         premissions: ['AlarmInformation/Doorlock'],
  //         // badge: 'New',
  //       },
  //     },
  //     {
  //       path: 'Hightemperature',
  //       name: 'Hightemperature',
  //       component: () =>
  //         import('@/views/NewPage/AlarmInformation/Hightemperature.vue'),
  //       meta: {
  //         title: '高温报警',
  //         premissions: ['AlarmInformation/Hightemperature'],
  //         // badge: 'New',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/RecordQuery',
  //   name: 'RecordQuery',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '记录查询',
  //     icon: 'search',
  //     premissions: ['RecordQuery'],
  //   },
  //   children: [
  //     // {
  //     //   path: '/OperatorOperationrecords',
  //     //   name: 'OperatorOperationrecords',
  //     //   component: () =>
  //     //     import('@/views/NewPage/RecordQuery/OperatorOperationrecords.vue'),
  //     //   meta: {
  //     //     title: '操作员操作记录',
  //     //     premissions: ['RecordQuery/OperatorOperationrecords'],
  //     //   },
  //     // },
  //     // {
  //     //   path: '/BatteryReplacementRecord',
  //     //   name: 'BatteryReplacementRecord',
  //     //   component: () =>
  //     //     import('@/views/NewPage/RecordQuery/BatteryReplacementRecord.vue'),
  //     //   meta: {
  //     //     title: '换电池记录',
  //     //     premissions: ['RecordQuery/BatteryReplacementRecord'],
  //     //   },
  //     // },
  //     {
  //       path: '/DoorLockRecords',
  //       name: 'DoorLockRecords',
  //       component: {
  //         template: '<router-view/>',
  //       },
  //       meta: {
  //         title: '门锁记录',
  //         premissions: ['DoorLockRecords'],
  //       },
  //       children: [
  //         {
  //           path: '/Heartbeat',
  //           name: 'Heartbeat',
  //           component: () =>
  //             import('@/views/NewPage/RecordQuery/heartbeats.vue'),
  //           meta: {
  //             title: '心跳记录',
  //             premissions: ['RecordQuery/Heartbeat'],
  //           },
  //         },
  //         {
  //           path: '/openDoorRecord',
  //           name: 'openDoorRecord',
  //           component: () =>
  //             import('@/views/NewPage/RecordQuery/openDoorRecord.vue'),
  //           meta: {
  //             title: '开门记录',
  //             premissions: ['RecordQuery/openDoorRecord'],
  //           },
  //         },
  //         {
  //           path: '/voltagechanges',
  //           name: 'voltagechanges',
  //           component: () =>
  //             import('@/views/NewPage/RecordQuery/voltagechanges.vue'),
  //           meta: {
  //             title: '电压变化记录',
  //             premissions: ['RecordQuery/voltagechanges'],
  //           },
  //         },
  //         {
  //           path: '/Commandcommunication',
  //           name: 'Commandcommunication',
  //           component: () =>
  //             import('@/views/NewPage/RecordQuery/Commandcommunication.vue'),
  //           meta: {
  //             title: '指令通讯记录',
  //             premissions: ['RecordQuery/Commandcommunication'],
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       path: '/LockChange',
  //       name: 'LockChange',
  //       component: () => import('@/views/NewPage/RecordQuery/LockChange.vue'),
  //       meta: {
  //         title: '换锁记录',
  //         premissions: ['RecordQuery/LockChange'],
  //       },
  //     },
  //     {
  //       path: '/Electricity',
  //       name: 'Electricity',
  //       component: () => import('@/views/NewPage/RecordQuery/Electricity.vue'),
  //       meta: {
  //         title: '电表记录',
  //         premissions: ['RecordQuery/Electricity'],
  //       },
  //     },
  //     {
  //       path: '/Watermeter',
  //       name: 'Watermeter',
  //       component: () => import('@/views/NewPage/RecordQuery/Watermeter.vue'),
  //       meta: {
  //         title: '水表记录',
  //         premissions: ['RecordQuery/Watermeter'],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/BatchOperations',
  //   name: 'BatchOperations',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '批量操作',
  //     icon: 'c',
  //     premissions: ['BatchOperations'],
  //   },
  //   children: [
  //     {
  //       path: '/CardTermination',
  //       name: 'CardTermination',
  //       component: () =>
  //         import('@/views/NewPage/BatchOperations/CardTermination.vue'),
  //       meta: {
  //         title: '卡片终止',
  //         premissions: ['BatchOperations/CardTermination'],
  //       },
  //     },
  //     {
  //       path: '/PersonnelTermination',
  //       name: 'PersonnelTermination',
  //       component: () =>
  //         import('@/views/NewPage/BatchOperations/PersonnelTermination.vue'),
  //       meta: {
  //         title: '人员终止',
  //         premissions: ['BatchOperations/PersonnelTermination'],
  //       },
  //     },
  //     {
  //       path: '/RoomTermination',
  //       name: 'RoomTermination',
  //       component: () =>
  //         import('@/views/NewPage/BatchOperations/RoomTermination.vue'),
  //       meta: {
  //         title: '房间终止',
  //         premissions: ['BatchOperations/RoomTermination'],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/fintRoom',
  //   name: 'fintRoom',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '人找房',
  //     icon: 'city',
  //     premissions: ['fintRoom'],
  //   },
  //   children: [
  //     {
  //       path: '/Room',
  //       name: 'Room',
  //       component: () => import('@/views/NewPage/fintRoom/index.vue'),
  //       meta: {
  //         title: '人找房',
  //         icon: 'city',
  //         premissions: ['fintRoom/index'],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/findPeople',
  //   name: 'findPeople',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '房找人',
  //     icon: 'child',
  //     premissions: ['findPeople'],
  //   },
  //   children: [
  //     {
  //       path: '/People',
  //       name: 'People',
  //       component: () => import('@/views/NewPage/findPeople/index.vue'),
  //       meta: {
  //         title: '房找人',
  //         icon: 'child',
  //         premissions: ['findPeople/index'],
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: '/PersonnelFiling',
  //   name: 'PersonnelFiling',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '人员建档',
  //     icon: 'chalkboard-teacher',
  //     premissions: ['PersonnelFiling'],
  //   },
  //   children: [
  //     {
  //       path: '/Personnel',
  //       name: 'Personnel',
  //       component: () => import('@/views/NewPage/PersonnelFiling/index'),
  //       meta: {
  //         title: '人员建档',
  //         premissions: ['PersonnelFiling/index'],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/EquipmentFiling',
  //   name: 'EquipmentFiling',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '建档',
  //     icon: 'unlock-alt',
  //     premissions: ['EquipmentFiling'],
  //   },
  //   children: [
  //     {
  //       path: '/lock',
  //       name: 'lock',
  //       component: () => import('@/views/NewPage/lockDevice/index.vue'),
  //       meta: {
  //         title: '门锁设备',
  //         premissions: ['lockDevice/index'],
  //       },
  //     },
  //     {
  //       path: '/Gateway',
  //       name: 'Gateway',
  //       component: () => import('@/views/NewPage/GatewayDevice/index.vue'),
  //       meta: {
  //         title: '网关设备',
  //         premissions: ['GatewayDevice/index'],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/HumanRoomMatching',
  //   name: 'HumanRoomMatching',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '人房匹配',
  //     icon: 'users-cog',
  //     premissions: ['HumanRoomMatching'],
  //   },
  //   children: [
  //     {
  //       path: '/HumanRoom',
  //       name: 'HumanRoom',
  //       component: () => import('@/views/NewPage/HumanRoomMatching/index'),
  //       meta: {
  //         title: '人房匹配',
  //         premissions: ['HumanRoomMatching/index'],
  //       },
  //     },
  //   ],
  // },

  // {
  //   path: '/contentSettings',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'contentSettings',
  //   meta: {
  //     title: '基础内容设置',
  //     icon: 'users-cog',
  //     premissions: ['contentSettings'],
  //   },
  //   children: [
  //     {
  //       path: 'Campus',
  //       name: 'Campus',
  //       component: () => import('@/views/page/contentSettings/Campus/index'),
  //       meta: { title: '园区设置', premissions: ['Campus/index'] },
  //     },
  //     {
  //       path: 'Building',
  //       name: 'Building',
  //       component: () => import('@/views/page/contentSettings/Building/index'),
  //       meta: { title: '楼栋设置', premissions: ['Building/index'] },
  //     },
  //     {
  //       path: 'Department',
  //       name: 'Department',
  //       component: () =>
  //         import('@/views/page/contentSettings/Department/index'),
  //       meta: { title: '部门设置', premissions: ['Department/index'] },
  //     },
  //   ],
  // },
  // {
  //   path: '/deviceManagement',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'deviceManagement',
  //   meta: {
  //     title: '智能设备管理',
  //     icon: 'unlock-alt',
  //     premissions: ['deviceManagement'],
  //   },
  //   children: [
  //     {
  //       path: 'DeviceStatistics',
  //       name: 'DeviceStatistics',
  //       component: () =>
  //         import('@/views/page/deviceManagement/DeviceStatistics/index.vue'),
  //       meta: { title: '设备统计', premissions: ['DeviceStatistics/index'] },
  //     },
  //     {
  //       path: 'lockDevice',
  //       name: 'lockDevice',
  //       component: () =>
  //         import('@/views/page/deviceManagement/lockDevice/index.vue'),
  //       meta: { title: '门锁设备', premissions: ['lockDevice/index'] },
  //     },
  //     {
  //       path: 'GatewayDevice',
  //       name: 'GatewayDevice',
  //       component: () =>
  //         import('@/views/page/deviceManagement/GatewayDevice/index.vue'),
  //       meta: { title: '网关设备', premissions: ['GatewayDevice/index'] },
  //     },
  //     {
  //       path: 'Water',
  //       name: 'Water',
  //       component: () =>
  //         import(
  //           '@/views/page/deviceManagement/Water_meter_equipment/index.vue'
  //         ),
  //       meta: {
  //         title: '水电表设备',
  //         premissions: ['Water_meter_equipment/index'],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/operatorManagement',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'operatorManagement',
  //   meta: {
  //     title: '操作员管理',
  //     icon: 'person-booth',
  //     premissions: ['operatorManagement'],
  //   },
  //   children: [
  //     {
  //       path: 'operator',
  //       name: 'operator',
  //       component: () => import('@/views/page/operatorManagement/index'),
  //       meta: {
  //         title: '操作员列表',
  //         icon: 'person-booth',
  //         premissions: ['operatorManagement/index'],
  //       },
  //     },
  //     {
  //       path: 'operatorHouse',
  //       name: 'operatorHouse',
  //       component: () =>
  //         import('@/views/page/operatorManagement/operatorHouse/index.vue'),
  //       meta: {
  //         title: '操作员房间权限',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/officePersonnel',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'officePersonnel',
  //   meta: {
  //     title: '人员管理',
  //     icon: 'chalkboard-teacher',
  //     premissions: ['officePersonnel'],
  //   },
  //   children: [
  //     {
  //       path: 'office',
  //       name: 'office',
  //       component: () => import('@/views/page/officePersonnel/index'),
  //       meta: {
  //         title: '办公室人员管理',
  //         premissions: ['officePersonnel/index'],
  //       },
  //     },
  //     {
  //       path: 'dormitory',
  //       name: 'dormitory',
  //       component: () => import('@/views/page/dormitoryPersonnel/index'),
  //       meta: {
  //         title: '宿舍人员管理',
  //         premissions: ['dormitoryPersonnel/index'],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/roomList',
  //   name: 'roomList',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '房间管理',
  //     icon: 'users-cog',
  //     premissions: ['roomList'],
  //   },
  //   children: [
  //     {
  //       path: 'roomList',
  //       name: 'roomList',
  //       component: () => import('@/views/page/roomList/index'),
  //       meta: {
  //         title: '房间列表',
  //         premissions: ['roomList/index'],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/appointmentReview',
  //   name: 'appointmentReview',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   meta: {
  //     title: '预约管理',
  //     icon: 'calendar-alt',
  //     premissions: ['appointmentReview'],
  //   },
  //   children: [
  //     {
  //       path: '/reserve',
  //       name: 'reserve',
  //       component: () => import('@/views/page/appointmentReview/index'),
  //       meta: {
  //         title: '预约审核',
  //         premissions: ['appointmentReview/index'],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/systemSettings',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'systemSettings',
  //   meta: {
  //     title: '系统设置',
  //     icon: 'unlock-alt',
  //     premissions: ['systemSettings'],
  //   },
  //   children: [
  //     {
  //       path: 'Networking',
  //       name: 'Networking',
  //       component: () => import('@/views/page/systemSettings/Networking/index'),
  //       meta: { title: '联网锁设置', premissions: ['Networking/index'] },
  //     },
  //     {
  //       path: 'roleManagement',
  //       name: 'RoleManagement',
  //       component: () => import('@/views/page/systemSettings/index'),
  //       meta: { title: '公司设置', premissions: ['systemSettings/index'] },
  //     },
  //   ],
  // },
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
