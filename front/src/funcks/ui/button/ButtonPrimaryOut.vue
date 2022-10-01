<template>
    <button class="btn btn-pri_out mh" @click="$emit('tap', v)">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: '',
        props: [
            'v'
        ],
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>