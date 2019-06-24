<template>
<div>

	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->

		<v-container fluid grid-list-xl>

			<v-layout row wrap>
		        <v-flex xs12>
		            <bar-cards></bar-cards>
		        </v-flex>
			</v-layout>


			<v-layout row wrap align-space-around justify-space-between fill-height>
	            <v-flex xs7>
	           		<inquiries-table-grid></inquiries-table-grid>
	            </v-flex>

				<v-flex xs5>
	           		 <pending-payments> </pending-payments>	
			    </v-flex>
			</v-layout>


			<v-layout row wrap align-space-around justify-space-between fill-height>
	            <v-flex xs6>
	           		<sample-order-table-grid></sample-order-table-grid>
	            </v-flex>

				<v-flex xs6>
	           		<confirmed-orders> </confirmed-orders>	
			    </v-flex>
			</v-layout>

		</v-container>


</div>
</template>

<script>


import BarCards from '@/views/Components/App/Buyer/BarCards'
import InquiriesTableGrid from '@/views/Components/App/InquiriesTableGrid'
import PendingPayments from '@/views/Components/App/Buyer/PendingPayments'
import SampleOrderTableGrid from '@/views/Components/App/Buyer/SampleOrderTableGrid'
import ConfirmedOrders from '@/views/Components/App/Buyer/ConfirmedOrders'

export default {
	
	data: () => ({
		title: 'Home',
	}),

	components: {
	    BarCards,
	    InquiriesTableGrid,
	    PendingPayments,
	    SampleOrderTableGrid,
	    ConfirmedOrders,
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

