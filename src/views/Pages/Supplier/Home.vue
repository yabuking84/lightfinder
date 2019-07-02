<template>
	

		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex xs12>
					 <bar-cards> </bar-cards>
				</v-flex>
			</v-layout>


			<v-layout row wrap align-space-around justify-space-between fill-height>
				<v-flex xs12>
					<inquiries-table-grid gridItemClass="xs6" height="330px"></inquiries-table-grid>
				</v-flex>

				<!-- <v-flex xs5>
					<wallet-table></wallet-table>
				</v-flex> -->
			</v-layout>


			<v-layout row wrap align-space-around justify-space-between fill-height>
				<v-flex xs6>
					<sample-order-table></sample-order-table>
				</v-flex>

				<v-flex xs6>
					<confirmed-order-table></confirmed-order-table>
				</v-flex>
			</v-layout>

		</v-container>


</template>

<script>

import BarCards from '@/views/Components/App/Supplier/BarCards'
import InquiriesTableGrid from '@/views/Components/App/InquiriesTableGrid'

import SampleOrderTable from '@/views/Components/App/Supplier/SampleOrderTable'
import ConfirmedOrderTable from '@/views/Components/App/Supplier/ConfirmedOrderTable'

import WalletTable from '@/views/Components/App/Supplier/WalletTable'

export default {

	data: () => ({
		title: 'Home',
	}),

	components: {
		BarCards,
		InquiriesTableGrid,
		SampleOrderTable,
		ConfirmedOrderTable,
		WalletTable,
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



