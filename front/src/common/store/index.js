import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        token: '',
        loading: false,

        user: null,
        plant: null,

        company: [ ],

        company_of_me: [ ]
    },
    mutations: {
        change(state, k_v) {
            state[k_v[0]] = k_v[1]
        }
    },
    getters: { 
        
        
        checkToken(state) {
            let res = false
                const token = localStorage.getItem('oils_token')
                if ((token == undefined) || (token == '') || (token == null) || (token == 'undefined')) {
                    res = true
                } else { state.token = token }
            try{ } catch(e) { }
            return v => { return res }
        },
    },
    modules: {

    }
})