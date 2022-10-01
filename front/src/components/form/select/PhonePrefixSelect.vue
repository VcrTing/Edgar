<template>
    <select v-model="now">
        <option v-for="(v, i) in items" :key="i" :value="v.v">{{ v.txt }}</option>
    </select>
</template>

<script>
export default {
    props: [
        'one'
    ],
    watch: {
        now(n) {
            this.one.prefix = n
            this.one = this.view.buiid_reciver(this.one)
        }
    },
    created() {
        this.one.prefix = this.one.prefix ? this.one.prefix : '852'
        this.now = this.one.prefix
    },
    data() {
        return {
            now: '852',
            items: [
                { v: '852', txt: '香港' },
                { v: '853', txt: '澳門' },
                { v: '886', txt: '台灣' },
                { v: '001', txt: '美國' },
                { v: '033', txt: '法國' },
                { v: '044', txt: '英國' },
                { v: '065', txt: '新加坡' },
                { v: '081', txt: '日本' },
                { v: '000', txt: '-- --' },
            ]
        }
    }
}
</script>

<style>

</style>