<template>
    
    <ul class="ul-def">
        <li class="w-28" v-for="(v, i) in dates" :key="i">
            <button class="btn-s btn-pri_out w-100 h-33" 
                @click="now = v.v"
                :class="{ 'btn-pri': (now == v.v) }"
            >{{ v.txt }}</button>
        </li>
    </ul>
</template>

<script>
import ButtonPrimaryOut from '../../../../funcks/ui/button/ButtonPrimaryOut.vue'
    export default {
  components: { ButtonPrimaryOut },
        name: '',
        props: [ '_def' ],
        watch: {
            now(n) {
                if (n) {
                    n ? this.$emit('change', n) : 0
                }
            }
        },
        data() {
            return {
                now: null,

                dates: [
                    {
                        txt: '3月31日', v: '03-31' },
                    {
                        txt: '6月30日', v: '06-30' },
                    {
                        txt: '12月31日', v: '12-31' }
                ]
            }
        },
        mounted() {
            this.now = this._def ? this._def : null
        },
    }
</script>

<style lang="sass" scoped>
.btn-pri
    color: #FFFFFFDE
</style>