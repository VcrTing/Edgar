<template>
    <div class="menu-top" :class="{ 'menu-active': open }">
        <main-menu-app-bar @sign="open = !open" @ciose="open = false"></main-menu-app-bar>
        <nav>
            <ul>
                <li 
                    v-for="(v, i) in menu" :key="i"
                    :class="{ 'active': v.index == now }"
                    @click="go(v)"
                >
                    {{ v.txt }}
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
import MainMenuAppBar from './MainMenuAppBar.vue'
export default {
  components: { MainMenuAppBar },
    data() {
        return {
            now: 0,
            open: false
        }
    },
    computed: {
        is_admin() { return this.$store.state.plant.is_admin },
        menu() {
            let res = [
                {
                    txt: '增加新的公司', index: 0, admin: false,
                    link: '/home/add_company',
                },
                {
                    txt: '我的公司', index: 1, admin: false,
                    link: '/home/company_my',
                },
                {
                    txt: '提醒任務記錄', index: 2, admin: false,
                    link: '/home/remind_record',
                }
            ]
            if (this.is_admin) {
                res.push({
                    txt: '導入', index: 3, admin: true,
                    link: '/home/csv',
                })
            }
            return res
        }
    },
    mounted() { this.localRoute(this.$route.fullPath) },
    watch: { $route(to,from){ this.open = false } },
    methods: {
        localRoute(path) {
            this.menu.map(e => { if (path.indexOf(e.link) >= 0) { this.now = e.index } })
        },
        go(v) {
            this.now = v.index
            this.$router.push(v.link)
        }
    }
}
</script>
<style lang="sass">
</style>