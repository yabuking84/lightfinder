<template>

	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>

		        <v-flex xs12>
		             <bar-cards> </bar-cards>
		        </v-flex>

				<v-flex xs12 md3>
			    </v-flex>

	            <v-flex xs12 md9>
	            </v-flex>

			</v-layout>

		</v-container>
	</div>

</template>

<script>
import BarCards from '@/views/components/App/Admin/BarCards'

export default {
	
	data: () => ({
		title: 'Home',
	}),

	components: {
	    BarCards,
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



