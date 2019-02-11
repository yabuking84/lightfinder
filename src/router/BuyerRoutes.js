import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'

import BuyerHome from '@/views/Pages/Buyer/Home'
import BuyerInquiry from '@/views/Pages/Buyer/Inquiry'


const meta = { 
    requiresAuth: true,
    role: 2,
    items: [
        {
            title: 'Dashboard',
            name: 'BuyerHome',
            icon: 'fas fa-th-large',
        },            
        {
            title: 'Inquiries',
            name: 'BuyerInquiry',
            icon: 'search',
        },
    ],        
}


export default [
    {
        name: 'BuyerHome',
        path: '/buyer/dashboard',
        components: { 
            default: BuyerHome, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },
    {
        name: 'BuyerInquiry',
        path: '/buyer/inquiry',
        components: { 
            default: BuyerInquiry, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },    

]

