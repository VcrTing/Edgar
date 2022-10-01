<template>
    <div class="max-w_remind pt_x3">
        <h4 class="py_x3 ttd t-c">請輸入接收提醒的方式</h4>

        <div class="pt">

            <input-wrapper :label="'WhatsApp'" :valid="form_vid.phoned">
                <input-whatsapp :picd="'請輸入您的 Whatsapp 號碼'" ref="phoneREF"></input-whatsapp>
            </input-wrapper>

            <div class="py_s"></div>
            <input-wrapper :label="'Email'" :valid="form_vid.email">
                <input type="text" v-model="form.email" class="input input-air" placeholder="請輸入您的電郵地址"
                
                    @keyup.enter="_confirm()" @blur="_confirm()" @change="_confirm()"
                >
            </input-wrapper>


            <nav v-if="again">
                <div class="py_s"></div>
                <input-wrapper class="upper" :label="'Email Confirm'" :valid="form_vid.email_again" :tip="'請檢查上下輸入的郵箱是否一致'">
                    <input type="text" v-model="form.email_again" class="input input-air" placeholder="請再次輸入您的郵箱"
                        οnpaste="return false" @blur="_confirm()"
                    />
                </input-wrapper>
            </nav>

            <checkbox-send-way ref="wayREF"></checkbox-send-way>
        </div>

        <div class="fx-c py_x2">
            <button-primary class="px_x3 w-163 upper" @tap="confirm()">
                <span v-if="_skip">下一步</span>
                <span v-else>驗證您的電郵</span>
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
    export default {
  components: { InputWrapper, InputWhatsapp, ButtonPrimary, CountryFlagSelect, CheckboxSendWay },
        props: [ '_skip' ],
        data() {
            return {
                again: false,
                send_way: [ 'email' ],
                form: { phoned: '+852', email: '', email_again: '' },
                form_vid: { phoned: '', email: '', email_again: '' },
            }
        },
        mounted() { this.def() },
        methods: {
            confirm() {
                if (this._confirm()) { this.next() }
            },

            next() {
                let res = undefined

                this.form.phoned = this.$refs.phoneREF.collect()

                if (!this.errorForm()) {
                    res = this.view.get_ss('company_active_company')

                    res.step = 3
                    res.emails = [ { v: this.form.email } ]
                    res.phones = [ { v: this.form.phoned } ]
                    res.send_way_world = this.view.remind.send_way_world( this.$refs.wayREF.collect() )
                    
                    this.view.set_ss('company_active_company', res)

                    this.$emit('next', this.form.email)
                }
            },

            errorForm() {
                let e = this.form.email
                let p = this.form.phoned

                // true 为错
                this.form_vid.email = !this.vid.val_email(e)
                this.form_vid.phoned = !this.vid.val_phone(p)

                for (let k in this.form_vid) {
                    if (this.form_vid[k]) { return true }
                }
            },

            _confirm() {
                const ori = this.form.email.trim()
                let again = this.form.email_again.trim()
                this.form_vid.email = !this.vid.val_email(ori)

                if (ori.indexOf('.') >= 0 ) { 
                    if (again) {
                        if (ori == again) { this.form_vid.email_again = ''; return true } else { this.form_vid.email_again = true }
                    } else {
                        if (ori.indexOf('@') >= 0) { this.again = true }
                    }
                } else { this.form_vid.email = true }
            },
            def() {
                const res = this.view.get_ss('company_active_company')
                res.emails ? res.emails.map(e => {
                    this.form.email = e.v
                }) : ''
                res.phones ? res.phones.map(e => {
                    e = e.v ? e.v.split(' ') : [ ]
                    this.$refs.phoneREF.ioc(...e)
                }): ''
                const snd = res.send_way_world ? res.send_way_world.split('_') : null
                snd ? this.$refs.wayREF.ioc( snd ) : ''

                if (this.form.email) { this.again = true; this.form.email_again = this.form.email }
            }
        },
        computed: {
            comp() {
                return null
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>