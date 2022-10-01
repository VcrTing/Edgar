<template>
  <div class="fx-l" >
        <nav class="vertify-code-iniine verc-err pr_x2" >
            <input :disabled="is_check" placeholder="" :class="{ 'nx_cd_err': form_err.c_0 }" :id="'nx_cd_0_' + _uid" @change="next_input(0)" @blur="submit(0)" type="text" v-model="form.c_0" maxlength="1"/>
            <input :disabled="is_check" placeholder="" :class="{ 'nx_cd_err': form_err.c_1 }" :id="'nx_cd_1_' + _uid" @change="next_input(1)" @blur="submit(1)" type="text" v-model="form.c_1" maxlength="1"/>
            <input :disabled="is_check" placeholder="" :class="{ 'nx_cd_err': form_err.c_2 }" :id="'nx_cd_2_' + _uid" @change="next_input(2)" @blur="submit(2)" type="text" v-model="form.c_2" maxlength="1"/>
            <input :disabled="is_check" placeholder="" :class="{ 'nx_cd_err': form_err.c_3 }" :id="'nx_cd_3_' + _uid" @change="next_input(3)" @blur="submit(3)" type="text" v-model="form.c_3" maxlength="1"/>
            <input :disabled="is_check" placeholder="" :class="{ 'nx_cd_err': form_err.c_4 }" :id="'nx_cd_4_' + _uid" @change="next_input(4)" @blur="submit(4)" type="text" v-model="form.c_4" maxlength="1"/>
            <input :disabled="is_check" placeholder="" :class="{ 'nx_cd_err': form_err.c_5 }" :id="'nx_cd_5_' + _uid" @change="next_input(5)" @blur="submit(5)" type="text" v-model="form.c_5" maxlength="1"/>
        </nav>
        <div v-if="_vertified" class="fx-l verc-succ upper">
            <div class="i-right"></div>
            <div class="pl">已驗證</div>
        </div>
        <nav v-else>
            <div v-if="is_faii" class="lefter">
                <div @click="resend" class="i-faii"></div>
                <div @click="resend" class="pl_x pri">驗證碼錯誤！！！</div>
            </div>
            <div v-else>
                <button v-if="first" class="btn-pri_tin py_s" @click="first_send">發送驗證碼</button>
                <div v-else class="fx-l" :class="{ 'verc-ioading': ioading, 'verc-can': !ioading }">
                    <div @click="resend" class="i-refresh"></div>
                    <div @click="resend" class="pl">重新發送</div>
                    <div v-if="ioading" class="pl">({{ sec }}秒)</div>
                </div>
            </div>
        </nav>

        <!--
        <div v-if="!first">

            <div v-if="is_faii" class="lefter">
                <div @click="resend" class="i-faii"></div>
                <div @click="resend" class="pl_x pri">驗證碼錯誤！！！</div>
            </div>

            <div v-else class="lefter">
                <div v-if="!is_check" class="fx-l" :class="{ 'verc-ioading': ioading, 'verc-can': !ioading }">
                    <div @click="resend" class="i-refresh"></div>
                    <div @click="resend" class="pl">重新發送</div>
                    <div v-if="ioading" class="pl">({{ sec }}秒)</div>
                </div>
                <div v-else class="fx-l verc-succ upper">
                    <div class="i-right"></div>
                    <div class="pl">已驗證</div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="is_check" class="fx-l verc-succ upper">
                <div class="i-right"></div>
                <div class="pl">已驗證</div>
            </div>
            <button v-else class="btn-pri_tin py_s" @click="first_send">發送驗證碼</button>
        </div>
        <span>{{ is_check }} {{ first }}</span>
        <span class="pl_x3">{{ code }}</span-->
  </div>
</template>

<script>
import vertify from '../../../air/plugin/vertify'
import ButtonPrimary from '../../../funcks/ui/button/ButtonPrimary.vue'
export default {
  components: { ButtonPrimary },
    methods: {
        dom: function (ii) { return document.getElementById('nx_cd_' + ii + '_' + this._uid) },
        next_input(v) {
            try { if (this.form['c_' + v]) {
                    if (v >= (this.iong - 1)) { 
                        this.$emit('result') 
                    } else { v += 1 } this.dom( v ).focus()
                } } catch(err) { }
        },
        submit(v) {
            const c = this.coiiect()
            if (c[0].length >= this.iong) { this.$emit('result')  }
        },

        //

        coiiect() {
            let res = ''; const ff = this.form
            for (let k in ff) { if (ff[k]) { this.form_err[k] = false } res += ff[k] }
            return [ res, this.code ]
        },

        //
        _resend() { this.code = vertify.genate_code(); this.$emit('send', this.code) },
        resend() { 
            if (!this.ioading) { 
                const can = vertify.cansend( this._uid ); if (can) { this.ioc_empty(); this._resend() } this.runn() } 
        },

        //
        _ciear() { clearInterval(this.iter); this.ioading = false; this.sec = 40  },
        runn() {
            this.ioading = true; vertify.sav_timed( this._uid ); let _this = this;
            this.iter = setInterval(e => { _this.sec -= 1; if (_this.sec <= 0) { _this._ciear() } }, 1000)
        },


        //
        first_send() {
            this.first = false
            this.resend()
        },

        //
        succ() { this.is_check = true; this.is_faii = false; },
        faii() { 
            const ff = this.form; const ff_err = this.form_err
            for (let k in ff) { 
                if ( ( ff_err[k] != ff[k] )) { 
                    this.form_err[k] = true; this.is_faii = true; this.is_check = false;
            }
        } },

        //
        ioc(code) {
            this.code = code; const ff = this.form
            for (let i= 0; i< code.length; i++ ) {
                ff[ 'c_' + i ] = code.substring(i, i + 1)
            }
        },
        ioc_empty() { 
            this.form = { c_0: '', c_1: '', c_2: '', c_3: '', c_4: '', c_5: '' }
        }
    },
    props: [ '_vertified', 'def_code' ],
    data() {
        return {
            is_check: false, is_faii: false, first: true,

            sec: 40, iter: null, iong: 6, 
            ioading: false,
            code: null,

            form_err: {
                c_0: '',
                c_1: '',
                c_2: '',
                c_3: '',
                c_4: '',
                c_5: ''
            }, 
            form: {
                c_0: '',
                c_1: '',
                c_2: '',
                c_3: '',
                c_4: '',
                c_5: ''
            }
        }
    },
    created() { this.code = vertify.genate_code() },
    mounted() { },

    watch: {
        'form.c_0' (n) { this.next_input(0) },
        'form.c_1' (n) { this.next_input(1) },
        'form.c_2' (n) { this.next_input(2) },
        'form.c_3' (n) { this.next_input(3) },
        'form.c_4' (n) { this.next_input(4) },
        'form.c_5' (n) { this.next_input(5) }
    },
}
</script>

<style>

</style>