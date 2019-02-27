import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'


import SupplierHome from '@/views/Pages/Supplier/Home'
import SupplierInquiry from '@/views/Pages/Supplier/Inquiry'

import config from '@/config/index'

// SUPPLIER
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
            icon: 'search',
        },
    ],
}

export default [
    {
        name: 'SupplierHome',
        path: '/supplier/dashboard',
        components: { 
            default: SupplierHome, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },

    {
        name: 'supplier-registration' ,
        path: '/supplier/register',
        components: { 
            default: Register, 
        }
    },

    {
        name: 'supplier-company-details',
        path: '/supplier/details',
        components: {
            default: RegisterCompanyDetails
        }
    },

    {
        name: 'supplier-terms&condition',
        path: '/register/terms',
        components: {
            default: RegisterTermsandCondition
        }
    },


    // ==========================================================================================================



]

