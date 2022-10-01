<template>
    <nav class="input-attach input-timed">
        <timed-select :dis="_dis" :timed="v" @result="res"></timed-select>
        <span class="icon pri_son">
            <i class="fa fa-calendar"></i>
        </span>
    </nav>
</template>

<script>
import TimedSelect from '../../../components/form/time/TimedSelect.vue'
import moment from 'moment'
    export default {
  components: { TimedSelect },
        name: '',
        props: [
            '_dis',
            '_date'
        ],
        data() {
            return { v: null }
        },
        mounted() {
            this.v = this._date ? this._date : moment(new Date()).format('yyyy-MM-DD')
        },
        methods: {
            res(_res) {
                this.$emit('result', _res)
            }
        }
    }
</script>

<style lang="sass" scoped>
    
</style>