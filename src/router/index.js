import { createWebHistory , createRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { path: '/', name: 'inbox', component: () => import('@/views/tabs/Inbox.vue') },
  { path: '/search', name: 'search', component: () => import('@/views/tabs/Search.vue') },
  { path: '/search/:id', name: 'searchResults', component: () => import('@/views/tabs/searchResults.vue') },
  { path: '/completed', name: 'completed', component: () => import('@/views/tabs/Completed.vue') },
  { path: '/labels', name: 'labels', component: () => import('@/views/tabs/Labels.vue') },
  { path: '/labels/:id', name: 'LabelDetails', component: () => import('@/views/tabs/LabelDetails.vue') },
  { path: '/favorites', name: 'favorites', component: () => import('@/views/tabs/Favorites.vue')}
  // { path: '/trash', name: 'trash', component: () => import('@/views/tabs/Trash.vue')}
],
linkActiveClass: 'active',
})

export default router