import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/table/getList',
    method: 'post',
    data,
  })
}

export function doEdit(data) {
  return request({
    url: '/table/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data) {
  return request({
    url: '/table/doDelete',
    method: 'post',
    data,
  })
}

// 园区列表
export function getCampusList() {
  return request({
    url: '/api/build/listAllArea',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'get',
  })
}

// 添加小区/api/build/addArea
export function doAddCampus(data) {
  return request({
    url: '/api/build/addArea',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    data,
  })
}

// 更新小区
export function updateArea(data) {
  return request({
    url: '/api/build/updateArea',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    data,
  })
}
// 删除小区
export function deleteCampus(data) {
  return request({
    url: '/api/build/delArea',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    data,
  })
}

// 楼栋列表
export function getBuildList(data) {
  return request({
    url: '/api/build/listAllBuild',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'get',
    data,
  })
}

// 添加楼栋
export function addBuild(data) {
  return request({
    url: '/api/build/addBuild',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    data,
  })
}
// 删除楼栋
export function deleteBuild(data) {
  return request({
    url: '/api/build/delBuild',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',

    data,
  })
}
// 修改楼栋
export function updateBuild(data) {
  return request({
    url: '/api/build/updateBuild',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    data,
  })
}
// 部门列表
export function listSection(data) {
  return request({
    url: '/api/office/listSection',
    method: 'post',
    data,
  })
}
// 添加部门
export function addSection(data) {
  return request({
    url: '/api/office/addSection',
    method: 'post',
    data,
  })
}
// 删除部门
export function delSection(data) {
  return request({
    url: '/api/office/delSection',
    method: 'post',
    data,
  })
}
// 修改部门
// export function delSection (data) {
//   return request({
//     url: '/api/office/delSection',
//     method: 'post',
//     data,
//   })
// }

// 取所有办公室名单
export function listRentCustomerPage(param) {
  return request({
    url: '/api/office/listRentCustomerPage',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'get',
    params: param,
  })
}
// 查询办公室名单
export function listRentCustomerSearch(param) {
  return request({
    url: '/api/office/listRentCustomerSearch',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'get',
    params: param,
  })
}
// 添加办公室名单
export function addOfficeRent(data) {
  return request({
    url: '/api/office/addOfficeRent',
    method: 'post',
    data,
  })
}

// 删除办公室人员(并删除门锁钥匙)
export function delOfficeRent(data) {
  return request({
    url: '/api/office/delOfficeRent',
    method: 'post',
    data,
  })
}

// 添加钥匙指纹
export function addKeyFinger(data) {
  return request({
    url: '/api/netlock/addKeyFinger',
    method: 'post',
    data,
  })
}

// 取宿舍人员名单
export function listHostelRentPage(data) {
  return request({
    url: '/api/hostel/listHostelRentPage',
    method: 'post',
    data,
  })
}

// 添加宿舍名单
export function addHostelRent(data) {
  return request({
    url: '/api/hostel/addHostelRent',
    method: 'post',
    data,
  })
}

// 修改宿舍名单
export function updateHostelRent(data) {
  return request({
    url: '/api/hostel/updateHostelRent',
    method: 'post',
    data,
  })
}

// 设置宿舍名单关联门锁
export function setChangeIottag(data) {
  return request({
    url: '/api/hostel/setChangeIottag',
    method: 'post',
    data,
  })
}

// 删除宿舍名单(并删除门锁钥匙)
export function delHostelRent(data) {
  return request({
    url: '/api/hostel/delHostelRent',
    method: 'post',
    data,
  })
}

//查找宿舍人员名单
export function listHostelRentSearch(data) {
  return request({
    url: '/api/hostel/listHostelRentSearch',
    method: 'post',
    data,
  })
}

//取房间设备列表
export function listOfficeDevice() {
  return request({
    url: '/api/office/listOfficeDevice',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}

//取房间设备列表(分页)
export function listOfficeDevicePage(data, param) {
  return request({
    url: '/api/office/listOfficeDevicePage',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data,
    params: param,
  })
}

// 取设备开门日志列表

export function getNetlockLogListSearch(data) {
  return request({
    url: '/api/office/getNetlockLogList',
    method: 'get',
    data,
  })
}

// 门锁设备列表
export function getDeviceListPage(data) {
  return request({
    url: '/api/netlock/getDeviceListPage',
    method: 'post',
    data,
  })
}

// 取账号统计数据
export function analyseCount() {
  return request({
    url: '/api/store/analyseCount',
    method: 'get',
  })
}

// 获取菜单
export function listMenuItem(data) {
  return request({
    url: '/api/account/listMenuItem',
    method: 'post',
    data,
  })
}

// 添加菜单
export function addMenuItem(data) {
  return request({
    url: '/api/account/addMenuItem',
    method: 'post',
    data,
  })
}
// 删除菜单
export function delMenuItem(data) {
  return request({
    url: '/api/account/delMenuItem',
    method: 'post',
    data,
  })
}
