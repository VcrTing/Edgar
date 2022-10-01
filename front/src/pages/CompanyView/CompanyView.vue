<template>
    <div class="">
        <page-header :header="'公司簡介'"></page-header>

        <div class="py"></div>

        <company-view-body v-if="item" :comp="item" class="pl_view"></company-view-body>

        <div class="fx-c py_x4">
            <button-primary @tap="goEdit()" class="px_x2 lefter">
                編輯
            </button-primary>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <button-primary-out @tap="$router.go(-1)">
                返回
            </button-primary-out>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../../funcks/ui/button/ButtonPrimary.vue'
import ButtonPrimaryOut from '../../funcks/ui/button/ButtonPrimaryOut.vue'
import PageHeader from '../../funcks/ui/header/PageHeader.vue'
import Search from '../../funcks/ui_components/search/Search.vue'
import CompanyViewBody from './body/CompanyViewBody.vue'

    export default {
        components: {PageHeader, Search, ButtonPrimaryOut, CompanyViewBody, ButtonPrimary },
        data() {
            return {
                alive: true,
                item: { }
            }
        },
        computed: {
            cdt() {
                const rt = this.$route.query
                if (rt) {
                    return rt.id
                }
            }
        },
        mounted() { this.fetching() },
        methods: {
            async fetching(id) {
                if (this.cdt) {
                    let res = await this.serv.company.company_one(this, this.cdt)
                    this.item = res
                }
            },

            goEdit() {
                this.$router.push('/home/company_edit/?id=' + this.item.id)
            }
        }
    }
</script>

<style lang="sass" scoped>
.pl_view
    padding-left: 12vw
</style>