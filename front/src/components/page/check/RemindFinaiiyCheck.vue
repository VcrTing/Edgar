<template>
    <div class="panel br">
        <div class="px_x2 pb_x2">
            <p class="h5 pt_s">收集個人資料聲明</p>
            <p class="pb pt_s a">按此閱覽《收集個人資料聲明》之內容</p>
            <div class="pt">
                <input-check-box ref="box_1_REF" :_def="is_coiiect" @change="(v) => { is_coiiect = v; recive() }" :pk="'box_0'">
                    <span class="pl_s">本人/吾等特此確認已閱覽《收集個人資料聲明》之內容；</span>
                </input-check-box>
                <br/>
                <input-check-box ref="box_2_REF" :_def="is_deal_with" @change="(v) => { is_deal_with = v; recive() }" :pk="'box_2'">
                    <span class="pl_s">本人同意保證作為國際集團公司，為提供保險相關產品或服務，可能需要在中國內地境外儲存或處理您的個人信息，更多咨詢，請參閱保證的《隱私聲明》；</span>
                </input-check-box>
                <br/>
                <input-check-box :_def="is_sales_message" @change="(v) => { is_sales_message = v; recive() }" :pk="'box_3'">
                    <span class="pl_s">保證有意向閣下發送促銷信息或資料，但僅經過閣下同意我們才可以這樣做。如閣下同意，保證將可能使用閣下的聯絡資料及有關閣下已購買的產品的資料（包括購買有關產品的銷售渠道）。如同意，請勾選左方的空格；</span>
                </input-check-box>
                <br/>
                <input-check-box :_def="is_personal_info" @change="(v) => { is_personal_info = v; recive() }" :pk="'box_4'">
                    <span class="pl_s">本人/吾等，明白在此申請時所使用的手提電話號碼/電郵地址是來自本人/吾等的保單記錄，系統將會以手機短訊形式或電郵發送身份驗證碼及有關此申請進度的相關通知到保單持有人保單記錄的手提電話號碼或電郵地址；</span>
                </input-check-box>
            </div>  
                <br/>
            <p>
                按“確認及發送一次有效驗證碼”即代表本人確認明白並同意:&nbsp;(1)上述聲明之內容；(2)上述《收集個人資料聲明》部分之內容；及(3)《隱私政策》。“一次有效驗證碼”將會經手機短訊發送到您的手提電話號碼。
            </p>
        </div>
    </div>
</template>

<script>
import InputCheckBox from '../../../funcks/ui/input/InputCheckBox.vue'
export default {
  components: { InputCheckBox },
    data() {
        return {
            is_coiiect: true,
            is_deal_with: true,
            is_sales_message: true,
            is_personal_info: true
        }
    },
    created() { this.def() },
    methods: {
        is_submit() {
            let res = true
            if (!this.is_coiiect) { res = false }
            if (!this.is_deal_with) { res = false }

            if (!res) {
                this.$refs.box_1_REF.now = true
                this.$refs.box_2_REF.now = true
            } else {
                return res
            }
        },

        recive() {
            this.view.set_ss('company_active_checkbox', this._data)
        },
        coiiect() { return this._data },
        def() {
            let res = this.view.get_ss('company_active_checkbox')
            if (res != '' && res != null) { for(let k in res) { this[ k ] = res[ k ] } }
        }
    }
}
</script>

<style>

</style>