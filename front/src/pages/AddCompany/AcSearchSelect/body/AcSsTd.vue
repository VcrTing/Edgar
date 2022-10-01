<template>
    <div v-if="_items && _items.length > 0">
        <div class="fx-l td-in"
            v-for="(v, i) in _items" :key="i"
        >
            <div class="w-5">&nbsp;</div>
            <div class="w-17 mb-b mb-tit">{{ v.tax_id }}</div>
            <div class="w-40 pr">
                <view-company-name :names="v.names"></view-company-name>
            </div>
            <div class="w-24">
                {{ view.ser_timed(v.company_since, 1) }}
            </div>
            <div class="w-14">
                <span class="pri_son hand" @click="add(v)">增加提醒服務</span>
            </div>
        </div>
    </div>
    <div v-else class="td-empty">

    </div>
</template>

<script>
import ViewCompanyName from '../../../../components/view/company/ViewCompanyName.vue'

    export default {
  components: { ViewCompanyName },
        props: [
            '_items'
        ],
        methods: {
            add(v) {
                v.step = 2
                this.view.set_ss('company_active_company', v)
                this.$router.push('/home/add_company/input_remind')
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>