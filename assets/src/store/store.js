import Vue from "vue";
import Vuex from "vuex";

import CouponList from "./modules/coupon_list";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        CouponList
    },
});