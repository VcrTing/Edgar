<template>
    <div class="ps-r tooltip-tigger d-ib">
        <div class="tooltip t-c">
            {{ cont }}
        </div>

        <div class="d-ib">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'cont' ]
    }
</script>

<style lang="sass" scoped>
    
</style>