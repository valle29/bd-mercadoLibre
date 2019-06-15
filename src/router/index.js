import Vue from 'vue';
import Router from 'vue-router';

//PAGES
import LoginPage from '../components/LoginPage';
import HomePage from '../components/LoginPage';

// CATEGORIES
import CSSPage from '../docs/categories/CSSPage';



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },

    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },

    // CATEGORIES
    {
      path: '/css',
      name: 'CSSPage',
      component: CSSPage
    }
  ]
});
