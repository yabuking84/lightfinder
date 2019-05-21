<template>
	<div>
		<v-container fluid>

			<v-layout row wrap>
				<v-flex>
				
					<v-layout row wrap>
					<v-spacer></v-spacer>

					    	<v-btn flat value="left" class="blue-grey darken-3" large @click="openInquiryCreate=true">
			                	<i class="ml-1 white--text font-weight-light subheading far fa-edit white--text"></i>
			                	<span class="ml-1 white--text font-weight-light subheading">					                	
				                	Compose Inquiry
				                </span>
			             	</v-btn>						            

			</v-layout>
				</v-flex>
			</v-layout>

		  	<v-spacer class="my-4"></v-spacer>

		  	<v-layout row wrap>
				<v-flex>
						<inquiries-grid> </inquiries-grid>
				</v-flex>
			</v-layout>

		</v-container>
		<inquiry-create :snackBar.sync="successSnackbar" :dialog.sync="openInquiryCreate"></inquiry-create>

    <v-snackbar
        v-model="successSnackbar"
        color="green"
         top
         multi-line
         middle
         :timeout="10000"
        >

        Successfully Created Inquiry
        <v-btn
          dark
          flat
          @click="successSnackbar = false"
        >
          Close
        </v-btn>
  </v-snackbar>

	</div>
</template>


<script>


import InquiriesGrid from "@/views/Components/App/Buyer/InquiriesGrid";
import InquiryCreate from "@/views/Components/App/Buyer/InquiryCreate";

export default {

	components: {

	    InquiriesGrid,
	    InquiryCreate,

	},

	data: () => ({

		search:'',
		title: 'Home',
		icon: null,
		packageLink: '/buyer/packages',
		isActive: false,
		// component: 'InquiriesGrid',
		openInquiryCreate: false,
		successSnackbar:false


	}),

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

	watch: {
		snackBar(nVal, oVal) {
			if(nval) {
				this.snackBar = true
			}
		},
	},

	methods: {

		

		Search: () => {

		},

		Refresh: () => {

			alert('Refresh')

		},
		Sort: () => {

			alert('SOrt')

		},

	},


	created: function() {

	},
}
	
</script>

<style scoped lang="stylus">
	
</style>

