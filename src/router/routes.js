// import AppSidebar from '@/views/Components/App/NavDrawer'
// import AppToolbar from '@/views/Components/App/Toolbar'
// import AppFooter from '@/views/Components/App/Footer'

import config from '@/config/index'
import { store } from '@/store'


// import Contacts from '@/views/Applications/Contacts'
// import Chat from '@/views/Applications/Chat'

// Pages
import RegisterPage from '@/views/Pages/Authentication/RegisterPage'
import AuthPage from '@/views/Pages/Authentication/AuthPage'
import ForgotPasswordPage from '@/views/Pages/Authentication/ForgotPasswordPage'
import LockScreenPage from '@/views/Pages/Authentication/LockScreenPage'

import Error404 from '@/views/Pages/Errors/Error404'
import Error500 from '@/views/Pages/Errors/Error500'

import PricingStyleOne from '@/views/Pages/Pricing/PricingStyleOne'
import PricingStyleTwo from '@/views/Pages/Pricing/PricingStyleTwo'

import CountdownPage from '@/views/Pages/CountdownPage'
import MaintenancePage from '@/views/Pages/MaintenancePage'
import ProfileView from '@/views/Pages/Profile'




import BuyerRegistration from '@/views/Pages/Buyer/Register'
import BuyerRegistrationDetails from '@/views/Pages/Buyer/RegisterDetails'
import BuyerRegistrationTerms from '@/views/Pages/Buyer/RegisterTerms'
import BuyerPackages from '@/views/Pages/Buyer/Packages'

import SupplierRegister from '@/views/Pages/Supplier/Register'
import SupplierRegisterTermsandCondition from '@/views/Pages/Supplier/RegisterTerms'
import SupplierRegisterCompanyDetails from '@/views/Pages/Supplier/RegisterCompanyDetails'

import Home from '@/views/Pages/Home'
import LoginPage from '@/views/Pages/Authentication/LoginPage'
import LogoutPage from '@/views/Pages/Authentication/LogoutPage'


import SuperChat from '@/views/Pages/SuperChat'



// PAGES
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

import AdminRoutes from '@/router/AdminRoutes.js'
import BuyerRoutes from '@/router/BuyerRoutes.js'
import SupplierRoutes from '@/router/SupplierRoutes.js'


// console.log('route.js store.user.role')
// console.log(store.state.auth.auth_user.role)
// console.log('route.js store.user.role')

var userRoutes = [];

// This is needed because some routes of each of these users have the same path, there will conflict
if(store.state.auth.auth_user.role==config.auth.role.admin.id) {
    userRoutes = AdminRoutes;
}
else if(store.state.auth.auth_user.role==config.auth.role.buyer.id) { 
    userRoutes = BuyerRoutes;
}
else if(store.state.auth.auth_user.role==config.auth.role.supplier.id) { 
    userRoutes = SupplierRoutes;
}

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// PAGES



const routes = 
[
    // so that when logged out and / is accessed it will got to logout.
    {
        path: '/superchat',
        name: 'SuperChat',
        components: { 
            default: SuperChat,             
        },        
    },

    // {
    //     path: '/',
    //     name: 'Home',
    //     meta: {
    //         requiresAuth: true,
    //         redirectToRole: true,
    //     },
    // },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
    },
    {
        path: '/logout',
        name: 'Logout',
        component: LogoutPage,
    },




	/*
		public views
	*/

	{
		name: 'BuyerRegistration',
		path: '/buyer/register',
		components: {
			default: BuyerRegistration
		}
	},

	{
		name: 'BuyerRegistrationMI',
		path: '/buyer/register/:main_interest',
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



    {
        name: 'SupplierRegistration' ,
        path: '/supplier/register',
        components: { 
            default: SupplierRegister,             
        }
    },

    {
        name: 'SupplierRegistrationDetails',
        path: '/supplier/details',
        components: {
            default: SupplierRegisterCompanyDetails
        }
    },

    {
        name: 'SupplierRegistrationTerms',
        path: '/register/terms',
        components: {
            default: SupplierRegisterTermsandCondition
        }
    },

	    

    ...userRoutes,
]





// console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
// console.log(routes)
// console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')




export {routes};
