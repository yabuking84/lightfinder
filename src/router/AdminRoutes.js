import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'

import AdminHome from '@/views/Pages/Admin/Home'
import AdminInquiry from '@/views/Pages/Admin/Inquiry'
import AdminBuyer from '@/views/Pages/Admin/Buyer'
import AdminSupplier from '@/views/Pages/Admin/Supplier'

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
          {
            title: 'Inquiry',
            name: 'AdminInquiry',
            icon: 'fas fa-search',
        },
        {
            title: 'Buyer',
            name: 'AdminBuyer',
            icon: 'fas fa-user',
        },
          {
            title: 'Supplier',
            name: 'AdminSupplier',
            icon: 'fas fa-user-tie',
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
         props: { default:true },

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
        props: { default:true },

    },
    {
        name: 'AdminBuyer',
        path: '/admin/buyer/',
        components: {
            default: AdminBuyer,
            sidebar: AppSidebar,
            header: AppToolbar,
            footer: AppFooter
        },
        meta: meta,
        props: { default:true },

    },
    {
        name: 'AdminSupplier',
        path: '/admin/supplier',
        components: {
            default: AdminSupplier,
            sidebar: AppSidebar,
            header: AppToolbar,
            footer: AppFooter
        },
        meta: meta,
         props: { default:true },


    }    
]

