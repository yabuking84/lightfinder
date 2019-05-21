<template>
<div>
	
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->
	<!-- CHANGE THIS!! THIS IS HOME VIEW FROM ADMIN -->

		<v-container fluid grid-list-xl>
			<v-layout row wrap>

		        <v-flex xs12>
		             <bar-cards> </bar-cards>
		        </v-flex>


	            <v-flex xs5>
	           		<pending-payments> </pending-payments>
	            </v-flex>

				<v-flex xs7>
	           		<pending-payments> </pending-payments>			        
			    </v-flex>

			</v-layout>

		</v-container>


</div>
</template>

<script>


import BarCards from '@/views/components/App/BarCards'
import PendingPayments from '@/views/components/App/Buyer/PendingPayments'

import NotificationList from '@/views/components/App/Admin/NotificationList'
import NotificationTable from '@/views/components/App/Admin/NotificationTable'

export default {
	
	data: () => ({
		title: 'Home',
	}),

	components: {
	    BarCards,
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



