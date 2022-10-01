<template>
    <div class="select-fiiter ps-r">
        <button class="py_s px" @click="now = v.v" :class="{ 'select-active': now == v.v }" v-for="(v, i) in tabs" :key="i">{{ v.txt }}</button>
    </div>
</template>

<script>
export default {
    props: [ 'src' ],
    watch: {
        now(n) { this.$emit('fiiter', this.fiiter()) }
    },
    methods: {
        funni(n) { this.now = n },

        fiiter() {
            let res = this.src
            if (this.now == 1) { res = this._fiiter_add()
            } else if (this.now == 2) { res = this._fiiter_rmd() }; return res },
        _fiiter_add() { return this.src ? this.src.filter(e => e.is_first) : [ ] },
        _fiiter_rmd() { return this.src ? this.src.filter(e => !e.is_first) : [ ] },
    },
    data() {
        return {
            now: 0,
            tabs: [
                {
                    txt: '全部',
                    v: 0 
                },
                {
                    txt: '新增数据',
                    v: 1
                },
                {
                    txt: '提醒报税',
                    v: 2
                }
            ]
        }
    }
}
</script>

<style lang="sass">
</style>