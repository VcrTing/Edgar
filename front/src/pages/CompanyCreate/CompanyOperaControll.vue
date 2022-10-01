<template>
    <div class="">
        <page-header-edit :header="_header" :cis="''"></page-header-edit>

        <com-crt-form class="pb_x2 pt" ref="formREF" v-if="typed == 'plus'"></com-crt-form>

        <div v-else class="pb_x2">
            <com-crt-form class="pb_x2" ref="formREF" v-if="def" :origin="def"></com-crt-form>
        </div>

        <div class="fx-c py_x3">
            <button-primary class="px_x lefter" @tap="submit">
                <i v-if="loading" class="fas fa-circle-notch circle-around"></i>
                <span v-else>保存</span>
            </button-primary>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <button-primary-out @tap="$router.go(-1)">
                返回
            </button-primary-out>
            <nav v-if="typed == 'edit'">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <button-primary class="px_x lefter" @tap="trash">
                    删除
                </button-primary>
            </nav>

        </div>

        <div class="mb-for-keyboard"></div>

        <!--status-prop></status-prop-->
    </div>
</template>

<script>
import moment from 'moment'

import ButtonPrimary from '../../funcks/ui/button/ButtonPrimary.vue'
import ButtonPrimaryOut from '../../funcks/ui/button/ButtonPrimaryOut.vue'
import PageHeader from '../../funcks/ui/header/PageHeader.vue'
import ComCrtForm from "./inner/ComCrtForm.vue"
import StatusProp from "../../components/alert/prop/StatusProp.vue"
import PageHeaderEdit from '../../funcks/ui/header/PageHeaderEdit.vue'

    export default {
        components: { ComCrtForm, ButtonPrimary, ButtonPrimaryOut, PageHeader, StatusProp, PageHeaderEdit },
        props: [ 'typed', 'def' ],
        data() {
            return {
                loading: true,
            }
        },
        mounted() {
            this.ani()
        },
        computed: {
            _header() {
                if (this.typed == 'edit') {
                    return '更改公司資料'
                }; return '填寫公司資料'
            }
        },
        methods: {
            async submit() {
                if (!this.loading) {
                    this.loading = true
                    let data = this.$refs.formREF.submit()
                    if (data) {
                        let res = null
                        if (this.typed == 'edit') {
                            res = await this.serv.company.company_update(this, this.deleteUpdateData(data))
                            if (res && res.id) { 
                                await this.serv.remind.remind_update_for_send(this, res) }
                        } else if (this.typed == 'plus') {
                            console.log(this.buildPlus(data))
                            res = await this.serv.company.company_plus(this, this.buildPlus(data))
                            if (res) { const rmd = await this.plusRemind(res); this.$emit('finish_create', rmd) }
                        }
                        if (res) { setTimeout(e => { this.loading = false; this.$router.push('/home/company_my') }, 600) }
                    }; this.ani()
                }
            },

            async plusRemind(comp) {
                let rmd = { 
                    company: comp.id, unsure: false, rule: this.view.remind.build_rule(), 
                    is_stop: false, work_year: '_', send_way_world: this.view.remind.SEND_WAY_DEF }
                rmd.send_date_real_str = moment(comp.last_tax_filing_time).format('MM-DD')
                rmd.send_date_since_real_str = moment(comp.company_since).format('MM-DD')
                rmd.send_typed = 0
                rmd.send_typed_finish = false
                return await this.serv.remind.create(this, rmd)
            },

            buildPlus(res) {
                res.user = this.$store.state.user.id
                res.is_stop = this.unsure
                res.last_tax_filing_time = res.last_tax_filing_time ? res.last_tax_filing_time.substring(0, 10) : ''
                return res
            },

            deleteUpdateData(res) {
                delete res.user
                delete res.sends
                delete res.remind
                delete res.agreement
                delete res.created_at
                delete res.updated_at
                delete res.published_at
                res.last_tax_filing_time = res.last_tax_filing_time ? res.last_tax_filing_time.substring(0, 10) : ''
                console.log('UPDATE RES =', res)
                return res
            },
            ani() { setTimeout(e => { this.loading = false }, 1200) },

            trash() {
                this.view.set_ss('company_wiii_trash', this.def)
                this.$router.push('/home/company_trash/')
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>