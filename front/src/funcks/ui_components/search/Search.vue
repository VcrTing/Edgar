<template>
    <nav class="py inline-search fx-c mb-next-w-100">
        <div class="input-icon">
            <input type="text" @keyup.enter="submit" v-model="v" class="input input-pri mb-w-100" placeholder="請輸入公司名稱或公司編號">
            <i class="fa fa-search"></i>
        </div>
        <button-primary class="px btn-sd righter mb-w-100 mb-ml-0 mb-mt_x2" @tap="submit">
            搜索
        </button-primary>
    </nav>
</template>

<script>
import ButtonPrimary from '../../ui/button/ButtonPrimary.vue'
    export default {
  components: { ButtonPrimary },
        name: '',
        data() {
            return {
                v: null
            }
        },
        mounted() {
            
        },
        methods: {
            valid() {
                return this.vid.empty( this.v )
            },
            submit() {
                this.$emit('res', this.valid())
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>