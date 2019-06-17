import Vue from 'vue';
import Router from 'vue-router';

//PAGES
import LoginPage from '../components/LoginPage';
import HomePage from '../components/LoginPage';
import Products from '../components/ProductsTable'

// CATEGORIES
import CSSPage from '../docs/categories/CSSPage';

//EXAMPLE
import HelloWorld from '../components/HelloWorld';



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
    },{
      path: '/products',
      name: 'Products',
      component: Products
    },

    // CATEGORIES
    {
      path: '/css',
      name: 'CSSPage',
      component: CSSPage
    },

    //EXAMPLE
    {
      path: '/hello',
      name: 'Example',
      component: HelloWorld
    }
  ]
});
