<template>
	<div>
	    <v-dialog :value="dialog" 
	        @input="$emit('update:dialog', false)" 
	        scrollable 
	        max-width="50%">
	        <v-card>

		          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">

		        	<v-toolbar height="49px" dark color="grey darken-4">
							<h1 class="font-weight-light title">Add Supplier</h1>	
						 <v-spacer></v-spacer>
					    <v-btn icon @click="Sort('desc')">
					      <v-icon>sort</v-icon>
					    </v-btn>
					    <v-btn icon @click="Refresh('refresh')">
					      <v-icon>refresh</v-icon>
					    </v-btn>
					</v-toolbar>


					<v-layout row wrap mt-4>
						<v-flex xs6>

					  		<v-flex xs9 offset-xs1>
					  			<v-text-field color="black"
					  			v-model="form.brand_name" 
					  			:error-messages="fieldErrors('form.brand_name')"
                			    @blur="$v.form.brand_name.$touch()" 
					  			label="Brand Name" required></v-text-field>  
					  		</v-flex>

					  		<v-flex xs9 offset-xs1>
					  		    <v-text-field  color="black" 
					  		    v-model="form.factory_name" 
					  		   :error-messages="fieldErrors('form.factory_name')"
                			    @blur="$v.form.factory_name.$touch()" 
					  		    label="Factory Name" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs9 offset-xs1>
					  		    <v-text-field  
					  		    color="black" 
					  		    v-model="form.address"
					  		    :error-messages="fieldErrors('form.address')"
                			    @blur="$v.form.address.$touch()" 
					  		     label="Address" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs9 offset-xs1>

							<v-layout row wrap>
					  	  		<v-flex xs6 pr-1>
					  	  		   <v-select color="black" 
					  	  		    v-model="form.country" 
					  	  		    :items="countries"
					  	  		    :search-input.sync="search"
					  	  		    cache-items
					  	  		    item-text="name"
								  	item-value="id"
	   					  		    :error-messages="fieldErrors('form.country')"
	                   			    @blur="$v.form.country.$touch()" 
					  	  		    label="Country" 
					  	  		    data-vv-name="Country" required ></v-select>  
								</v-flex>	

								<v-flex xs6>
									    <v-text-field   color="black"
 									 	 v-model="form.no_employee"
						  	  			 :error-messages="fieldErrors('form.no_employee')"
	                   			 		 @blur="$v.form.no_employee.$touch()"
						  	  		    label="No. of Employee" required></v-text-field>   
								</v-flex>	
							</v-layout>

					  		</v-flex>

					  		<v-flex xs9 offset-xs1>
					  		     <v-textarea color="black" 
					  		      v-model="form.company_description"
					  		      :error-messages="fieldErrors('form.company_description')"
	                   			  @blur="$v.form.company_description.$touch()" 
					  		      name="input-7-4" label="Company Description" value="" ></v-textarea>
					  		</v-flex>
					  	</v-flex>

					  	<v-flex xs6>
					  	  		<v-flex xs9 offset-xs1>
								<v-layout row wrap>

						  	  		<v-flex xs6 pr-1>
						  	  		  <v-text-field   color="black"
 									 	 v-model="form.owner_firstname"
						  	  			 :error-messages="fieldErrors('form.owner_firstname')"
	                   			 		 @blur="$v.form.owner_firstname.$touch()"
						  	  		    label="Owner First Name" required></v-text-field>  
									</v-flex>	

									<v-flex xs6>
										<v-text-field 
										v-model="form.owner_lastname"
										:error-messages="fieldErrors('form.owner_lastname')"
	                   			 		@blur="$v.form.owner_lastname.$touch()"
	                   			 		color="black" label="Owner Last Name" required></v-text-field>  
									</v-flex>	

								</v-layout>
					  			</v-flex>

					  		  	 <v-flex xs9 offset-xs1>
					  		    	<v-text-field 
					  		    	v-model="form.contact_person"
					  		    	:error-messages="fieldErrors('form.contact_person')"
	                   			 	@blur="$v.form.contact_person.$touch()"
					  		    	 color="black" label="Contact Person" required></v-text-field>
					  			</v-flex>
					  			 <v-flex xs9 offset-xs1>
					  		    	<v-text-field 
					  		    	v-model="form.email"
					  		    	:error-messages="fieldErrors('form.email')"
					  		    	@blur="$v.form.email.$touch()"
					  		    	 color="black" label="Email" required></v-text-field>
					  			</v-flex>
					  			 <v-flex xs9 offset-xs1>
					  		    	<v-text-field  
					  		    	v-model="form.job_title"
					  		    	:error-messages="fieldErrors('form.job_title')"
					  		    	@blur="$v.form.job_title.$touch()"
					  		    	 color="black" label="Job Title" required></v-text-field>
					  			</v-flex>
					  			<v-flex xs9 offset-xs1>
					  		    	<v-text-field 
					  		    	v-model="form.phone"
					  		    	:error-messages="fieldErrors('form.phone')"
					  		    	@blur="$v.form.phone.$touch()"
					  		    	 color="black"
					  		    	  label="Telephone Number" required></v-text-field>
					  			</v-flex>
					  			<v-flex xs9 offset-xs1>
					  		    	<v-text-field 
					  		    	v-model="form.fax"
					  		    	:error-messages="fieldErrors('form.fax')"
					  		    	@blur="$v.form.fax.$touch()"
					  		    	 color="black" label="Fax" required></v-text-field>
					  			</v-flex>
					  	</v-flex>
					</v-layout>

	           		 <v-divider></v-divider>

		             <v-card-actions>
			                <v-spacer></v-spacer>
			               <v-btn color="grey darken-4" dark @click="submit()" :loading="formloading">
			                    Submit
			                </v-btn> 
			             </v-card-actions>
			            </v-form>
			        </v-card>


	    </v-dialog>
	</div>
