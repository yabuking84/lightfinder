<template>
	<div>
	<v-dialog :value="openSampleDialog" @input="$emit('update:openSampleDialog',false)" width="1200px">
		
		 <v-toolbar dark color="grey darken-4" height="60px">
			   <v-toolbar-title class="font-weight-light subheading">
				<i class="fas fa-award white--text"></i> Request Sample
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn icon @click="closeDialog()">
				<v-icon>close</v-icon>
			</v-btn>
		 </v-toolbar>

		 <!-- <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form"></v-form> -->
			<v-card class="pa-1 grey lighten-4">
				<v-card-text>
					<v-layout row wrap pa-0 mx-3>
						<h2 class="font-weight-light"> BID# <span class="font-weight-bold">{{ bid.id }}</span></h2>
						<v-spacer></v-spacer>
						<!-- <v-btn @click="isEditAddress=true" flat small class="blue-grey darken-2">
							<i class="ml-1 font-weight-light  fas fa-edit white--text"></i>
							<span class="ml-1 white--text font-weight-light">Edit Address</span>
						</v-btn> -->
					</v-layout>
					<v-layout row wrap>
						<v-flex xs8 pa-1>
							<v-card height="100px;">
								<v-layout row wrap>
									<v-flex xs12 pa-4>
										<h1 class="font-weight-thick black--text subheading">Ship to</h1>
										<h5 class="font-weight-light black--text darken-4">Shipping from China, Beijing</h5>
										<v-divider></v-divider>
										<div class="text-xs-left mt-2">
											<!--   <h4 class=""> Almani Lighting L.L.C. Showroom 10, Dubai Investment Park 1,</h4>
													<h4 class=""> Dubai, United Arab Emirates</h4> -->
											<v-flex xs12 ml-2>
												<v-autocomplete
												v-model="form.shipping_country_id"
												:error-messages="fieldErrors('form.shipping_country_id')" 
					  							@blur="$v.form.shipping_country_id.$touch()"
												:items="countries"
												item-text="name" 
												item-value="id"
												class="mb-4"
												hide-no-data
												hide-details
												label="Countries"></v-autocomplete>
											</v-flex>
											<v-flex xs12 ml-2>
												<v-text-field 
												label="Street Address"
												v-model="form.shipping_address"
					  							@blur="$v.form.shipping_address.$touch()"
												:error-messages="fieldErrors('form.shipping_address')">
												</v-text-field>
											</v-flex>
											<v-flex xs12 ml-2>
												<v-text-field 
												label="City"
												v-model="form.shipping_city"
					  							@blur="$v.form.shipping_city.$touch()"
												:error-messages="fieldErrors('form.shipping_city')">
												</v-text-field>
											</v-flex>
											<v-flex xs12 ml-2>
												<v-text-field 
												label="Zip/Postal Code"
												v-model="form.shipping_postal"
					  							@blur="$v.form.shipping_postal.$touch()"
												:error-messages="fieldErrors('form.shipping_postal')">													
												</v-text-field>
											</v-flex>
										</div>
									</v-flex>
									<!-- <v-flex xs12 pa-0>
										<pre>{{ this.bid }}</pre>										
									</v-flex> -->
									<!-- <v-flex xs6 pa-4>
										<h1 class="font-weight-thick black--text subheading">Product Information</h1>
										<h5 class="font-weight-light black--text darken-4">Used to </h5>
										<v-divider></v-divider>
										<div class="text-xs-left mt-4">
											<v-flex xs12>
												<v-layout row wrap mt-2 pa-0 mb-3>
													<h4 class="font-weight-light">Product Category</h4>
													<v-spacer></v-spacer>
													<h4 class="font-weight-bold">LED Downlights</h4>
												</v-layout>
												<v-layout row wrap mt-2 pa-0 mb-3>
													<h4 class="font-weight-light">Product Code</h4>
													<v-spacer></v-spacer>
													<h4 class="font-weight-bold">#1029381212312</h4>
												</v-layout>
											</v-flex>
										</div>
									</v-flex> -->
								</v-layout>
							</v-card>
						</v-flex>

						<v-flex xs4 pa-1>

							<v-card class="pa-4" elevation=3>

								<h1 class="font-weight-thick black--text subheading">Summary</h1>
								<!-- <h5 class="font-weight-light black--text darken-4">the total cost consist of the tax</h5> -->
								<v-layout row wrap pa-2>
									<v-divider></v-divider>
								</v-layout>
								<v-flex xs12>
									<v-layout row wrap mt-4>
										<h4 class="text-xs-left font-weight-light">Quantity</h4>
										<v-spacer></v-spacer>
										<h2 class="text-xs-right font-weight-bold">{{ inquiry.sample_quantity }}</h2>
									</v-layout>
								</v-flex>
								<v-flex xs12>
									<v-layout row wrap mt-2 pa-0 mb-3>
										<h4 class="font-weight-light">Sample Price</h4>
										<v-spacer></v-spacer>
										<h2 class="font-weight-bold">${{ currency(bid.sample_cost) }}</h2>
									</v-layout>
								</v-flex>
								<v-flex xs12>
									<v-layout row wrap mt-2 pa-0 mb-3>
										<h4 class="font-weight-light">Shipping Price</h4>
										<v-spacer></v-spacer>
										<h2 class="font-weight-bold">${{ currency(bid.sample_shipment_cost) }}</h2>
									</v-layout>
								</v-flex>

								<v-layout row wrap pa-0>
									<v-divider></v-divider>
								</v-layout>
								<v-flex xs12>
									<v-layout row wrap mt-3>
										<h2 class="font-weight-light">Total Price</h2>
										<v-spacer></v-spacer>
										<h1 class="font-weight-bold green--text">${{ getTotal() }}</h1>
									</v-layout>
								</v-flex>
							</v-card>

							<v-card class="pa-4 mt-2" elevation=3>
								<v-layout row wrap>
									<v-flex xs4>
										<v-img class="mx-5" width="60px" src="https://image.flaticon.com/icons/svg/138/138297.svg">
										</v-img>
									</v-flex>
									<v-flex xs7 mt-2 px-2>
										<h1 class="font-weight-thick black--text subheading">Ready for Payment</h1>
										<h5 class="font-weight-light black--text darken-4"></h5>
									</v-flex>
								</v-layout>
							</v-card>
							<v-layout row wrap mt-2>
								<v-flex xs12>
									<v-btn large :loading="creditCardLoading" @click="payByCreditCard()" flat block class="red">
										<span class="ml-1 white--text font-weight-bold">Pay Now</span>
									</v-btn>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>



		<foloosi-payment 
		:reference_token="reference_token" 
		@payment-success="paymentSuccess($event)"
		@payment-failed="paymentFailed($event)">			
		</foloosi-payment>


	  </v-dialog>
	</div>
