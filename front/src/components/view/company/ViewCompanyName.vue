<template>
    <div v-if="!mode">
        <p>
            {{ named_en }}
        </p>
        <p v-if="!one" class="pt_s">
            {{ named_ch }}
        </p>
    </div>
    <div v-else>
        <p v-if="mode == 'en'">
            {{ named_en }}
        </p>
        <p class="pt_s" v-else-if="mode == 'hk'">
            {{ named_ch }}
        </p>
    </div>
</template>

<script>
    export default {
        name: '',
        props: [
            'one',
            'mode',
            'names'
        ],
        computed: {
            named_en() {
                return this.getNameByLang('en')
            },
            named_ch() {
                return this.getNameByLang('hk')
            }
        },
        methods: {
            getTxt(src) {
                let res = src ? (
                    src.txt ? src.txt : src.v
                ) : '(待補充)'
                return res ? res.replace('\r', '') : ''
            },
            getNameByLang(lang = 'en') {
                let res = this.names.filter(e => e.lang == lang)
                return res && res.length > 0 ? this.getTxt(res[0]) : ''
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>