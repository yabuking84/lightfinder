<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
						<v-container mt-5>
						  <v-card>
						  	<v-layout row wrap pa-2>
						  	   <v-flex xs8 >
							      <div class="mt-2 mb-3">
	    							    <v-btn-toggle v-model="icon">

		    							    <span class="light-blue accent-3 pa-2">
		    							    	<v-btn flat value="left" class="v-btn--active">
								                	<i class="fas fa-envelope-open-text white--text"></i> 
								                	<span class="ml-1 font-weight-light white--text">Open Inquiry</span>
								             	</v-btn>	
		    							    </span>

											<span class="light-blue accent-3 pa-2">
												<v-btn flat value="center">
									                <i class="fas fa-tasks white--text"></i> 
									                <span class="ml-1 font-weight-light white--text">In-Progress Inquiry</span>
									            </v-btn>	
											</span>
											 	
											<span class="light-blue accent-3 pa-2">
												<v-btn flat value="right">
									               <i class="fas fa-envelope white--text"></i> 
									               <span class="ml-1 font-weight-light white--text">Closed Inquiry</span>
									            </v-btn>
											</span>

							            </v-btn-toggle>
							      </div>
					          </v-flex>
					           <v-flex xs3 >
						           	<div class="mt-2 mb-3">
						           		<v-text-field v-model="search" color="black" label="Search" append-icon="search" required></v-text-field>  
						           	</div>
					          </v-flex>
					          <v-flex xs1>
					          	<div class="mt-4 mb-4">
									<v-layout row wrap>
										<v-btn flat icon color="gray lighten-4" class="">
								            <i class="fas fa-filter"></i>
								        </v-btn>
								        <v-btn flat icon color="gray" class="">
								            <i class="fas fa-sync-alt"></i>
								        </v-btn>  
									</v-layout>
					          	</div>
					          </v-flex>
						  	</v-layout>
						  	  <v-divider></v-divider>
							  <InquiriesTable></InquiriesTable>
						  </v-card>
						</v-container>
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

<style scoped lang="stylus">
	
</style>

