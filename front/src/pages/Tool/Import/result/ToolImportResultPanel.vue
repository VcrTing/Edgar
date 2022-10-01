<template>
    <div class="panel">
        <div class="px_x2 py">
            <slot></slot>
            <nav class="pt" v-if="!ciear">
                <p>導入的文件：{{ funn }} </p>
                <p class="sus">操作成員：當前登錄用戶</p>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: [ 'funn', 'ciear' ],
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="sass" scoped>
.panel
    border-radius: 1em
    margin-bottom: 28px
</style>