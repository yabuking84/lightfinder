<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
					<h1>Buyer Home</h1>		

					<!-- <input type="text" v-model="buyer"> -->
					<InquiriesTable></InquiriesTable>
					
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>



<script>

import InquiriesTable from "@/views/Components/App/Buyer/InquiriesTable";

export default {
	data: () => ({
		title: 'Home',
	}),


	components: {
		InquiriesTable
	},

	computed: {

		buyer: {
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



