<template>
    <div>
        <div :class="_cis" v-for="(v, i) in data" :key="i" class="pb">
            <transition name="upper">
                <div class="fx-l upper" 
                    :class="{ 'pt': i > 0 }"
                >
                    <nav class="w-40 input-attach mb-w-618 input-email">
                        <input type="text" placeholder="請輸入電郵地址" v-model="v.v" class="input">
                        <span class="icon pri_son">
                            <i class="fas fa-trash-alt" @click="trash(i)"></i>
                        </span>
                    </nav>
                    <div class="w-60 mb-w-382 pl input-email-add" v-show="show_plus">
                        <button-primary class="btn-icon mh_n mh_n-w" @tap="insert()"
                            v-if="i == (data.length - 1)"
                        >
                            <i class="fas fa-plus"></i>
                        </button-primary>
                    </div>
                </div>
            </transition>
            <transition name="upper">
                <div class="pt_x upper" v-if="show(v.v)">
                    <ccf-vertify :item="v" :way="view.remind.SEND_WAY_TXT.email.v"></ccf-vertify>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '@/funcks/ui/button/ButtonPrimary.vue'
import CcfVertify from '../vertify/CcfVertify.vue'
    export default {
  components: { ButtonPrimary, CcfVertify },
        props: [
            'typed',
            'data',
            '_cis'
        ],
        computed: {
            show_plus() {
                let src = this.data ? this.data : [ ]
                return src.length < 2 }
        },
        mounted() { },
        methods: {
            show(v) { return (v.indexOf('@') > 0) && (v.indexOf('.com') > 0) },
            can(v) {
                let res = (v != null && v != '' && v.length > 5)
                if (this.typed == 'phone') {
                    res = (v.length < 17 && this.vid.val_phone(v))
                } else if (this.typed == 'email') {
                    res = (v.length < 90 && this.vid.val_email(v))
                }
                return  res
            },

            valid() {
                return this.data ? this.data.filter(e => (this.can(e.v) && e.is_vertify) ? true : false) : false
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
                is_first: true,
                is_vertify: false,
                need_vertify: true,
            }) }
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