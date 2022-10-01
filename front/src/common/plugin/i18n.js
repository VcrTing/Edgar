import Vue from 'vue'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n)

export default new VueI18n({
  locale: 'zh-HK',
  messages: {
    'zh-HK': require('../i18n/zh_HK'),
    // 'zh-CN': require('../i18n/zh_CN'),
    // 'en-US': require('../i18n/en_US')
  }
})
