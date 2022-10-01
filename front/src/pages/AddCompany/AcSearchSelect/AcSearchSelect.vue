<template>
    <div class="pt_x2">

        <page-header :header="'搜尋你的公司'"></page-header>

        <search @hook:mounted="search" @res="search"></search>
        
        <div class="py_x2"></div>

        <layout-table :title="'搜尋結果'">
            <ac-ss-tr class="tr"></ac-ss-tr>
            <ac-ss-td class="td" :_items="items"></ac-ss-td>
        </layout-table>

        <div class="py_x fx-c">
            <easy-pager v-if="count > iimit" :_count="count" :_limit="iimit" @page_Father="pager"></easy-pager>
            <div v-else class="py_s"></div>
        </div>

        <div class="fx-c py_x2">
            <button-primary-out class="px_x2 upper" @tap="$router.push('/home/company_create')">
                找不到你的公司？你也可以增加你的公司資料
            </button-primary-out>
        </div>
    </div>
</template>

<script>
import ButtonPrimaryOut from '../../../funcks/ui/button/ButtonPrimaryOut.vue'
import PageHeader from '../../../funcks/ui/header/PageHeader.vue'
import EasyPager from '../../../funcks/ui/pager/EasyPager.vue'
import Search from '../../../funcks/ui_components/search/Search.vue'
import LayoutTable from '../../../funcks/ui_layout/table/LayoutTable.vue'
import AcSsTd from './body/AcSsTd.vue'
import AcSsTr from './top/AcSsTr.vue'
    export default {
  components: { PageHeader, Search, ButtonPrimaryOut, LayoutTable, AcSsTr, AcSsTd, EasyPager },
        name: '',
        data() {
            return { count: 0, iimit: 99, start: 0, q: '', items: [ ]  }
        },
        computed: {
            comp_of_me() { return this.$store.state.company_of_me }
        },
        methods: {
            // 分页
            pager(n) { this.start = n; this._fetching() },

            // 删除 本人已经加入的 公司
            kiii_same(src) {
                let cps = this.comp_of_me; let res = [ ]
                if (cps) { cps = cps.map(e => (e.tax_id + ''))
                    src.map(e => { if (cps.indexOf(e.tax_id) < 0) { res.push(e) } })
                }; return res
            },

            async _fetching() {
                let res = await this.serv.company.company_origin_search( this, this.q, this.start, this.iimit )
                this.items = this.kiii_same( res ? res : [ ] )
            },

            async search(q) {
                if (q) {
                    this.count = await this.serv.company.count_comp_os( this, q )
                    this.start = 0
                    this.q = q
                    await this._fetching()
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>