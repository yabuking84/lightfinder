import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'

import AdminHome from '@/views/Pages/Admin/Home'
import AdminInquiry from '@/views/Pages/Admin/Inquiry'

import config from '@/config/index'


const meta = { 
    requiresAuth: true,
    role: config.auth.role.admin.id,
    items: [
        {
            title: 'Dashboard',
            name: 'AdminHome',
            icon: 'fas fa-th-large',
        },
    ],    
}


export default [
    {
        name: 'AdminHome',
        path: '/admin/dashboard',
        components: {
            default: AdminHome, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },
    {
        name: 'AdminInquiry',
        path: '/admin/inquiry',
        components: {
            default: AdminInquiry, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },    
]

