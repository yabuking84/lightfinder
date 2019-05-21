<template>
	
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->

	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>

		        <v-flex xs12>
		             <bar-cards> </bar-cards>
		        </v-flex>

				<v-flex xs12 md3>
			           <notification-list> </notification-list>
			    </v-flex>

	            <v-flex xs12 md9>
	           			<notification-table> </notification-table>
	            </v-flex>

			</v-layout>

		</v-container>
	</div>

</template>

<script>

import BarCards from '@/views/components/App/BarCards'

import NotificationList from '@/views/components/App/Admin/NotificationList'
import NotificationTable from '@/views/components/App/Admin/NotificationTable'

export default {
	
	data: () => ({
		title: 'Home',
	}),

	components: {

		NotificationList,
	    BarCards,
	    NotificationTable
	    
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



