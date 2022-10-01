<template>
    <div class="py_x2">
        <div class="py_x2" v-if="size == 1"></div>
    </div>
</template>

<script>
    export default {
        props: [ 'size' ]
    }
</script>