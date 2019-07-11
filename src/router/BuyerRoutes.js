import AppSidebar from '@/views/Components/App/NavDrawer'
import AppToolbar from '@/views/Components/App/Toolbar'
import AppFooter from '@/views/Components/App/Footer'
import AppProfile from '@/views/Pages/Profile'

import BuyerHome from '@/views/Pages/Buyer/Home'
import BuyerInquiry from '@/views/Pages/Buyer/Inquiry'

import BuyerInvoice from '@/views/Components/App/Invoice'

import BuyerMyHome from '@/views/Pages/Buyer/MyHome'
import BuyerMyHomeProject from '@/views/Components/App/Buyer/MyHome/ProjectView'

import BuyerMyTower from '@/views/Pages/Buyer/MyTower'

import config from '@/config/index'

import BuyerRegistration from '@/views/Pages/Buyer/Register'
import BuyerRegistrationDetails from '@/views/Pages/Buyer/RegisterDetails'
import BuyerRegistrationTerms from '@/views/Pages/Buyer/RegisterTerms'
import BuyerPackages from '@/views/Pages/Buyer/Packages'
import BuyerInquiryView from "@/views/Components/App/Buyer/InquiryView";


import test from '@/views/Components/App/test'


const meta = { 
	requiresAuth: true,
	role: config.auth.role.buyer.id,
	items: [
		{
			title: 'LightFinder',
			name: 'BuyerHome',
			icon: 'fas fa-th-large',
		},
	],
	items2: [
		{
			title: 'My Home',
			name: 'BuyerMyHome',
			icon: 'fas fa-home',
		},
		{
			title: 'My Tower',
			name: 'BuyerMyTower',
			icon: 'fas fa-building',
		},
	],
	profileItems: [
		{
			title: 'Edit Profile',
			name: 'BuyerProfile',
			icon: 'person',
		},    
	],
	statuses: [
		...config.main.inquiry_statuses.default,
		...config.main.inquiry_statuses.buyers,
	],
	storeType: {
		inq: "byrInq",
		myHm: "byrMyHm",
	}
}

const meta2 = {
	...meta,
	style:{
		backgroundImage:'url(/static/bg-image.png)',
		backgroundSize: '100% auto ',
		backgroundPositionY: '-20vh',
		backgroundAttachment: 'fixed',
	},

}


export default [

	// {
	// 	name: 'BuyerHome2',
	// 	path: '',
	// 	components: { 
	// 		default: BuyerHome, 
	// 		sidebar: AppSidebar, 
	// 		header: AppToolbar, 
	// 		footer: AppFooter,
	// 		dialog: BuyerInquiryView,
	// 	},
	// 	meta: meta,
	// },

	{
		name: 'BuyerHome',
		path: '/',
		components: { 
			default: BuyerHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta,
	},

	{
		name: 'BuyerInquiry',
		path: '/inquiries',
		components: { 
			default: BuyerInquiry, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta,
	},

	{
		name: 'BuyerInquiryViewPayment',
		path: '/inquiry/:inquiry_id/payment/:payment_status',
		components: {
			default: BuyerHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta,
	},


	{
		name: 'BuyerInquiryViewSamplePayment',
		path: '/inquiry/:inquiry_id/bids/:bid_id/payment/:payment_status',
		components: {
			default: BuyerHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta,
	},


	{
		name: 'BuyerProfile',
		path: '/profile',
		components: {
			// default: BuyerHome, 
			default: AppProfile, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta,
	},

	{
		name: 'BuyerInvoice',
		path: '/invoice',
		components: {
			// default: BuyerHome, 
			default: BuyerInvoice, 
			// sidebar: AppSidebar, 
			// header: AppToolbar, 
			// footer: AppFooter,
			// dialog: BuyerInquiryView,
		},
		meta: meta,
	},


	// {
	//     name: 'BuyerInquiryView',
	//     path: '/buyer/inquiry/:inq_id',
	//     components: { 
	//         default: BuyerInquiryView, 
	//         sidebar: AppSidebar, 
	//         header: AppToolbar, 
	//         footer: AppFooter,
	//         testview: test, 
	//     },
	//     meta: meta,
	//     props: { default:true },

	// },    





















	// My Home
	//////////////////////////////////////////////////////

	{
		name: 'BuyerMyHome',
		path: '/my-home',
		components: { 
			default: BuyerMyHome, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta2,
	},

	{
		name: 'BuyerMyHomeProject',
		path: '/my-home/project/:proj_ref',
		components: { 
			default: BuyerMyHomeProject, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta2,
	},
	//////////////////////////////////////////////////////
	// My Home


	// My Tower
	//////////////////////////////////////////////////////
	{
		name: 'BuyerMyTower',
		path: '/my-tower',
		components: { 
			default: BuyerMyTower, 
			sidebar: AppSidebar, 
			header: AppToolbar, 
			footer: AppFooter,
			dialog: BuyerInquiryView,
		},
		meta: meta2,
	},
	//////////////////////////////////////////////////////
	// My Tower



  














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

]

