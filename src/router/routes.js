
import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'

/* list of pages */
import Dashboard from '@/views/Pages/Dashboard/Dashboard'
import Inquiries from '@/views/Pages/Inquiries/Inquiries'
import BuyerRegistration from '@/views/Pages/Registration/Register'
import SellerRegistration from '@/views/Pages/Registration/SellerRegistration'
import TermsandCondition from '@/views/Pages/Terms/index'

export const routes =
 [
   {
	   path: '/',
	   redirect: '/dashboard/' 
   },
   { 
  	path: '/dashboard/',
    name: 'dashboard',
    components: { 
    	default: Dashboard, sidebar: AppSidebar, header: AppToolbar, footer: AppFooter }
   },
   {
  	path: '/inquiry',
  	name: 'inquiry',
  	components: { 
      default: Inquiries, sidebar: AppSidebar, header: AppToolbar, footer: AppFooter }
   },
   {
   	path: '/buyer/registration',
   	name: 'registration',
   	components: {
   		default: BuyerRegistration 
   	},
   	meta: { title: 'Buyer Registration'}
   },
   
   {
   	path: '/packages',
   	name: 'packages',
   	components: {
   		default: Inquiries, sidebar: AppSidebar, header:AppToolbar, footer:AppFooter
   	}
   },
   {
   	path: '/supplier/terms-and-conditions',
   	name: 'terms-and-conditions',
   	components: {
   		default: TermsandCondition
   	}
   }

]
	