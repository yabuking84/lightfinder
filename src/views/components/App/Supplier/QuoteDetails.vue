<template>
	<div>


	<template v-if="!hasBid && (inquiry.stage_id == 1004  || inquiry.stage_id == 1005)">
		<v-card>
			<v-card-title>
				<v-layout justify-center row fill-height>
						<v-flex xs12 mx-5 mt-2 mb-2>
								<div>
									<div 
									class="headline red--text font-weight-bold darken-3" 
									color="#BF4653">
										Another Supplier has won the bid.
									</div>
									<div class="red--text" >
										Please select another inquiry.
									</div>
								</div>
						</v-flex> 
				</v-layout>
			</v-card-title>
		</v-card>
	</template>

	<template v-else>
		<v-toolbar color="white darken-4" dark class="black--text" >

			<v-toolbar-title class="subheading font-weight-light" v-if="hasBid">
				Your Current Quote is <span class="font-weight-bold">${{ bid.total_price }} </span>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<!-- edit quote -->
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<v-toolbar-title @click="bidDialog=true" class="subheading font-weight-light pa-2">

					<v-btn v-if="hasBid && !inquiry.awarded" @click="openEditQuote()" class="font-weight-light" color="light-blue lighten-1" dark small >
						<i class="fas fa-edit  white--text ma-2"> </i> Edit Quote
					</v-btn>
	
					<v-btn v-else-if="!inquiry.awarded" @click="openCreateQuote()" class="font-weight-light" color="green" dark small >
						<i class="fas fa-plus  white--text ma-2"> </i> Create Quote
					</v-btn>

			</v-toolbar-title>
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<!-- edit quote -->

		</v-toolbar>

		<!-- minh-500 -->
		<v-card class="" color=" lighten-5">

			<v-divider></v-divider>

			<v-container fluid grid-list-md>
				<v-layout row wrap>















				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					
					<!-- new -->
					<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					 <template v-if="inquiry.awarded && inquiry.awarded_to_me && inquiry.stage_id==1004">
						<v-flex xs12>
							<confirm-order-card 
							:inquiry="inquiry">
							</confirm-order-card>
						</v-flex>  
						  
							<!-- <v-flex xs6>
							   <v-btn 
									@click=""
									block 
									class="red darken-2 font-weight-light ">
									<i class="fas fa-thumbs-down white--text"></i>
									<span class="ml-1 white--text font-weight-light ">Deny</span>
								</v-btn>
							</v-flex> -->
					 </template>
					<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					<!-- new -->

					<!-- BAL Confirmation -->
					<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					<template v-if="inquiry.stage_id == 10041">
			            <v-flex xs12 >
			                <v-layout row wrap>
			                    <v-flex xs12 pa-0>
			                    	
								    <v-alert
							      	:value="true"
							      	type="warning">
								      	<div class="headline font-weight-bold">BuyAnyLight Confirmation</div>
			                            <div class="" style="font-style: italic;">The awarded BID is currently being confirmed by our BuyAnyLight staff.</div>
								    </v-alert>                        
			                    </v-flex>

			                </v-layout>
			            </v-flex>
					</template>
					<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					<!-- BAL Confirmation -->
						
					<template v-if="hasBid">

						<v-flex xs12>
								<image-gallery-small :images="bid.attachments && bid.attachments.length > 0 ? bid.attachments : []" noThumbnails height="120px"></image-gallery-small> 
						</v-flex>


						<v-flex xs12>

							<v-divider></v-divider>

							<v-flex xs12>
								<h5 class="font-weight-thin">Product code</h5>
								<h2>{{ bid.product_name }}</h2>
							</v-flex>

							<v-flex xs12>
							
								<v-layout row wrap>
									<v-flex xs4 pa-2>
										<h5 class="font-weight-thin">Quantity</h5>
										<h3>{{ inquiry.quantity }} pcs</h3>
									</v-flex>
									<v-flex xs4 pa-2>
										<h5 class="font-weight-thin">Unit Price</h5>
										<h3>${{ bid.price }}</h3>
									</v-flex>
									<v-flex xs4 pa-2>
										<h5 class="font-weight-thin">Total Price</h5>
										<h3>${{ bid.total_price }}</h3>
									</v-flex>

									<v-flex xs4 pa-2 v-show="inquiry.sample_quantity">
										<h5 class="font-weight-thin">Sample Quantity</h5>
										<h3>{{ inquiry.sample_quantity }}</h3>
									</v-flex>

									<v-flex xs4 pa-2 v-show="bid.sample_cost">
										<h5 class="font-weight-thin">Sample Cost</h5>
										<h3>${{ bid.sample_cost }}</h3>
									</v-flex>

									<v-flex xs4 pa-2 v-if="bid.sample_shipment_cost">
										<h5 class="font-weight-thin">Sample Shipping Cost</h5>
										<h3>${{ bid.sample_shipment_cost }}</h3>
									</v-flex>
								</v-layout>
							</v-flex>
							<v-flex xs12>
								<h5 v-show="bid.remarks" class="font-weight-thin">Remarks</h5>
								<h4 v-show="bid.remarks" class="font-weight-bold">
								  <p>{{ bid.remarks }}</p>
								</h4>
							</v-flex>
							<v-flex xs12>
								<h5 class="font-weight-thin">Specifications</h5>
								<v-layout row wrap class="specifications  mt-2">

									<!-- <v-flex xs12 >
											<span v-for="(specification, index) in bid.specifications" :key="specification+'_'+index">
												  <v-chip label dark outline text-color="black" v-if="specification.value">
													  {{ specification.name }}: &nbsp;
													  <span class="font-weight-bold">
														{{ specification.value.split(',').join(', ') }}
													  </span>
												  </v-chip>
											</span>
									</v-flex> -->

									<template v-for="(specification, index) in bid.specifications">
										
										<v-flex
										v-if="specification.value"
										:key="specification+'_'+index"
										xs6 ma-0 pa-0 pr-0 pl-2>
											<div 
											v-if="specification.value" 
											text-color="black" 
											class="spec">
												{{ specification.name }}: &nbsp;
												<span class="font-weight-bold">
													{{ specification.value.split(',').join(', ') }}
												</span>
											</div>
										</v-flex>

									</template>

									<v-alert :value="!bid.specifications" type="info" style="width: 100%;" class="ma-4" outline>
										No specifications..
									</v-alert>
								 
								</v-layout>
							</v-flex>
							<!-- chat -->
							<!-- ccccccccccccccccccccccccccccccccccccccccccccc -->
							<v-flex xs12 mt-3>
								<messaging
								type="bid.supplier.admin"
								:bid="bid" 
								ref="'ref_'+bid.id" 
								:isFocused="isFocus(bid.id)"></messaging>
							</v-flex>
							<!-- ccccccccccccccccccccccccccccccccccccccccccccc -->
							<!-- chat -->
						</v-flex>
						<!-- message box -->
					
						<!-- message box -->
					</template>				
					
					<template v-else>
						<v-flex xs12>
							<v-layout justify-center row fill-height>

									<v-flex xs12 mx-5 mt-2 mb-2>
											<div>
												<div class="headline green--text font-weight-bold darken-3" color="#BF4653">QUOTE NOW!</div>
												<div class="blue-grey--text" >
													<b>You have not quoted yet.</b>
												</div>
											</div>
									</v-flex> 

							</v-layout>
						</v-flex>
					</template>


				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				









				</v-layout>
			</v-container>
		</v-card>

	</template>

	<quote-dialog :openQuoteDialog.sync="openQuoteDialog" :editQuote.sync="editQuote" :inquiry="inquiry" :bid="bid"></quote-dialog>

	</div>
