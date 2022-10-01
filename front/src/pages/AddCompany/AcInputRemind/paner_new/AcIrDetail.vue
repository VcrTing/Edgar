<template>
    <div class="max-w_remind pt_x3">
        <h4 class="py_x3 ttd t-c">請輸入接收提醒的方式</h4>

        <div class="pt remind-vertify-panner">

            <input-wrapper :tip="'請檢查電話號碼的有效性'" :label="'WhatsApp'" :valid="form_err.phones">
                <ccf-phone-add :_cis="'ac-ir-dt-input'" ref="phonesREF"  :typed="'phone'" :data="form.phones"></ccf-phone-add>
            </input-wrapper>

            <div class="py_s"></div>
            <input-wrapper :tip="'請檢查電郵地址的有效性'" :label="'Email'" :valid="form_err.emails">
                <ccf-email-add :_cis="'ac-ir-dt-input'" ref="emailsREF" :typed="'email'" :data="form.emails"></ccf-email-add>
            </input-wrapper>

            <checkbox-send-way ref="wayREF"></checkbox-send-way>
        </div>

        <div class="fx-c py_x2">
            <button-primary class="px_x3 w-163 upper" @tap="confirm()">
                <span>下一步</span>
            </button-primary>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../../../../funcks/ui/button/ButtonPrimary.vue'
import InputWhatsapp from '../../../../components/form/remind/InputWhatsapp.vue'

import InputWrapper from '../../../../funcks/ui_components/input/InputWrapper.vue'
import CountryFlagSelect from '../../../../components/form/select/CountryFlagSelect.vue'
import CheckboxSendWay from '../../../../components/form/checkbox/CheckboxSendWay.vue'

import CcfPhoneAdd from '../../../CompanyCreate/inner/extra/CcfPhoneAdd.vue'
import CcfEmailAdd from '../../../CompanyCreate/inner/extra/CcfEmailAdd.vue'
    export default {
  components: { InputWrapper, InputWhatsapp, ButtonPrimary, CountryFlagSelect, CheckboxSendWay, CcfPhoneAdd, CcfEmailAdd },
        props: [
            'def_phones', 'def_emails'
         ],
         watch: {

         },
        data() {
            return {
                form: { phones: '', emails: '' },
                form_err: { phones: '', emails: '' },
            }
        },
        created() { this.reset() },
        methods: {
            vaiid() {
                if (this.$refs.wayREF.need_phoned()) {
                    this.form_err.phones = this.$refs.phonesREF.valid( true ).length <= 0
                } else {
                    const phs = this.form.phones.filter(e => { if (e.v) { return true }; return false })
                    this.form_err.phones = phs.length > 0 ? this.$refs.phonesREF.valid().length <= 0 : 0
                }
                this.form_err.emails = this.$refs.emailsREF.valid().length <= 0

                for (let k in this.form_err) { if (this.form_err[k]) { return true } }
            },
            confirm() {
                if (!this.vaiid()) {
                    this.comp.send_way = this.$refs.wayREF.collect()
                    sessionStorage.setItem('company_active_company', JSON.stringify( this.comp ))
                    
                    this.$emit('submit', [
                        this.form.phones, this.form.emails
                    ])
                }
            },
            reset() {
                this.form[ 'phones' ] = this.def_phones ? this.def_phones : [ 
                        {   v: '',
                            code: '',
                            is_first: true,
                            is_vertify: false,
                            need_vertify: true } ]
                this.form[ 'emails' ] = this.def_emails ? this.def_emails : [ 
                        {   v: '',
                            code: '',
                            is_first: true,
                            is_vertify: false,
                            need_vertify: true } ]
                            
                this.form_err = { phones: '', emails: '' }
            },
        },
        computed: {

            comp() {
                return JSON.parse( sessionStorage.getItem('company_active_company') )
            }
        }
    }
</script>

<style lang="sass">
</style>