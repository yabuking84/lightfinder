<template>
<div>

	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->

		<v-container fluid grid-list-xl>

			<v-layout row wrap justify-space-between align-center>

					<v-alert 
					class="mx-3"
					type="success" 
					icon="fas fa-clipboard-list"
					:value="true">
						{{ maxInqs - totalInqs }} out of {{ maxInqs }} Inquiries remaining.
					</v-alert>
		        	
					<v-btn 
					flat
					value="Create Inquiry" 
					title="Create Inquiry"  
					@click="openInquiryCreate=true"
					style=""
					class="black white--text">
						<v-icon style="font-size: 1em;" class="ma-0">fas fa-plus-circle</v-icon>
						Create Inquiry
				    </v-btn>		            
		        
			</v-layout>

			<v-layout row wrap>
		        <v-flex xs12>
		            <bar-cards></bar-cards>
		        </v-flex>
			</v-layout>


			<v-layout row wrap align-space-around justify-space-between fill-height>
	            <v-flex xs7>
	           		<inquiries-table-grid>
	           			<template v-slot:statuses>&nbsp;</template>
	           		</inquiries-table-grid>
	            </v-flex>

				<v-flex xs5>
	           		 <pending-payment-table> </pending-payment-table>	
			    </v-flex>
			</v-layout>


			<v-layout row wrap align-space-around justify-space-between fill-height>
	            <v-flex xs6>
	           		<sample-order-table></sample-order-table>
	            </v-flex>

				<v-flex xs6>
	           		<confirmed-order-table> </confirmed-order-table>	
			    </v-flex>
			</v-layout>

		</v-container>


<inquiry-create :snackBar.sync="successSnackbar" :dialog.sync="openInquiryCreate"></inquiry-create>

</div>
</template>

<script>


import BarCards from '@/views/Components/App/Buyer/BarCards'
import InquiriesTableGrid from '@/views/Components/App/InquiriesTableGrid'
import PendingPaymentTable from '@/views/Components/App/Buyer/PendingPaymentTable'
import SampleOrderTable from '@/views/Components/App/Buyer/SampleOrderTable'
import ConfirmedOrderTable from '@/views/Components/App/Buyer/ConfirmedOrderTable'
import InquiryCreate from "@/views/Components/App/Buyer/InquiryCreate";

export default {
	
	data: () => ({
		title: 'Home',
		openInquiryCreate: false,
		successSnackbar:false,

		totalInqs:0,
		maxInqs:3,
	}),

	components: {
	    BarCards,
	    InquiriesTableGrid,
	    PendingPaymentTable,
	    SampleOrderTable,
	    ConfirmedOrderTable,
	    InquiryCreate,
	},

	computed: {
		broker: {
			set(data){
				this.$store.commit('auth/CHANGE_TEST_M',data);
			},
			get(){				
        		return this.$store.state.auth.auth_user.name;
			},			
		},
	},
}
	
</script>

