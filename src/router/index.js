import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/home",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/home/home"),
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/allreports",
    component: Layout,
    children: [
      {
        path: "allreports",
        component: () => import("@/views/allreports/allreports"),
        meta: { title: "正常报告", icon: "table" }
      },
    ]
  },
  {
    path: "/exceptionreport",
    component: Layout,
    children: [
      {
        path: "exceptionreport",
        component: () => import("@/views/exceptionreport/exceptionreport"),
        meta: {
          title: "异常报告",
          icon: "example"
        }
      }
    ]
  },
  {
    path: "/authoritymanagement",
    component: Layout,
    children: [
      {
        path: "authoritymanagement",
        component: () => import("@/views/authoritymanagement/authoritymanagement"),
        meta: {
          title: "权限管理",
          icon: "user"
        }
      }
    ]
  },
  // 404 page 必须放在路由的最后!!!
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });
const router = createRouter();
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465export
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
  // reset router
}
export default router;
