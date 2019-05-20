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

// console.log('store.state.auth.auth_user.role')
// console.log(store.state.auth.auth_user.role)
// console.log(config.auth.role.admin.id)
// console.log('store.state.auth.auth_user.role')

// Push routes here
// var i;
// for (i = 0; i < AdminRoutes.length; i++) {     
//     routes.push(AdminRoutes[i]);
// }
// for (i = 0; i < BuyerRoutes.length; i++) {     
//     routes.push(BuyerRoutes[i]);
// }
// for (i = 0; i < SupplierRoutes.length; i++) {
//     routes.push(SupplierRoutes[i]);
// }




// if(store.state.auth.auth_user.role==config.auth.role.admin.id) {
//     for (i = 0; i < AdminRoutes.length; i++) {     
//         routes.push(AdminRoutes[i]);
//     }
// }
// else if(store.state.auth.auth_user.role==config.auth.role.buyer.id) {    
//     for (i = 0; i < BuyerRoutes.length; i++) {     
//         routes.push(BuyerRoutes[i]);
//     }
// }
// else {
//     // so that when logged out and / is accessed it will got to logout.
//     routes.push({
//         path: '/',
//         name: 'Home',
//         meta: {
//             requiresAuth: true,
//         },
//     });
// }


// console.log(routes);
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
    {
        path: '/',
        name: 'Home',
        meta: {
            requiresAuth: true,
            redirectToRole: true,
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

    ...AdminRoutes,
    ...BuyerRoutes,
    ...SupplierRoutes,
]







export {routes};
