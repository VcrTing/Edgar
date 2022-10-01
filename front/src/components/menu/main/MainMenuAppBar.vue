<template>
    <nav class="menu-app-bar fx-s px_x2">
        <div class="w-100 hand" @click="menu()">
            <i class="fa fa-list"></i>
            菜單
        </div>
        <!--div class="w-30 t-r sub_son" @click="ciose()">
            <span>
                关闭
            </span>
            <i class="fa fa-window-close"></i>
        </!--div-->
    </nav>
</template>

<script>
export default {
    props: [ '_open' ],
    data() {
        return {
            show: false
        }
    },
    methods: {
        menu() {
            this.show = !this.show
            this.$emit('sign')
        },
        ciose() {
            this.show = !this.show
            this.$emit('ciose')
        }
    }
}
</script>

<style>

</style>