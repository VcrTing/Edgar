<template>
    <div>
        <ul class="ul-def focus_tab_three" :class="'tab_ftt_' + now ">
            <li class="w-25">
                <focus-text-counter :cont="'輸入公司名字搜尋你的公司，你可以用公司名稱起首來搜尋'" 
                
                @tap="() => $router.push('/home/add_company/search_select')">
                    <div class="counter_icon" :class="{ 'active': now == 1 }">
                        1
                    </div>
                </focus-text-counter>
            </li>
            <li class="w-10 ftt_hr"></li>

            <li class="w-25">
                <focus-text-counter :cont="'恭喜你，你日後可以免費接收有關公司註冊處的合規提醒'"

                @tap="() => $router.push('/home/add_company/input_remind')">
                    <div class="counter_icon" :class="{ 'active': now == 2 }">
                        2
                    </div>
                </focus-text-counter>
            </li>
            <li class="w-10 ftt_hr"></li>

            <li class="w-25">
                <focus-text-counter :cont="'如果你想收到有關稅局的合規提醒，請輸入你公司的財政年度年結日'"

                @tap="() => $router.push('/home/add_company/input_tax')">
                    <div class="counter_icon" :class="{ 'active': now == 3 }">
                        3
                    </div>
                </focus-text-counter>
            </li>
        </ul>
    </div>
</template>

<script>
import FocusTextCounter from '../../../funcks/ui_components/count/FocusTextCounter.vue'
    export default {
        components: { FocusTextCounter },
        data() {
            return {
                ct: [ 'search_select', 'input_remind', 'input_tax' ]
            }
        },
        computed: {
            now() {
                let res = 1
                let rt = this.$route.path
                rt = rt.split('/')
                rt = rt[rt.length - 1]
                this.ct.map((e, i) => { if (e == rt) { res = i + 1 } })
                return res
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>