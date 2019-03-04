import AppSidebar from '@/views/Components/App/Owner/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'

import Home from '@/views/Pages/Owner/Home'
import Boats from '@/views/Pages/Owner/Boats'


const meta = { 
    requiresAuth: true,
    role: 1,
}


export default [
    {
        name: 'OwnerHome',
        path: '/owner',
        components: { 
            default: Home, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },
    {
        name: 'OwnerBoats',
        path: '/owner/boats',
        components: { 
            default: Boats, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },

]

