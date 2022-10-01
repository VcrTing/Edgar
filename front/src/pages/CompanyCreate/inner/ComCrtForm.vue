<template>
    <div>
        <div class="pb_x">
            <input-wrapper class="w-40 mb-w-618" :label="'公司編號 CR No.'" :valid="form_err.tax_id">
                <input type="text" class="input" placeholder="請輸入" v-model="form.tax_id">
            </input-wrapper>
        </div>

        <input-wrapper :label="'公司名字 Company Name (English)'" class="pb_x" :valid="form_err.name_en">
            <input type="text" class="input" placeholder="請輸入" v-model="form.name_en">
        </input-wrapper>

        <input-wrapper :label="'公司名字 Company Name (Chinese)'" class="pb_x" :valid="form_err.name_ch">
            <input type="text" class="input" placeholder="請輸入" v-model="form.name_ch">
        </input-wrapper>

        <div class="pb_x fx-l">
            <input-wrapper class="w-40 mb-w-618" :label="'成立日期 Company Since'">
                <input-data :_date="since" v-if="since" @result="(v) => form.company_since = v"></input-data>
            </input-wrapper>
        </div>

        <div class="pb_x">
            <input-wrapper class="w-40 mb-w-618" :label="'財政年度年結日 Last Tax filing time'">
                <input-data :_date="form.last_tax_filing_time" v-if="form.last_tax_filing_time" @result="(v) => form.last_tax_filing_time = v"></input-data>
            </input-wrapper>
        </div>

<nav class="upper" v-show="show_tip">
    <div class="py">
    <p>註意：</p>
    <div class="pt_s pb pr_x2">同一個公司，你可以添加最多2個WhatsApp和2個電郵提示服務，方便和公司其他合夥人，董事或行政經理同日收到合規提示</div>
    </div>
</nav>
        
            <input-wrapper :tip="'請檢查電話號碼的有效性'" class="pb_x" :label="'The phone number receive Whatsapp'" :valid="form_err.phones">
                <ccf-phone-add ref="phonesREF" :typed="'phone'" :data="form.phones"></ccf-phone-add>
            </input-wrapper>


<div class="pb">
<p>有關電郵提示，提供選項：</p>
<div class="pt_s pb">想公司拍檔或公司行政財務等同事也同步收到電郵提升？立即增加他們的電郵。</div>
</div>

            <input-wrapper :tip="'請檢查電郵地址的有效性'" class="" :label="'The Email receive notification'" :valid="form_err.emails">
                <ccf-email-add ref="emailsREF" :typed="'email'" :data="form.emails"></ccf-email-add>
            </input-wrapper>

    </div>
</template>

<script>
import moment from 'moment'
import CompanyTypeSelect from '../../../components/form/select/CompanyTypeSelect.vue'
import ButtonPrimary from '../../../funcks/ui/button/ButtonPrimary.vue'
import InputData from '../../../funcks/ui/input/InputData.vue'
import InputWrapper from '../../../funcks/ui_components/input/InputWrapper.vue'
import CcfPhoneAdd from './extra/CcfPhoneAdd.vue'
import CcfEmailAdd from './extra/CcfEmailAdd.vue'
    export default {
  components: { InputWrapper, InputData, ButtonPrimary, CcfPhoneAdd, CompanyTypeSelect, CcfEmailAdd },
        name: '',
        props: [
            'origin',
        ],
        watch: {
            'form.name_en'(n) {
                if (n && n.length > 3) {
                    this.show_tip = true
                }
            }
        },
        computed: {
            since() {
                return this.form.company_since ? this.form.company_since : this.view.timed.getToday()
            },
            has_phone_or_email() {
                const p = this.form.phones
                const e = this.form.emails
                let res = (p && p[0] && p[0].v)
                if (e && e[0] && e[0].v) { res = true }
                return res
            }
        },
        data() {
            return {
                show_tip: false,
                form: {
                    tax_id: '', name_en: '', name_ch: '', company_type: '', company_since: '', last_tax_filing_time: '', 
                    phones: [ ], emails: [ ]
                },
                form_err: {
                    tax_id: '', name_en: '', name_ch: '', phones: '', emails: ''
                }
            }
        },
        mounted() { this.reset() },
        methods: {
            errorForm() {
                this.form_err.tax_id = (!this.form.tax_id || this.form.tax_id.length < 2 || this.form.tax_id.length > 60)
                this.form_err.name_en = (!this.form.name_en || this.form.name_en.length < 2 || this.form.name_en.length > 220)
                // this.form_err.name_ch = (!this.form.name_ch || this.form.name_ch.length < 2 || this.form.name_ch.length > 160)

                const phs = this.form.phones.filter(e => { if (e.v) { return true }; return false })
                this.form_err.phones = phs.length > 0 ?
                    this.$refs.phonesREF.valid().length <= 0 :
                    false
                this.form_err.emails = this.$refs.emailsREF.valid().length <= 0

                for (let k in this.form_err) {
                    if (this.form_err[k]) { return true }
                }
            },
            submit() {
                this.form.company_type = 1 // this.$refs.comtypeREF.now
                this.build_name()
                this.form.last_tax_filing_time = this.form.last_tax_filing_time + ' 00:00:00'
                return this.errorForm() ? null : this.form
            },

            build_name() {
                this.form[ 'names' ] = [
                    { txt: this.form.name_ch, lang: 'hk' },
                    { txt: this.form.name_en, lang: 'en' }
                ]
            },
            reset() {
                if (this.origin) {
                    this.form = this.origin
                } else {
                    const y = new Date().getFullYear()
                    this.form = {
                        tax_id: '', name_en: '', name_ch: '', company_type: 1, // this.$refs.comtypeREF.now, 
                        company_since: y + '-01-01', last_tax_filing_time: y + '-01-01',
                        phones: [ 
                            {
                                v: '',
                                code: '',
                                prefix: '852',
                                is_first: true,
                                is_vertify: false,
                                need_vertify: true,} ], 
                        emails: [ 
                            {
                                v: '',
                                code: '',
                                is_first: true,
                                is_vertify: false,
                                need_vertify: true,} ]
                    }
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>