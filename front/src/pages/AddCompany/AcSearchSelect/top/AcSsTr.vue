<template>
    
    <div class="fx-l">
        <div class="w-5">&nbsp;</div>
        <div class="w-17">
            公司編號 CR No.<!--company-tool-tip :k="'comp_cr_id'"></！company-tool-tip-->
        </div>
        <div class="w-40 pr">
            公司名字 Company name<!--company-tool-tip :k="'comp_name'"></!--company-tool-tip-->
        </div>
        <div class="w-38">
            成立日期 Incorporation date<!--company-tool-tip :k="'comp_since'"></!--company-tool-tip-->
        </div>
    </div>
</template>

<script>
import CompanyToolTip from '../../../../components/alert/tip/CompanyToolTip.vue'
    export default {
  components: { CompanyToolTip },
        name: '',
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>