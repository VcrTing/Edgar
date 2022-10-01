<template>
    <div class="pl_n d-ib">

        <tool-tip :cont="txt">
            <div class="company-doubt fx-c sub">
                ?
            </div>
        </tool-tip>
    </div>
</template>

<script>
import ToolTip from '../../../funcks/ui/tool/ToolTip.vue'
    export default {
  components: { ToolTip },
        props: [ 'k' ],
        data() {
            return {
                txts: { 'comp_cr_id': '公司編號', 'comp_name': '公司名字', 'comp_since': '成立日期', 'comp_filling': '財政年度年結日' }
            }
        },
        computed: {
            txt() {
                if (this.k) { return this.txts[ this.k ] } return ''
            }
        }
    }
</script>

<style lang="sass" scoped>
</style>