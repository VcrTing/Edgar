<template>
    <div class="fx-l">
        <input :id="pk" type="checkbox" class="checkbox hand" v-model="now">
        <label :for="pk" class="pl hand">
            <slot></slot>
        </label>
    </div>
</template>

<script>
    export default {
        props: {
            pk: {
                type: String,
                default: 'box_1'
            },
            _def: {
                type: Boolean
            }
        },
        data() {
            return {
                now: false
            }
        },
        watch: {
            now(n, o) {
                this.$emit('change', n)
            }
        },
        mounted() { this.now = this._def ? this._def : false; },
        methods: {
            def(v) { this.now = v }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>