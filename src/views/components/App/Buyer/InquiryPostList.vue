<template>
  <div>
	<v-toolbar color="grey darken-4" class="white--text">
	  <v-toolbar-title class="subheading font-weight-light">Bids</v-toolbar-title>
	</v-toolbar>
	
	<v-card 
	class="pa-3">
		



		<!-- waiting for verification -->
		<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
		<v-layout v-if="verified" align-center justify-center row fill-height>

			<v-flex xs12 mx-5 mt-3 mb-3>
				 <div>
					<div class="headline font-weight-bold orange--text darken-3">WAITING FOR VERIFICATION</div>
					<div class="blue-grey--text">We have already received your inquiry, please wait for a moment for reviewing the inquiry. our staff is given care of it! chow ..
					</div>
				</div>  
			</v-flex>
		</v-layout>
		<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
		<!-- waiting for verification -->






		
		<!-- rejected inquiry -->
		<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
		<v-layout v-else-if="rejected" align-center justify-center row wrap fill-height>

			<v-flex xs12 mx-5 mt-3 mb-3>
				<div>
					<div class="headline font-weight-bold red--text darken-3">REJECTED INQUIRY</div>
					<div class="blue-grey--text">Your INQUIRY <b>#{{ inquiry.id }}</b> has been declined, please refer on the message box if you have concerns. thanks!
					</div>
				</div>

			  <v-layout row wrap justify>
				  <v-btn flat block dark large class="red darken-2" @click="EditInquiry()">
						<span class="font-weight-bold ml-1 white--text">Edit Now</span>
					</v-btn>
			  </v-layout>
			</v-flex>

			<v-flex xs12>
				<messaging 
				type="inquiry.buyer.admin"
				:inquiry="inquiry"> </messaging>
			</v-flex>
		</v-layout>
		<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
		<!-- rejected inquiry -->











		<template v-else>




			<!-- BAL Confirmation -->
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
            <v-flex xs12 v-if="inquiry.stage_id == 10041">
                <v-layout row wrap>
                    <v-flex xs12 pa-0>
                        <!-- <div class="px-4 py-4" style="border: 1px solid red;">
                            <div class="headline font-weight-bold red--text darken-3">BAL Confirmation</div>
                            <div class="blue-grey--text" style="font-style: italic;">The awarded BID is currently being confirmed by BAL staff.
                            </div>
                        </div> -->

					    <v-alert
				      	:value="true"
				      	type="warning">
					      	<div class="headline font-weight-bold">BuyAnyLight Confirmation</div>
                            <div class="" style="font-style: italic;">The awarded BID is currently being confirmed by our BuyAnyLight staff.</div>
					    </v-alert>                        
                    </v-flex>

                </v-layout>
            </v-flex>
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<!-- BAL Confirmation -->


			<!-- if has no Bids or Quotes -->
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<v-layout align-center justify-center row fill-height v-if="!bidItems.length">
					<v-flex xs12 mx-5 mt-3 mb-3>
							<div>
							  <div class="headline font-weight-bold error--text darken-3" color="#BF4653">NO QUOTE FOR NOW!</div>
							  <div class="blue-grey--text" >
								Just Wait for While, quotation are coming. thanks
							  </div>
						  </div>
					</v-flex>
			</v-layout>
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<!-- if has no Bids or Quotes -->
		   

			<!-- color="grey lighten-4"  -->
			<!-- :class="checkIfAwarded(bidItem) ? 'is_selected' : 'is_blur' "  -->
			<template v-else >
			<template v-for="(bidItem, i) in bidItems">
			<!-- v-if="checkIfAwarded(bidItem)" -->
			<v-card
			class="mb-5 ma-3"
			:hover="true" 
			:class="{
				'is_selected': checkIfAwarded(bidItem),
				'not_awarded': !checkIfAwarded(bidItem),
				'showBid': bidItem.showBid,
			}" 
			:key="'bidItem_'+i+'_'+checkIfAwarded(bidItem)">
			  
				<v-card-title >
					<v-layout row wrap>					
						<v-flex xs12 pt-2 >
							<h3>BID #{{ bidItem.id }}  
							<!-- === {{ checkIfAwarded(bidItem) }}
							=== {{ 'bidItem_'+i+'_'+checkIfAwarded(bidItem) }}
							=== {{ bidItem.showBid }}  -->

							<v-btn icon 
							v-if="!checkIfAwarded(bidItem)"
							@click="bidItem.showBid=!bidItem.showBid"
							class="showBidBtn">
								<v-icon v-if="!bidItem.showBid">fas fa-eye</v-icon>
								<v-icon v-if="bidItem.showBid">fas fa-eye-slash</v-icon>
							</v-btn>
							</h3>

							<v-img 
							v-if="bidItem.awarded"
							src="/static/images/award.png" 
							class="awardedRibbon"></v-img>

						</v-flex>
					</v-layout>
				</v-card-title>

				<v-card-text>

				<v-layout row wrap>























						<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
						<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
						<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

						<!-- <v-flex xs12 pl-2 v-if="isFocus(bidItem.id)">
							<h3 style="text-align:center;">THIS IS THE ONE!</h3>
						</v-flex> -->

						<v-flex xs12 pl-2 v-if="bidItem.attachments.length">
						<!-- <v-flex xs12 pl-2 > -->

							<image-gallery-small 
							:images="bidItem.attachments && bidItem.attachments.length > 1 ? bidItem.attachments : [] " 
							noThumbnails height="120px"></image-gallery-small> 
						  
						</v-flex>

						<v-flex xs12 >

							<v-divider v-if="bidItem.attachments.length"></v-divider>
						
							<v-layout row wrap pa-2>
								
						
								<!-- <v-flex xs12 pl-2 v-if="bidItem.awarded">						
									<v-img src="/static/images/award.png" class="awarded">
									</v-img>						
								</v-flex> -->
						
								<v-flex xs12 pt-0 pl-2>
									<h5 class="font-weight-thin">Description</h5>
									<h3>{{ bidItem.description }}</h3>
								</v-flex>
								
								<v-flex xs12>
									<v-layout row wrap>
										<v-flex xs4 pa-2>
											<h5 class="font-weight-thin">Quantity</h5>
											<h3>{{ inquiry.quantity }} pcs</h3>
										</v-flex>
						
										<v-flex xs4 pa-2>
											<h5 class="font-weight-thin">Unit Price</h5>
											<h3>${{ currency(bidItem.price,2) }}</h3>
										</v-flex>
						
										<v-flex xs4 pa-2>
											<h5 class="font-weight-thin">Total Price</h5>
											<h3>${{ currency(bidItem.total_price) }}</h3>
										</v-flex>

										<v-flex xs4 pa-2 v-show="inquiry.sample_quantity">
											<h5 class="font-weight-thin">Sample Quantity</h5>
											<h3>{{ inquiry.sample_quantity }}</h3>
										</v-flex>

										<v-flex xs4 pa-2 v-show="bidItem.sample_cost">
											<h5 class="font-weight-thin">Sample Cost</h5>
											<h3>${{ currency(bidItem.sample_cost) }}</h3>
										</v-flex>

										<v-flex xs4 pa-2 v-if="bidItem.sample_shipment_cost">
											<h5 class="font-weight-thin">Sample Shipping Cost</h5>
											<h3>${{ bidItem.sample_shipment_cost }}</h3>
										</v-flex>

									</v-layout>
								</v-flex>
						
								<v-flex xs12 pt-0>
									<h5 class="font-weight-thin">Remarks</h5>
									<h4>
										<p class="mb-0">{{ bidItem.remarks }}</p>
									</h4>
								</v-flex>

								<v-flex xs12>
								<h5 class="font-weight-bold">Specifications </h5>
								<v-layout row wrap class="specifications mt-2 mr-2">
								   
								  
									<template v-for="(specification, index) in bidItem.specifications">
						
									<v-flex 
									v-if="specification.value"
									:key="specification+'_'+index"
									xs4 ma-0 pa-0 pr-0 pl-2>
										<div                                         
										text-color="black" 
										class="spec">
											{{ specification.name }}: &nbsp;
											<span class="font-weight-bold">
												{{ specification.value.split(',').join(', ') }}
											</span>
										</div>
									</v-flex>
						
									</template>
						
						
							  <!--       <template v-for="">
									<v-flex xs6 ma-0 pa-0 pr-1>
										<div text-color="black" class="">
											Dimmable: &nbsp;
											<span class="font-weight-bold">
												TRIAC, 0-10v, DALI
											</span>
										</div>
									</v-flex>
									</template> -->
						
									<v-alert :value="!inquiry.specifications.length" type="info" style="width: 100%;" class="ma-4" outline>
										No specifications..
									</v-alert>
									
								</v-layout>
								</v-flex>
						
							</v-layout>
						</v-flex>
				


						<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
						<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
						<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->



















						   	<v-flex xs12>
							  <v-layout row wrap>
								  <v-flex xs6>
									<template v-if="!inquiry.awarded">                                                
									  	<v-btn 
									  	flat block large 
									  	class="green darken-2 " 
									  	:disabled="(inquiry.awarded)?true:false" 
									  	@click="openSample(bidItem)">
										  	<i class="fas fa-lightbulb white--text "></i>
										  	<span class="font-weight-bold ml-1 white--text ">Request Sample</span>
									  	</v-btn>
									</template>
								  </v-flex>
								  <v-flex xs6>
									<template v-if="!inquiry.awarded">                                                
									  	<v-btn 
									  	flat block dark large 
									  	:disabled="(inquiry.awarded)?true:false" 
									  	class="blue-grey darken-2" 
									  	@click="openAwardBid(bidItem)">
											<i class="fas fa-award white--text"></i>
											<span class="font-weight-bold ml-1 white--text">Award</span>
									  	</v-btn>
									</template>
								  </v-flex>
							  </v-layout>
							</v-flex>

							<v-flex xs12>
								<!-- <v-divider></v-divider> -->
								<!-- message box -->
								<messaging
								type="bid.buyer.admin"
								:bid="bidItem" 
								ref="'ref_'+bidItem.id" 
								:isFocused="isFocus(bidItem.id)">
								</messaging>
								<!-- message box -->
							</v-flex>

				</v-layout>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<h5 class="font-weight-light"> Date Bid: {{ getDateTime('mmm dd, yyyy hh:mm',bidItem.created_at)  }}</h5>
					<v-spacer></v-spacer>
				</v-card-actions>
			</v-card>
			</template>
			</template>
		</template>

	</v-card>

	<inquiry-create v-if="inquiry" :isEdit.sync="isEdit" :dialog.sync="dialog" :inquiry="inquiry"></inquiry-create>    
	<award-dialog v-if="bidToAward" :inquiry="inquiry" :openAwardDialog.sync="openAwardDialog" :bid="bidToAward"></award-dialog>
	<request-sample-dialog v-if="bidToAward" :inquiry="inquiry" :openSampleDialog.sync="openSampleDialog" :bid="bidToAward"></request-sample-dialog>

