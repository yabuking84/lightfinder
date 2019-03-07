<template>
	<div>
	    <v-dialog :value="dialog" 
	        @input="$emit('update:dialog', false)" 
	        scrollable 
	        max-width="25%">
	        <v-card>

		         <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">

		        	<v-toolbar height="49px" dark color="grey darken-4">
							<h1 class="font-weight-light title">Add Buyer</h1>	
						 <v-spacer></v-spacer>

					    <v-btn icon @click="Sort('desc')">
					      <v-icon>close</v-icon>
					    </v-btn>
					 
					</v-toolbar>

					<v-container>
					  	<v-flex xs12>

					  		<v-flex xs10 offset-xs1>
					  			<v-text-field  color="black"
					  			 v-model="form.firstname" 
					  			 :error-messages="fieldErrors('form.firstname')"
                			    @blur="$v.form.firstname.$touch()" 
					  			 label="First Name" required></v-text-field>  
					  		</v-flex>

					  		<v-flex xs10 offset-xs1>
					  		    <v-text-field  color="black"
					  		     v-model="form.lastname"
					  		     :error-messages="fieldErrors('form.lastname')"
                			    @blur="$v.form.lastname.$touch()" 
					  		      label="Last Name" required></v-text-field>
					  		</v-flex>


					  		<v-flex xs10 offset-xs1>
					  		    <v-text-field  color="black"
					  		     v-model="form.email"
					  		     :error-messages="fieldErrors('form.email')"
                			    @blur="$v.form.email.$touch()" 
					  		      label="Email Address" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs10 offset-xs1>

					  		    <v-text-field
					  		     v-model="form.password"
					            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
					            :type="showPassword ? 'text' : 'password'"
					            name="input-10-2"
					            :error-messages="fieldErrors('form.password')"
                			    @blur="$v.form.password.$touch()" 
					            label="Password"
					            hint="At least 8 characters"
					            @click:append="showPassword = !showPassword"
					          ></v-text-field>

					  		</v-flex>

					  		<v-flex xs10 offset-xs1>
					  		    <v-text-field  color="black"
					  		    v-model="form.job_title"
					  		    :error-messages="fieldErrors('form.job_title')"
                			    @blur="$v.form.job_title.$touch()" 
					  		     label="Job Title" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs10 offset-xs1>
					  		    <v-text-field  color="black"
					  		     v-model="form.phone"
					  		     :error-messages="fieldErrors('form.phone')"
                			    @blur="$v.form.phone.$touch()" 
					  		      label="Phone" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs10 offset-xs1>
					  		    <v-text-field  color="black"
					  		     v-model="form.fax"
					  		     :error-messages="fieldErrors('form.fax')"
                			    @blur="$v.form.fax.$touch()" 
					  		      label="Fax" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs10 offset-xs1>
					  		    <v-text-field  color="black"
					  		     v-model="form.address"
					  		     :error-messages="fieldErrors('form.address')"
                			    @blur="$v.form.address.$touch()" 
					  		      label="Address" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs10 offset-xs1>
					  		     <v-select 
					  		        v-model="form.country_id"
					  		     	:items="countries"
					  		     	item-text="name"
								  	item-value="id"
                          			:search-input.sync="search" 
                          			:error-messages="fieldErrors('form.country_id')"
	                   			    @blur="$v.form.country_id.$touch()"       
					  		     	color="black" 
					  		     	label="Country"
					  		     	data-vv-name="Country"
					  		     	required >
					  		     	</v-select>  
					  		</v-flex>

					  	</v-flex>
					</v-container>

	           		 <v-divider></v-divider>
	           
	            <v-card-actions>
	                <v-spacer></v-spacer>
	               <v-btn color="grey darken-4" dark @click="submitData()" :loading="formloading" >
	                    Submit
	                </v-btn> 
	            </v-card-actions>

			</v-form>
	        </v-card>
	    </v-dialog>
	</div>
</template>

<script>
	
	import AdminBuyerBus from "@/bus/admin-buyer";
	import helpers from "@/mixins/helpers";
	import { required, email, maxLength } from 'vuelidate/lib/validators'
	import validationMixin from '@/mixins/validationMixin'

	const dform = {

		email 	  : '',
		password  : '',
		firstname : '',
		lastname  : '',
		job_title : '',
		phone 	  : '',
		fax 	  : '',
		address   : '',
		country_id: '',

	}

	export default {

		mixins:[ validationMixin ],

		validations: {

			form: {

				email    	 : { required, email },
				password 	 : { required },
				firstname 	 : { required },
				lastname     : { required },
				job_title	 : { required },
				phone     	 : { required },
				fax 		 : { required },
				address 	 : { required },
				country_id 	 : { required },
			}

		},


		validationMessages: {

			form: {

				email     	: { required: 'Email is Required ', email: 'Email is Invalid' },
				password  	: { required: 'Password is Required' },
				firstname 	: { required: 'First Name is Required' },
				lastname  	: { required: 'Last Name is Required'},
				job_title 	: { required: 'Job Title is Required'},
				phone     	: { required: 'Phone is Required.' },
				fax     	: { required: 'fax is Required.' },
				address 	: { required: 'Address is Required '},
				country   	: { required: 'Country is Required' },
				
			}
		},

		data () {

			return {

				form: Object.assign({}, dform ),
				countries: [],
				search: '',
				formloading: false,
				showPassword: false

			}

		},

		props: {

			dialog: {
				type: Boolean,
				default: false,
			},

		},

		created: function () {

			/*
				get countries
			*/
			this.$store.dispatch('adminHelper/getCountries')
	        .then((response)=>{

				this.countries = response
	        
	        })
	        .catch((e) => {
	            console.log('Error: ')
	            console.log(e);
	        });

		},

		methods: {

			resetForm() {
				
				this.form = Object.assign({}, dform)
				this.$refs.form.reset()
				this.$v.$reset()

			},

			submitData() {

				this.formloading = true

				let data = {

					"email"			: this.form.email,
					"password" 		: this.form.password,
					"first_name"  	: this.form.firstname,
					"last_name"   	: this.form.lastname,
					"job_title"  	: this.form.job_title,
					"phone"		 	: this.form.phone,
					"fax"			: this.form.fax,
					"address"		: this.form.address,
					"country_id"	: this.form.country_id,
				};

				console.log(data);

				this.$store.dispatch('adminBuyer/postBuyer_a', {
					data:data,
				})
				.then((response) => {

					this.formloading = false
					console.log(response);

					// create a event bus 
					this.$emit('update:dialog', false);
					AdminBuyerBus.emitFormSubmitted()
					
					
				})
				.catch((e) => {
					console.log(e);
					this.formloading = false
				})
				.finally(() => {
					this.formloading = false
				})			


				// console.log(this.form);
			},


			deleteBuyer(buyer_id) {

				console.log(buyer_id)
			}




		}
	} 

</script>