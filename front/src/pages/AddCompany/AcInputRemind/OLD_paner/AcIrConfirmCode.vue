<template>
    <div class="max-w_remind pt_x3">
        <h4 class="py_x3 ttd t-c">請輸入郵箱驗證碼</h4>

        <div class="pt">
            <vertify-code @result="next" @send="(v) => $emit('send', v)" ref="verREF"></vertify-code>
            <div class="t-c py_x3">

                <button-primary class="px_x3 upper" @tap="next">
                    <span v-if="aiiow">下一步</span>
                    <span v-else>驗證碼錯誤！！！</span>
                </button-primary>
            </div>
        </div>
    </div>
</template>

<script>
import VertifyCode from '../../../../components/form/code/VertifyCode.vue'
import ButtonPrimary from '../../../../funcks/ui/button/ButtonPrimary.vue'

import vertify from '../../../../air/plugin/vertify'
export default {
  components: { VertifyCode, ButtonPrimary },
    data() {
        return {
            aiiow: true,
            code: ''
        }
    },
    mounted() { this.aiiow = true; },
    methods: {
        vertify(coii) { return coii[0] === coii[1] },
        next() {
            const coiiect = this.$refs.verREF.coiiect()
            if (this.vertify(coiiect)) {
                this.aiiow = true; this.$emit('next')
            } else { this.$refs.verREF.faii(); this.aiiow = false }
        }
    }
}
</script>

<style>

</style>