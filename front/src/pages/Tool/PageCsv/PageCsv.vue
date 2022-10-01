<template>
    <div class="py_x2" v-if="true">
        <h3 class="">導入至公司資料庫中</h3>
        <p class="py sus">請註意，目前只支持固定格式的 CSV 文件導入</p>

        <div class="py_x3 max-w">
            <input type="file" accept=".csv" class="input" id="csv" @change="readCSVFile()" />

            <div v-if="!doing" class="py"></div>

            <button-primary v-if="!doing" class="w-100" @tap="turn()">
                開始導入
            </button-primary>

            <div v-else class="fx-r pt_x2 t-r">
                <button-primary class="btn px_x2" @tap="refresh">刷新</button-primary>
            </div>

            <page-csv-company ref="csvCompREF"></page-csv-company>
            
        </div>
    </div>
    <div v-else class="for-menu">
        <remind-finaiiy-check></remind-finaiiy-check>
        <div class="fx-s pt_x2">
            <div>
                <button class="btn-hui">取消</button><span class="px_s"></span>
                <button class="btn-hui">修改</button>
            </div>
            <button-primary class="px_x2 righter">確認及發送一次有效驗證碼</button-primary>
        </div>
    </div>
</template>

<script>
import plugin_csv from '../../../air/plugin/csv/index'
import RemindFinaiiyCheck from '../../../components/page/check/RemindFinaiiyCheck.vue'

import ButtonPrimary from '../../../funcks/ui/button/ButtonPrimary.vue'
import PageCsvCompany from './import_typed/PageCsvCompany.vue'
    export default {
  components: { ButtonPrimary, PageCsvCompany, RemindFinaiiyCheck },
        name: '',
        data() {
            return {
                res: [ ],
                file_name: '',
                doing: false,
            }
        },
        methods: {
            refresh() { // 
                // location.reload() 
                this.$router.go(0)
            },

            // 傳輸到 後臺
            turn() {
                const src = this.res
                console.log(src)
                if (src) {
                    this.doing = true
                    this.$refs.csvCompREF.init(src, this.file_name)
                } else {
                    alert('未發現要導入的數據。')
                }
            },

            // 序列化
            _renderCsv(src) { this.res = plugin_csv.parse_array( src ) },

            readCSVFile() {
                const _this = this
                let reader = new FileReader()
                let src = document.getElementById('csv')
                
                this.file_name = src.files[0].name
                
                reader.readAsText(src.files[0])
                reader.onload = function() { _this._renderCsv(this.result) }
            },

        }
    }
</script>

<style lang="sass" scoped>
.refresh
    background: #F8F8F8
</style>