import AppSidebar from '@/views/Components/App/Admin/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'

import Home from '@/views/Pages/Admin/Home'
import Owners from '@/views/Pages/Admin/Owners'
import Brokers from '@/views/Pages/Admin/Brokers'
import Boats from '@/views/Pages/Admin/Boats'
import Events from '@/views/Pages/Admin/Events'


const meta = { 
    requiresAuth: true,
    role: 3,
}


export default [
    {
        name: 'AdminHome',
        path: '/admin',
        components: { 
            default: Home, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },
    {
        name:'AdminOwners',
        path: '/admin/owners',
        components: { 
            default: Owners, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },
    {
        name:'AdminBrokers',
        path: '/admin/brokers',
        components: { 
            default: Brokers, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },
    {
        name:'AdminBoats',
        path: '/admin/boats',
        components: { 
            default: Boats, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },
    {
        name:'AdminEvents',
        path: '/admin/events',
        components: { 
            default: Events, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },
]

