<template>
    <company-opera-controll :typed="'plus'" :def="{}" @finish_create="finish_create"></company-opera-controll>
</template>

<script>
import CompanyOperaControll from './CompanyOperaControll.vue'
    export default {
  components: { CompanyOperaControll },
        name: '',
        data() {
            return {
                
            }
        },
        methods: {
            async finish_create(rmd) {
                const comp = rmd.company
                const way = rmd.send_way_world
                try {
                    await this.serv.instant.instant_remind_add(this, comp, way ? way.split('_') : [ ])
                } catch(err) {
                    setTimeout(async e => 
                        await this.serv.instant.instant_remind_add(this, comp, way ? way.split('_') : [ ]), 3000)
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>