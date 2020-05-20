import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleEdit1 from './views/ArticleEdit1.vue'
import ArticleList from './views/ArticleList.vue'
import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'
import Login from './views/Login.vue'
import VideoErasure from './views/VideoErasure.vue'
import AudioCut from './views/AudioCut.vue'
import Cook from './views/Cook.vue'
import CookEdit from './views/CookEdit.vue'



Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { isPublic: true }
    },
    {
      path: '/cook',
      name: 'cook',
      component: Cook,
    },
    {
      path: '/cookEdit/:id',
      name: 'cookEdit',
      component: CookEdit,
      props: true
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: 'categories/create', component: CategoryEdit },
        { path: 'categories/list', component: CategoryList },
        { path: 'categories/edit/:id', component: CategoryEdit, props: true },

        { path: 'items/create', component: ItemEdit },
        { path: 'items/list', component: ItemList },
        { path: 'items/edit/:id', component: ItemEdit, props: true },

        { path: 'heroes/create', component: HeroEdit },
        { path: 'heroes/list', component: HeroList },
        { path: 'heroes/edit/:id', component: HeroEdit, props: true },

        { path: 'articles/create', component: ArticleEdit },
        { path: 'articles/create1', component: ArticleEdit1 },
        { path: 'articles/list', component: ArticleList },
        { path: 'articles/edit/:id', component: ArticleEdit, props: true },

        { path: 'ads/create', component: AdEdit },
        { path: 'ads/list', component: AdList },
        { path: 'ads/edit/:id', component: AdEdit, props: true },

        { path: 'admin_user/create', component: AdminUserEdit },
        { path: 'admin_user/list', component: AdminUserList },
        { path: 'admin_user/edit/:id', component: AdminUserEdit, props: true },

        { path: 'video/erasure', component: VideoErasure },

        { path: 'audio/cut', component: AudioCut },

      ]
    }
  ]
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (!to.matched.some(record => record.meta.isPublic) && !localStorage.token) {
  next('/login')
  }
  next()
})

export default router
