<template>
    <div>
        {{ txt }}
    </div>
</template>

<script>
export default {
    props: [
        'way',
        'comp'
    ],
    data() {
        return {
            ws: {
                'note': { txt: '短信' },
                'email': { txt: '電郵' },
                'whatsapp': { txt: 'WhatsApp' }
            }
        }
    },
    computed: {
        txt() {
            let src = this.way
            src = src ? src.split('_') : [ ]
            src = src.map(e => this.ws[e].txt)
            if (!this.has_phone()) {
                src = [ '電郵' ]
            }
            return src.join('、')
        }
    },
    methods: {
        has_phone() {
            let phs = this.comp.phones
            phs = phs ? phs.filter(e => { if (e.v) { return true } else { return false } }) : [ ]
            return phs.length > 0
        }
    }
}
</script>

<style>

</style>