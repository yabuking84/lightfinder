import AppSidebar from '@/views/Components/App/Owner/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'


// SUPPLIER

import Register from '@/views/Pages/Supplier/Register'
import RegisterTermsandCondition from '@/views/Pages/Supplier/RegisterTerms'
import RegisterCompanyDetails from '@/views/Pages/Supplier/RegisterCompanyDetails'

// BUYER

import BuyerRegistration from '@/views/Pages/Buyer/Register'
import BuyerRegistrationDetails from '@/views/Pages/Buyer/RegisterDetails'
import BuyerRegistrationTerms from '@/views/Pages/Buyer/RegisterTerms'
import BuyerInquiry from '@/views/Pages/Buyer/Inquiry'
import BuyerPackages from '@/views/Pages/Buyer/Packages'

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
        path: '/register/company/details',
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

    {
        name: 'buyer-registration-home',
        path: '/buyer/register',
        components: {
            default: BuyerRegistration
        }
    },

    {
        name: 'buyer-registration-details',
        path: '/buyer/details',
        components: {
            default: BuyerRegistrationDetails
        }
    },

     {
        name: 'buyer-registration-details',
        path: '/buyer/terms',
        components: {
            default: BuyerRegistrationTerms
        }
    },

    {
        name: 'buyer-inquiry',
        path: '/buyer/inquiry',
        components: {
            default: BuyerInquiry,
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        }
    },

    {
        name: 'buyer-packages',
        path: '/buyer/packages',
        components: {
            default: BuyerPackages
        }
    },

]

