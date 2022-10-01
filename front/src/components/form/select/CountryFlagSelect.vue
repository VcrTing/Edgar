<template>
        <select v-model="now">
            <option v-for="(v, i) in ctys" :key="i" :value="v.v">
                {{ v.txt }}

                <img class="cty_flag" :src="v.img">
            </option>
        </select>
        
    <!--nav class="q-select menu-drop">
        <div class="input input-air fx-l">
            <img class="cty_flag" :src="now_flag">
        </div>

        <nav class="menu-drop-wrapper">
            <div class="item fx-l px_x py_s hand" v-for="(v, i) in ctys" :key="i">
                <img class="cty_flag" :src="v.img">
            </div>
        </nav>
    </nav-->
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                now: '+852',

                ctys: null
            }
        },
        mounted() {
            this.reset()

            this.ctys = [
                    {
                        txt: '香港', v: '+852', img: require('@/assets/flag/hongkong.jpeg')
                    },
                    {
                        txt: '澳門', v: '+853', img: require('@/assets/flag/macau.jpeg')
                    },
                    {
                        txt: '美國', v: '+001', img: require('@/assets/flag/macau.jpeg')
                    },
                    {
                        txt: '中國大陸', v: '+86', img: require('@/assets/flag/china.png')
                    }
                ]
        },
        computed: {
            now_flag() {
                if (this.ctys) {
                    let res = this.ctys.filter(e => e.v == this.now)
                    return res[0] ? res[0].img : ''
                }
            }
        },
        methods: {
            ioc(_fx = '+852') {
                this.now = _fx; return this.now
            },
            reset() {
                this.now = '+852'
                return this.now
            }
        }
    }
</script>

<style lang="sass" scoped>
.cty_flag
    width: auto
    height: 1.4em

.menu-drop
    position: relative

    .menu-drop-wrapper
        width: 100%
        background: #fff
        position: absolute
        border-radius: 7.5px
        border: 1px solid #e7e7e7
        box-shadow: 0.5px 0.5px 3px rgba(0, 0, 0, 0.08)
        .item
            border: none
            transition: all .12s
            border-bottom: 1px solid #f2f2f2
            &:hover
                background: #f2f2f2
            &:focus,
            &:active
                background: #f0f0f0
        .item:last-child
            border: none

</style>