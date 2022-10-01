<template>
    <div>
        <button class="btn btn-pri">Primary</button>
        <button class="btn btn-sec">secondary</button>
        <button class="btn btn-acc">Accent</button>

        <br/>

        <button class="btn btn-pri_dark">Primary Dark</button>
        <button class="btn btn-sec_dark">secondary Dark</button>

        <br/>
        <br/>
        <h1>【2021年10月】精品动漫合集</h1>
        <h2>【2021年10月】精品动漫合集</h2>
        <h3>【2021年10月】精品动漫合集</h3>
        <h4>【2021年10月】精品动漫合集</h4>
        <h5>【2021年10月】精品动漫合集</h5>
        <div class="h6 b">【2021年10月】精品动漫合集</div>
        <p class="fs_s sub">下载量:&nbsp;&nbsp;9999</p>
        <span class="fs_s sus">下载量:&nbsp;&nbsp;9999</span>
        <br/>

        <img class="avatar avatar_S" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F11%2F20200611214313_wsdii.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639250888&t=28716b82f2c95356b8ae459696654271" />
        
        <img class="avatar" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F11%2F20200611214313_wsdii.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639250888&t=28716b82f2c95356b8ae459696654271" />
        <img class="avatar avatar_XL" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F11%2F20200611214313_wsdii.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639250888&t=28716b82f2c95356b8ae459696654271" />
        <img class="avatar avatar_XXL" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F11%2F20200611214313_wsdii.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639250888&t=28716b82f2c95356b8ae459696654271" />
        
        <br/>
        <br/>
        <div class="panel">
            <p>有时候，爱你的人近在咫尺，而让你柔情深陷、牵肠挂肚的却是另一个人。你因他落泪、因他感伤，为他付出所有也在所不惜。你以为这便是爱情，得不到的，总是最好的，而咫尺的温暖，却不懂得珍惜。爱，本来就是一件百转千回的事，但愿某一日你能幡然醒悟，怜惜眼前人。</p>
        </div>

        <br/>

        <a href="#" class="btn btn-pri_out btn-round b">Download Now</a>
        <a href="#" class="btn btn-sec_out btn-round b">立即下载</a>
        <a href="#" class="btn btn-acc">vip 价格:&nbsp;&nbsp;¥&nbsp;12</a>
    </div>
</template>

<script>

    export default {
        components: { },
        name: '',
        data() {
            return {
                alive: true,
            }
        },
        methods: {
            reload() {
                this.alive = false
                this.$nextTick(function() { this.alive = true })
            },
        },  
        provide() {
            return {
                reload: this.reload
            }
        },
        
        watch: {
            $route(to, from) {
                const _to = to.path.split('/').length
                const _from = from.path.split('/').length

                this.transitionName = _to < _from ? 'ani_up' : 'ani_down'
                if (!this.transitionName) { this.transitionName = 'ani_up' }
            }
        },
    }
</script>

<style lang="sass" scoped>
.ani_up, 
.ani_down
    transition: all 1s

.ani_up
    transform: translateY(20vh)    
.ani_down
    transform: translateY(-20vh)
</style>