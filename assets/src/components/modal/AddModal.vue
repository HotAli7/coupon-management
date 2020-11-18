<template>
    <div id="drag-drop-area" class="fixed z-10 inset-0 overflow-y-auto" v-if="showAddModal">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-blue-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 class="text-lg leading-6 font-bold text-purple-900 text-center" id="modal-headline">
                        Create A New Coupon
                    </h3>
                </div>
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto max-h-form">
                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <div class="mt-2">
                                <div class="mt-4">
                                    <label for="coupon_name" class="block mb-1 cursor-pointer">Coupon Name:</label>
                                    <input aria-label="Coupon Name" id="coupon_name" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none outline-none sm:text-sm sm:leading-5" placeholder="Coupon Name" @change="updateName($event)">
                                </div>
                                <div class="mt-4">
                                    <label for="coupon_name" class="block mb-1 cursor-pointer">Coupon Name:</label>
                                    <textarea aria-label="Coupon Note" name="name" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Coupon Note" @change="updateName($event)"></textarea>
                                </div>
                                <div class="mt-4">
                                    <label class="inline-flex items-center">
                                        <input type="radio" class="form-radio" name="accountType" @click="updateDiscountType(true)" checked>
                                        <span class="ml-2">Discount in %</span>
                                    </label>
                                    <label class="inline-flex items-center ml-6">
                                        <input type="radio" class="form-radio" name="accountType" @click="updateDiscountType(false)">
                                        <span class="ml-2">Discount in Number</span>
                                    </label>
                                </div>
                                <div class="mt-4" v-if="discountType">
                                    <input aria-label="Discount, %" name="discount" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Discount, %" @change="updateDiscount($event)">
                                </div>
                                <div class="mt-4" v-else>
                                    <fieldset class="mt-4 flex flex">
                                        <input aria-label="Discount, EUR" name="discount" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Discount, EUR" @change="UpdateMinusEUR($event)">
                                        <input aria-label="Discount, USD" name="discount" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Discount, USD" @change="UpdateMinusUSD($event)">
                                    </fieldset>
                                    <fieldset class="mt-4 flex flex">
                                        <input aria-label="Discount, NZD" name="discount" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Discount, NZD" @change="UpdateMinusNZD($event)">
                                        <input aria-label="Discount, GBP" name="discount" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Discount, GBP" @change="UpdateMinusGBP($event)">
                                    </fieldset>
                                    <fieldset class="mt-4 flex flex">
                                        <input aria-label="Discount, AUD" name="discount" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Discount, AUD" @change="UpdateMinusAUD($event)">
                                        <input aria-label="Discount, %" name="discount" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 none" placeholder="Discount, %" @change="UpdateMinusAUD($event)">
                                    </fieldset>
                                </div>
                                <div class="mt-4">
                                    <label class="block mb-1">Line Items:</label>
                                    <multiselect v-model="value" :options="options" :multiple="true" group-values="libs" group-label="language" :group-select="true" placeholder="Type to search" track-by="name" label="name"><span slot="noResult">Oops! No elements found. Consider changing the search query.</span></multiselect>
                                </div>
                                <div class="mt-4">
                                    <label class="block mb-1">Except Line Items:</label>
                                    <multiselect v-model="value" :options="options" :multiple="true" group-values="libs" group-label="language" :group-select="true" placeholder="Type to search" track-by="name" label="name"><span slot="noResult">Oops! No elements found. Consider changing the search query.</span></multiselect>
                                </div>
                                <div class="mt-4">
                                    <label for="url" class="block mb-1 cursor-pointer">URL Address:</label>
                                    <input aria-label="URL Address" id="url" name="url" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="URL Address" @change="updateURL($event)">
                                </div>
                                <div class="mt-4">
                                    <label for="except_url" class="block mb-1 cursor-pointer">Except URL Address:</label>
                                    <input aria-label="Except URL Address" id="except_url" name="except_url" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Except URL Address" @change="updateExceptURL($event)">
                                </div>
                                <div class="mt-4">
                                    <label for="usage_limit" class="block mb-1 cursor-pointer">Usage Limit:</label>
                                    <input aria-label="Usage Limit (Number of Times)" id="usage_limit" name="usage_limit" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Usage Limit (Number of Times)" @change="UpdateUsageLimit($event)">
                                </div>
                                <div class="mt-4">
                                    <fieldset class="mt-4 flex flex">
                                        <input aria-label="Start Date" name="discount" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Start Date" @change="updateName($event)">
                                        <input aria-label="End Date" name="discount" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 none" placeholder="End Date" @change="updateName($event)">
                                    </fieldset>
                                </div>
                                <div class="mt-4">
                                    <fieldset class="mt-4 flex flex">
                                        <label for="mon" class="rounded relative block w-full px-3 py-2 border border-gray-300 cursor-pointer sm:text-sm sm:leading-5 text-center hover:bg-gray-200"><input type="checkbox" value="Mon" id="mon" class="invisible" @change="updateWeekday($event)"/><span>Monday</span></label>
                                        <label for="tue" class="rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 cursor-pointer sm:text-sm sm:leading-5 text-center hover:bg-gray-200"><input type="checkbox" value="Tue" id="tue" class="invisible" @change="updateWeekday($event)"/><span>Tuesday</span></label>
                                        <label for="wen" class="rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 cursor-pointer sm:text-sm sm:leading-5 text-center hover:bg-gray-200"><input type="checkbox" value="Wen" id="wen" class="invisible" @change="updateWeekday($event)"/><span>Wednesday</span></label>
                                        <label for="thu" class="rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 cursor-pointer sm:text-sm sm:leading-5 text-center hover:bg-gray-200"><input type="checkbox" value="Thu" id="thu" class="invisible" @change="updateWeekday($event)"/><span>Thursday</span></label>
                                        <label for="fri" class="rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 cursor-pointer sm:text-sm sm:leading-5 text-center hover:bg-gray-200"><input type="checkbox" value="Fri" id="fri" class="invisible" @change="updateWeekday($event)"/><span>Friday</span></label>
                                        <label for="sat" class="rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 cursor-pointer sm:text-sm sm:leading-5 text-center hover:bg-gray-200"><input type="checkbox" value="Sat" id="sat" class="invisible" @change="updateWeekday($event)"/><span>Saturday</span></label>
                                        <label for="sun" class="rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 cursor-pointer sm:text-sm sm:leading-5 text-center hover:bg-gray-200"><input type="checkbox" value="Sun" id="sun" class="invisible" @change="updateWeekday($event)"/><span>Sunday</span></label>
                                    </fieldset>
                                </div>
                                <div class="mt-4">
                                    <fieldset class="mt-4 flex flex">
                                        <label for="activateCoupon" class="rounded relative block w-full px-3 py-2 border border-gray-300 cursor-pointer sm:text-sm sm:leading-5 text-center hover:bg-gray-200"><input type="checkbox" id="activateCoupon" class="invisible" @change="updateActivateCoupon($event)"/><span>Activate Coupon</span></label>
                                        <label for="minimum_spend_amount" class="relative block w-full px-3 py-2 ml-2 text-gray-900 outline-none text-right cursor-pointer sm:text-sm sm:leading-5">Minimum Spend Amount</label>
                                        <input aria-label="Minimum Spend Amount" id="minimum_spend_amount" name="minimum_spend_amount" type="number" required class="rounded relative block w-full px-3 py-2 ml-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5 none" placeholder="Minimum Spend Amount" @change="updateMinimumSpendAmount($event)">
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button type="button" class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="insertCoupon()">
                        Add Talent
                        </button>
                    </span>
                    <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" @click="updateModalVisibility('showAddModal', false)">
                        Cancel
                        </button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import MultiSelect from "../MultiSelect";
    import VueTailwindPicker from 'vue-tailwind-picker';

    export default {
        name: "AddModal",
        components: { MultiSelect, VueTailwindPicker },
        data() {
            return {
                discountType: true,
                options: [
                    {
                        language: 'Javascript',
                        libs: [
                            { name: 'Vue.js', category: 'Front-end' },
                            { name: 'Adonis', category: 'Backend' }
                        ]
                    },
                    {
                        language: 'Ruby',
                        libs: [
                            { name: 'Rails', category: 'Backend' },
                            { name: 'Sinatra', category: 'Backend' }
                        ]
                    },
                    {
                        language: 'Other',
                        libs: [
                            { name: 'Laravel', category: 'Backend' },
                            { name: 'Phoenix', category: 'Backend' }
                        ]
                    }
                ],
                value: []
            }
        },
        created() {
        },
        destroyed() {
        },
        computed: {
            ...mapGetters('CouponList', ['showAddModal']),
        },
        methods: {
            ...mapActions('CouponList', ['setModalVisibility']),
            updateModalVisibility(modalName, modalValue) {
                let v = {
                    modalName: modalName,
                    modalValue: modalValue,
                }
                this.setModalVisibility(v)
            },
            updateDiscountType(value)
            {
                this.discountType = value
                console.log(this.discountType)
            }
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>

</style>