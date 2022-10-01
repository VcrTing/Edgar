<template>
    <div class="counter">
        <div class="counter_prefix hand" @click="$emit('tap')">
            <slot></slot>
        </div>
        <nav class="counter_cont hand" @click="$emit('tap')">
            {{ cont }}
        </nav>
    </div>
</template>

<script>
    export default {
        props: [ 'cont' ]
    }
</script>