</div>
</template>
<script>

// import ImageGallerySmall from "@/views/Components/App/ImageGallerySmall"
import ImageGallerySmall from "@/views/Components/App/ImageGallery"
import InquiryCreate from "@/views/Components/App/Buyer/InquiryCreate"

import AwardDialog from "@/views/Components/App/Buyer/AwardDialog"
import RequestSampleDialog from "@/views/Components/App/Buyer/RequestSampleDialog"

import Messaging from "@/views/Components/App/MessagingBox"

// import Comment from "@/views/Components/App/Buyer/InquiryPostListComment"

import helpers from "@/mixins/helpers"
import inqEvntBs from "@/bus/inquiry"
import inqMixin from "@/mixins/inquiry"

// import VueTimers from 'vue-timers/mixin'
import config from "@/config/main"

export default {

  mixins: [
	helpers,
	// VueTimers,
  ],

  components: {

	ImageGallerySmall,
	AwardDialog,
	RequestSampleDialog,
	Messaging,
	InquiryCreate,

 

  },

  props: {

	inquiry: {

		type: Object

	},

  },
	

	data: ()=>({

		openAwardDialog: false,
		openSampleDialog: false,
		bidItems: [],
		hasBid: true,
		bidToAward: null,
		bidToRequestSample: null,
		has_awarded: true,
		isEdit:false,
		dialog:false,
		// comment Data composed of the comment useridid and inquiry
	   
		verified : false,
		rejected : false,

		inquiryImages:[],
		inquiryAttachments:[],
		inquiryOEM:[],

	}),


	// timers: [{
	// 	name: 'BidTableTimer',
	// 	time: config.polling.bidTable.time,
	// 	immediate: true,
	// 	repeat: true,
	// 	autostart: false,
	// 	callback: function() {
	// 		console.log("BidTableTimer");
	// 		this.fillBidTable();
	// 	},
	// }],
  

  	methods: {

		fillBidTable() {

			console.log('fillBidTable');

			this.checkInquiryStatus();
			this.$store.dispatch('byrInq/getAllInquiryBids_a', {
				inq_id: this.inquiry.id
			})
			.then(response => {
				this.$nextTick(() => {
				   	this.bidItems = response.map(function(bid){
				   		return {
				   			...bid,
				   			showBid:false,
				   		}
				   	});
				   	this.bidItems.sort((a, b) => {
						return a.total_price - b.total_price;
					});
				});

			})
			.catch(error => {
				console.log(error);
			});
		},

		openAwardBid(bid) {

			// console.log("openAwardBid bid",bid);
			this.bidToAward = bid;
			this.openAwardDialog = true;
		},

		openSample(bid) {
			this.bidToAward = bid;
			this.bidToRequestSample = bid;
			this.openSampleDialog = true
		},

		// for the blurring
		checkIfAwarded(bid) {

			let is_awarded = false;

			// console.log("xxxxxxxxxxxxxxxxxxxxxx");
			// console.log("bid.id",bid.id);
			// console.log("inq.awarded",this.inquiry.awarded);
			// console.log("bid.awarded",bid.awarded);
			if (this.inquiry.awarded == 1) {
				if (bid.awarded == 1)
				is_awarded = true;
			} else {
				// trick here if its not awarded yet i will set it to true
				is_awarded = true;
			}

			// console.log("is_awarded",is_awarded);
			// console.log("xxxxxxxxxxxxxxxxxxxxxx");
			return is_awarded;
		},

		EditInquiry() {

			this.dialog=true
			this.isEdit=true

		},

		checkInquiryStatus(){
			
			this.verified = (this.inquiry.stage_id == 1001)?true:false;
			this.rejected = (this.inquiry.stage_id == 1003)?true:false;

			// console.log("this.inquiry.stage_id = "+this.inquiry.stage_id);
			// console.log("this.verified = "+this.verified);
			// console.log("this.rejected = "+this.rejected);

		},

		isFocus(bid_id){
			return bid_id == this.focus_bid_id;
		},

		showBid(bid) {
			bid.showBid = !bid.showBid;
		}
	},



	created() {        
		
		this.fillBidTable();
		inqEvntBs.onBidAwarded(() => {
			this.fillBidTable();
		});
		
	},

	watch: {
		inquiry: {
			handler(nVal, oVal) {
				this.fillBidTable();
			},
			deep: true,
		},
	},


	 computed: {

		countries(){
			
			return config.countries;
		},
   
		focus_bid_id(){
			return this.$store.state.inq.bid_id;
		},

	},



}

</script>

<style scoped lang="scss">

.proposal-section {
  max-height: 80vh;
  overflow-y: auto;
}

.minh-400 {
  min-height: 400px;
}

.awardedRibbon {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 5px;
  right: 1px;
  font-size: 30px;
}

.is_selected {
    opacity: 1;
    border: 5px solid black;
}

.not_awarded {
	.v-card__text {
		display: none;
	}
}
.not_awarded.showBid {
	.v-card__text {
		display: block;
	}
}

.showBidBtn {
    position: absolute;
    top: 0;
    right: 0;	
}

</style>
