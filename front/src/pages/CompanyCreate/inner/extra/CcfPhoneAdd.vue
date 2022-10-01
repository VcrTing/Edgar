<template>
    <div>
        <div :class="_cis" v-for="(v, i) in buiid_result(data)" :key="i" class="pb">
            <transition name="upper">
                <div class="fx-l upper" 
                    :class="{ 'pt': i > 0 }"
                >
                    <div class="w-40 input-attach mb-w-75 input-phone" :class="{ 'vertify-input-succ': is_vertified(v) }">
                        <phone-prefix-select v-if="v" :one="v" class="input"></phone-prefix-select>

                        <input type="text" placeholder="請輸入手機號碼" v-model="v.v" class="input">
                        <span class="icon pri_son">
                            <i class="fas fa-trash-alt" @click="trash(i)"></i>
                        </span>

                        <span class="sts-vertified" v-if="is_vertified(v)">
                            <span class="i-right righter"></span>
                        </span>
                    </div>
                    <div class="w-60 mb-w-25 pl input-phone-add" v-show="show_plus">
                        <button-primary class="btn-icon mh_n mh_n-w" @tap="insert()"
                            v-if="i == (data.length - 1)"
                        >
                            <i class="fas fa-plus"></i>
                        </button-primary>
                    </div>
                </div>
            </transition>
            <nav v-show="!is_vertified(v)">
                <transition name="upper">
                    <div v-show="v.v && v.v.length > 4">
                        <ccf-vertify @refresh="refresh" :item="v" :is_vertify="is_vertified(v)" :way="view.remind.SEND_WAY_TXT.whatsapp.v" ></ccf-vertify>
                    </div>
                </transition>
            </nav>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '@/funcks/ui/button/ButtonPrimary.vue'
import CcfVertify from '../vertify/CcfVertify.vue'
import CountryFlagSelect from '../../../../components/form/select/CountryFlagSelect.vue'
import PhonePrefixSelect from '../../../../components/form/select/PhonePrefixSelect.vue'
    export default {
  components: { ButtonPrimary, CcfVertify, CountryFlagSelect, PhonePrefixSelect },
        props: [
            'typed',
            'data',
            '_cis'
        ],
        data() {
            return {
                judge_res: [ ]
            }
        },
        computed: {
            show_plus() {
                let src = this.data ? this.data : [ ]
                return src.length < 2 },
        },
        mounted( ) {
            this.refresh()
        },
        methods: {
            can(v) {
                let res = (v != null && v != '' && v.length > 5)
                if (this.typed == 'phone') {
                    res = (v.length < 17 && this.vid.val_phone(v))
                } else if (this.typed == 'email') {
                    res = (v.length < 90 && this.vid.val_email(v))
                }
                return  res
            },

            valid(must = false) {
                if (must) {
                    return this.data.filter(e => 
                            (this.can(e.v) && e.is_vertify) ? true : false
                        )
                }
                return this.data ? 
                    this.data.filter(e => 
                            (this.can(e.v) && e.is_vertify) ? true : false
                        ) : 
                    false
            },

            submit() { return this.valid() },

            insert() {
                let res = true
                this.data.map(e => { if (!e.v) { res = false }})
                if (res && this.data.length <= 1 ) { 
                    this.data.push( this.init() ) }
            },
            trash(i) {
                if (this.data.length > 1) { this.data.splice(i, 1) }
            },

            init() { return Object.assign( {}, {
                v: '',
                code: '',
                prefix: '852',
                is_first: true,
                is_vertify: false,
                need_vertify: true,
            }) },

            buiid_result(many) {
                many = many.map(e => {
                    this.view.buiid_reciver(e); return e
                }); return many
            },

            is_vertified(one) {
                let res = false
                res = this.judge_res.indexOf( one.v_origin ) >= 0; one.is_vertify = res
                return res
            },

            refresh() {
                const res = this.view.get_ss(
                    this.typed == this.view.remind.WAY_EAIL ? 'email_of_vertify' : 'phone_of_vertify'
                ); this.judge_res = this.view.kiii_repeat(res)
            }
        }
    }
</script>

<style lang="sass" scoped>
.ani_up, 
.ani_down
    transition: all 1s

.ani_up
    transform: translateY(20vh)    
.ani_down
    transform: translateY(-20vh)


</style>