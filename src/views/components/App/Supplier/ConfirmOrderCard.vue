<template>

	<v-card class="pa-3">
 
				<v-alert
			  	:value="true"
			  	color="deep-orange"
			  	icon="new_releases">
				  Upon Confirming, Please make sure to include your Estimated Days of Production.
				   
			</v-alert>

				<v-layout row wrap>

					<v-flex xs6>
						<h5 class="font-weight-thin">Shipping Method</h5>
						<v-text-field 
						  :value="shipping_methods.filter(obj=>obj.id==inquiry.shipping_method_id)[0].name + ' Freight' "
						  placeholder=""
						  readonly>
						</v-text-field>
					</v-flex>

					<v-flex xs6>
						<h5 class="font-weight-thin">Estimated Days of Production</h5>
						<h4 class="font-weight-bold">
						<v-text-field   
					   	v-model="formData.production_days" 
					  	:error-messages="fieldErrors('formData.production_days')" 
					  	@blur="$v.formData.production_days.$touch()"
					  	label="Number of Days" 
					  	type="number"
					  	prepend-icon="event"></v-text-field>
					  	</h4>
					</v-flex>

 
				</v-layout>
		   

			<v-flex xs12>
				<v-btn @click="confirmQuote()" large block dark color="green">
					Confirm Order &nbsp
					<!-- <i class="fas fa-thumbs-up"></i>  -->
				</v-btn>
			</v-flex>
	</v-card>	
</template>


<script>
import { required, email, maxLength } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'
import config from "@/config/main";

import inqMixin from '@/mixins/inquiry'

 
export default {

	props:[
		'inquiry',
	],
	mixins: [
		validationMixin,
		inqMixin,
	],

	data(){return{

		shipping_methods: config.shipping_methods, 

		calendar_menu1: false,
		calendar_menu2: false,
		calendar_menu3: false,

		formData: {
			production_days:null,
		},

	}},

	validations: {

		formData: {
		  production_days: { required },
		}

	},

	validationMessages: {

		formData: {
			production_days: { required: 'Please specified your "Estimated Days of Production". ' },
		}

	},	

	methods:{

		confirmQuote() {
			// this.cnsl("confirm");

			this.$v.$touch();

		  if (this.$v.$invalid) {


		  } else {

			 	this.$store.dispatch(this.storeType+'/confirmAward_a', {
					inq_id: this.inquiry.id,
					formData: {
						confirm: 1,
						estimated_no_days: this.formData.production_days,
					},
				})
				.catch(error => {
					this.cnsl(error);
				});

				// this.$emit('update:openInquiry', false)
				this.hideInquiry();
				
		  }

		},

	},
};
</script>