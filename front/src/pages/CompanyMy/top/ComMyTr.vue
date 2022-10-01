<template>
    <div class="fx-l">
        <div class="w-3">&nbsp;</div>
        <div class="w-18">公司編號 CR No.<!--company-tool-tip :k="'comp_cr_id'"></!--company-tool-tip--></div>
        <div class="w-33">公司名字 Company name<!--company-tool-tip :k="'comp_name'"></!--company-tool-tip--></div>
        <div class="w-21">成立日期<!--company-tool-tip :k="'comp_since'"></!--company-tool-tip--><br/>Incorporation date</div>
        <div class="w-25">財政年度年結日<!--company-tool-tip :k="'comp_filling'"></!--company-tool-tip--><br/>Financial year end date</div>
    </div>
</template>

<script>
import CompanyToolTip from '../../../components/alert/tip/CompanyToolTip.vue'
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