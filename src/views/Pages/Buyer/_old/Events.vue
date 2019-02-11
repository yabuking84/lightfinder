<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
					<h1>Events</h1>		

					<!-- <input type="text" v-model="broker"> -->
					
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>



<script>


export default {
	data: () => ({
		title: 'Events',
	}),

	components: {
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



