import ajax from './axios'

const login = (params) => {
	return ajax.post(`/s/api/v1/login`, params)
}
const reg = (params) => {
	return ajax.post(`/s/api/v1/reg`, params)
}
const addCom = (params) => {
	return ajax.post(`/s/api/v1/addCom`, params)
}
const getCom = (params) => {
	return ajax.post(`/s/api/v1/getCom`, params)
}
const editCom = (params) => {
	return ajax.post(`/s/api/v1/editCom`, params)
}
const delCom = (params) => {
	return ajax.post(`/s/api/v1/delCom`, params)
}

const apiList = {
	login,
	reg,
	addCom,
	getCom,
	editCom,
	delCom
}

export default apiList
