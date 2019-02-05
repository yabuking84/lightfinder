import AppSidebar from '@/views/Components/App/Broker/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'

import Home from '@/views/Pages/Broker/Home'
import Events from '@/views/Pages/Broker/Events'
import Boats from '@/views/Pages/Broker/Boats'


const meta = {     
    requiresAuth: true,
    role: 2,
}


export default [
    {
        name: 'BrokerHome',
        path: '/broker',
        components: { 
            default: Home, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
        // children: [
        //     {
        //       path: 'profile',
        //       meta : {
        //         requiresAuth: false,
        //         role: 2,
        //       },
        //     },
        // ]
    },
    {
        name:'BrokerEvents',
        path: '/broker/events',
        components: { 
            default: Events, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },
    {
        name:'BrokerBoats',
        path: '/broker/boats',
        components: { 
            default: Boats, 
            sidebar: AppSidebar, 
            header: AppToolbar, 
            footer: AppFooter,
        },
        meta: meta,
    },

]
