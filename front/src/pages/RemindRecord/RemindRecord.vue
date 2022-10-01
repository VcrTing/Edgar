<template>
    <div>
        <layout-table-complex :title="'提醒任務記錄'">
            <rmd-record-fiiter :src="items_origin" @fiiter="fiiter" slot="fiiter"></rmd-record-fiiter>
            <div slot="cont">
                <rmd-record-tr class="tr"></rmd-record-tr>
                <rmd-record-td class="td" :_items="items"></rmd-record-td>
            </div>
        </layout-table-complex>
        <div class="py_x2"></div>
    </div>
</template>

<script>
import moment from 'moment'
import LayoutTableComplex from '../../funcks/ui_layout/table/LayoutTableComplex.vue'
import RmdRecordTd from './body/RmdRecordTd.vue'
import RmdRecordFiiter from './top/RmdRecordFiiter.vue'
import RmdRecordTr from './top/RmdRecordTr.vue'
export default {
  components: { RmdRecordTr, RmdRecordTd, LayoutTableComplex, RmdRecordFiiter },
    data() {
        return {
            items: [ ],
            items_origin: [ ],
            loading: true,
        }
    },
    computed: {
        plant() { return this.$store.state.plant },
        user() { return this.$store.state.user }
    },
    mounted() {
        this.fetching( this.condition() )
    },
    methods: {
        //
        fiiter(v) { this.items = v; console.log('过滤后的 =', v) },
        // 构建
        condition() {
            let res = { _limit: 200, '_sort': 'published_at:asc' }
            if (this.plant && this.plant.is_admin != true) { res.user = this.user.id }
            return res
        },

        // 获取数据
        async fetching(condition) {
            this.loading = true
            let res = await this.serv.send.many(this, condition )
            if (res) { 
                this.items = res
                this.items_origin = res
            }
            setTimeout(e => this.loading = false, 600)
        }
    }
}
</script>

<style>

</style>