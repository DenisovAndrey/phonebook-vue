import Vue from 'vue';
import Router from 'vue-router';

import UsersList from '../pageСomponents/UsersList';
import UserProfile from '../pageСomponents/UserProfile';
import PageIsNotFound from '../pageСomponents/PageIsNotFound';

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'usersList',
    props: true,
    component: UsersList
  },
  {
    path: '/user/:id',
    name: 'userProfile',
    props: true,
    component: UserProfile
  },
  {
    path: '*',
    name: 'pageIsNotFound',
    component: PageIsNotFound, 
  },
]

const router = new Router({
  mode: 'history',
  routes
});

export default router;