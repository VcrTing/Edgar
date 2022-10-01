<template>
    <div v-if="_items && _items.length > 0">
        <div class="fx-l td-in"
            v-for="(v, i) in _items" :key="i"
        >
            <div class="w-3">&nbsp;</div>
            <div class="w-6">
                <span class="sus">{{ i + 1 }}</span>
            </div>
            <div class="w-11">
                <div v-if="v.company">{{ v.company.tax_id }}</div>
            </div>
            <div class="w-21">
                <view-company-name v-if="v.company" :one="true" :names="v.company.names"></view-company-name>
            </div>
            <div class="w-11">
                <span class="pri_son" v-if="v.is_first">新增數據</span>
                <span v-else class="sus_son">提醒報稅</span>
            </div>
            <div class="w-24">
                <view-remind-date :first="v.is_first" :times="v.send_day ? v.send_day : v.published_at"></view-remind-date>
            </div>
            <div class="w-15">
                <view-remind-send-way v-if="v.remind" :comp="v.company" :way="v.way ? v.way : v.remind.send_way_world"></view-remind-send-way>
            </div>
            <div class="w-10">
                <div v-if="v.is_serial">
                    <span v-if="v.is_first" class="btn-succ_txt">已發送</span>
                    <div v-else>
                        <span v-if="v.is_sended" class="btn-succ_txt">已發送</span>
                        <span v-else class="btn-war_txt">等待發送</span>
                    </div>
                </div>
                <div class="sus_ipt" v-else>
                    隊列中
                </div>
            </div>
            <!--div class="w-11 t-c">
                <a class="pri_son hand">查看
                </a>
            </div-->
        </div>
    </div>
</template>

<script>
import ViewCompanyName from '../../../components/view/company/ViewCompanyName.vue'
import ViewRemindDate from '../../../components/view/remind/ViewRemindDate.vue'
import ViewRemindSendWay from '../../../components/view/remind/ViewRemindSendWay.vue'
    export default {
        components: {ViewCompanyName, ViewRemindDate, ViewRemindSendWay  },
        name: '',
        props: [ '_items' ],
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>