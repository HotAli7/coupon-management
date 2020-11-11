<template>
    <div class="container my-5">
        <div class="flex justify-between mb-6 px-6 container">
            <h3 class="text-blue-600 text-xl font-bold py-2 px-4 m-2 w-2/5">Registered Coupon</h3>
            <div class="sm:ml-6 flex items-end w-3/5 py-2 px-4 m-2">
                <input data-v-57d7188b="" aria-label="Search" name="key" type="text" required="required" placeholder="Search" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 w-3/5" :value="key" @input="updateSearchKey($event)">
                <button class="transition duration-500 ease-in-out bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded w-2/5 ml-6" @click="updateModalVisibility('showAddModal', true)">
                    <i class="fa fa-user"></i><span class="ml-2 uppercase">add new Coupon</span>
                </button>
            </div>
        </div>
        <hr class="bg-blue-500 mb-6">
        <Alert :errorMsg="errorMsg" :successMsg="successMsg" />
        <div class="flex flex-col">
            <div class="overflow-x-auto">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                            <CouponHeader/>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="coupon in data" @click="selectCoupon({ value1: coupon, value2: 'showEditModal' })">
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900">
                                    {{coupon.coupon_name}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900">
                                    {{coupon.discount}} %
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900">
                                    <span v-if="coupon.minus_EUR != 0">EUR: -{{coupon.minus_EUR}}</span>
                                    <span v-if="coupon.minus_USD != 0">USD: -{{coupon.minus_USD}}</span>
                                    <span v-if="coupon.minus_NZD != 0">NZD: -{{coupon.minus_NZD}}</span>
                                    <span v-if="coupon.minus_GBP != 0">GBP: -{{coupon.minus_GBP}}</span>
                                    <span v-if="coupon.minus_AUD != 0">AUD: -{{coupon.minus_AUD}}</span>
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900">
                                    {{coupon.notes}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900">
                                    {{coupon.sku | truncate(20)}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900">
                                    {{coupon.end_date | formatDate}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900">
                                    {{coupon.weekday}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" v-if="coupon.status">
                                        Active
                                    </span>
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" v-if="!coupon.status">
                                        Expired
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-right text-sm leading-5 font-medium flex">
                                    <button @click="selectCoupon({ value1: coupon, value2: 'showEditModal' })" class="pr-4 text-indigo-600 hover:text-indigo-900 focus:outline-none"><i class="fa fa-copy pr-2"></i></button>
                                    <button @click="selectCoupon({ value1: coupon, value2: 'showDeleteModal' })" class="text-red-600 hover:text-red-900 focus:outline-none"><i class="fa fa-trash pr-2"></i></button>
                                </td>
                            </tr>

                            <!-- More rows... -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Pagination/>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import Alert from "../modal/Alert";
    import Pagination from "./Pagination";
    import CouponHeader from "./CouponHeader";
    export default {
        name: "CouponList",
        components: { CouponHeader, Pagination, Alert },
        data() {
            return {
            }
        },
        created() {
            this.fetchData()
        },
        destroyed() {
            this.resetState()
        },
        computed: {
            ...mapGetters('CouponList', ['data', 'total', 'errorMsg', 'successMsg', 'currentPage', 'pageSize', 'key']),
        },
        methods: {
            ...mapActions('CouponList', ['fetchData', 'resetState', 'setModalVisibility', 'selectCoupon', 'setSearchKey']),
            updateModalVisibility(modalName, modalValue) {
                let v = {
                    modalName: modalName,
                    modalValue: modalValue
                }
                this.setModalVisibility(v)
            },
            updateSearchKey(event)
            {
                this.setSearchKey(event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>