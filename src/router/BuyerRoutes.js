import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'

import BuyerHome from '@/views/Pages/Buyer/Home'
import BuyerInquiry from '@/views/Pages/Buyer/Inquiry'

import config from '@/config/index'

import BuyerRegistration from '@/views/Pages/Buyer/Register'
import BuyerRegistrationDetails from '@/views/Pages/Buyer/RegisterDetails'
import BuyerRegistrationTerms from '@/views/Pages/Buyer/RegisterTerms'
import BuyerPackages from '@/views/Pages/Buyer/Packages'
import BuyerInquiryDetails from '@/views/Pages/Buyer/Details'


import test from '@/views/Components/App/test'


const meta = { 
    requiresAuth: true,
    role: config.auth.role.buyer.id,
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
            testview: test, 
        },
        meta: meta,
    },    

      {
        name: 'BuyerInquiry',
        path: '/buyer/view',
        components: { 
            default: BuyerInquiryDetails, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },    


    {
        name: 'BuyerRegistration',
        path: '/buyer/register',
        components: {
            default: BuyerRegistration
        }
    },

    {
        name: 'BuyerRegistrationDetails',
        path: '/buyer/details',
        components: {
            default: BuyerRegistrationDetails
        }
    },

    {
        name: 'BuyerRegisterTerms',
        path: '/buyer/terms',
        components: {
            default: BuyerRegistrationTerms
        }
    },


    {
        name: 'BuyerPackages',
        path: '/buyer/packages',
        components: {
            default: BuyerPackages
        }
    },

]

