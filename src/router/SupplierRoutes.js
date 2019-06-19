import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'
import AppProfile from '@/views/Pages/Profile'


import config from '@/config/index'


// SUPPLIER

import SupplierWallet from '@/views/Pages/Supplier/Wallet'
import SupplierHome from '@/views/Pages/Supplier/Home'
import SupplierInquiry from '@/views/Pages/Supplier/Inquiry'
import SupplierInquiryView from "@/views/Components/App/Supplier/InquiryView";

import Register from '@/views/Pages/Supplier/Register'
import RegisterTermsandCondition from '@/views/Pages/Supplier/RegisterTerms'
import RegisterCompanyDetails from '@/views/Pages/Supplier/RegisterCompanyDetails'



const meta = {
    requiresAuth: true,
    role: config.auth.role.supplier.id,
    items: [
        {
            title: 'Dashboard',
            name: 'SupplierHome',
            icon: 'fas fa-th-large',
        },            
        {
            title: 'Inquiries',
            name: 'SupplierInquiry',
            icon: 'fas fa-clipboard',
        },            
    ], 
    profileItems: [
        {
            title: 'Edit Profile',
            name: 'SupplierProfile',
            icon: 'person',
        },           
        {
            title: 'Wallet',
            name: 'SupplierWallet',
            icon: 'fas fa-wallet',
        },    
    ],
    statuses: [
    	...config.main.inquiry_statuses.default,
    	...config.main.inquiry_statuses.suppliers,
    ],
    storeType: {
    	inq: "spplrInq",
    },
}

export default [
    {
        name: 'SupplierHome',
        path: '/supplier/dashboard',
        components: {
            default:SupplierHome,
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
            dialog: SupplierInquiryView,
        },
        meta: meta
    },

    {
        name: 'SupplierInquiry',
        path: '/supplier/inquiry',
        components: {
            default:SupplierInquiry,
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
            dialog: SupplierInquiryView,
        },
        meta: meta
    },

    {
        name: 'SupplierProfile',
        path: '/supplier/profile',
        components: {
            // default: BuyerHome, 
            default: AppProfile, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
            dialog: SupplierInquiryView,
        },
        meta: meta,
    },


    {
        name: 'SupplierWallet',
        path: '/supplier/wallet',
        components: {
            default: SupplierWallet, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
            dialog: SupplierInquiryView,
        },
        meta: meta,
    },


    {
        name: 'SupplierRegistration' ,
        path: '/supplier/register',
        components: { 
            default: Register,             
        }
    },

    {
        name: 'SupplierRegistrationDetails',
        path: '/supplier/details',
        components: {
            default: RegisterCompanyDetails
        }
    },

    {
        name: 'SupplierRegistrationTerms',
        path: '/register/terms',
        components: {
            default: RegisterTermsandCondition
        }
    },


    // ==========================================================================================================



]

