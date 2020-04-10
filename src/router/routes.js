import { MainLayout, UserLayout } from '@layouts'

export default [
  {
    path: '/',
    component: MainLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Home',
        component: () => import('@views/Home.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@views/Profile.vue'),
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
