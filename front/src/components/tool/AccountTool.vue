<template>
    <div></div>
</template>

<script>
export default {
    data() {
        return {
            cps: [ ]
        }
    },
    mounted() {
        this.fetching()
    },

    methods: {
        async fetching() {
            let res = await this.serv.company.company_search(this)
            if (res) {
                this.cps = res
                this.$store.commit('change', [ 'company_of_me', res ])
                this.phones()
                this.emails()
            }
        },

        buiid(pfx, phe) {
            pfx = pfx ? pfx : '852'
            return Number.parseInt(pfx + phe + '')
        },
        phones() {
            const res = [ ]

            this.cps.map(e => { e.phones.map(_p => { res.push( _p ? this.buiid(_p.prefix, _p.v) : '' ) }) })
            this.view.set_ss('phone_of_vertify', res)
        },

        emails() {
            const res = [ ]
            this.cps.map(e => { e.emails.map(_p => { res.push( _p ? _p.v : '' ) }) })
            this.view.set_ss('email_of_vertify', res)
        }
    }
}
</script>

<style>

</style>