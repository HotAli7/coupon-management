function initialState() {
    return {
        coupons: [],
        searchedCouponAll: [],
        couponAll: [],
        currentCoupon: [],
        newCoupon: [],
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        showMediaListModal: false,
        currentPage: 0,
        pageSize: 10,
        key: ""
    }
}

const getters = {
    data:               state => {
        let firstSliceNumber = state.currentPage*state.pageSize
        let lastSliceNumber = (state.currentPage+1)*state.pageSize
        let rows = [];
        if (state.coupons.length != 0)
        {
            rows = state.coupons.slice(firstSliceNumber, lastSliceNumber)
        }

        return rows
    },
    couponAll:          state => state.coupons,
    searchedCouponAll:  state => state.coupons,
    activeCount:        state => {
        let active_count = 0
        if (state.searchedCouponAll.length != 0)
        {
            state.searchedCouponAll.map(coupon => {
                if (coupon['status'])
                    active_count++
            });
        }
        return active_count
    },
    expiredCount:       state => {
        let expired_count = 0
        if (state.searchedCouponAll.length != 0)
        {
            state.searchedCouponAll.map(coupon => {
                if (!coupon['status'])
                    expired_count++
            });
        }
        return expired_count
    },
    currentCoupon:      state => state.currentCoupon,
    newCoupon:          state => state.newCoupon,
    status:             state => state.status,
    total:              state => state.coupons.length,
    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
    currentPage:        state => state.currentPage,
    pageSize:           state => state.pageSize,
    key:                state => state.key
}

const actions = {
    fetchData({ commit, state }) {
        axios
            .request({
                url: 'https://apitest.livingformusicgroup.com/api/admin/v1/coupons',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer HzGGZXFdtoq1sJbZWzBYwSzuNBr99Fogj7IdSqPN'
                }
            })
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setAll', response.data);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    selectCoupon({ commit }, { value1, value2 }) {
        commit('selectCoupon', value1)
        let v = {
            modalName: value2,
            modalValue: true,
        }
        commit('setModalVisibility', v)
    },
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    changePageNumber({ commit }, value) {
        commit('changePageNumber', value)
    },
    setCouponName({ commit }, value) {
        commit('setCouponName', value)
    },
    setCouponNotes({ commit }, value) {
        commit('setCouponNotes', value)
    },
    setDiscount({ commit }, value) {
        commit('setDiscount', value)
    },
    setDiscountNumber({ commit }, value) {
        commit('setDiscountNumber', value)
    },
    setURL({ commit }, value) {
        commit('setURL', value)
    },
    setExceptURL({ commit }, value) {
        commit('setExceptURL', value)
    },
    setUsageLimit({ commit }, value) {
        commit('setUsageLimit', value)
    },
    setStartDate({ commit }, value) {
        commit('setStartDate', value)
    },
    setEndDate({ commit }, value) {
        commit('setEndDate', value)
    },
    setWeekday({ commit }, value) {
        commit('setWeekday', value)
    },
    setCouponStatus({ commit }, value) {
        commit('setCouponStatus', value)
    },
    setMinimumSpendAmount({ commit }, value) {
        commit('setMinimumSpendAmount', value)
    },
    setSearchKey({ commit }, value) {
        commit('setSearchKey', value)
    },
    filterCoupon({ commit }, value) {
        commit('filterCoupon', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setAll(state, items) {
        state.coupons = items
        state.couponAll = items
        state.searchedCouponAll = items
    },
    selectCoupon(state, value) {
        state.currentCoupon      = value
        state.newCoupon          = value
    },
    setModalVisibility(state, value) {
        let modalName = value['modalName']
        let modalValue = value['modalValue']

        state[modalName] = modalValue
    },
    changePageNumber(state, value) {
        state.currentPage = value
    },
    setCouponName(state, value) {
        state.newCoupon.coupon_name =  value
    },
    setCouponNotes(state, value) {
        state.newCoupon.notes =  value
    },
    setDiscount(state, value) {
        state.newCoupon.discount =  value
    },
    setDiscountNumber(state, value) {
        state.newCoupon[value['currency']] =  value['value']
    },
    setURL(state, value) {
        state.newCoupon.url =  value
    },
    setExceptURL(state, value) {
        state.newCoupon.except_url =  value
    },
    setUsageLimit(state, value) {
        state.newCoupon.usage_limit =  value
    },
    setStartDate(state, value) {
        state.newCoupon.start_date =  value
    },
    setEndDate(state, value) {
        state.newCoupon.end_date =  value
    },
    setWeekday(state, value) {
        state.newCoupon.weekday =  value
    },
    setCouponStatus(state, value) {
        state.newCoupon.status = value
    },
    setMinimumSpendAmount(state, value) {
        state.newCoupon.minimum_spend_amount =  value
    },
    setSearchKey(state, value) {
        state.key = value

        if (state.couponAll.length != 0)
        {
            state.searchedCouponAll = state.couponAll.filter(coupon => {
                return coupon.coupon_name.toLowerCase().includes(state.key.toLowerCase());
            });
            state.currentPage = 0
        }
    },
    filterCoupon(state, value) {
        state.coupons = state.searchedCouponAll.filter(coupon => {
            return coupon.status == value;
        });
    },
    setSuccess(state, value) {
        state.successMsg = value
    },
    setError(state, value) {
        state.errorMsg = value
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    },
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}
