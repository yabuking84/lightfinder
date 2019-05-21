<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex xs12 mb-2>
					<v-card flat style="background-color: transparent;">
						<v-container fill-height fluid grid-list-lg pa-0>
							<v-layout row wrap>
								<bar-card :barcardData="barcardData"></bar-card>
							</v-layout>
						</v-container>
					</v-card>			  		
				</v-flex>

				<v-flex xs12>
	           		<awarded-inquiries> </awarded-inquiries>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import BarCard from '@/views/Components/App/Supplier/BarCard'
import AwardedInquiries from '@/views/components/App/Supplier/InquiriesTableAwarded'

export default {



components: {
	BarCard,
	AwardedInquiries,
},

data: function(){ return {
	barcardData: {
		amount: 2014.516,
		icon: 'fas fa-wallet',
		title: 'Widrawable Money',
	},
}},


}
</script>