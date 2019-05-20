<template>
<div>
	
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->

		<v-container fluid grid-list-xl>
			<v-layout row wrap>

		        <v-flex xs12>
		             <bar-card user-type="buyer"> </bar-card>
		        </v-flex>

				<!-- <v-flex xs12 md3>
			           <notification-list> </notification-list>
			    </v-flex> -->

	            <v-flex xs4>
	           			<pending-payments> </pending-payments>
	            </v-flex>

			</v-layout>

		</v-container>




</div>
</template>

<script>


import BarCard from '@/views/components/App/BarCard'
import PendingPayments from '@/views/components/App/Buyer/PendingPayments'

import NotificationList from '@/views/components/App/Admin/NotificationList'
import NotificationTable from '@/views/components/App/Admin/NotificationTable'

export default {
	
	data: () => ({
		title: 'Home',
	}),

	components: {
	    BarCard,
	    PendingPayments,
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



