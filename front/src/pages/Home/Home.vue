<template>
    <main-layout>
        <main-menu slot="menu"></main-menu>
        
        <div slot="cont">                
            <router-view/>
            <nav class="version">
                <p>
                    版本:&nbsp;{{ conf.VERSION }}
                </p>
                <p>
                    日期:&nbsp;{{ conf.VERSION_TIMED }}
                </p>
            </nav>
            
            <account-tool ref="accREF"></account-tool>
        </div>
    </main-layout>
</template>

<script>
import MainMenu from '../../components/menu/main/MainMenu.vue'
import AccountTool from '../../components/tool/AccountTool.vue'
import MainLayout from '../../funcks/ui_layout/main/MainLayout.vue'
import CompanyMy from '../CompanyMy/CompanyMy.vue'

    export default {
        components: {CompanyMy, MainLayout, MainMenu, AccountTool },
        name: '',
        data() {
            return {
                alive: true,
            }
        },
        methods: {
            reload() {
                this.alive = false
                this.$nextTick(function() { this.alive = true })
            },
        },  
        provide() {
            return {
                reload: this.reload
            }
        },
        
        watch: {
            $route(to, from) {
                const _to = to.path.split('/').length
                const _from = from.path.split('/').length

                this.transitionName = _to < _from ? 'ani_up' : 'ani_down'
                if (!this.transitionName) { this.transitionName = 'ani_up' }
            }
        },
    }
</script>

<style lang="sass" scoped>
.ani_up, 
.ani_down
    transition: all 1s

.ani_up
    transform: translateY(20vh)    
.ani_down
    transform: translateY(-20vh)

.version
    position: fixed !important
    bottom: 0
    left: 0
    padding: 6px 12px
    background: none
    
    // box-shadow: 0.2px -0.5px 2px -0.5px rgba(0, 0, 0, 0.4)
    border-top-right-radius: 7px
    *
        color: #b8b8b8 !important
        font-weight: 300
        font-size: 10px !important
        
        // color: #FFFFFFEF !important
</style>