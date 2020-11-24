
window._ = require('lodash')
window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

window.purify = o => JSON.parse(JSON.stringify(o))


import Vue from 'vue';
import VueAxios from 'vue-axios';
import vSelect from 'vue-select';
import moment from 'moment'
import store from './store/store';
import App from './App';
import Multiselect from 'vue-multiselect';

// register globally

import './style.css';

Vue.use(VueAxios, axios);

Vue.component('v-select', vSelect);
Vue.component('multiselect', Multiselect)

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
    }
});
Vue.filter('truncate', function (value, limit) {
    if (!value)
        return "";
    if (value.length > limit) {
        value = value.substring(0, (limit - 3)) + '...';
    }

    return value
})

var app = new Vue({
    el: '#coupon',
    store,
    render: h => h(App)
})