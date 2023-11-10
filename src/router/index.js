import store from "@/store";

import { createRouter, createWebHistory } from "vue-router";

import AppLayout from '@/components/AppLayout.vue';
import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import Products from "@/views/Products.vue";
import ProductDetails from "@/views/ProductDetails.vue";
import Login from '@/views/Login.vue';
import Profile from "@/views/Profile.vue";
import Orders from "@/views/Orders.vue";
import OrderDetails from "@/views/OrderDetails.vue";
import RequestPassword from "@/views/RequestPassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import Signup from "@/views/Signup.vue";
import Cart from "@/views/Cart.vue";


const routes = [
  {
    path: '/',
    name: 'app',
    redirect: '/home',
    component: AppLayout,
    children: [
      {
        path: '/home',
        name: 'app.home',
        component: Home
      },
      {
        path: 'products',
        name: 'app.products',
        component: Products
      },
      {
        path: 'products/:id',
        name: 'app.products.details',
        component: ProductDetails,
        props: {
          id: (value) => /^\d+$/.test(value)
        }
      },
      {
        path: 'profile/:id',
        name: 'app.profile',
        component: Profile
      },
      {
        path: 'orders',
        name: 'app.orders',
        component: Orders
      },
      {
        path: 'orders/:id',
        name: 'app.orders.view',
        component: OrderDetails
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/cart',
        name: 'cart',
        component: Cart,
        meta: {
          requiresGuest: true
        }
      },
      {
        path: '/register',
        name: 'signup',
        component: Signup,
      },
      {
        path: '/request-password',
        name: 'requestPassword',
        component: RequestPassword,
      },
      {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: ResetPassword,
      },
    ]
  },

  {
    path: '/:pathMatch(.*)',
    name: 'notfound',
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   if (store.state.user.token) {
//     next({ name: 'app.home' });
//   } else {
//     next();
//   }
// });


export default router;