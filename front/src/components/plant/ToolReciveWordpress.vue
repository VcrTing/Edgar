<template></template>
<script>
    export default {
        methods: {
            returnMessage(event){
                console.log('接收 Wordpress 的数据：Event =', event, ' TEST =', this.conf.TEST)
                let data = event.data
                console.log('data =', data)

                if (data.cmd && data.cmd.startsWith('get')) { 
                    console.log('开始登录'); this.reciveData(data) }
            },

            // 
            async doLogin(plant) {
                let res = await this.serv.user.user_from_strapi(this, plant.wordpress_id)
                console.log('登录的用户 =', res, plant)
                if (res) { await this.$store.commit('change', [ 'user', res ]);
                console.log('结束登录') }
            },

            ser_plant(plant) {
                let tk = plant.token ? plant.token : [ ]
                tk = tk.length > 0 ? tk[ 0 ] : null
                tk = { wordpress_id: plant.user_id, token: tk, is_admin: plant.is_admin }
                this.$store.commit('change', [ 'plant', tk ])
                console.log('序列化后的数据 tk =', tk)
                return tk
            },

            async reciveData(data) {
                console.log('接受的数据 recive =', data)
                let res = data && data.params ? data.params : null
                console.log('接受的数据 res =', res, ' TEST =', this.conf.TEST)
                res = res ? this.ser_plant(res) : null

                console.log('储存 TOKEN =', res)
                await this.$store.commit('change', [ 'token', res.token ]) 
                await this.doLogin(res)
            }
        },
        created() {
            console.log('已加载 message 方法。')
            window.addEventListener("message", this.returnMessage);
        },
        destroyed() {
            console.log('销毁 message 方法。')
            // window.removeEventListener('message', this.returnMessage);
        }
    }
</script>