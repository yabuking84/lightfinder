<template>

	<div>

		<v-toolbar color="grey darken-4" class="white--text" height="60px">
			<v-toolbar-title class="subheading font-weight-light">Bids</v-toolbar-title>
		</v-toolbar>

		<v-card color="grey lighten-5">












			
			<!-- waiting for verification -->
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<v-flex xs12 v-if="inquiry.stage_id == 1001">

				<v-layout justify-center row fill-height>

					<v-flex xs12 mx-5 mt-3 mb-3>

						<div>
							<div class="headline font-weight-bold orange--text darken-3">WAITING FOR VERIFICATION</div>
							<div class="blue-grey--text" >We have already received your inquiry, please wait for a moment for reviewing the inquiry. our staff is given care of it! chow ..
							</div>
						</div>
					</v-flex>

				</v-layout>

				<v-layout row wrap pa-0 v-if="inquiry.stage_id == 1001">
					<v-flex xs6>
						<v-btn 
						@click="approvedInquiry(inquiry.id)" 
						block class="green darken-1 large font-weight-light ">
							<i class="fas fa-thumbs-up white--text"></i>
							<span class="ml-1 white--text font-weight-light ">Approved</span>
						</v-btn>
					</v-flex>
					<v-flex xs6>
						<v-btn 
						@click="rejectInquiry(inquiry.id)" 
						block 
						class="red darken-2 large font-weight-light ">
							<i class="fas fa-thumbs-down white--text"></i>
							<span class="ml-1 white--text font-weight-light ">Reject</span>
						</v-btn>
					</v-flex>
				</v-layout>
			</v-flex>
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<!-- waiting for verification -->






			<!-- rejected inquiry -->
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<v-flex xs12 v-else-if="inquiry.stage_id == 1003">

				<v-layout row wrap>

						<v-flex xs12 mx-5 mt-3 >

								<div>
									<div class="headline font-weight-bold red--text darken-3">REJECTED INQUIRY</div>
									<div class="blue-grey--text" style="font-style: italic;">the INQUIRY <b>#{{ inquiry.id }}</b> is decline by our verifier, please refer on the message box if you have concerns. thanks!
									</div>
								</div>

						</v-flex>

						<v-flex xs12 mx-5>

							<v-btn @click="approvedInquiry(inquiry.id)" block class="grey darken-4 large font-weight-light ">
								<span class="ml-1 white--text font-weight-light ">Approved</span>
							</v-btn>

						</v-flex>

					<v-flex xs12>

						<v-layout row wrap>                         

							<!-- if rejected -->
							<v-flex xs12>
								<messaging type="inquiry.buyer.admin" :inquiry="inquiry"> </messaging>
							</v-flex>

						</v-layout>
						<!-- <comment-box :commentData="commentData" :biditem="inquiry.id"> </comment-box> -->
						
					</v-flex>

				</v-layout>
			</v-flex>
			<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
			<!-- rejected inquiry -->










			<v-card-text v-else>
				
		
				<!-- if not bids / quotes -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<v-layout 
				v-if="!bidItems.length"
				justify-center row fill-height>
					<v-flex xs12 mx-5 mt-3 mb-3>
							<div>
								<div class="headline font-weight-bold darken-3" color="#BF4653">NO QUOTE FOR NOW!</div>
								<div class="blue-grey--text">INQUIRY <b>#{{ inquiry.id }}</b>
								</div>

							</div>
					</v-flex>
				</v-layout>
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- if not bids / quotes -->






			
				<template v-else>


				
				<!-- Approvingbank transfer -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<v-layout 
				v-if="inquiry.stage_id == 1006"
				row wrap align-center justify-center mb-5>
					<v-flex>
							<v-alert
							:value="true"
							type="success"
							class="py-3"
							icon="far fa-check-circle">
								<h3 
								style="text-align: left;" 
								class="ml-1 white--text font-weight-thin">
									Confirm Inquiry # 
									<strong class="font-weight-bold" style="text-decoration: underline;">{{ inquiry.id }}</strong> 
									Bank Transfer Payment
								</h3>
								<div class="font-weight-thin">
									Please double check before clicking the confirm button!
								</div>
							</v-alert>	
					</v-flex>

						<v-btn 
						color="error"
						@click="approveBankTransfer(inquiry.id)">
							Bank Transfer Payment Confirmed!
						</v-btn>
				</v-layout>
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- Approvingbank transfer -->
					
				
				<!-- BAL Confirmation -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<v-layout row wrap mb-5 v-if="inquiry.stage_id == 10041">
				<v-flex xs12 >

					<v-layout row wrap>

						<v-flex xs12 ma-1 >                        
							<v-alert
							:value="true"
							type="warning">
								<div class="headline font-weight-bold">BuyAnyLight Confirmation</div>
								<div class="" style="font-style: italic;">
									Refer to the awarded BID below.
								</div>
							</v-alert>
						</v-flex>

						<v-flex xs12 pl-5>
							<v-layout column wrap align-start >
								<h3>Supplier's Estimated Production Time: </h3>
								<h1>{{ inquiry.estimated_no_days }} Days</h1>
							</v-layout>
						</v-flex>

						<v-flex xs6>
							<!-- <h4>Shipping Date</h4> -->
							<v-menu
							v-model="sd_menu" 
							:close-on-content-click="false" 
							:nudge-right="40" 
							lazy 
							transition="scale-transition"
							offset-y full-width min-width="290px" class="">
								<template v-slot:activator="{on}">								
									<v-text-field   
									v-model="formData.shipping_date" 
									:error-messages="fieldErrors('formData.shipping_date')" 
									@blur="$v.formData.shipping_date.$touch()"
									v-on="on"
									label="Shipping Date" 
									prepend-icon="event" 
									readonly></v-text-field>
								</template>

								<v-date-picker 
								header-color="black" 
								:min="minDate"
								:value="(formData.shipping_date)?formData.shipping_date:minDate"
								@input="sd_menu = false; formData.shipping_date=$event">								
								</v-date-picker>
							</v-menu>
						</v-flex>


						<v-flex xs6>
							<!-- <h4>Shipping Cost</h4> -->
							<v-text-field   
							v-model="formData.shipping_cost" 
							:error-messages="fieldErrors('formData.shipping_cost')" 
							@blur="$v.formData.shipping_cost.$touch()"
							label="Shipping Cost" 						  	
							prepend-icon="fas fa-dollar-sign"></v-text-field>
						</v-flex>

			   

						<v-flex xs6>
							<!-- <h4>Estimated Time of Arrival</h4> -->
							<v-menu
							v-model="eta_menu" 
							:close-on-content-click="false" 
							:nudge-right="40" 
							lazy 
							transition="scale-transition"
							offset-y full-width min-width="290px" class="">
								<template v-slot:activator="{on}">								
									<v-text-field   
									v-model="formData.eta" 
									:error-messages="fieldErrors('formData.eta')" 
									@blur="$v.formData.eta.$touch()"
									v-on="on"
									label="Estimated Time of Arrival" 
									prepend-icon="event" 
									readonly></v-text-field>
								</template>

								<v-date-picker 
								header-color="black" 
								:min="minDate"
								:value="(formData.eta)?formData.eta:minDate"
								@input="eta_menu = false; formData.eta=$event">								
								</v-date-picker>
							</v-menu>
						</v-flex>

						<v-flex xs6>
							<!-- <h4>Estimated Time of Delivery</h4> -->
							<v-menu
							v-model="etd_menu" 
							:close-on-content-click="false" 
							:nudge-right="40" 
							lazy 
							transition="scale-transition"
							offset-y full-width min-width="290px" class="">
								<template v-slot:activator="{on}">								
									<v-text-field   
									v-model="formData.etd" 
									:error-messages="fieldErrors('formData.etd')" 
									@blur="$v.formData.etd.$touch()"
									v-on="on"
									label="Estimated Time of Delivery" 
									prepend-icon="event" 
									readonly></v-text-field>
								</template>

								<v-date-picker 
								header-color="black" 
								:min="minDate"
								:value="(formData.etd)?formData.etd:minDate"
								@input="etd_menu = false; formData.etd=$event">								
								</v-date-picker>
							</v-menu>
						</v-flex>


						<v-flex xs12 ma-3>
							<v-layout row wrap align-center justify-end>
								<v-btn
								@click="confirmBid()"
								color="success"
								class="large font-weight-light">
									<h3 class="ml-1 white--text font-weight-light">confirm BID</h3>
								</v-btn>
							</v-layout>
						</v-flex>         

					</v-layout>
				</v-flex>
				</v-layout>
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- BAL Confirmation -->


		
				<!-- Confirming Buyer Payment -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<v-layout 
				v-if="inquiry.stage_id==1005"
				justify-center row fill-height>
					<v-flex xs12 my-0 mt-0 mb-3>
						<v-alert
						:value="true"
						color="success"
						icon="check_circle">						

							<div class="headline font-weight-bold">Confirming Buyer Payment</div>
							<div class="" style="font-style: italic;">This order is in production.</div>

						</v-alert>
					</v-flex>
				</v-layout>
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- Confirming Buyer Payment -->
			




				<!-- Production -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
	            <v-flex xs12 v-if="inquiry.stage_id == 2001">
	                <v-layout row wrap>
	                    <v-flex xs12 pa-0 mb-3>
						    <v-alert
					      	:value="true"
					      	type="success">
						      	<div class="headline font-weight-bold">In Production</div>
	                            <div class="" style="font-style: italic;">The order is in production.</div>
								<table class="amountBreakdown mt-3 ">
									<!-- <tr><td><pre>{{ bidItem }}</pre></td></tr> -->
									<tr>
										<td class="pr-4">Inquiry Amount:</td>
										<td>$ {{ currency(inquiryAmount) }}</td>
									</tr>
									<tr>
										<td class="pr-4">Shipping Cost:</td>
										<td>$ {{ currency(inquiry.shipping_cost) }}</td>
									</tr>
									<tr>
										<td colspan="2">
											<v-divider style="border-color: #fff;"></v-divider>
										</td>
									</tr>
									<tr class="totalRow">
										<td class="pr-4">Total Amount to Pay:</td>
										<td>$ {{ currency(inquiryAmount+inquiry.shipping_cost) }}</td>
									</tr>
								</table>

	                            
						    </v-alert>                        
	                    </v-flex>

	                </v-layout>
	            </v-flex>
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- Production -->
				

				<v-card 
				class="mb-3" 
				:hover="true" 
				:class="{
					'is_selected': checkIfAwarded(bidItem),
					'not_awarded': !checkIfAwarded(bidItem),
					'showBid': bidItem.showBid,
				}"                 
				v-for="(bidItem, i) in bidItems" 
				:key="'bidItem_'+i">











					
					<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
					<v-card-title>
						<v-layout row wrap pa-2>

							<v-flex xs12 pa-0>
								<h3>
									BID #{{ bidItem.id }}

									<v-btn icon 
									v-if="!checkIfAwarded(bidItem)"
									@click="bidItem.showBid=!bidItem.showBid"
									class="showBidBtn">
										<v-icon v-if="!bidItem.showBid">fas fa-eye</v-icon>
										<v-icon v-if="bidItem.showBid">fas fa-eye-slash</v-icon>
									</v-btn>
								</h3>

								<v-img v-if="bidItem.awarded" 
								src="/static/images/award.png" 
								class="awardedRibbon"></v-img>


							</v-flex>
						</v-layout>
					  
					</v-card-title>


					<v-card-text>
						
						<div v-if="bidItem.active == 0">
							<v-btn 
							class="green darken-4"
							@click="approvedBid(bidItem)" 
							large flat block>
								<span class="mr-1 white--text font-weight-bold">Approved Bid</span>
								<i class="ml-1 white--text font-weight-light  far fa-check-circle white--text"></i>
							</v-btn>	
						</div>
						 
					
						<v-layout row wrap pa-2>

							<v-flex xs12 v-if="bidItem.attachments.length">
									<image-gallery-small :images="bidItem.attachments" noThumbnails height="120px"></image-gallery-small> 
							</v-flex>

							<v-flex xs12>
								
								<v-divider v-if="bidItem.attachments.length"></v-divider>


							<!--         <pre>
								{{ bidItem }}
							</pre> -->


								<v-layout row wrap>

									<v-flex xs6 >
										<h5 class="font-weight-thin">Brand Name</h5>
										<h2>{{ bidItem.supplier.brand_name }}</h2>
									</v-flex>

									<v-flex xs6 >
										<h5 class="font-weight-thin">Owner name</h5>
										<h2>{{ bidItem.supplier.first_name }} {{ bidItem.supplier.last_name }}</h2>
									</v-flex>

									<v-flex xs6 >

										<h5 class="font-weight-thin">Product name</h5>
										<h2>{{ bidItem.product_name }}</h2>
									</v-flex>

									<v-flex xs6>
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
												<h3>${{ currency(bidItem.price) }}</h3>
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
												<h3>${{ currency(bidItem.sample_shipment_cost) }}</h3>
											</v-flex>

										</v-layout>
									</v-flex>

									<v-flex xs12 pt-0>
										<h5 class="font-weight-thin">Remarks</h5>
										<h4>
													<p class="mb-0">{{ bidItem.remarks }}</p>
												</h4>
									</v-flex>

									<!-- <v-flex xs12 mx-5 mt-2 mb-2 pt-0>
										<h5 class="font-weight-thin">Specifications</h5>
										<v-layout row wrap class="specifications">
											<v-chip label dark outline text-color="black" 
											v-for="(specification, index) in bidItem.specifications" 
											:key="specification+'_'+index">
												{{ specification.name }}: &nbsp;
												<span class="font-weight-bold">
													{{ (specification.value)?specification.value.split(',').join(', '):'' }}
												</span>
											</v-chip>
											<v-alert :value="!inquiry.specifications.length" type="warning" style="width: 100%;" class="ma-4" outline>
												No specifications..
											</v-alert>
										</v-layout>
									</v-flex> -->

									<v-flex xs12>
									<h5 class="font-weight-thin">Specifications </h5>
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


									<v-flex xs12 mt-3 mb-0 pb-0>
										<template v-if="bidItem.stage_id==2001">
										    <v-layout row wrap>
										    	<v-flex>
												    <v-alert
											      	:value="true"
											      	icon="fas fa-industry"
											      	color="error">
													  	<h4>Sample Order in Production</h4>
											      	</v-alert>
										    	</v-flex>
										    	<v-flex xs6>
													
										    	</v-flex>
										    </v-layout>
										</template>
										<template v-if="bidItem.stage_id==20011">
										    <v-layout row wrap>
										    	<v-flex>
												    <v-alert
											      	:value="true"
											      	icon="fas fa-exclamation-circle alert1"
											      	color="error">
													  	<span class="mr-4 title">													  	
													  		Sample Order Production done
														</span>
													  	<v-btn
													  	:loading="setSampleAsShippedBtn"
														@click="setSampleAsShipped(inquiry,bidItem)" 
														class="green darken-2 ml-0">
															<span class="font-weight-bold ml-1 white--text ">
																Set Sample as Shipped
															</span>
														</v-btn>
											      	</v-alert>
										    	</v-flex>
										    	<v-flex xs6>
													
										    	</v-flex>
										    </v-layout>
										</template>
										<template v-else-if="bidItem.stage_id==2002">																				
										    <v-alert
									      	:value="true"
									      	icon="fas fa-shipping-fast"
									      	color="success">
											  		Sample Order Sent
									      	</v-alert>
										</template>
										<template v-else-if="bidItem.stage_id==3001">
										    <v-alert
									      	:value="true"
									      	icon="fas fa-check-circle"
									      	color="success">
											  		Sample Order Received
									      	</v-alert>										
										</template>
									</v-flex>


									<v-flex xs12>
										<div style="padding: 0px; background-color: rgb(0, 200, 83);">
											<v-btn 
											@click="bidItem.showByrMsgs=!bidItem.showByrMsgs" 
											block dark 
											color="success">
												<template v-if="!bidItem.showByrMsgs">
													<v-icon class="mr-2">far fa-envelope-open</v-icon> 
													Show Buyer Messages
												</template>
												<template v-else>													
													<v-icon class="mr-2">far fa-envelope</v-icon> 
													Hide Buyer Messages
												</template>
											</v-btn>
											<v-expand-transition>
												<messaging 
												style="padding: 0px;"
												v-if="bidItem.showByrMsgs" 
												type="bid.buyer.admin" 
												:bid="bidItem">
												</messaging>

											</v-expand-transition>
										</div>		                                
									</v-flex>

									
									<v-flex xs12 pt-0>										
										<div style="padding: 0px; background-color: #ffd48b;">
											<v-btn 
											@click="bidItem.showSpplrMsgs=!bidItem.showSpplrMsgs" 
											block dark 
											color="warning">
												<template v-if="!bidItem.showSpplrMsgs">
													<v-icon class="mr-2">far fa-envelope-open</v-icon> 
													Show Supplier Messages
												</template>
												<template v-else>													
													<v-icon class="mr-2">far fa-envelope</v-icon> 
													Hide Supplier Messages
												</template>
											</v-btn>
											<v-expand-transition>
												<messaging
												style="padding: 0px;"
												v-if="bidItem.showSpplrMsgs"
												type="bid.supplier.admin" 
												:bid="bidItem"> 
												</messaging>
											</v-expand-transition>
										</div>
									</v-flex>

								</v-layout>

							</v-flex>



						</v-layout>
			

					</v-card-text>
					<v-divider></v-divider>

					<v-card-actions>
						<h5 class="font-weight-light ml-2"> Date Bid: {{ getDateTime('mmm dd, yyyy hh:mm',bidItem.created_at)  }}</h5>
						<v-spacer></v-spacer>
					</v-card-actions>

				</v-card>
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->










				</template>

			</v-card-text>


		</v-card>

		<!-- <message-box :commentData="commentData" :openMessageDialog.sync="openMessageDialog" :inquiry="inquiry"> </message-box> -->

	</div>

