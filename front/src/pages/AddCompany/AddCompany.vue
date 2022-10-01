<template>
    <div>
        <div class="py">
            <search-select-tab-three></search-select-tab-three>
        </div>

        <div class="py_x2 ">
            <router-view/>

            <tool-go-top></tool-go-top>
        </div>
    </div>
</template>

<script>
import SearchSelectTabThree from '../../components/tab/company/SearchSelectTabThree.vue'
import ToolGoTop from '../../funcks/element/tool/ToolGoTop.vue'
    export default {
  components: { SearchSelectTabThree, ToolGoTop },
        name: '',
        data() {
            return {
                moveName: ''
            }
        },
        watch: {
            $route(to, from) {
                if (to.meta.index > from.meta.index) {
                    this.moveName = 'slide-left'
                } else {
                    this.moveName = 'slide-right'
                }

                let res = this.view.get_ss('company_active_company')
                this.empty(res)
                this.step(res, to)
            }
        },
        methods: {
            empty(res) {
                if (!res) {
                    this.$router.push('/home/add_company/search_select') }
            },
            step(res, to) {
                const ss = res && res.step ? res.step : 1
                if (ss == 2 && to.path.indexOf('input_tax') > 0) {
                    this.$router.push('/home/add_company/input_remind') 
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active 
    // will-change: transform
    transition: all .62s cubic-bezier(.55,0,.1,1)
    position: absolute
    width: 100%

.slide-left-enter, 
.slide-right-leave-active 
    opacity: 0
    transform: translateX(-20px)
    
.slide-right-enter,
.slide-left-leave-active 
    opacity: 0
    transform: translateX(20px)

</style>