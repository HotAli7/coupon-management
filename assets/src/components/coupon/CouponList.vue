<template>
    <div class="container my-5">
        <div class="flex justify-between mb-6 px-6 container">
            <h3 class="text-purple-900 text-xl font-bold py-2 px-4 m-2 w-2/5">Coupon List</h3>
            <div class="sm:ml-6 flex items-end w-3/5 py-2 px-4 m-2">
                <input data-v-57d7188b="" aria-label="Search" name="key" type="text" required="required" placeholder="Search" class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-purple-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 w-3/5" :value="key" @input="updateSearchKey($event)">
                <button class="transition duration-500 ease-in-out bg-gradient-to-r from-green-400 to-green-700 text-white font-bold py-2 px-4 rounded w-2/5 ml-6" @click="updateModalVisibility('showAddModal', true)">
                    <i class="fa fa-plus"></i><span class="ml-2 uppercase">Create A Coupon</span>
                </button>
            </div>
        </div>
        <div class="flex flex-start mb-6 px-6 container">
            <button class="px-6 focus:outline-none" :class="activeFilterButton" @click="filterData(1)">Active({{ activeCount }})</button>
            <button class="px-6 focus:outline-none" :class="expiredFilterButton" @click="filterData(0)">Expired({{ expiredCount }})</button>
        </div>
        <hr class="bg-blue-500 mb-6">
        <Alert :errorMsg="errorMsg" :successMsg="successMsg" />
        <div class="flex flex-col">
            <div class="overflow-x-auto">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 table-auto">
                            <CouponHeader/>
                            <tbody class="bg-white divide-y divide-gray-200">
                            <tr class="cursor-pointer" v-for="coupon in data">
                                <td class="px-6 py-4 text-sm leading-5 text-purple-900 hover:text-purple-500" @click="selectCoupon({ value1: coupon, value2: 'showEditModal' })">
                                    {{coupon.coupon_name}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-purple-900">
                                    {{coupon.discount}} %
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-purple-900">
                                    <span v-if="coupon.minus_EUR != 0">EUR: -{{coupon.minus_EUR}}</span>
                                    <span v-if="coupon.minus_USD != 0">USD: -{{coupon.minus_USD}}</span>
                                    <span v-if="coupon.minus_NZD != 0">NZD: -{{coupon.minus_NZD}}</span>
                                    <span v-if="coupon.minus_GBP != 0">GBP: -{{coupon.minus_GBP}}</span>
                                    <span v-if="coupon.minus_AUD != 0">AUD: -{{coupon.minus_AUD}}</span>
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-purple-900">
                                    {{coupon.notes}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-purple-900">
                                    {{coupon.sku | truncate(20)}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-purple-900">
                                    {{coupon.end_date | formatDate}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-purple-900">
                                    {{coupon.weekday}}
                                </td>
                                <td class="px-6 py-4 text-sm leading-5 text-purple-900">
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" v-if="coupon.status">
                                        Active
                                    </span>
                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" v-if="!coupon.status">
                                        Expired
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-right text-sm leading-5 font-medium flex flex-col">
                                    <div>
                                        <button @click="selectCoupon({ value1: coupon, value2: 'showEditModal' })" class="pr-4 text-indigo-600 hover:text-indigo-900 focus:outline-none"><i class="fa fa-copy pr-2"></i></button>
                                        <button @click="selectCoupon({ value1: coupon, value2: 'showDeleteModal' })" class="text-red-600 hover:text-red-900 focus:outline-none"><i class="fa fa-trash pr-2"></i></button>
                                    </div>
                                    <div>
                                        <span class="block text-green-500">{{coupon.created|formatDate}}</span>
                                        <span class="block text-purple-500">{{coupon.updated|formatDate}}</span>
                                    </div>
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

        <AddModal />
        <EditModal />
        <DeleteModal />
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    import Alert from "../modal/Alert";
    import Pagination from "./Pagination";
    import CouponHeader from "./CouponHeader";

    import AddModal from "../modal/AddModal";
    import EditModal from "../modal/EditModal";
    import DeleteModal from "../modal/DeleteModal";
    export default {
        name: "CouponList",
        components: { CouponHeader, Pagination, Alert, AddModal, EditModal, DeleteModal },
        data() {
            return {
                'activeFilterButton': 'text-green-600',
                'expiredFilterButton': 'text-purple-600'
            }
        },
        created() {
            this.fetchData()
        },
        destroyed() {
            this.resetState()
        },
        computed: {
            ...mapGetters('CouponList', ['data', 'total', 'errorMsg', 'successMsg', 'currentPage', 'pageSize', 'key', 'activeCount', 'expiredCount']),
        },
        methods: {
            ...mapActions('CouponList', ['fetchData', 'resetState', 'setModalVisibility', 'selectCoupon', 'setSearchKey', 'filterCoupon']),
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
            },
            filterData(activate_value)
            {
                this.filterCoupon(activate_value)
                if (activate_value)
                {
                    this.activeFilterButton = "text-green-600"
                    this.expiredFilterButton = "text-purple-600"
                } else
                {
                    this.activeFilterButton = "text-purple-600"
                    this.expiredFilterButton = "text-green-600"
                }
            }
        }
    }
</script>

<style scoped>

</style>