<template>
    <div class="pri_son">

        <span class="hand" @click="$emit('view')">詳情</span>&nbsp;&nbsp;
        <span class="hand" @click="$emit('edit')">編輯</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: [ 'id' ],
        methods: {
            
        }
    }
</script>

<style lang="sass" scoped>
    
</style>