<template>
    <nav>
        <tool-import-company ref="impREF"></tool-import-company>
    </nav>
</template>

<script>
import plugin_csv from '../../../../air/plugin/csv/index'

import ToolImportCompany from '../../Import/company/ToolImportCompany.vue'
    export default {
  components: { ToolImportCompany },
        data() {
            return {
                result: null
            }
        },
        methods: {
            _header(hd) {
                
                try {
                    return plugin_csv.header.header_company( hd )
                } catch(err) {
                    alert('CSV 中的標題有誤！！！')
                }
            },
            _conts(res, header) {
                try {
                    res = res ? res : []
                    return res.map(_dts => { return plugin_csv.csv_map(header, _dts) })
                } catch(err) {
                    alert('CSV 中的數據與標題出現不匹配問題！！！')
                }
            },

            init(src, file_name) {
                let res = this._conts( src[1], this._header(src[0]) )
                this.result = res ? res : [ ]
                // 開始導入
                this.$refs.impREF.import_backend( this.result, file_name )
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>