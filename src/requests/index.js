import axios from 'axios'
import '../components/common/js/jquery.min.js'
// import { Header } from 'element-ui'
// import {
//   Message, Loading
// } from 'element-ui'
// document.domain = 'dgg.net'
const ajax = axios.create({
  baseURL: 'http://172.16.1.253:8333/'
  // baseURL: 'https://tibossworkstationweb.dgg.net/api/'
  // baseURL: 'http://vueibossweb.dgg.net/api'
})
// var loadingInstance
// // 拦截器
// ajax.interceptors.request.use(config => {
//     loadingInstance = Loading.service({
//       lock: true,
//       text: '数据加载中，请稍后...',
//       spinner: 'el-icon-loading',
//       background: 'rgba(0, 0, 0, 0.7)'
//     })
//     return config
//   },
//   err => {
//     loadingInstance.close()
//     Message.error('请求错误')
//     return Promise.reject(err)
// })
// ajax.interceptors.response.use(resp => {
//   if (resp.data.code === 0) {
//     loadingInstance.close()
//     return resp
//     } else {
//       loadingInstance.close()
//       Message.error(resp.data.msg)
//     }
//   },
//   err => {
//   loadingInstance.close()
//   Message.error('请求失败，请稍后再试')
//   return Promise.reject(err)
// })

// 获取工号
export const loginNameSession = () => {
  return ajax.get(`/user/getLoginNameBySession`)
}

// 业绩排行版
export const performance = (loginName, team, time) => {
  return ajax.get(`/select/achievementRankList?loginName=${loginName}&team=${team}&time=${time}`)
}

// 转介排行榜
export const referral = (businessId, type) => {
  return ajax.get(`/select/suggestRankList?businessId=${businessId}&type=${type}`)
}

// 电话量和今日待办页面
export const realTime = (loginName) => {
  return ajax.get(`/select/realTime?loginName=${loginName}`)
}

// 事业部
export const businessDivision = () => {
  return ajax.get(`/select/businessList`)
}

// 提成计算
export const salaryAndIdIoGraph = (loginName) => {
  return ajax.get(`/select/userInfo?loginName=${loginName}`)
}

// 个性签名
export const personalized = (idIoGraph, loginName) => {
  return ajax.post(`/fill/idIoGraph?idIoGraph=${idIoGraph}&loginName=${loginName}`)
}

// 填报工资
export const Salary = (salary, loginName) => {
  return ajax.post(`/fill/fillSalaryTarget?salary=${salary}&loginName=${loginName}`)
}

// 今日待办（自定义列表所有数据）
export const toDoTodayAll = (type) => {
  return ajax.get(`/userModule/all/${type}`)
}

// 今日待办（自定义列表根据工号查询）
export const toDoTodayLoginName = (type, loginName) => {
  return ajax.get(`/userModule/info/${type}?loginName=${loginName}`)
}

// 修改用户自定义模块
export const modifyCustomization = (type, moduleId, moduleOrder, loginName) => {
  return ajax.post(`/userModule/updateUserModule/${type}?moduleId=${moduleId}&moduleOrder=${moduleOrder}&loginName=${loginName}`)
}

// 今日数据
export const getJo = (loginName) => {
  return ajax.get(`/getJobData?loginName=${loginName}`)
}

// 今日数据（自定义列表所有数据）
export const userModuleAll = (type) => {
  return ajax.get(`/userModule/all/${type}`)
}

// 掉库商机（待首电）
export const firstCallOrWillLost = (flag, loginName, pageSize, page) => {
  return ajax.get(`/select/firstCallOrWillLost?flag=${flag}&loginName=${loginName}&pageSize=${pageSize}&page=${page}`)
}

// 业绩目标（echarts）
export const targetAll = (loginName) => {
  return ajax.get(`/select/targetAll?loginName=${loginName}`)
}

// 目标填报
export const target = (loginName, pisitPromissory, contractPromissory, performancePromissory, flag) => {
  return ajax.post(`/fill/target?loginName=${loginName}&pisitPromissory=${pisitPromissory}&contractPromissory=${contractPromissory}&performancePromissory=${performancePromissory}&flag=${flag}`)
}

// 预估工资
export const estimateSalary = (loginName, month) => {
  return ajax.get(`/select/target?loginName=${loginName}&month=${month}`)
}
