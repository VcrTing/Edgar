<template>
    <div>
        <ac-ir-detail v-if="company" @submit="next" :def_phones="company.phones" :def_emails="company.emails"></ac-ir-detail>
        <div class="mb-for-keyboard"></div>
    </div>
</template>

<script>
import AcIrDetail from './paner_new/AcIrDetail.vue'
export default {
  components: { AcIrDetail },
    data() {
        return {
            company: { }
        }
    },
    created() { this.refresh() },
    computed: {
        is_actived() {
            let em = this.company.emails
            em = em ? em.filter(e => e.is_vertify) : em
            let ph = this.company.phones
            ph = ph ? ph.filter(e => e.is_vertify) : ph
            return ( em.length > 0 && ph.length > 0 )
        }
    },
    methods: {
        next(p_n_e) {
            this.refresh()
            this.insert(p_n_e[0], p_n_e[1])
            setTimeout(e => this.$router.push('/home/add_company/input_tax'), 2)
        },

        insert(p, e) {
            this.company.phones = p
            this.company.emails = e
            this.company.step = 3
            this.view.set_ss('company_active_company', this.company)
        },

        async refresh() {
            this.company = this.view.get_ss('company_active_company')
            if (!this.company) {
                this.go('/home/add_company/search_select')
            }
        }
    }
}
</script>

<style>

</style>