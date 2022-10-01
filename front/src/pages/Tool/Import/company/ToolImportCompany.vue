<template>
    <div class="py_x3">
        <div v-if="importing" class="t-c">
            <p class="b h3 ttd">導入中......</p>
            <p class="pri py_x2">切勿關閉該頁面!!!</p>
        </div>

        <tool-import-records ref="recordREF"></tool-import-records>

        <tool-import-result-panel :funn="file_name">
            <p class="h3">導入數：<span class="h3">{{ doii }}<span>&nbsp;&nbsp;/&nbsp;{{ aii }}</span></span></p>
            <p class="py">錯誤數量:&nbsp;&nbsp;&nbsp;&nbsp;{{ err }}</p>
        </tool-import-result-panel>
        
        <tool-import-result-panel :ciear="true" :funn="file_name">
            <h4 class="sus">錯誤數據</h4>
            <div class="pt">
                <p v-for="(v, i) in mistakes" :key="i">{{ v }},</p>
            </div>
        </tool-import-result-panel>
    </div>
</template>

<script>
import ToolImportRecords from '../record/ToolImportRecords.vue'
import ToolImportResultPanel from '../result/ToolImportResultPanel.vue'
    export default {
  components: { ToolImportRecords, ToolImportResultPanel },
        name: '',
        data() {
            return {
                doii: 0,
                aii: 0,
                err: 0,

                mistakes: [ ],

                speed: 1800,

                file_name: '',
                importing: false,
            }
        },
        methods: {
            // 構建後臺數據
            _ser_names(_d) {
                let ns = _d.names
                // 名字分割的規則
                ns = ns ? ns.split('\n') : [ ]
                ns = ns ? ns.filter(e => e != '' || e != null) : [ ]

                let __e = null; const names = [ ]
                ns.map(txt => { __e = { txt }; __e.lang = (this.vid.val_chinese(txt)) ? 'hk' : 'en'; names.push(__e) })
                return names
            },
            _ser_data(_d) {
                if (typeof _d == 'object') {
                    _d.names = this._ser_names(_d)
                    // 刪除無用
                    delete _d['']; delete _d.Dissolved
                    // 增加自段
                    _d['data_from'] = 'csv'
                }; return _d
            },

            // 執行 導入
            _import_backend(dts) {
                const dts_LEN = dts.length
                for(let i= 0; i< dts_LEN; i++ ) {
                    let _d = dts[ i ]
                    dts[ i ] = this._ser_data(_d)
                    this.import_company(_d)
                }
            },

            import_backend(src, _named) {
                this.file_name = _named
                if(src) { src.map(e => { e ? e.map(k => this.aii += 1) : null }) }
                if (src) {
                    this.importing = true 
                    src.map((dt, i) => {
                        dt ? setTimeout(e => { this._import_backend(dt) }, (this.speed * i)) : nul })
                    
                }
            },

            // 導入 後臺 以及 處理 正誤
            _mistake(src) {
                this.err += 1; this.doii -= 1; 
                this.mistakes.push(src)
            },
            import_company(src) {
                this.doii += 1
                this.serv.company.company_origin_plus(this, src, (err) => {
                    if (err) { this._mistake(src) }
                })
                this.doii = this.doii < 0 ? 0 : this.doii
                if (this.doii + this.err >= this.aii) { this.importing = false; console.log('出错数据 =', this.mistakes) }
            }, 

        }
    }
</script>

<style lang="sass" scoped>
    
</style>