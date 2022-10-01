<template>
    <div class="px_x2 ttd_son">
        <struct-input-detail :header="'公司編號 CR No.'">
            {{ comp.tax_id }}
        </struct-input-detail>
        <struct-input-detail :header="'公司名字 Company name(English)'">
            <view-company-name v-if="comp.names" :names="comp.names" :mode="'en'"></view-company-name>
        </struct-input-detail>
        <struct-input-detail :header="'公司名字 Company name(Chinese)'">
            <view-company-name v-if="comp.names" :names="comp.names" :mode="'hk'"></view-company-name>
        </struct-input-detail>
        <struct-input-detail :header="'成立日期 Incorporation date'">
            {{ view.ser_timed(comp.company_since, 1) }}
        </struct-input-detail>
        <struct-input-detail :header="'財政年度年結日 Financial year end date'">
            {{ view.ser_timed(comp.last_tax_filing_time, 1) }}
        </struct-input-detail>
        <struct-input-detail :header="'The phone number receive Whatsapp'">
            <view-company-recive-list :_items="comp.phones"></view-company-recive-list>
        </struct-input-detail>
        <struct-input-detail :header="'The Email receive notification'">
            <view-company-recive-list :_items="comp.emails"></view-company-recive-list>
        </struct-input-detail>
    </div>
</template>

<script>
import ViewCompanyName from '../../../components/view/company/ViewCompanyName.vue'
import ViewCompanyReciveList from '../../../components/view/company/ViewCompanyReciveList.vue'
import StructInputDetail from '../../../funcks/ui_layout/detail/StructInputDetail.vue'
    export default {
        props: [ 'comp' ],
        components: { StructInputDetail, ViewCompanyName, ViewCompanyReciveList},
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>