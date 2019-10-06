<template>

<div>


<v-dialog 
@input="closeOpenInquiry()" 
:value="openInquiry" 
lazy
scrollable>

	<v-card>
		<v-card-title class="black darken-4 ">
			<h2 v-if="stateInquiry" class="font-weight-bold white--text">
				INQUIRY # {{ stateInquiry.id }}
			</h2>
			<v-spacer></v-spacer>
			<v-btn dark flat @click="closeOpenInquiry()">
				<v-icon>close</v-icon>
			</v-btn>
		</v-card-title>

		<v-divider></v-divider>

		<v-card-text id="inquiryView">
			<v-container fluid grid-list-xl pa-0>
				<v-layout row wrap>

					<!-- inquiry details card -->
					<v-flex xs5>
						<inquiry-details-card 
						v-if="stateInquiry" 
						:openInquiry="openInquiry" 
						:inquiry="stateInquiry"> </inquiry-details-card>
					</v-flex>
					<!-- end of detils  -->

					<!-- supplier quote / bids -->
					<v-flex xs7>
						<inquiry-post-list 
						v-if="stateInquiry" 
						:openInquiry="openInquiry" 
						:inquiry="stateInquiry"></inquiry-post-list>
					</v-flex>
					<!-- supplier quote -->

				</v-layout>
			</v-container>	

		</v-card-text>
	</v-card>

</v-dialog>   


<v-snackbar
		v-model="successSnackbar"
		 color="green"
		 top
		 multi-line
		 middle
		 :timeout="6000"
		>

		Successfully Updated your Inquiry
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

import InquiryPostList from "@/views/Components/App/Buyer/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Buyer/InquiryDetailsCard"
import InquiryAwardCard from "@/views/Components/App/Buyer/InquiryAwardCard"

import inqEvntBs from "@/bus/inquiry"
// // import helpers from "@/mixins/helpers";

import inqMixin from "@/mixins/inquiry"

export default {

	mixins:[
		inqMixin,
	],

	components: {

		InquiryPostList,
		InquiryDetailsCard,
		InquiryAwardCard

	},


	data: () => ({

		title: 'Inquiry Details',
		icon: null,
		bidDialog:false,
		successSnackbar:false,
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


		// openInquiry: {
		//     get() {
		//         return this.$store.state.inq.openInquiryView;
		//     },
		//     set(nVal){
		//         if(nVal)
		//         this.$store.commit('inq/SHOW_OPENINQUIRYVIEW_M');
		//         else
		//         this.$store.commit('inq/HIDE_OPENINQUIRYVIEW_M');
		//     },
		// },

		// inquiry: {
		//     get() {
		//         return this.$store.state.inq.inquiry;
		//     },
		//     set(nVal) {
		//         // console.log('setVal');
		//         // console.log(nVal);
		//         this.$store.commit('inq/UPDATE_INQUIRY_M',{inquiry:nVal});

		//     },
		// },

	},

	methods: {

		closeOpenInquiry(){
			this.openInquiry = false;
		},

	},

	created() {

		// console.log(this.inquiry);
		inqEvntBs.$on('edited-inquiry', () => {
			this.successSnackbar = true;
		});


		// if route has inquiry id
		if(this.$route.params.inquiry_id) {
			this.$nextTick(() => {
				console.log('nextTick $route.params.inquiry_id', this.$route.params.inquiry_id);
				var inq_id = this.$route.params.inquiry_id;	
				this.showInquiry(inq_id)
				.then((data)=>{
					// console.log("data",data);
				})
				.catch((error)=>{
					console.log("error",error);
				});
			});
		}

	},

	mounted(){
		// console.log('querySelector',this.$refs);
		// console.log('querySelector',this.$refs.inquiryView);
		// console.log('querySelector',this.$el);
	}, 

	watch: {
		// '$route.params.inquiry_id' () {
		// 	console.log('$route.params.inquiry_id WATCH');
		// }
	},
}
	
</script>

<style scoped lang="scss">
.scopedcontainer a {
	text-decoration:none;
}

#test {
	position: absolute;
	margin: 30px;
	top: 0;
	height: 80%;
	width: 80%;
	box-shadow: 0px 0px 30px red;
	overflow: hidden;	
}

</style>

