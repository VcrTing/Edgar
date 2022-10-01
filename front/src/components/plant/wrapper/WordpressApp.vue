<template>
    <tool-recive-wordpress></tool-recive-wordpress>
</template>

<script>
import Sign from '../../tool/sign.vue'
import ToolReciveWordpress from '../ToolReciveWordpress.vue'
    export default {
        components: { 
            ToolReciveWordpress,
                Sign,
        },
        data() {
            return {
                def: {
                    wordpress_id: 0,
                    email: 'strapi-admin@gmail.com',
                    wordpress_name: 'Edic',
                    token: [ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTY0NjkwNTE3NywiZXhwIjoxNjQ5NDk3MTc3fQ.kyBfv17XotaOzJchJOFbtBvTHKiocb8y0sBH8MEUOco" ],
                    user_id: 0,
                    is_admin: true
                }
            }
        },
        mounted () { this.init() },
        methods: {
            async init() {
                if (this.conf.TEST) {
                    console.log('使用默认数据登录。')
                    await this.doLogin( await this.ser_plant( this.def ) )
                }
            },

            async doLogin(plant) {
                console.log('PLANT =', plant)
                let res = undefined
                if (!this.conf.TEST_LOCAL) {
                    res = await this.serv.user.user_from_strapi(this, plant.wordpress_id)
                    await this.$store.commit('change', [ 'user', res ]);
                } else {
                    console.log('本地登录')
                    const token = await this.net._admin()
                    plant.token = token
                    if (token) {
                        await this.$store.commit('change', [ 'token', token ])
                        res = await this.serv.user.user_from_strapi(this, plant.wordpress_id)
                        console.log('USER RES =', res)
                        await this.$store.commit('change', [ 'user', res ]);
                    }
                }
            },

            async ser_plant(plant) {
                let tk = plant.token ? plant.token : [ ]
                tk = tk.length > 0 ? tk[ 0 ] : null
                tk = { wordpress_id: plant.user_id, token: tk, is_admin: plant.is_admin }

                await this.$store.commit('change', [ 'plant', tk ])
                await this.$store.commit('change', [ 'token', tk.token ]) 
                console.log('Token =', tk.token)
                return tk
            },

        }
    }
</script>

<style lang="sass" scoped>
    
</style>