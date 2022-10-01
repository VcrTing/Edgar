<template>
    <div id="app">
        <!--router-view/-->
        <layout></layout>
    </div>
</template>

<script>
import Layout from './Layout.vue'

    export default {
        components: { Layout },
        name: '',
        data() {
            return {
                token: '',
                shimmer: true,
                loading: false,
            }
        },
        mounted() { this.init() },
        methods: {
            async init() {
                if (this.conf.TEST) { await this._token() }
            },

            async _token() { console.log('拉取默认 TOKEN'); this.$store.commit('change', [ 'token', await this.net._admin() ]) },

            root_router() {
                return new Promise((rej, rev) => { this.$router.onReady(() => { rej( _layout ) }) })
            },

            do_shimmer(v) { this.shimmer = v }
        },
        beforeDestroy() {
            
        },
    }
</script>

<style lang="sass">
@import "@/air/sass/base.sass"
</style>