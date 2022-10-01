<template>
    <nav class="pt pb fx-l">
        <div class="fx-l"
            v-for="(v, i) in data" :key="i"
            :class="v.class"
        >
            <input type="checkbox" :disabled="v.require" v-model="send_way" name="way" :value="v.v" :id="v.id"/>
            <label class="pl_s ttd hand" :for="v.id">{{ v.txt }}</label>
        </div>
    </nav>
</template>

<script>
// #0275ff
export default {
    data() {
        return {
            data: { },
            send_way: [ 'email', 'whatsapp' ],
        }
    },
    mounted() {
        this.data = this.view.remind.SEND_WAY_TXT
        this.rest()
    },
    computed: {
        comp() {
            return JSON.parse( sessionStorage.getItem('company_active_company') )
        }
    },
    methods: {
        
        rest() {
            this.send_way = this.comp.send_way ? this.comp.send_way :
                this.view.remind.SEND_WAY_DEF.split('_') // [ this.view.remind.SEND_WAY[ 1 ] ]
            // console.log( this.comp, this.send_way )
        },
        collect() {
            return this.send_way
        },

        ioc(snd =  [ 'email', 'whatsapp' ]) {
            this.send_way = snd
        },

        // 查看是否需要 号码
        need_phoned() {
            return this.send_way.indexOf( this.view.remind.WAY_WHATSAPP) >= 0
        }
    }
}
</script>