<template>
    <div class="pb_x2 pt">
        <p>
            {{ header }}
        </p>
        <nav class="pt pl_input_detail pb_t">
            <slot></slot>
        </nav>
    </div>
</template>

<script>
    export default {
        props: [ 'header' ]
    }
</script>

<style lang="sass">
.pl_input_detail
    padding-left: calc(13px + 0.5vw)
</style>