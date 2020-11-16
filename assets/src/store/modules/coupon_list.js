function initialState() {
    return {
        coupons: [],
        searchedCouponAll: [],
        couponAll: [],
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
    data: state => {
        let firstSliceNumber = state.currentPage*state.pageSize
        let lastSliceNumber = (state.currentPage+1)*state.pageSize
        let rows = [];
        if (state.coupons.length != 0)
        {
            rows = state.coupons.slice(firstSliceNumber, lastSliceNumber)
        }

        return rows
    },
    couponAll: state => state.coupons,
    searchedCouponAll: state => state.coupons,
    activeCount: state => {
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
    expiredCount: state => {
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
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    changePageNumber({ commit }, value) {
        commit('changePageNumber', value)
    },
    setStatus({ commit }, value) {
        commit('setStatus', value)
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
    setModalVisibility(state, value) {
        let modalName = value['modalName']
        let modalValue = value['modalValue']

        state[modalName] = modalValue
    },
    changePageNumber(state, value) {
        state.currentPage = value
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
