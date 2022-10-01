<template>
    <select class="input" v-model="now">
        <option
            v-for="(v, i) in item" :key="i"
            :value="v.v"
        >
            {{ v.txt }}
        </option>
    </select>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                now: 1,
                item: [
                    {
                        txt: 'Limited Liability Company',
                        v: 1
                    },
                    {
                        txt: 'Other',
                        v: 2
                    }
                ]
            }
        },
        mounted() {
            this.$emit('def', this.now)
        }
    }
</script>

<style lang="sass" scoped>
    
</style>