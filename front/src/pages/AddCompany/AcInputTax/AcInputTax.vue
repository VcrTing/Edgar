<template>
    <div>
        <ac-it-first @submit="submit" ref="aifREF"></ac-it-first>
        <div class="mb-for-keyboard"></div>
    </div>
</template>

<script>
import moment from 'moment'
import AcItFirst from './panel/AcItFirst.vue'
    export default {
  components: { AcItFirst },
        data() {
            return {
                page: 0
            }
        },
        methods: {

            async submit(comp, remind) {
                //
                remind.send_way_world = comp.send_way ? comp.send_way : this.view.remind.SEND_WAY_DEF

                // 创建自己的 COMPANY
                comp.status = true
                comp.work_year = '0'
                comp.data_from = 'WEB_CREATE'
                comp.user = this.$store.state.user.id
                comp.last_tax_filing_time = new Date().getFullYear() + '-' + remind.send_date_real_str
                comp = this.view.def.delete_strapi_def(comp)

                let res = await this.serv.company.company_plus(this, this.ciear(comp) )

                // 创建 REMIND
                if (res) {
                    remind.company = res.id
                    remind = this.ciear_remind( remind, comp )
                    
                    const rmd = await this.serv.remind.create(this, remind)
                    if (rmd) {
                        const way = rmd.send_way_world
                        try {
                            await this.serv.instant.instant_remind_add(this, res, way ? way.split('_') : [ ])
                            setTimeout(e => { this.completed() }, 2)
                        } catch(err) {
                            setTimeout(async e => 
                                await this.serv.instant.instant_remind_add(this, res, way ? way.split('_') : [ ]), 3000)
                        }
                    }
                }
            },

            completed() {
                this.view.set_ss('company_active_company', '')
                this.view.set_ss('company_active_fiiiing', '')
                this.view.set_ss('company_active_checkbox', '')
                this.$refs.aifREF.aiiow = true

                this.$router.push('/home/add_company/finished')
            },

            ciear(comp) {
                delete comp.id
                if (!comp.order) { delete comp.order }
                const phs = comp.phones ? comp.phones.filter(n => { if (n.v) { return true } else { return false } }) : [ ]
                if (phs.length <= 0) { delete comp.phones }
                return comp
            },

            ciear_remind(rmd, comp) {
                rmd.send_typed = 0 
                rmd.send_typed_finish = false
                rmd.send_date_since_real_str = moment(comp.company_since).format('MM-DD')
                if (!rmd.remind_date) { delete rmd.remind_date }
                delete rmd.filling
                if (rmd.send_way_world instanceof Array) { rmd.send_way_world = rmd.send_way_world.join('_') }
                return rmd
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>