</template>
<script>




import Messaging from "@/views/Components/App/MessagingBox"

import ConfirmOrderCard from "@/views/Components/App/Supplier/ConfirmOrderCard"

import ImageGallerySmall from "@/views/Components/App/ImageGallery"
import QuoteDialog from "@/views/Components/App/Supplier/QuoteDialog"
import inqEvntBs from "@/bus/inquiry";
import config from "@/config/main";

export default {

	props: ['inquiry'],

	components: {
		QuoteDialog,
		Messaging,
		ImageGallerySmall,
		ConfirmOrderCard,
	},





	data: () => ({

		bidDialog: false,
		openQuoteDialog: false,
		bid: {
			price: null,
			total_price: null,
			product_name: null,
			remarks: null,
			description: null,
		},
		editButton: false,
		hasBid: false,
		bidAdded: false,
		editQuote: false,
		commentData: [],


		minDate: null,


	}),

	computed: {

	},

	methods: {


		 reloadBid() {

				this.$store.dispatch('spplrInq/getInquiryBid_a', {
						inq_id: this.inquiry.id
					})
					.then((data) => {

						this.bid = (data) ? data : null;
						// check if  already has bid
						this.hasBid = (this.bid) ? true : false;
					})
					.catch((error) => {
						console.log(error);
					});

			},


			isFocus(bid_id){
				return bid_id == this.focus_bid_id;
			},

			openEditQuote() {
				this.openQuoteDialog = true;
				this.editQuote = true;
			},

			openCreateQuote() {
				this.openQuoteDialog = true;
				this.editQuote = false;
			},
	},

	watch: {

		inquiry: {

			handler(nVal, oVal) {
				this.reloadBid();
				console.log('watch inquiry');
			},

			deep: true,
		},

		openQuoteDialog(nVal, oVal) {
			  this.reloadBid();
		}

	},

	created() {

		this.reloadBid();

		inqEvntBs.onBidFormSubmitted(() => {
			this.reloadBid();
		});

	},

}
</script>
<style scoped lang="scss">
	.minh-500 {
		min-height: 300px;
		overflow-y: auto;
	}
	

</style>