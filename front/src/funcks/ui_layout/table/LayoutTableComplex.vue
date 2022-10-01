<template>
    <div>
        <div class="pb_x fx-s">
            <h4 class="ttd w-50">{{ title }}</h4>
            <div class="w-50">
                <slot name="fiiter"></slot>
            </div>
        </div>

        <div class="table bg-FFF">
            <slot name="cont"></slot>
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