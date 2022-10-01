<template>
    <nav class="input-inset input-whatsapp">

        <country-flag-select ref="flagREF" class="input input-inset-in input-air"></country-flag-select>

        <input type="text" v-model="phoned" class="input input-inset-wrapper input-air" :placeholder="picd">
    </nav>
</template>

<script>
import CountryFlagSelect from "../select/CountryFlagSelect.vue"

    export default {
        components: { CountryFlagSelect },
        name: '',
        props: [ 'picd' ],
        data() {
            return {
                prefix: '+852',
                phoned: ''
            }
        },
        methods: {
            ioc(pre_fix, phone) {
                this.phoned = phone
                this.prefix = this.$refs.flagREF.ioc( pre_fix )
            },
            reset() {
                this.prefix = this.$refs.flagREF.reset()
                this.phoned = ''
            },
            collect() {
                this.ser()
                return this.phoned ? (this.prefix + ' ' + this.phoned) : ''
            },
            ser() {
                const v = Number.parseInt(this.phoned)
                this.phoned = v ? v : ''
                this.prefix = this.$refs.flagREF.now
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>