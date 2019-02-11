<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
					<h1>Buyer Inquiries</h1>		

						

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



