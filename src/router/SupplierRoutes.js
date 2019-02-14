import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'


// SUPPLIER

import Register from '@/views/Pages/Supplier/Register'
import RegisterTermsandCondition from '@/views/Pages/Supplier/RegisterTerms'
import RegisterCompanyDetails from '@/views/Pages/Supplier/RegisterCompanyDetails'


const meta = { 
    requiresAuth: true,
    role: 1,
}

export default [

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

