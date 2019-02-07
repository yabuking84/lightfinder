import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'



import Contacts from '@/views/Applications/Contacts'
import Chat from '@/views/Applications/Chat'

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






import Home from '@/views/Pages/Home'
import LoginPage from '@/views/Pages/Authentication/LoginPage'
import LogoutPage from '@/views/Pages/Authentication/LogoutPage'




const routes = 
[

    // Pages
    {
        path: '/',
        name: 'Home',
        components: { 
            default: Home, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: {
            // layout: 'auth',
            requiresAuth: true,
        },
    },



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

 


]



import AdminRoutes from '@/router/AdminRoutes.js'
import SupplierRoutes from '@/router/SupplierRoutes.js'

// Push routes here
var i;
for (i = 0; i < AdminRoutes.length; i++) {     
    routes.push(AdminRoutes[i]);
}
for (i = 0; i < SupplierRoutes.length; i++) {
    routes.push(SupplierRoutes[i]);
}


// console.log(routes);



export {routes};
