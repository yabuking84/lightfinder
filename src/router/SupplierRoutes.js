import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'


import config from '@/config/index'


// SUPPLIER

import SupplierHome from '@/views/Pages/Supplier/Home'
import SupplierInquiryView from '@/views/Pages/Supplier/InquiryView'

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
    ],        
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
        },
        meta: meta
    },

    {
        name: 'SupplierInquiryView',
        path: '/supplier/inquiry/view',
        components: {
            default:SupplierInquiryView,
            sidebar: AppSidebar,
            header: AppToolbar,
            footer:AppFooter
        },
        meta: meta,
        props: true,
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

