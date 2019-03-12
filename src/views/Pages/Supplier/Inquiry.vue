<template>
	<div>
		<v-container fluid>


			<!-- <v-layout row wrap ml-5>
 		   		<v-flex xs2 pa-1 >
			  		<v-card>
			  	  	   <h1 class="pa-3 title text-xs-center font-weight-light">Total Earnings: <span class="font-weight-bold subheading"> $100.00 </span> </h1>
			  	  	</v-card>  
							

		  		</v-flex>
		  	</v-layout> -->

		  	<v-layout row wrap>
				<v-flex>
			  		<inquiries-table></inquiries-table>
				</v-flex>
		  	</v-layout>


		</v-container>
	</div>
</template>

<script>



import InquiriesTable from "@/views/Components/App/Supplier/InquiriesTable"

	// import OpenInquiry from '@/views/'
	export default {

		components: {
			InquiriesTable,
		},

		data: () => ({
			component: InquiriesTable,
		}),

		created() {

		},

		methods: {

			Sort: () => {

			},

			Refresh: () => {

			}
		},




	}

</script>