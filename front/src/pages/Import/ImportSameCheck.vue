<template>
    <div class="py_x2">
        <h3>修复导入</h3>
        <p>
            {{ api }}
        </p>
        <div class="py_x2">
            <button class="btn-pri py_s px_x2" @click="searchTax">查询相同的 TAX ID FROM 28万</button>
            <button class="btn-pri py_s px_x2" @click="resaultTax">最终结果</button>
        </div>
        <p>
            {{ start }} &nbsp;-&nbsp;{{ totai }}&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;{{ start - totai }}
        </p>
        <p>
            <csv-same></csv-same>
        </p>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import CsvSame from './CsvSame/CsvSame.vue';
export default {
  components: { CsvSame },
    data() {
        return {
            token: '', iimit: 300, start: 0, totai: 1629246,
            taxs: '', api: 'https://strapi07.svr.up5d.com/'
        }
    },
    async mounted() { await this.login(); console.log('toekn') },
    methods: {
        // https://strapi07.svr.up5d.com/company-origins?_limit=300&_start=600
        searchTax() {
            console.log('准备 TAX')
            this.fetch()
        },
        resaultTax() {
            const blob = new Blob([ `module.export='${this.taxs}'` ], { type: "text/plain" })
            const a = document.createElement("a")
            a.href = URL.createObjectURL(blob)
            a.download = `TAX_ID_${ moment(new Date()).format('yyyy_MM_DD') }`; a.click()
            URL.revokeObjectURL(a.href); a.remove()
        },

        // 递归 查询
        fetch() {
            const _this = this
            axios.get(this.api + 'company-origins?_limit=' + this.iimit + '&_start=' + this.start).then( e => {
                let res = e ? e.data : [ ]
                if (res && res.length > 0) {
                    _this.start += _this.iimit
                    _this.for_taxs( res )
                    _this.fetch()
                } else {
                    console.log('最后拉取')
                    return 0
                }
            })
        },
        for_taxs(res) { res.map(e => { this.taxs += (e.tax_id + '_') }) },

        headers() { let res = { 'content-type': 'application/json' }; res['Authorization'] = 'Bearer ' + this.token; return res },
        async login() { this.token = await this.net._admin() }
    }
}
</script>

<style>

</style>