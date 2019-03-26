<template>
	<div>
	<v-dialog :value="openAwardDialog" @input="$emit('update:openAwardDialog',false)" width="1200px">
		
	     <v-toolbar dark color="grey darken-4" height="60px">
            <v-toolbar-title class="font-weight-light subheading">
           	 <i class="fas fa-award white--text"></i>
          	  Award This Supplier
        	</v-toolbar-title>
        	<v-spacer></v-spacer>
        	 <v-btn icon @click="closeDialog()">
					      <v-icon>close</v-icon>
					    </v-btn>
					 
          </v-toolbar>

	 <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">

        <v-card>
			<v-card-text>
				<v-layout row wrap>


					<v-flex xs12 pa-2 mb-3>

						   <v-alert
						   value="true"
					      color="info"
					      icon="check_circle"
					      outline
					      
					    >
					      This is a success alert.
					    </v-alert>

					</v-flex>

					<v-flex xs8 >
						<h1 class="font-weight-light subheading">Payment Information</h1>

						<v-layout row mt-4 pa-0>

							   <v-flex xs4 mt-3>
						      		<h4 class="font-weight-light">Payment Methods</h4>						  
						      </v-flex>
	
						      <v-flex xs7>

						      	<v-select
						      	  v-model="form.payment_method_id"
						          :items="payment_methods"
						          item-text="name"
								  item-value="id"
						          label="Select Payment Method"
						          :error-messages="fieldErrors('form.payment_method_id')"
                			   	   @blur="$v.form.payment_method_id.$touch()" 
						        ></v-select>

						      </v-flex>
							    
						</v-layout>  

						<v-layout row>

							   <v-flex xs4 mt-3>
						      		<h4 class="font-weight-light">Shipping Address</h4>						  
						      </v-flex>

						      <v-flex xs7>
						        <v-text-field
						        v-model="form.shipping_address"
						           label="Address"
						            :error-messages="fieldErrors('form.shipping_address')"
                			   	    @blur="$v.form.shipping_address.$touch()" 
						        ></v-text-field>
						      </v-flex>

						</v-layout>  


						<v-layout row>

							   <v-flex xs4 mt-3>
						      		<h4 class="font-weight-light">Shipping Method</h4>						  
						      </v-flex>

						      <v-flex xs7>
						           	<v-select
						           	v-model="form.shipping_method_id"
						            :items="shipping_methods"
						            :error-messages="fieldErrors('form.shipping_method_id')"
                			   	    @blur="$v.form.shipping_method_id.$touch()" 
						            item-text="name"
								  	item-value="id"
						            label="Select Shipping Method"
						            
						        	></v-select>
						      </v-flex>

						</v-layout>  


						<!-- <v-layout row>

							   	<v-flex xs4 mt-3>
						      		<h4 class="font-weight-light">Shipment Date</h4>						  
						      	</v-flex>

						     <v-flex xs7>

							<v-menu v-model="calendar_menu"  :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">

                            <v-text-field slot="activator" v-model="form.shipping_date" label="Shipment Date" prepend-icon="event" readonly></v-text-field>
                            <v-date-picker v-model="form.shipping_date" header-color="black" :min="minDate" @input="calendar_menu = false">

                            </v-date-picker>

                       		</v-menu>

						      </v-flex>

						</v-layout>   -->
					</v-flex>	
					<!-- order details -->
					<v-flex xs4>

						<h1 class="font-weight-light subheading">Order Details</h1>

						<v-divider></v-divider>

						<v-layout row wrap mt-4 >

								<v-flex xs5 >
									<h4 class="font-weight-light">Quantity</h4>						  
								</v-flex>
								
								<v-flex xs7>
								  	<h3 class="font-weight-bold">{{ this.bidinquiry.quantity  }}</h3>		
								</v-flex>

						</v-layout>

						<v-layout row wrap pa-0 mb-3>
							
								<v-flex xs5 >
									<h4 class="font-weight-light"> Unit Price</h4>						  
								</v-flex>
								
								<v-flex xs7>
								 	 <h3 class="font-weight-bold">$ {{ this.bid.price }}</h3>		
								</v-flex>

						</v-layout>

						<v-layout row wrap pa-0>
							<v-divider></v-divider>
						</v-layout>

						<v-layout row wrap pa-0>
							
								<v-flex xs5 mt-3>
									<h4 class="font-weight-light">Total Price</h4>						  
								</v-flex>
								
								<v-flex xs7 mt-3>
									  <h3 class="font-weight-bold">$ {{ this.bid.total_price }}</h3>	
								</v-flex>

						</v-layout>

						<v-layout row wrap mt-5>
							
								<v-flex xs12>
									  <v-btn :disabled="$v.$invalid" :loading="formLoading" @click="submit()" flat  block class="green">
					                	<i class="ml-1 white--text font-weight-light  far fa-check-circle white--text"></i>
					                	<span  class="ml-1 white--text font-weight-light">submit</span>
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

	   props: ['bid', 'openAwardDialog', 'bidinquiry'],

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

       			shipping_method_id : '',
       			payment_method_id  : '',
       			// shipping_date 	   : '',
       			shipping_address   : '',

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

					this.$store.dispatch('byrInq/awardBid_a', { 

						'payment_method_id'  : this.form.payment_method_id,
						'shipping_method_id' : this.form.shipping_method_id,
						// 'shipping_date'		 : this.form.shipping_date,
						'shipping_address' 	 : this.form.shipping_address,
						'bid_id'			 : this.bid.id,
						'inquiry_id'		 : this.bidinquiry.id,

					})
					.then((respose) => {

						this.formLoading = false
						this.$emit('update:openAwardDialog',false)
						inqEvntBs.emitAwardSubmitted();


					})
					.catch((e) => {

					})
					.finally(() =>  {
						this.formLoading = false;
					});

			},

			resetForm() {

				this.$refs.form.reset()
				this.$v.$reset()

			},


			fillData() {

				this.form.shipping_method_id = this.bidinquiry.shipping_method_id
				this.form.payment_method_id  = this.bidinquiry.payment_method_id
				// this.form.shipping_date 	 = this.bidinquiry.shipping_date;

				// this.odQuantity = this.bidinquiry.quantity
				// this.odUnitprice = this.bid.price
				// this.odTotalprice = this.bid.total_price

			},

			closeDialog() {

				this.$emit('update:openAwardDialog',false)

			},


		},

		watch: {

			bidinquiry: {

				handler(nVal, oVal) {
					
					this.fillData();
					
				},

				deep: true,

			},


		},

		created: function() {

			    // this.form.shipping_date = this.getDateTime();
			    // this.minDate = this.form.shipping_date;

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