<template>
	<div>
		<v-container fluid grid-list-xl >
				
				
				<v-layout row wrap>
					
					<!-- inquiry details card -->
					<v-flex xs12>
						<inquiry-details-card v-if="inquiry" :inquiry="inquiry"> </inquiry-details-card>
					</v-flex>
					<!-- end of detils  -->

					
					<!-- supplier quote -->
					<v-flex xs8>
						<quote-details v-if="inquiry" :inquiry="inquiry"> </quote-details>
					</v-flex>  
					<!-- supplier quote -->


					<!-- proposal list -->
					<v-flex xs4>
					</v-flex>
					<!-- proposal list -->

				</v-layout>
		</v-container>
	</div>
</template>

<script>

import InquiryPostList from "@/views/Components/App/Buyer/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Buyer/InquiryDetailsCard"

import inqEvntBs from "@/bus/inquiry";

export default {

	components: {

	    InquiryPostList,
	    InquiryDetailsCard,

	},

	props: ['inq_id'],

	data: () => ({

		title: 'Inquiry Details',
		icon: null,
		bidDialog:false,
		inquiry: false,

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

	methods: {


	},

	created() {


		this.$store.dispatch('byrInq/getInquiry_a',{inq_id:this.inq_id})
		.then((data)=>{
			this.inquiry = data;
		})
		.catch((error)=>{
			console.log(error);
		});

	},
}
	
</script>

<style scoped lang="scss">
	.scopedcontainer a {
	  	text-decoration:none;
	}

</style>

