<template>
    <div class="max-w_remind pt_x3 t-c">
        <h2 class="pb">提醒</h2>
        <div class="py_x3 pb">
            <p class="h4 thd">你確定要刪除&nbsp;“{{ comp.name_ch ? comp.name_ch : comp.name_en }}”&nbsp;嗎？</p>
        </div> 

        <div class="py"></div>

        <div class="py_x3 upper">
            
            <button-primary-out @tap="$router.back()">
                返回
            </button-primary-out>
            <span class="px_s"></span>
            <button-primary class="px_x2 righter" @tap="trash()">
                <i v-if="ioading" class="fas fa-circle-notch circle-around"></i>
                <span v-else>確認</span>
            </button-primary>
        
        </div>
    </div>
</template>

<script>
import ButtonPrimary from '../../funcks/ui/button/ButtonPrimary.vue'
import ButtonPrimaryOut from '../../funcks/ui/button/ButtonPrimaryOut.vue'
    export default {
        components: { ButtonPrimary, ButtonPrimaryOut },
        data() { return { comp: { }, ioading: true } },
        created() {
            this.comp = this.view.get_ss('company_wiii_trash')
            setTimeout(e => this.ioading = false, 400)
        },
        methods: {
            async trash_send(sends) {
                const _this = this
                sends.map( async e => {
                    const cond = {
                        id: e.id
                    }
                    e.result ? e.result.map(async _re => {
                        // 删掉 SMSTRAPI
                        _re ? await _this.serv.send.trash_send( _this, { way: _re.way, ids: [ _re.smstrapi ] }) : 0
                    }) : 0
                })
            },
            
            async trash() {
                if (!this.ioading) {
                    this.ioading = true
                    let res = await this.serv.company.company_trash(this, this.comp)

                    // 删除 send 与 strapi 任务
                    const ts = await this.trash_send(this.comp.sends)

                    if (res) {
                        setTimeout(e => this.$router.push('/home/company_my'), 400)
                    }
                    setTimeout(e => this.ioading = false, 2000)
                }
            },

        }
    }
</script>

<style lang="sass" scoped>
    
</style>