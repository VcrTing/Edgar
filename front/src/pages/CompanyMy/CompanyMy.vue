<template>
    <div>

        <layout-table :title="'我的公司'">
            <com-my-tr class="tr"></com-my-tr>
            <com-my-td class="td" :_items="items"></com-my-td>
        </layout-table>

        <div class="fx-c py_x4">
            <button-primary-out class="px_x2 upper" @tap="$router.push('/home/company_create')">
                增加新的公司資料
            </button-primary-out>
        </div>
    </div>
</template>

<script>
import ButtonPrimaryOut from '../../funcks/ui/button/ButtonPrimaryOut.vue'
import LayoutTable from '../../funcks/ui_layout/table/LayoutTable.vue'
import ComMyTd from './body/ComMyTd.vue'
import ComMyTr from './top/ComMyTr.vue'

    export default {
        components: { LayoutTable, ComMyTr, ComMyTd, ButtonPrimaryOut },
        data() { return { alive: true, items: [ ] } },
        mounted() { this.search() },
        methods: {
            async search(q) {
                let res = await this.serv.company.company_my( this, q )
                if (res) { this.items = res }
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>