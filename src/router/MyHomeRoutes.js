import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'
import AppProfile from '@/views/Pages/Profile'


import config from '@/config/index'


imp
const meta = { 
    requiresAuth: true,
    role: config.auth.role.buyer.id,
    items: [
        {
            title: 'Dashboard',
            name: 'BuyerHome',
            icon: 'fas fa-th-large',
        },
    ],
    profileItems: [
        {
            title: 'Edit Profile',
            name: 'BuyerProfile',
            icon: 'person',
        },    
    ],
    statuses: [
    	...config.main.inquiry_statuses.default,
    	...config.main.inquiry_statuses.buyers,
    ],
    storeType: {
    	inq: "byrInq",
    }
}


export default [

    {
        name: 'MyHome',
        path: '',
        components: { 
            default: BuyerHome, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
            dialog: BuyerInquiryView,
        },
        meta: meta,
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

