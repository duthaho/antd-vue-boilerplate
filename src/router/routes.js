import { MainLayout } from '@layouts'

export default [
  {
    path: '/',
    name: 'index',
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
]
