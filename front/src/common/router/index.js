import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

import route from './routes'

const router = new Router({
  routes: route,
  mode: 'hash',
  scrollBehviour(to, from, savedPosition) {
    
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
  },

})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router