import { MainLayout, UserLayout } from '@layouts'

export default [
  {
    path: '/',
    name: 'Index',
    component: MainLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Home',
        component: () => import('@views/list/AccountList.vue'),
      },
    ],
  },
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@views/user/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@views/user/Register.vue'),
      },
    ],
  },
]
