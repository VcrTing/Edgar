<template>
    <div v-if="_items">
        <div v-for="(v, i) in _items" :key="i" :class="{ 'pb': (i != (_items.length - 1))}">
            {{ v.v }}
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: [ '_items' ],
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>