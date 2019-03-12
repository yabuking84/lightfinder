<template>
	
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->

	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>

		        <v-flex xs12>
		             <bar-card> </bar-card>
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

import NotificationList from '@/views/components/App/Admin/NotificationList'
import BarCard from '@/views/components/App/Admin/BarCard'
import NotificationTable from '@/views/components/App/Admin/NotificationTable'

export default {
	
	data: () => ({
		title: 'Home',
	}),

	components: {

		NotificationList,
	    BarCard,
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



