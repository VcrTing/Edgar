<template>
    <div>
        <div class="pb_x">
            <h4 class="ttd">{{ title }}</h4>
        </div>

        <div class="table bg-FFF">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: [
            'title'
        ],
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>