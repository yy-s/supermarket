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
const addSupp = (params) => {
		return ajax.post(`/s/api/v1/addSupp`, params)
}
const getSupp = (params) => {
		return ajax.post(`/s/api/v1/getSupp`, params)
}
const editSupp = (params) => {
		return ajax.post(`/s/api/v1/editSupp`, params)
}
const delSupp = (params) => {
		return ajax.post(`/s/api/v1/delSupp`, params)
}
const addOrder = (params) => {
		return ajax.post(`/s/api/v1/addOrder`, params)
}
const getOrder = (params) => {
		return ajax.post(`/s/api/v1/getOrder`, params)
}
const addPurchase = (params) => {
	return ajax.post(`/s/api/v1/addPurchase`, params)
}
const getPurchase = (params) => {
	return ajax.post(`/s/api/v1/getPurchase`, params)
}
const editPurchase = (params) => {
	return ajax.post(`/s/api/v1/editPurchase`, params)
}
const addContract = (params) => {
	return ajax.post(`/s/api/v1/addContract`, params)
}
const getContract = (params) => {
	return ajax.post(`/s/api/v1/getContract`, params)
}
const editContract = (params) => {
	return ajax.post(`/s/api/v1/editContract`, params)
}

const apiList = {
		login,
		reg,
		addCom,
		getCom,
		editCom,
		delCom,
		addSupp,
		getSupp,
		editSupp,
		delSupp,
		addOrder,
		getOrder,
    addPurchase,
    getPurchase,
    editPurchase,
    addContract,
    getContract,
		editContract
}

export default apiList
