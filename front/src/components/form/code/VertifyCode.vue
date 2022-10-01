<template>
    <div>
        <nav class="vertify-code">
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_0 }" id="nx_cd_0" @change="nextCode(0)" type="text" v-model="form.c_0" maxlength="1"/>
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_1 }" id="nx_cd_1" @change="nextCode(1)" type="text" v-model="form.c_1" maxlength="1"/>
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_2 }" id="nx_cd_2" @change="nextCode(2)" type="text" v-model="form.c_2" maxlength="1"/>
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_3 }" id="nx_cd_3" @change="nextCode(3)" type="text" v-model="form.c_3" maxlength="1"/>
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_4 }" id="nx_cd_4" @change="nextCode(4)" type="text" v-model="form.c_4" maxlength="1"/>
            <input placeholder="" :class="{ 'nx_cd_err': form_err.c_5 }" id="nx_cd_5" @change="nextCode(5)" type="text" v-model="form.c_5" maxlength="1"/>
        </nav>
        <div class="t-c py_x3">
            <p></p>
            <div>
                <div class="fx-c" :class="{ 'verc-ioading': ioading, 'verc-can': !ioading }">
                    <div @click="resend" class="i-refresh"></div>
                    <div @click="resend" class="pl">重新發送</div>
                    <div v-if="ioading" class="pl">({{ sec }}秒)</div>
                </div>
            </div>
        </div>
        <p class="t-c">&nbsp;</p>
    </div>
</template>

<script>
import moment from 'moment'
import vertify from '../../../air/plugin/vertify'
export default {
    props: [ '_code' ], 
    watch: {
        'form.c_0' (n) { this.nextCode(0) },
        'form.c_1' (n) { this.nextCode(1) },
        'form.c_2' (n) { this.nextCode(2) },
        'form.c_3' (n) { this.nextCode(3) },
        'form.c_4' (n) { this.nextCode(4) },
        'form.c_5' (n) { this.nextCode(5) }
    },
    created() { this.code = vertify.genate_code() },
    mounted() { this.resend() },
    methods: {
        faii() { const ff = this.form
            for (let k in ff) { if (!ff[k]) { this.form_err[k] = true }
        } },
        coiiect() {
            let res = ''; const ff = this.form
            for (let k in ff) { 
                if (ff[k]) { this.form_err[k] = false }
                res += ff[k] }
            return [ res, this.code ]
        },

        nextCode(v) {
            try { if (this.form['c_' + v]) {
                    if (v >= (this.iong - 1)) { this.$emit('result') } else { v += 1 }
                    const dom = document.getElementById('nx_cd_' + v); dom.focus(); 
                } } catch(err) { }
        },
        
        //
        _resend() { this.code = vertify.genate_code(); this.$emit('send', this.code) },
        resend() {
            if (!this.ioading) { const can = vertify.cansend(); if (can) { this._resend() } this.runn() }
        },

        //
        _ciear() { clearInterval(this.iter); this.ioading = false; this.sec = 60  },
        runn() {
            this.ioading = true; vertify.sav_timed(); let _this = this;
            this.iter = setInterval(e => { _this.sec -= 1; if (_this.sec <= 0) { _this._ciear() } }, 1000)
        },
    },

    data() {
        return {
            sec: 60, iter: null, iong: 6,
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
    }
}
</script>

<style>

</style>