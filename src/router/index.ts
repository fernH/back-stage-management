import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import layout from "../views/layout.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "layout",
    component: layout,
    redirect: "/layout",
  },

  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },

  // layout
  {
    path: "/layout",
    name: "layout",
    component: () => import("../views/layout.vue"),
    children: [
      {
        path: "/layout/",
        name: "homePage",
        component: () => import("../views/homePage.vue"),
        meta: { title: "主页", requiresAuth: true },
      },
      {
        path: "/homePage",
        name: "homePage",
        component: () => import("../views/homePage.vue"),
        meta: { title: "主页", requiresAuth: true },
      },
      {
        path: "/pvrview",
        name: "pvrview",
        component: () => import("../views/pvrview.vue"),
        meta: { title: "权限", requiresAuth: true },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    // component: resolve => require(['@/view/layout/404.vue'], resolve),
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to: any, from: any, next: Function) => {
  if (to.name !== "login") {
    const loginMsg = JSON.parse(sessionStorage.getItem("loginMsg") as any) || {
      token: "",
    };
    console.log("loginMsg.token", loginMsg.token);
    if (!loginMsg.token) {
      next({ path: "/login" });
    } else {
      const routerLi = JSON.parse(sessionStorage.getItem("routerList") as any);
      const routerTo = routerLi.some((e: any) => e === to.path);
      if (routerTo) {
        next();
      } else {
        router.push("/404");
      }
    }
  } else {
    next();
  }
});

export default router;