</template>

<script>
	
	import adminSupplierBus from "@/bus/admin-supplier";
	import { required, email, maxLength } from 'vuelidate/lib/validators'
	import helpers from "@/mixins/helpers"
	import validationMixin from '@/mixins/validationMixin'


	const dform = {

		brand_name 		 	: '',
		factory_name	 	: '',
		address 		 	: '',
		country 		 	: '',
		no_employee 		: '',
		company_description : '',
		owner_firstname 	: '',
		owner_lastname 		: '',
		contact_person	 	: '',
		job_title 			: '',
		phone 				: '',
		fax 				: '',
		password 			: '',

	}

	export default {

		mixins:[ validationMixin ],

		validations: {

			form: {

				brand_name 			: { required },
				factory_name		: { required },
				address 			: { required },
				country 			: { required },
				no_employee			: { required },
				company_description : { required },
				owner_firstname 	: { required },
				owner_lastname		: { required },
				contact_person 		: { required },
				job_title 			: { required },
				phone 				: { required },
				fax 				: { required },
				email 				: { required, email }, 

			}

		},

		validationMessages: {

			form: {

				brand_name 			: { required: 'Brand Name is Required' },
				factory_name 		: { required: 'Factory nane is Required' },
				address 			: { required: 'Address is Required' },
				country 			: { required: 'Country is Required' },
				no_employee 	 	: { required: 'No. of Employee is Required' },
				company_description : { required: 'Company Description is Required' },
				owner_firstname 	: { required: 'Owner First Name is Required' },
				owner_lastname	 	: { required: 'Owner Last Name is Required' },
				contact_person		: { required: 'Contact Person is Required' },
				job_title			: { required: 'Job Title is Required' },
				phone 				: { required: 'Telephone is Required' },
				fax 				: { required: ' Fax is Required' },
				email 				: { required: 'Email is Required', email: 'Email is Invalid' }, 

			}
		},

		data () {

			return {
				form: Object.assign({}, dform ),
				countries: [],
				search: null,
				formloading: false
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

			resetFrom() {
				this.form = Object.assign({}, dform)
				this.$refs.form.reset();
				this.$v.$reset()
			},

			submit() {


				this.formloading = true

				let data = {

					'email'	 	   			: this.form.email,
					'password' 	   			: this.form.password,
					'first_name'   			: this.form.first_name,
					'last_name'    			: this.form.last_name,
					'job_title'    			: this.form.job_title,
					'phone'	  	   			: this.form.phone,
					'fax'		   			: this.form.fax,
					'address'	   			: this.form.address,
					'country_id'  			: this.form.country,
					'brand_name'   			: this.form.brand_name,
					'factory_name' 			: this.form.factory_name,
					'no_employee'  			: this.form.no_employee,
					'company_description' 	: this.form.company_description,
					'contact_person' 		: this.form.contact_person

				}

				this.$store.dispatch('adminSupplier/addSupplier_a', {
					data:data
				})
				.then((response) => {

					this.formloading = false
					console.log(response)

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



				 this.snackbar = true
				 this.loading = true
		         // this.resetForm()
		         // this.$v.$reset()
			}
		}
	} 

</script>