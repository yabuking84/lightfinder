<template>
	

		<v-container fluid grid-list-xl>
			<v-layout row wrap>
		        <v-flex xs12>
		             <bar-cards> </bar-cards>
		        </v-flex>
			</v-layout>


			<v-layout row wrap align-space-around justify-space-between fill-height>
	            <v-flex xs7>
	           		<inquiries-table-grid></inquiries-table-grid>
	            </v-flex>

				<v-flex xs5>
	           		 <wallet-table> </wallet-table>
			    </v-flex>
			</v-layout>


			<v-layout row wrap align-space-around justify-space-between fill-height>
	            <v-flex xs5>
	           		<sample-order-table-grid></sample-order-table-grid>
	            </v-flex>

				<v-flex xs7>
	           		<confirmed-orders> </confirmed-orders>	
			    </v-flex>
			</v-layout>

		</v-container>


</template>

<script>

import BarCards from '@/views/components/App/Supplier/BarCards'
import InquiriesTableGrid from '@/views/components/App/Supplier/InquiriesTableGrid'
import WalletTable from '@/views/components/App/Supplier/WalletTable'
import SampleOrderTableGrid from '@/views/components/App/Supplier/SampleOrderTableGrid'
import ConfirmedOrders from '@/views/components/App/Supplier/ConfirmedOrders'

export default {

	data: () => ({
		title: 'Home',
	}),

	components: {

	    BarCards,
	    InquiriesTableGrid,
	    WalletTable,
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



