<template>

		
		<v-flex xs12 pa-1>
			
			<!-- @click="viewInquiry(inquiry)" -->
			<v-card 
			class="pa-3 mx-1 my-1 tiItem"             
			:hover="true">

				<v-layout row wrap>
					<slot name="inquiry-section" :inquiry="inquiry">				
					<v-flex xs3 py-1>
						<h4 class="black--text lighten-4">Inquiry</h4>
						<h5 class="mt-0 font-weight-medium ">{{ inquiry.inq_id }}</h5>
					</v-flex>
					</slot>

					<slot name="category-section" :inquiry="inquiry">				
					<v-flex xs3 py-1>
						<h4 class="black--text">Categories</h4>
						<h5 class="mt-0 font-weight-medium ">{{ inquiry.categories }}</h5>
					</v-flex>
					</slot>

					<slot name="status-section" :inquiry="inquiry" :statuses="statuses">				
					<v-flex xs4 py-1>
						<h4 class="black--text">Status</h4>
						
						<inquiry-status-buttons 
						:status-id="inquiry.status" 
						:statuses="statuses">
							<template v-slot:statusText="sp">
								<h4 class="mt-0 font-weight-medium red--text">
									{{ sp.status.name.trim() }}
								</h4>
							</template>							
						</inquiry-status-buttons>
					</v-flex>
					</slot>

					<slot name="button-section" :inquiry="inquiry">
					<v-flex xs2 py-1 style="text-align: right;">
							<v-btn 
							@click="viewInquiry(inquiry)" 
							:loading="loading" 
							class=" v-btn--active black darken-2 font-weight-light text-decoration-none">
								<v-icon class="white--text">fas fa-search</v-icon>
								<!-- <i class="fas fa-search white--text"></i> -->
								<!-- <i class="fas fa-eye white--text"></i> -->
								<!-- <span class="ml-1 white--text font-weight-light ">View</span> -->
							</v-btn>
					</v-flex>
					</slot>
				</v-layout>


				<v-layout row wrap>
					<v-flex xs12 mt-1 px-3 py-1>
						<!-- <h4 class="font-weight-medium black--text lighten-4">Details</h4> -->
						<h5 class="mt-0 black--text font-weight-light tnt-height" :title="inquiry.message">
							{{ inquiry.message.length > 115 ?  inquiry.message.substring(0,115) + '...' : inquiry.message   }}
						</h5>
					</v-flex>
				</v-layout>

			</v-card>

		</v-flex>			
	
</template>

<script>
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";
import helpers from "@/mixins/helpers";
import inqMixin from "@/mixins/inquiry";

export default {

	mixins: [
		helpers,
		inqMixin,
	],

	components: {
		InquiryStatusButtons,
	},

	props:{
		'inquiry': {
			type:Object,
		},
		'statuses': {
			type:Array,
		},
	},

	data: function(){return{
		loading: false,
	}},


	methods: {

		viewInquiry(inq) {
			this.loading = true;
			this.showInquiry(inq.inq_id)
			.then((data)=>{
				this.loading = false;				
			});
		},


	},


};

</script>




<style scoped lang="scss">
.tnt-height {
	// height: 35px;
	height: 20px;
	overflow: hidden;
}	

.v-btn {
    min-width: 45px;
    height: 30px;	
	/deep/ .v-btn__loading {
		color:#fff;
		.v-progress-circular svg {
		    width: 70%;
		    height: 70%;			
		}
	}
}

.v-icon.fa-search {
	font-size: 15px;
}

</style>