</template>

<script>

	import { required, email, maxLength } from 'vuelidate/lib/validators'
	import validationMixin from '@/mixins/validationMixin'
	// import helpers from "@/mixins/helpers"
	import config from '@/config/index'
	import { ceil } from 'lodash'

	import inqEvntBs from "@/bus/inquiry"
 
	import FoloosiPayment from "@/views/Components/App/Payment/FoloosiPayment";
	
	import inqMixin from "@/mixins/inquiry"

	export default {

		components: {
			FoloosiPayment,
		},

	   props: ['bid', 'openSampleDialog', 'inquiry'],

	   mixins: [

			// helpers,
			validationMixin,
			inqMixin,
		],

		validations: {
			form: {
				shipping_country_id : { required },
				shipping_address   : { required },
				shipping_city   : { required },
				shipping_postal   : { required },
			}
		},

		validationMessages: {
			form: {

				shipping_country_id   : { required: 'Please select country.' },
				shipping_address      : { required: 'Please put your address.' },
				shipping_city         : { required: 'Please put your city.' },
				shipping_postal       : { required: 'Please put your postal.' },
			}
		},


		data: () => ({

			shipping_methods: config.main.shipping_methods,
			payment_methods: config.main.payment_methods,

			form: {
				shipping_country_id: null,
				shipping_address: null,
				shipping_city: null,
				shipping_postal: null,
			},

			calendar_menu: false,
			odQuantity:null,
			odUnitprice:null,
			odTotalprice:null,

			// foloosi
			/////////////////////////////////////
			creditCardLoading: false,
			reference_token:'',
			/////////////////////////////////////
			// foloosi

		}),


		methods: {



			getTotal(){
				var sc = this.bid.sample_cost;
				var ssc = this.bid.sample_shipment_cost;

				sc = (sc)?sc:0;
				ssc = (ssc)?ssc:0;

				sc = parseFloat(sc);
				ssc = parseFloat(ssc);
				return this.currency(sc+ssc);
			},

			changeAdd: () => {

				alert(this.bidToAward);

			},

			payByCreditCard() {
				this.creditCardLoading = true;
				this.$v.$touch();

			  	if (this.$v.$invalid) {
					this.creditCardLoading = false;
			  	} else {		
					var payload = {
					    "id": this.bid.id,
					    "type": "lightfinder.sample",
					    "payment_method_id": 1,
					    "data": {
					        "country_id": this.form.shipping_country_id,
					        "address": this.form.shipping_address,
					        "city": this.form.shipping_city,
					        "postal": this.form.shipping_postal,
					    },
					};
					// console.log(payload);
					// console.log(localStorage.access_token);

					this.$store.dispatch(this.getStore('pymnt')+'/getSampleOrderCreditCardResource_a', payload)
					.then((response) => {
						this.reference_token = response.reference_token;
						this.creditCardLoading = false;
					})
					.catch((e) => {
						this.creditCardLoading = false;
						console.log(e);
					});


				};

			},


			resetForm() {

				this.$refs.form.reset()
				this.$v.$reset()

			},


			fillData() {

				this.form.shipping_method_id   = this.inquiry.shipping_method_id;
				this.form.shipping_address 	   = this.inquiry.shipping_address;
				this.form.shipping_city 	   = this.inquiry.shipping_city;
				this.form.shipping_country_id  = this.inquiry.shipping_country_id;
				this.form.shipping_postal 	   = this.inquiry.shipping_postal;
		
				// this.form.shipping_date 	 = this.inquiry.shipping_date;

				// this.odQuantity = this.inquiry.quantity
				// this.odUnitprice = this.bid.price
				// this.odTotalprice = this.bid.total_price

			},

			closeDialog() {
				this.$emit('update:openSampleDialog',false)
			},


			paymentSuccess(data){
				console.log('paymentDone',data);

				this.$store.dispatch(this.getStore('pymnt')+'/setPurchaseAsPaid_a',{
					transaction_id: data.transaction_no,
					"id": this.bid.id,
					type: 'lightfinder.sample',
				})
				.then((rspns)=>{
					console.log(rspns);
					this.closeDialog();
					this.closeOpenInquiry();
				})
				.catch((e)=>{

				});
			},

			paymentFailed(data){
				console.log('paymentFailed',data);
			},

			closeOpenInquiry(){
	            this.openInquiry = false;
			},
		},

		watch: {

			inquiry: {

				handler(nVal, oVal) {
					
					this.fillData();
					
				},

				deep: true,

			},


		},

		computed: {
			countries(){
				return config.countries;
			},        
		},
	
		created: function() {

				// this.form.shipping_date = this.getDateTime();
				// this.minDate = this.form.shipping_date;
					this.fillData();

		}
	}

</script>



<style scoped lang="">

	.v-messages {
		-webkit-box-flex: 1 !important;
		-ms-flex: 1 1 auto !important;
		flex: 1 1 auto !important;
		font-size: 12px !important;
		min-height: 0px !important;
		min-width: 1px !important;
		position: relative !important;
	}

</style>