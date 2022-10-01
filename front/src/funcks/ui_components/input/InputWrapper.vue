<template>
    <div class="ps-r">
        <label class="ttd">{{ label }}</label>
        <nav class="pt">
            <slot></slot>
        </nav>
        <p class="input-tip pri" :class="{ 'ip-tip-active': valid }">{{ msg }}</p>
    </div>
</template>

<script>
    export default {
        name: '',
        props: [
            'label',
            'valid',
            'tip'
        ],
        mounted() {
            this.msg = this.tip ? this.tip : '請檢查你的輸入'
        },
        data() {
            return {
                msg: ''
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>