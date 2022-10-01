<template>
    <company-opera-controll :typed="'edit'" :def="item" v-if="item"></company-opera-controll>
</template>

<script>
import CompanyOperaControll from '../CompanyCreate/CompanyOperaControll.vue'
    export default {
  components: { CompanyOperaControll },
        name: '',
        data() {
            return {
                item: null
            }
        },
        computed: {
            cdt() {
                let rt = this.$route.query
                if (rt) {
                    return rt.id
                }
            }
        },
        mounted() { this.fetching() },
        methods: {
            async fetching(id) {
                if (this.cdt) {
                    let res = await this.serv.company.company_one(this, this.cdt)
                    if (res) {
                        this.item = this.fix_company( res )
                    }
                }
            },

            fix_company(cp) {
                const ser_names = this.view.company.convert_names(cp.names)
                cp.emails = cp.emails ? cp.emails : [ { v: '' } ]
                cp.phones = cp.phones ? cp.phones : [ { v: '' } ]

                return Object.assign( cp, ser_names )
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>