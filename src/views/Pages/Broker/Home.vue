<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>

					<hottest-offers/>
					<trending-boats/>				    

				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>



<script>
import TrendingBoats from '@/views/Components/Broker/TrendingBoats'
import HottestOffers from '@/views/Components/Broker/HottestOffers'



export default {
	data: () => ({
		title: 'Broker',
	}),

	components: {
		TrendingBoats,
		HottestOffers,
	},
}
	
</script>



