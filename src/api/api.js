import request from '@/utils/request'

// 添加楼栋
export function addBuild(data) {
  return request({
    url: '/api/office/addBuild',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
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

// 片区列表
export function getCampusList() {
  return request({
    url: '/api/build/listAllArea',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'get',
  })
}

// 房间列表
export function listRoom(data) {
  return request({
    url: '/api/office/listRoom',
    method: 'post',
    data,
  })
}

// 单个添加房间
export function addSingleRoom(data) {
  return request({
    url: '/api/office/addSingleRoom',
    method: 'post',
    data,
  })
}

// 批量添加房间
export function addBatchRoom(data) {
  return request({
    url: '/api/office/addBatchRoom',
    method: 'post',
    data,
  })
}

// 删除房间
export function delRoom(data) {
  return request({
    url: '/api/office/delRoom',
    method: 'post',
    data,
  })
}

// 修改房间
export function updateRoom(data) {
  return request({
    url: '/api/office/updateRoom',
    method: 'post',
    data,
  })
}

// 常开设置
export function SetKeepOpen(data) {
  return request({
    url: '/api/netlock/SetKeepOpen',
    method: 'post',
    data,
  })
}
