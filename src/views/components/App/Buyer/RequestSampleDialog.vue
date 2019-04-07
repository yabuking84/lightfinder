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

		 <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
		 	<v-card class="pa-1 grey lighten-4">
			    <v-card-text>
			        <v-layout row wrap pa-0 mx-3>
			            <h2 class="font-weight-light"> INQUIRY# <span class="font-weight-bold">1029381212312</span></h2>
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
			                        <v-flex xs6 pa-4>
			                            <h1 class="font-weight-thick black--text subheading">Ship to</h1>
			                            <h5 class="font-weight-light black--text darken-4">Shipping from China, Beijing</h5>
			                            <v-divider></v-divider>
			                            <div class="text-xs-left mt-2">
			                                <!--   <h4 class=""> Almani Lighting L.L.C. Showroom 10, Dubai Investment Park 1,</h4>
							                        <h4 class=""> Dubai, United Arab Emirates</h4> -->
			                                <v-flex xs12 ml-2>
												<v-autocomplete
												v-model="form.shipping_country_id"
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
				                                v-model="form.shipping_address"></v-text-field>
				                            </v-flex>
				                            <v-flex xs12 ml-2>
				                                <v-text-field label="City"
				                                v-model="form.shipping_city"></v-text-field>
				                            </v-flex>
				                            <v-flex xs12 ml-2>
				                                <v-text-field 
				                                label="Zip/Postal Code"
				                                v-model="form.shipping_postal"></v-text-field>
				                            </v-flex>
			                            </div>
			                        </v-flex>
			                        <v-flex xs6 pa-4>
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
			                        </v-flex>
			                    </v-layout>
			                </v-card>
			            </v-flex>

			            <v-flex xs4 pa-1>

			                <v-card class="pa-4" elevation=3>

			                    <h1 class="font-weight-thick black--text subheading">Summary</h1>
			                    <h5 class="font-weight-light black--text darken-4">the total cost consist of the tax</h5>
			                    <v-layout row wrap pa-2>
			                        <v-divider></v-divider>
			                    </v-layout>
			                    <v-flex xs12>
			                        <v-layout row wrap mt-4>
			                            <h4 class="text-xs-left font-weight-light">Quantity</h4>
			                            <v-spacer></v-spacer>
			                            <h2 class="text-xs-right font-weight-bold">{{ this.inquiry.quantity }}</h2>
			                        </v-layout>
			                    </v-flex>
			                    <v-flex xs12>
			                        <v-layout row wrap mt-2 pa-0 mb-3>
			                            <h4 class="font-weight-light"> Unit Price</h4>
			                            <v-spacer></v-spacer>
			                            <h2 class="font-weight-bold">${{ this.bid.price }}</h2>
			                        </v-layout>
			                    </v-flex>
			                    <v-layout row wrap pa-0>
			                        <v-divider></v-divider>
			                    </v-layout>
			                    <v-flex xs12>
			                        <v-layout row wrap mt-3>
			                            <h2 class="font-weight-light">Total Price</h2>
			                            <v-spacer></v-spacer>
			                            <h1 class="font-weight-bold green--text">${{ this.bid.total_price }}</h1>
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
			                            <h5 class="font-weight-light black--text darken-4">the total cost consist of the tax ad asd asd asd asd asdassd asd asd ads aasda sda dsa sdasdasdasda</h5>
			                        </v-flex>
			                    </v-layout>
			                </v-card>
			                <v-layout row wrap mt-2>
			                    <v-flex xs12>
			                        <v-btn large :disabled="$v.$invalid" :loading="formLoading" @click="submit()" flat block class="red">
			                            <span class="ml-1 white--text font-weight-bold">Pay Now</span>
			                        </v-btn>
			                    </v-flex>
			                </v-layout>
			            </v-flex>
			        </v-layout>
			    </v-card-text>
			</v-card>
		 </v-form>


      </v-dialog>
	</div>
</template>

<script>

	import { required, email, maxLength } from 'vuelidate/lib/validators'
	import validationMixin from '@/mixins/validationMixin'
	import helpers from "@/mixins/helpers"
	import config from '@/config/index'

	import inqEvntBs from "@/bus/inquiry"
 

	export default {

	   props: ['bid', 'openSampleDialog', 'inquiry'],

	   mixins: [

	        helpers,
	        validationMixin

	    ],

	    validations: {

	    	form: {

				shipping_method_id : { required },
       			payment_method_id  : { required },
       			// shipping_date 	   : { required },
       			shipping_address   : { required },

	    	}

	    },

	    validationMessages: {



	    	form: {

	    		shipping_method_id : { required: 'Please select shipping method.' },
	   			payment_method_id  : { required: 'Please select payment method.' },
	   			// shipping_date 	   : { required: 'Please select your desire shipment date.' },
	   			shipping_address   : { required: 'Please put your shipping address' },
	    	}


	    },


		data: () => ({

      	 	shipping_methods: config.main.shipping_methods,
       		payment_methods: config.main.payment_methods,

       		form: {

       			shipping_address: null,
				shipping_city: null,
				shipping_country_id: null,
				shipping_postal: null,

       		},

       		calendar_menu: false,
       		formLoading: false,
       		odQuantity:null,
       		odUnitprice:null,
       		odTotalprice:null,

		}),


		methods: {

			changeAdd: () => {

				alert(this.bidToAward);

			},

			submit() {


					this.formLoading = true

					var payload = {
						shipping_address: this.form.shipping_address,
						shipping_city: this.form.shipping_city,
						shipping_country_id: this.form.shipping_country_id,
						shipping_postal: this.form.shipping_postal,

						bid_id: this.bid.id,
						inquiry_id: this.inquiry.id,
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