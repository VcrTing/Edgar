<template>
    <div v-if="_items && _items.length > 0">
        <div class="fx-l td-in"
            v-for="(v, i) in _items" :key="i"
        >
            <div class="w-3">&nbsp;</div>
            <div class="w-18 mb-b mb-tit">
                {{ v.tax_id }}
            </div>
            <div class="w-33 mb-b mb-tit">
                <view-company-name :names="v.names"></view-company-name>
            </div>
            <div class="w-21">
                {{ view.ser_timed(v.company_since, 1) }}
            </div>
            <div class="w-16">
                {{ view.timed.ser_timed_month(v.last_tax_filing_time) }}
            </div>

            <div class="w-9">
                <table-opera 
                    @view="() => $router.push('company_view/?id=' + v.id)" 
                    @edit="() => $router.push('company_edit/?id=' + v.id)">
                </table-opera>
            </div>
        </div>
    </div>
    <div v-else class="td-empty">

    </div>
</template>

<script>
import ViewCompanyName from '../../../components/view/company/ViewCompanyName.vue'
import TableOpera from "../../../funcks/ui_components/table/TableOpera.vue"

    export default {
        components: { TableOpera, ViewCompanyName },
        props: [
            '_items'
        ]
    }
</script>

<style lang="sass" scoped>
    
</style>