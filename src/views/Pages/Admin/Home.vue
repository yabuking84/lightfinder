<template>

	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>

		        <v-flex xs12>
		             <bar-cards> </bar-cards>
		        </v-flex>

				<v-flex xs12>
					<inquiries-table-grid grid-item-class="xs6 md6"></inquiries-table-grid>
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

import config from "@/config/main"
import tblBs from "@/bus/table"
import VueTimers from 'vue-timers/mixin'


export default {
	mixins: [
		VueTimers,
	],

	components: {
	    BarCards,
	    InquiriesTableGrid,
	},



	// so there tables will refresh every 5min regardless
	timers: [{
	    name: 'RefershTables',
	    time: config.polling.default.time,
	    repeat: true,
	    autostart: true,
	    callback: function() {
	    	tblBs.emitRefreshTablePolling();
	    },
	}],

	data: () => ({
		title: 'Home',
	}),


	created(){
		// start polling
		this.$timer.start('RefershTables');
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