</template>

<script>

import ImageGallerySmall from "@/views/Components/App/ImageGallery"
import Messaging from "@/views/Components/App/MessagingBox"

import helpers from "@/mixins/helpers";
import inqMixin from "@/mixins/inquiry";

import inqEvntBs from "@/bus/inquiry"

import config from "@/config/main"

import { required, email, maxLength, numeric, decimal } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

export default {

	mixins: [
		helpers,
		validationMixin,
		inqMixin,
	],

	components: {
		ImageGallerySmall,
		Messaging,
	},


	props: [
		'inquiry', 
		'isClosed',
	],




	data() {return {

		openAwardDialog: false,
		bidItems: [],
		hasBid: true,
		bidToAward: null,
		bidinquiry: null,
		has_awarded: true,
		commentData: [],
		openMessageDialog: false,
		bidImages:[],

		showSpplrMsgs: false,

		sd_menu: false,
		eta_menu: false,
		etd_menu: false,


		formData: {
			eta:null,
			etd:null,
			shipping_date:null,
			shipping_cost:null,
		},

		setSampleAsShippedBtn:false,

	}},

	validations: {
		formData: {
		  shipping_date: { required },
		  shipping_cost: { required,decimal },
		  eta: { required },
		  etd: { required },
		}
	},


	validationMessages: {
		formData: {
			shipping_cost: { 
				required: 'Please include your Shipping Cost. ',
				decimal: 'must be numeric. ',
			},
			shipping_date: { required: 'Please specify your Shipping Date. ' },
			eta: { required: "Please specify your ETA." },
			etd: { required: "Please specify your ETD." },
		}
	},	

	watch: {
		inquiry: {
			handler(nVal, oVal) {
				this.fillBidTable();
			},
			deep: true,
		}
	},


	methods: {


			fillBidTable() {
				this.bidItems=[];
				this.$store.dispatch(this.getStore()+'/getAllInquiryBids_a', {
					inq_id: this.inquiry.id
				})
				.then(response => {
					this.$nextTick(() => {
						this.bidItems = response.map(bidItem=>({
							...bidItem,
							showSpplrMsgs: false,
							showByrMsgs: false,
							showBid:false,
						}));

						this.bidItems.sort((a, b) => {
							return a.total_price - b.total_price;
						});
					});
				})

			},

			approvedInquiry(inquiry_id) {

				this.$store.dispatch(this.getStore()+'/approvedInquiry_a', {
					inquiry_id: inquiry_id
				})
				.then((response) => {

					// create a event bus 
					// this.$emit('update:isClosed', true);
					this.hideInquiry();

					inqEvntBs.emitApproved();

				})
				.catch((e) => {
					  console.log(e);
					  // this.$emit('update:isClosed', true);
					  this.hideInquiry();
				})
				.finally(() => {
					// this.$emit('update:isClosed', true);
					  this.hideInquiry();

				});
			},

			rejectInquiry(inquiry_id) {

				// console.log('--------------tae-----------------')
				// this.openMessageDialog = true
				// console.log('--------------tae-----------------')


				console.log(inquiry_id);
				this.$store.dispatch(this.getStore()+'/declinedInquiry_a', {
						inquiry_id: inquiry_id
					})
					.then((response) => {
						// create a event bus 
						this.openMessageDialog = true
							// this.$emit('update:isClosed', true);
						inqEvntBs.emitApproved();

					})
					.catch((e) => {
						this.$emit('update:isClosed', true);
						console.log(e);
					})
					.finally(() => {

					});

			},


			approvedBid(bidItem) {

				this.$store.dispatch(this.getStore()+'/approvedBid_a', {
					inquiry_id: this.inquiry.id,
					bid_id: bidItem.id
				})
				.then((response) => {
					bidItem.active = 1
				})
				.catch((e) => {
					console.log(e);
				})
				.finally(() => {

				});

			},
			
			setSampleAsShipped(inquiry,bid){
				var payload = {
					inq_id: inquiry.id,
					bid_id: bid.id,
					stage_id: 2002,
				};
				this.setSampleAsShippedBtn = true;

				this.cnsl('payload',payload);

				// 1556169091285
				this.$store.dispatch(this.getStore()+'/setSampleStage_a',payload)
				.then((rspns)=>{
					this.fillBidTable();
					this.setSampleAsShippedBtn = false;
					this.cnsl(rspns);
				})
				.catch((e)=>{
					this.fillBidTable();
					this.setSampleAsShippedBtn = false;
					this.cnsl(e);
				});
			},


		    approveBankTransfer(inquiry_id) {

		      	this.$store.dispatch('admnInq/confirmBankTransfer_a', {
		          inquiry_id: inquiry_id
		        })
		        .then((response) => {
		          // create a event bus 
		          // this.$emit('update:isClosed', true);
		             this.hideInquiry();
		          // inqEvntBs.emitApproved();
		        })
		        .catch((e) => {
		          // this.$emit('update:isClosed', true);
		             this.hideInquiry();

		          this.cnsl(e);
		        })
		        .finally(() => {

		        });
		    },


			confirmBid() {

				if (this.$v.$invalid) {
					this.$v.$touch()
				} else {
					this.$store.dispatch(this.getStore()+'/confirmBid_a', {
						inquiry_id: this.inquiry.id,
						formData: this.formData,
					})
					.then((response) => {
						this.hideInquiry();
					})
					.catch((e) => {
						console.log(e);
					});
				}
			},

			// for the blurring
			checkIfAwarded: function(bidItem) {
				var awarded = bidItem.awarded;
				let is_awarded = false;
				// console.log(this.inquiry)
				if (this.inquiry.awarded == 1) {
					if (awarded == 1) {
						is_awarded = true;
					}
				} else {
					// trick here if its not awarded yet i will set it to true
					is_awarded = true;
				}

				return is_awarded;
			},


			sortImage: function(attachments) {
				console.log(attachments);
			},

	},

	created() {

		// console.log(this.inquiry)

		this.fillBidTable();
		inqEvntBs.onBidAwarded(() => {
			this.fillBidTable();
		});

	},

	computed:{
		inquiryAmount(){
			var retVal = 0;
			
			this.cnsl('this.bidItems',this.bidItems);
			this.bidItems.forEach((bid)=>{				
				if(bid.active && bid.awarded) {
					retVal=bid.total_price;					
				}
			});

			return retVal;
		},

		minDate(){
			return new Date().toISOString().substr(0, 10);
		},

	},

	watch:{
		inquiry: {
			handler(nVal, oVal) {
				this.fillBidTable();
			},
			deep: true,
		},
	},

}
</script>

<style scoped lang="scss">
.specifications {
	.v-chip {
		width: 180px;
	}
}

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
	right: 0px;
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
.amountBreakdown {
	width: 100%;
	td {
		text-align: left;
		font-size: 1em;
	}
	.totalRow {
		td {
			font-size: 1.2em;
			font-weight: bold;
		}
	}
}
// transition
// ttttttttttttttttttttttttttttttttttttttttttttttttttttt
.fade-enter {
	opacity:0;
}
.fade-enter-active {
	transition: opacity 2s;
}
.fade-leave {

}
.fade-leave-active {
	transition: opacity 1s;	
	opacity:0;
}
// ttttttttttttttttttttttttttttttttttttttttttttttttttttt
// transition

</style>