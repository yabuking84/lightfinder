<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
					<AddInquiry></AddInquiry>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>




<script>

import AddInquiry from "@/views/Components/App/Buyer/AddInquiry";

export default {
	data: () => ({
		
	}),

	components: {
		AddInquiry,
	},

	computed: {

	},
}
	
</script>

<style scoped lang="stylus">
	.proposed_quote
		height: 82vh;
		max-height: 82vh;
		overflow-y: auto;
	.propposed_field
		height: 82vh;	
		max-height: 82vh;
		overflow-y: auto;
</style>



