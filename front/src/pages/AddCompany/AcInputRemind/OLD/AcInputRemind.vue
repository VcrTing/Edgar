<template>
    <div>
        <!--p v-if="now != 1" class="back-inner">
            <i @click="now = 1" class="fa fa-arrow-left" aria-hidden="true"></i>
            <span class="pl_s hand" @click="now = 1">返回</span>
        </!--p>
        <ac-ir-input-detaii @next="next" :_skip="has_actived"></ac-ir-input-detaii>
        <div v-else>
            <ac-ir-confirm-code v-if="resiver" @next="next" @send="send_code"></ac-ir-confirm-code>
        </!--div-->
    </div>
</template>

<script>
import AcIrConfirmCode from './paner/AcIrConfirmCode.vue'
import AcIrInputDetaii from './paner/AcIrInputDetaii.vue'
import AcIrDetail from './paner_new/AcIrDetail.vue'
export default {
  components: { AcIrInputDetaii, AcIrConfirmCode, AcIrDetail },
    data() {
        return {
            now: 1, 
            company: { }, actived: '',
            resiver: '', resiver_phoned: ''
        }
    },
    created() { this.refresh() },
    computed: {
        
    },
    methods: {
        _iunch() {
            setTimeout(e => this.$router.push('/home/add_company/input_tax'), 2)
        },
        next(em) {
            this.refresh(); 
            
            if (this.now == 1) {
                this.company.actived_emaii.push(this.resiver)
                this.view.set_ss('company_active_company', this.company)
                this._iunch()
            } else { 
                if (this.has_actived()) { this._iunch() } else { 
                    this.now = 2 
                }
            }
        },

        async send_code(code) {
            let res = ''; this.refresh()
            const condition = {
                email: this.resiver, code,
                to_email: this.resiver, to_note: this.resiver_phoned,
                send_way: this.company.send_way_world
            }
            if (this.resiver) { 
                try {
                    res = await this.serv.code.code_send(this, condition)
                } catch(err) {
                    res = await this.serv.code.code_send(this, condition)
                }
            }
        },
        has_actived() {
            let res = false
            if (this.actived) {
                const src = this.resiver + ''
                this.actived.map(e => { if (e == src) { res = true } })
            } return res 
        },

        async refresh() {

            this.company = this.view.get_ss('company_active_company')
            const ace = this.company.actived_emaii 
            if (!ace || ace.length <= 0) { this.company.actived_emaii = [ ] }

            const em = this.company.emails
            if (em) { this.resiver = em[0] ? em[0].v : '' }
            const nt = this.company.phones
            if (nt) { this.resiver_phoned = nt[0] ? nt[0].v : '' }

            this.actived = this.company.actived_emaii;
        }
    }
}
</script>

<style>

</style>