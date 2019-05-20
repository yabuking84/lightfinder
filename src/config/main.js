
export default {

	devMode: true,

	awss3: {
		signingURL:"http://192.168.1.200:8000/v1/aws-s3-signature",
        urls: {
        	inquiry: 'https://httpbin.org/post',
        },

	},

	shipping_methods: [
		{
			id: 1,
			name: "AIR",
		},
		{
			id: 2,
			name: "SEA",
		},
		{
			id: 3,
			name: "Buyer handles shipment",
		},
	],

    
	payment_methods: [
		{
			id: 1,
			name: "CASH",
		},
		{
			id: 2,
			name: "CHEQUE",
		},
		{
			id: 3,
			name: "BANK TRANSFER",
		},
	],


	inquiry_statuses: {

		default: [
			{
				id: 1002, 
				name: "Open",
				class: "green",
				icon: "far fa-envelope-open",
			},
			{
				id: 1004, 
				name: "Confirmation",
				class: "teal",
				icon: "fas fa-handshake",
			},
			{
				id: 1005, 
				name: "Pending Payment",
				class: "deep-orange",
				icon: "far fa-credit-card",
			},
			{
				id: 2001, 
				name: "Production",
				class: "blue",
				icon: "fas fa-industry",
			},
			{
				id: 2002, 
				name: "Shipment",
				class: "light-green",
				icon: "fas fa-truck",

			},
			{
				id: 2003, 
				name: "Receiving",
				class: "orange",
				icon: "fas fa-sign-in-alt",

			},
			{
				id: 2004, 
				name: "Return",
				class: "red",
				icon: "fas fa-exchange-alt",
			},
			{
				id: 3001, 
				name: "Success",
				class: "light-blue",
				icon: "far fa-check-circle",

			},
			{
				id: 3002, 
				name: "Cancelled",
				class: "red red darken-2",
				icon: "fas fa-ban",
			},
		],		

		buyers: [
			{
				id: 1001, 
				name: "Verifying",
				class: "orange",
				icon: "fas fa-hourglass-half",

			},
			{
				id: 1003, 
				name: "Rejected",
				class: "red",
				icon: "far fa-times-circle",
			},
		],

		suppliers: [
			// {
			// 	id: 'all', 
			// 	name: "All",
			// 	icon: "fas fa-envelope-open-text",
			// },
			// {
			// 	id: 'priority', 
			// 	name: "Priority",
			// 	icon: "fas fa-exclamation-circle",
			// },
			{
				id: 'closed', 
				name: "Closed",
				icon: "fas fa-envelope",
			},
		],

	},

	polling: {
		bidTable:{
			time: 5000,			
		},
		inquiryTable: {
			time: 10000,
		}
	},

}

