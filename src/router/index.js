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
    path: '/unprocessedReport',
    component: Layout,
    children: [
      {
        path: 'unprocessedReport',
        component: () => import('@/views/unprocessedReport/unprocessedReport'),
        meta: {
          title: '未处理报告',
          icon: 'el-icon-warning'
        }
      }
    ]
  },
  {
    path: "/normalreports",
    component: Layout,
    children: [
      {
        path: "normalreports",
        component: () => import("@/views/normalreports/normalreports"),
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
    path: "/notclean",
    component: Layout,
    children: [
      {
        path: "notclean",
        component: () => import("@/views/notclean/notclean"),
        meta: {
          title: "未打扫记录",
          icon: "el-icon-s-release"
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
  {
    path: '/QRCode',
    component: Layout,
    children: [
      {
        path: 'QRCode',
        component: () => import('@/views/QRCode/QRCode'),
        meta: {
          title: '教室管理',
          icon: 'el-icon-s-tools'
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
