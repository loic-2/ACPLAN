import {
    createRouter,
    createWebHistory
} from 'vue-router'
import DashBoard from '../views/Dashboard.vue'
import Client from '../views/Client.vue'
import Activite from '../views/Activite.vue'
import Assurance from '../views/Assurance.vue'
import Tache from '../views/Tache.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'aceuil',
            component: DashBoard
        },
        {
            path: '/client',
            name: 'client',
            component: Client
        },
        {
            path: '/assurance',
            name: 'assurance',
            component: Assurance
        },
        {
            path: '/activite',
            name: 'activite',
            component: Activite
        },
        {
            path: '/tache',
            name: 'tache',
            component: Tache
        },
        {
            path: '/personnel',
            name: 'personnel',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Personnel.vue')
        }
    ]
})

export default router