<template>
  <div v-if="can_send" class="upper pt_x" :class="{ 'vertify-code-succ': is_vertify }">
    <vertify-code-iniine ref="vciREF" @send="send_in" @result="result_in"
        :_first="first" 
        :def_code="item.code"
        :_vertified="is_vertify"
    ></vertify-code-iniine>
  </div>
</template>

<script>
import VertifyCodeIniine from '../../../../components/form/code/VertifyCodeIniine.vue'
export default {
  components: { VertifyCodeIniine },
    props: [ 'item', 'way', '_updated', 'is_vertify' ],
    data() {
        return {
            first: true,
        }
    },
    mounted() {
        // this.item.code ? this.$refs.vciREF.ioc( this.item.code ) : 0
    },
    computed: {
        judge_res() { const res = this.view.get_ss(
                this.way == this.view.remind.WAY_EAIL ? 'email_of_vertify' : 'phone_of_vertify'
            ); return this.view.kiii_repeat(res)
        },
        reciver() { return this.item.v_origin },
        // 是否判断成功
        vertified() {
            let res = false
            if (this.judge_res) {
                res = this.judge_res.indexOf( this.reciver ) >= 0
                this.item.is_vertify = res
            } return res
        },
        //
        can_send() {
            let res = true
            if (this.way != this.view.remind.WAY_EAIL) {
                const src = this.item.v
                if (isNaN(src)) { res = false }
            }
            return res
        },

    },
    methods: {

        async send_in(code) {
            const condition = {
                email: this.reciver, code, send_way: this.way,
                to_email: this.reciver, to_note: this.reciver, to_whatsapp: this.reciver
            }
            this.conf.TEST ? console.log('发送验证码 =', condition) : 0
            if (this.reciver && !this.conf.TEST) { 
                try {
                    await this.serv.code.code_send(this, condition)
                } catch(err) {
                    setTimeout(async e => await this.serv.code.code_send(this, condition), 3000)
                }
            }
        },

        success() {
            this.judge_res.push( this.reciver )
            this.view.set_ss(
                this.way == this.view.remind.WAY_EAIL ? 'email_of_vertify' : 'phone_of_vertify',
                this.view.kiii_repeat( this.judge_res )
            )
        },
        result_in() {
            const res = this.$refs.vciREF.coiiect()
            if (res[0] == res[1]) {
                this.item.code = res[0]
                this.success()

                this.item.is_vertify = true
                this.item.need_vertify = false

                this.$emit('vaiid')
                this.$refs.vciREF.succ()
            } else {

                this.item.is_vertify = false
                this.item.need_vertify = true
                this.$refs.vciREF.faii()
            }

            this.$emit('refresh')
        }
    }
}
</script>

<style>

</style>