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
					      <v-icon>sort</v-icon>
					    </v-btn>
					    <v-btn icon @click="Refresh('refresh')">
					      <v-icon>refresh</v-icon>
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
					  		     v-model="form.phone"
					  		     :error-messages="fieldErrors('form.phone')"
                			    @blur="$v.form.phone.$touch()" 
					  		      label="Phone Number" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs10 offset-xs1>
					  		    <v-text-field  color="black"
					  		     v-model="form.email"
					  		     :error-messages="fieldErrors('form.email')"
                			    @blur="$v.form.email.$touch()" 
					  		      label="Email Address" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs10 offset-xs1>
					  		    <v-text-field  color="black"
					  		    v-model="form.company_name"
					  		    :error-messages="fieldErrors('form.company_name')"
                			    @blur="$v.form.company_name.$touch()" 
					  		     label="Company Name" required></v-text-field>
					  		</v-flex>

					  		<v-flex xs10 offset-xs1>
					  		     <v-select 
					  		        v-model="form.country"
					  		     	:items="countries"
					  		     	item-text="name"
								  	item-value="id"
                          			:search-input.sync="search" 
                          			:error-messages="fieldErrors('form.country')"
	                   			    @blur="$v.form.country.$touch()"       
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
	               <v-btn color="grey darken-4" dark @click="$emit('update:dialog', false)">
	                    Submit
	                </v-btn> 
	            </v-card-actions>

			</v-form>
	        </v-card>
	    </v-dialog>
	</div>
</template>

<script>

	import helpers from "@/mixins/helpers";
	import { required, email, maxLength } from 'vuelidate/lib/validators'
	import validationMixin from '@/mixins/validationMixin'

	const dform = {

		firstname: '',
		lastname: '',
		phone:'',
		company_name: '',
		country: '',
		email:'',

	}

	export default {

		mixins:[ validationMixin ],

		validations: {

			form: {

				firstname: { required },
				lastname: { required },
				phone: { required },
				company_name: { required },
				country: { required },
				email: { required, email },
			}

		},


		validationMessages: {

			form: {

				firstname: { required: 'First Name is Required' },
				lastname: { required: 'Last Name is Required'},
				phone: { required: 'Phone is Required.' },
				country: { required: 'Country is Required' },
				company_name: { required: 'Company name is Rquired' },
				email: { required: 'Email is Required ', email: 'Email is Invalid' },
			}
		},

		data () {

			return {

				form: Object.assign({}, dform ),
				countries: [],
				search: '',
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

			submit() {
				console.log(this.form);
			}
		}
	} 

</script>