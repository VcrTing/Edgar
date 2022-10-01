<template>
    <div>
        <h3>修复导入</h3>
        <p>
            https://strapi07.svr.up5d.com
        </p>
        <div class="py">
            <button class="btn-pri py_s px_x2" @click="import_fix">查询</button>

            <button class="btn-pri py_s px_x2" @click="fixing">修复</button>
        </div>
        <p>{{ nodata.length }} / {{ dts.length }}</p>
        <div class="py">
            <p v-for="(v, i) in nodata" :key="i">{{ v }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            dts: [ ],
            nodata: [ ],
            token: '',
            api: 'https://strapi07.svr.up5d.com/'
        }
    },
    mounted() { this.dts = require('./data');
        this.login()
    },
    methods: {
        fixing() {
            console.log('准备新增 =', this.nodata)
            this.nodata.map((e, i) => {
                setTimeout(async _ee => {
                    const res = await this.serv.company.company_origin_plus(this, e)
                    if (res) {
                        console.log('新增的数据 =', res)
                    }
                }, 300 * i)
            })
        },
        cond(v) {
            return {
                'tax_id': v.tax_id
            }
        },
        async fetch(cond) {
            let res = await axios.get(this.api + 'company-origins?tax_id=' + cond.tax_id)
            return res ? res.data : [ ]
        },
        import_fix() {
            let cd = 0
            // this.dts = this.dts ? [ this.dts[0] ] : [ ]
            console.log('数据集 =', this.dts)
            this.dts.map((e, i) => {
                // 获得 条件
                setTimeout(async a => {
                    cd = this.cond(e)
                    // 检查后台重复
                    let _res = await this.fetch(cd)
                    // 是否导入
                    if (_res && _res.length > 0) { } else {
                        if (e.tax_id) { this.nodata.push(e) }
                    }
                }, 400 * i)
            })
        },
        headers() {
            let res = { 'content-type': 'application/json' }
            res['Authorization'] = 'Bearer ' + this.token; return res
        },
        async login() { 
            this.token = await this.net._admin(); 
            console.log('AAA Token =', this.token) }
    }
}
</script>

<style>

</style>