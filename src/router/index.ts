import { createRouter, RouteRecordRaw, Router, createWebHistory } from 'vue-router'
import { loginLocalStorage } from '../utils/useLocalStorage';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    meta: {
      requireAuth: true//开启路由守卫
    }
  },
  {
    path: '/picture',
    name: 'Picture',
    component: () => import('../views/picture/Picture.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/game/Game.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/myBlog',
    name: 'MyBlog',
    redirect: '/myBlog/vue2Record',
    component: () => import('../views/myblog/MyBlog.vue'),
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'vue2Record',
        name: 'vue2Record',
        component: () => import("../components/content/vue2record/vue2Record.vue"),
      },
      {
        path: 'vue3Record',
        name: 'vue3Record',
        component: () => import("../components/content/vue3record/vue3Record.vue"),
      }
    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),

  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

const userStorage = loginLocalStorage;
// 设置路由守卫，在进页面之前，判断有token，才进入页面，否则返回登录页面
router.beforeEach((to, from, next) => {
  // 默认requiresAuth为false才不需要登录，其他都要
  // to.matched.some(r => r.meta.requireAuth) or to.meta.requiresAuth
  if (to.matched.some(r => r.meta.requireAuth) !== false) {
    let tokenInfo = userStorage().getItem('USERSDATA')
    let isload: boolean = false;
    if (tokenInfo !== null) {
      Object.keys(tokenInfo).forEach(item => {
        if (tokenInfo[item][1] === "true") {//如果有用户的浏览状态为true
          isload = true;
        }
      })
    }
    if (isload) {
      console.log("已经登录了")
      next();

    } else {
      alert(Error('请先登录'));
      router.push({
        name: 'Login'
      })
    }

  } else {
    next(); //如果无需token,那么随它去吧
  }
});

// 解决bug：页面/路由跳转后，滚动条消失，页面无法滚动
router.afterEach((to, from, next) => {
  const body = document.querySelector("body") as HTMLElement;
  body.setAttribute("style", "overflow: auto !important;");
});


export default router