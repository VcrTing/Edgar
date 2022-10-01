<template>
    <div class="py_x3">
        <p class="pb">
            <input type="file" accept=".csv" class="input" id="csv" @change="readCSVFile()" />
        </p>
        <button class="btn-pri py_s px_x2" @click="check">检查重复</button>
        <div class="py_x2">
            <p v-for="(v, i) in diff" :key="i">{{ v }},</p>
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../../../funcks/ui/button/ButtonPrimary.vue'
import plugin_csv from '../../../air/plugin/csv/index'
export default {
  components: { ButtonPrimary },
    data() {
        return {
            res: [ ],
            result: [ ],
            file_name: '',
            ids: '',

            diff: [ ]
        }
    },
    mounted() {
        try {
            this.ids = require('./TAX_ID_2022_07_01.js')
        } catch (err) { }
    },
    methods: {
        check() {

            this.res[1].map(e => {
                e ? e.map(cp => {
                    
                    if (this.ids.indexOf(cp[0]) < 0) { this.diff.push(cp) }
                }) : []
            })
            console.log('结束，=', this.diff)
        },

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

<style>

</style>