<template>

	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>

		        <v-flex xs12>
		             <bar-cards> </bar-cards>
		        </v-flex>

				<v-flex xs12>
					<inquiries-table-grid gridItemClass="xs6"></inquiries-table-grid>
			    </v-flex>

	            <v-flex xs12>
	            </v-flex>

			</v-layout>

		</v-container>
	</div>

</template>

<script>
import BarCards from '@/views/Components/App/Admin/BarCards'
import InquiriesTableGrid from '@/views/Components/App/InquiriesTableGrid'

export default {
	
	data: () => ({
		title: 'Home',
	}),

	components: {
	    BarCards,
	    InquiriesTableGrid,
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



