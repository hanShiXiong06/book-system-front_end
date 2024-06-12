import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/admin/HomeView.vue";
import { useAuthAdminStore } from "@/stores/admin/AuthAdminStore";

const routes = [
  {
    path: "/",
    component: HomeView,
    children: [
      {
        path: "/category",
        component: () => import("@/views/admin/CategoryView.vue"),
      },
      {
        path: "/add/category",
        component: () => import("@/views/admin/AddCategoryView.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/admin/LoginView.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/admin/RegisterView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由守卫

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuthAdminStore();

  if (to.path == "/login") {
    next();
  } else {
    // 判断用户是否已经有token
    if (isAuthenticated()) {
      next();
      return;
    }
    next("/login");
  }
});

export default router;
