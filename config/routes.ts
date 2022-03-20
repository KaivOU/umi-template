export default [
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', exact: true, redirect: '/demo' },
      {
        name: 'demo',
        path: '/demo',
        exac: true,
        component: '@/pages/demo',
      },
    ],
  },
];
