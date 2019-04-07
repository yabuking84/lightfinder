<template>
  <div>
    <v-dialog :value="openAwardDialog" @input="$emit('update:openAwardDialog',false)" width="80%">
      <v-toolbar dark color="grey darken-4" height="60px">
        <v-toolbar-title class="font-weight-light subheading">
          <i class="fas fa-award white--text"></i>
          Awarding
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
			        <h2 class="font-weight-light"> INQUIRY# <span class="font-weight-bold"> {{ this.inquiry.id }} </span></h2>
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
			                        <!-- <h5 class="font-weight-light black--text darken-4">Shipping from China, Beijing</h5> -->
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
			                        <h5 class="font-weight-light black--text darken-4"> Product information includes  </h5>
			                        <v-divider></v-divider>
			                        <div class="text-xs-left mt-4">
			                            <v-flex xs12>
			                                <v-layout row wrap mt-2 pa-0 mb-3>
			                                    <h4 class="font-weight-light">Product Category</h4>
			                                    <v-spacer></v-spacer>
			                                    <h4 class="font-weight-bold">{{ this.inquiry.categories.join(', ') }}</h4>
			                                </v-layout>
			                                <v-layout row wrap mt-2 pa-0 mb-3>
			                                    <h4 class="font-weight-light">Seller Product Code</h4>
			                                    <v-spacer></v-spacer>
			                                    <h4 class="font-weight-bold"> {{ this.bid.product_name }} </h4>
			                                </v-layout>
			                                 <v-layout row wrap mt-2 pa-0 mb-3>
			                                    <h4 class="font-weight-light">Your Desired Price</h4>
			                                    <v-spacer></v-spacer>
			                                    <h4 class="font-weight-bold"> {{ this.inquiry.desired_price }} </h4>
			                                </v-layout>

			                            </v-flex>
			                        </div>
			                    </v-flex>
			                </v-layout>
			                <v-divider></v-divider>
			                <v-flex xs12 mt-3 px-4 py-3>
			                    <h1 class="font-weight-thick black--text subheading">Shipping Method</h1>
			                    <h5 class="font-weight-light black--text darken-4">Select your Shipping method so supplier can quote</h5>
			                    <v-select 
			                    v-model="form.shipping_method_id" 
			                    :items="shipping_methods" 
			                    :error-messages="fieldErrors('form.shipping_method_id')" 
			                    @blur="$v.form.shipping_method_id.$touch()" 
			                    item-text="name" 
			                    item-value="id" 
			                    flat 
			                    class="mt-2"></v-select>
			                </v-flex>
			            </v-card>
			        </v-flex>
			        <v-flex xs4 pa-1>
			            <v-card class="pa-4" elevation=3>
			                <h1 class="font-weight-thick black--text subheading">Summary</h1>
			                <h5 class="font-weight-light black--text darken-4">The summary consist of Quantity, Unit Price and Shipping fee.</h5>
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

			                  <v-flex xs12>
			                    <v-layout row wrap mt-2 pa-0 mb-3>
			                        <h4 class="font-weight-light"> Shipping Fee</h4>
			                        <v-spacer></v-spacer>
			                        <h5 class="font-weight-thin"> <i> Waiting for Suppliers Quote for Shipping </i> </h5>
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
			                        <v-img class="mx-5" width="60px" src="https://image.flaticon.com/icons/svg/1493/1493688.svg">
			                        </v-img>
			                    </v-flex>
			                    <v-flex xs7 mt-2 px-2>
			                        <h1 class="font-weight-thick black--text subheading"> <span class="body-2">Step 2.)</span> Wait for Confirmation</h1>
			                        <h5 class="font-weight-light black--text darken-4">Wait for the confirmation of the supplier to confirm and close the deal </h5>
			                    </v-flex>
			                </v-layout>
			                <v-layout row wrap pa-4>
			                    <v-divider></v-divider>
			                </v-layout>
			                <v-layout row wrap>
			                    <v-flex xs4>
			                        <v-img class="mx-5" width="60px" src="https://image.flaticon.com/icons/svg/1086/1086741.svg">
			                        </v-img>
			                    </v-flex>
			                    <v-flex xs7 mt-2 px-2>
			                        <h1 class="font-weight-thick black--text subheading"><span class="body-2">Step 3.)</span> Ready for Payment</h1>
			                        <h5 class="font-weight-light black--text darken-4">After the confirmation, the payment link will be activated </h5>
			                    </v-flex>
			                </v-layout>
			            </v-card>
			            <v-layout row wrap mt-2>
			                <v-flex xs12>
			                    <v-btn large :disabled="$v.$invalid" :loading="formLoading" @click="submit()" flat block class="red darken-1">
			                        <span class="ml-1 white--text font-weight-bold">Award</span>
			                        <i class="ml-1 white--text font-weight-light  far fa-check-circle white--text"></i>
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

  props: ['bid', 'openAwardDialog', 'inquiry'],

  mixins: [

    helpers,
    validationMixin

  ],

  validations: {

    form: {

      shipping_method_id: { required },

    }

  },

  validationMessages: {


    form: {

      shipping_method_id: { required: 'Please select shipping method.' },
    }


  },


  data: () => ({

    shipping_methods: [
    	// {
    	// 	id: 0,
    	// 	name: 'none',
    	// },
    	...config.main.shipping_methods,
    ],
    payment_methods: config.main.payment_methods,

    form: {

	    shipping_method_id: '',
	    shipping_address: '',
		shipping_city: '',
		shipping_country_id: '',
		shipping_postal: '',
    },

    calendar_menu: false,
    formLoading: false,
    odQuantity: null,
    odUnitprice: null,
    odTotalprice: null,
    isEditAddress: false,

  }),

 
  methods: {

    changeAdd: () => {

      alert(this.bidToAward);

    },

    submit() {

 

		this.formLoading = true
		var payload = {
			shipping_method_id: this.form.shipping_method_id,
			shipping_address: this.form.shipping_address,
			shipping_city: this.form.shipping_city,
			shipping_country_id: this.form.shipping_country_id,
			shipping_postal: this.form.shipping_postal,

			bid_id: this.bid.id,
			inquiry_id: this.inquiry.id,
		};

      	this.$store.dispatch('byrInq/awardBid_a', payload)
        .then((respose) => {

          this.formLoading = false
          this.$emit('update:openAwardDialog', false)
          inqEvntBs.emitAwardSubmitted();


        })
        .catch((e) => {

        })
        .finally(() => {
         	this.formLoading = false;
        });

    },

    resetForm() {

      this.$refs.form.reset()
      this.$v.$reset()

    },


    fillData() {


		// this.form.shipping_date 	 = this.inquiry.shipping_date;
		// this.odQuantity = this.inquiry.quantity
		// this.odUnitprice = this.bid.price
		// this.odTotalprice = this.bid.total_price

	    this.form.shipping_method_id   = null;
	    this.form.shipping_address 	   = this.inquiry.shipping_address;
		this.form.shipping_city 	   = this.inquiry.shipping_city;
		this.form.shipping_country_id  = this.inquiry.shipping_country_id;
		this.form.shipping_postal 	   = this.inquiry.shipping_postal;

		// console.log(this.inquiry);

    },

    closeDialog() {

      this.$emit('update:openAwardDialog', false)

    },

  },


    computed: {
        countries(){
            return config.countries;
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
