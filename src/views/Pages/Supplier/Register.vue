<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" style="background: rgba(0,0,0,0.4);">
	   	
	   	<img class="logo" src="/static/logos/logo-white.png">

	    <div class="registration-first" v-show="isStepOne">
	      <v-container>
	        <v-flex lg12 xs12>
	          <v-layout row wrap>
	            <v-flex lg4 xs12 offset-lg2 class="page-wrap">
	            	<v-layout row wrap>
	            	  <div >
			            <!-- heading message -->
			              <div class="page-content">
			                <h1 class="white--text header-title">How to become a BAL supplier?</h1>
			                <h4 class="white--text font-weight-light sub-header-title">We are committed to helping you increase your turnover significantly and become as competitive as possible. Sign up now and start receiving inquiries from buyers across the globe. </h4>
			              </div>
			              <!-- heading message -->
	            	  </div>
	            	</v-layout>
	              
	            </v-flex>
	            <v-flex lg4 xs12>
	              <v-layout row wrap fill>
	                <!-- FOR 1ST STEP -->
	                <div>
	                  <v-card class="pa-5">
	                    <div class="headline font-weight-medium text-xs-center">SIGN UP</div>
	                    <h4 color="grey--text" class="mt-2 text-xsc font-weight-light">Sign-up to find the lights that you are looking for.</h4>
	                    <v-layout row wrap>
	                      <v-form @submit.prevent="$v.$invalid ? null : FirstStep() " ref="form" class="mt-3">
	                        <v-layout wrap row>

	                          <v-flex xs12 pa-0>

	                            <v-text-field 
	                            color="black" 
	                            label="Username" 
	                            v-model="form.username" 
	                            required 
	                            :error-messages="fieldErrors('form.username')" 
	                            @blur="$v.form.username.$touch()">
	                            </v-text-field>

	                            <v-text-field 
	                            color="black" 
	                            label="Email Address" 
	                            v-model="form.email" 
	                            required 
	                            :error-messages="fieldErrors('form.email')" 
	                            @blur="$v.form.email.$touch()">
	                            </v-text-field>

	                            <v-text-field 
	                            color="black" 
	                            label="Password" 
	                            v-model="form.password" 
	                            required type="password" 
	                            :error-messages="fieldErrors('form.password')" 
	                            @blur="$v.form.password.$touch()">
	                            </v-text-field>

	                            <v-text-field 
	                            color="black" 
	                            label="Confirm Password" 
	                            v-model="form.confirmpassword" 
	                            required type="password" 
	                            :error-messages="fieldErrors('form.confirmpassword')" 
	                            @blur="$v.form.confirmpassword.$touch()">
	                            </v-text-field>

	                          </v-flex>

	                          <v-flex xs12 offset-xs4>
	                            <v-layout row wrap text-xs-center>
	                              <!-- Login form submit -->
	                              <v-flex xs6 class="white--text no-mrpd">
	                                <v-btn round color="black" type="submit" block @click="FirstStep()"> <span class="white--text font-weight-light ls-1" style="">SIGN UP</span></v-btn>
	                              </v-flex>
	                            </v-layout>
	                          </v-flex>
	                          <v-flex xs12 mt-3>
	                            <router-link :to="{ name: 'Login' }">
	                              <p class="blue--text text-xs-center font-weight-light"><strong>Existing User ? Click here to login</strong></p>
	                            </router-link>
	                          </v-flex>
	                        </v-layout>
	                      </v-form>
	                    </v-layout>
	                  </v-card>
	                </div>
	                <!-- FOR 1ST STEP -->
	              </v-layout>
	            </v-flex>
	          </v-layout>
	        </v-flex>
	      </v-container>
	    </div>

	    <div class="registration-stepper" v-show="isSteptwo">
	   
	      <v-flex offset-xs2 offset-lg2 lg8 xs8>

	      	<v-layout align-center justify-center row fill-height>
	      
		        <!-- FOR 2ND 3RD 4RTH STEP -->

		        <v-card  style="max-height:80vh; overflow:hidden; overflow-y:auto;">

		        	<v-card-text id="inquiryCreate_scrollable_cont">

		     		   <v-stepper v-model="e1" vertical>

				    <v-stepper-step :complete="e1 > 1" step="1">
					      Contact Details
					      <small>Summarize if needed</small>
				    </v-stepper-step>

				    <v-stepper-content step="1">

			                <v-flex xs12>

			                  <v-layout row wrap>
			                    <v-flex xs6 pa-2>
			                      <v-text-field 
			                      color="black" 
			                      label="First Name" 
			                      v-model="form.firstname" 
			                      required 
			                      :error-messages="fieldErrors('form.firstname')" 
			                      @blur="$v.form.firstname.$touch()">
			                      </v-text-field>
			                    </v-flex>

			                    <v-flex xs6 pa-2>
			                      <v-text-field 
			                      color="black" 
			                      label="Last Name" 
			                      v-model="form.lastname"
			                      required 
			                      :error-messages="fieldErrors('form.lastname')"
			                      @blur="$v.form.lastname.$touch()">
			                      </v-text-field>
			                    </v-flex>

			                    <v-flex xs6 pa-2>
			                      <v-text-field 
			                      color="black" 
			                      label="Designation" 
			                      v-model="form.designation" 
			                      required 
			                      :error-messages="fieldErrors('form.designation')" 
			                      @blur="$v.form.designation.$touch()">
			                      </v-text-field>
			                    </v-flex>

			                    <v-flex xs6 pa-2>
			                      <v-text-field 
			                      color="black" 
			                      label="Company Website" 
			                      v-model="form.companywebsite" 
			                      required 
			                      :error-messages="fieldErrors('form.companywebsite')" 
			                      @blur="$v.form.companywebsite.$touch()">
			                      </v-text-field>
			                    </v-flex>

			                    <v-flex xs3 pa-2>
			                      <v-autocomplete 
			                      v-model="form.country" 
			                      :items="countries" 
			                      item-text="name" 
			                      item-value="id" 
			                      :error-messages="fieldErrors('form.country')" 
			                      @blur="$v.form.country.$touch()" 
			                      ref="categorySelect" flat hide-no-data hide-details 
			                      label="Search Country ..">
			                      </v-autocomplete>
			                    </v-flex>

			                    <v-flex xs2 pa-2>
			                      <v-text-field 
			                      color="black" 
			                      label="City" 
			                      v-model="form.city" 
			                      required 
			                      :error-messages="fieldErrors('form.city')" 
			                      @blur="$v.form.city.$touch()">
			                      </v-text-field>
			                    </v-flex>

			                    <v-flex xs5 pa-2>
								  <v-text-field 
			                      color="black" 
			                      label="Street" 
			                      v-model="form.street" 
			                      required 
			                      :error-messages="fieldErrors('form.street')" 
			                      @blur="$v.form.street.$touch()">
			                      </v-text-field>           
			                    </v-flex>

			                    <v-flex xs2 pa-2>
			                       <v-text-field 
				                      color="black" 
				                      label="Zip Code" 
				                      v-model="form.zipcode" 
				                      required 
				                      :error-messages="fieldErrors('form.zipcode')" 
				                      @blur="$v.form.zipcode.$touch()">
				                    </v-text-field>   
			                    </v-flex>

			                    <v-flex xs4 pa-2>
			                    	<v-text-field 
				                      color="black" 
				                      label="Phone Number" 
				                      v-model="form.phonenumber" 
				                      required 
				                      :error-messages="fieldErrors('form.phonenumber')" 
				                      @blur="$v.form.phonenumber.$touch()">
				                    </v-text-field>   
			                    </v-flex>


			                    <v-flex xs4 pa-2>
			                        <v-text-field 
				                      color="black" 
				                      label="Mobile Number" 
				                      v-model="form.mobilenumber" 
				                      required 
				                      :error-messages="fieldErrors('form.mobilenumber')" 
				                      @blur="$v.form.mobilenumber.$touch()">
				                    </v-text-field>  
			                    </v-flex>

			                    <v-flex xs4 pa-2>
			                        <v-text-field 
				                      color="black" 
				                      label="We Chat Id" 
				                      v-model="form.wechatid" 
				                      required 
				                      :error-messages="fieldErrors('form.wechatid')" 
				                      @blur="$v.form.wechatid.$touch()">
				                    </v-text-field>  
			                    </v-flex>

			                    <v-flex xs6 pa-2>
			                        <v-text-field 
				                      color="black" 
				                      label="Company Website" 
				                      v-model="form.companywebsite" 
				                      required 
				                      :error-messages="fieldErrors('form.companywebsite')" 
				                      @blur="$v.form.companywebsite.$touch()">
				                    </v-text-field>  
			                    </v-flex>

			                    <v-flex xs6 pa-2>
			                        <v-text-field 
				                      color="black" 
				                      label="Factory Address" 
				                      v-model="form.factoryaddress" 
				                      required 
				                      :error-messages="fieldErrors('form.factoryaddress')" 
				                      @blur="$v.form.factoryaddress.$touch()">
				                    </v-text-field>  
			                    </v-flex>

			                  </v-layout>
			                </v-flex> 

				      <v-btn color="primary"  @click="SecondStep()">Continue</v-btn>
				      <v-btn flat>Cancel</v-btn>

				    </v-stepper-content>

				    <v-stepper-step :complete="e1 > 2" step="2">Company Information</v-stepper-step>

				    <v-stepper-content step="2">


			               	 <v-flex xs12>

			                		<v-layout row wrap>

			                		<v-flex xs4 pa-2>

				                      <v-text-field 
					                      color="black" 
					                      label="Company established year:" 
					                      v-model="form.companyestablishedyear" 
					                      required 
					                      :error-messages="fieldErrors('form.companyestablishedyear')" 
					                      @blur="$v.form.companyestablishedyear.$touch()">
					                      </v-text-field>
				                    </v-flex>

				                    <v-flex xs4 pa-2>
				                      <v-text-field 
					                      color="black" 
					                      label="Number of employees in total" 
					                      v-model="form.numberofemployees" 
					                      required 
					                      :error-messages="fieldErrors('form.numberofemployees')" 
					                      @blur="$v.form.numberofemployees.$touch()">
					                      </v-text-field>
				                    </v-flex>  

				                    <v-flex xs4 pa-2>

				                      <v-text-field 
					                      color="black" 
					                      label="Number of employees in total" 
					                      v-model="form.numberofworkersinfactory" 
					                      required 
					                      :error-messages="fieldErrors('form.numberofworkersinfactory')" 
					                      @blur="$v.form.numberofworkersinfactory.$touch()">
					                      </v-text-field>

				                    </v-flex>

				                    <v-flex xs6 pa-2>

				                    	  <vue-dropzone 
			                                    id="dropzone_attachments" 
			                                    :options="dropzoneOptions" 
			                                    :useCustomSlot="useCustomSlot"
			                                    :awss3="getAWSS3('add-inquiry-attachments')"
			                                    @vdropzone-success="vdz_success($event,'add-inquiry-attachments')">
			                                      <div class="dropzone-custom-content">
			                                        <h3 class="dropzone-custom-title">Drag and drop to images of your Factory photo Inside!</h3>
			                                        <div class="subtitle">...or click to select a file from your computer</div>
			                                      </div>
			                               </vue-dropzone>
				                        
				                    </v-flex>  

				                    <v-flex xs6 pa-2>

				                    	  <vue-dropzone 
			                                    id="dropzone_attachments" 
			                                    :options="dropzoneOptions" 
			                                    :useCustomSlot="useCustomSlot"
			                                    :awss3="getAWSS3('add-inquiry-attachments')"
			                                    @vdropzone-success="vdz_success($event,'add-inquiry-attachments')">
			                                      <div class="dropzone-custom-content">
			                                        <h3 class="dropzone-custom-title">Drag and drop to images of your Factory photo Outside!</h3>
			                                        <div class="subtitle">...or click to select a file from your computer</div>
			                                      </div>
			                               </vue-dropzone>
				                      
				                    </v-flex>

			                		</v-layout>

			                 </v-flex>

				      <v-btn color="primary"  @click="ThirdStep()">Continue</v-btn>
				      <v-btn flat>Cancel</v-btn>

				    </v-stepper-content>

				    <v-stepper-step :complete="e1 > 3" step="3">Bank Details</v-stepper-step>

				    <v-stepper-content step="3">


							<v-flex xs12>
							<v-layout row wrap>

								<v-flex xs4 pa-2>

				                  <v-text-field 
				                      color="black" 
				                      label="Account Name:" 
				                      v-model="form.accountname" 
				                      required 
				                      :error-messages="fieldErrors('form.accountname')" 
				                      @blur="$v.form.accountname.$touch()">
				                   </v-text-field>

				                </v-flex> 


				                <v-flex xs4 pa-2>
					                  
					                  <v-text-field 
					                      color="black" 
					                      label="Account Number:" 
					                      v-model="form.accountnumber" 
					                      required 
					                      :error-messages="fieldErrors('form.accountnumber')" 
					                      @blur="$v.form.accountnumber.$touch()">
					                   </v-text-field>

				                </v-flex>

				                <v-flex xs4 pa-2>
				                  
				                   <v-text-field 
				                      color="black" 
				                      label="IBAN:" 
				                      v-model="form.iban" 
				                      required 
				                      :error-messages="fieldErrors('form.iban')" 
				                      @blur="$v.form.iban.$touch()">
				                   </v-text-field>

				                </v-flex>


				                <v-flex xs4 pa-2>
				                  
				                    <v-text-field 
				                      color="black" 
				                      label="Bank Name:" 
				                      v-model="form.bankname" 
				                      required 
				                      :error-messages="fieldErrors('form.bankname')" 
				                      @blur="$v.form.bankname.$touch()">
				                   </v-text-field>

				                </v-flex>

				                <v-flex xs4 pa-2>

				                  <v-text-field 
				                      color="black" 
				                      label="Bank Address:" 
				                      v-model="form.bankaddress" 
				                      required 
				                      :error-messages="fieldErrors('form.bankaddress')" 
				                      @blur="$v.form.bankaddress.$touch()">
				                   </v-text-field>

				                </v-flex>

				                <v-flex xs4 pa-2>
				                  
				                    <v-text-field 
				                      color="black" 
				                      label="Swift Code:" 
				                      v-model="form.swiftcode" 
				                      required 
				                      :error-messages="fieldErrors('form.swiftcode')" 
				                      @blur="$v.form.swiftcode.$touch()">
				                   </v-text-field>

				                </v-flex>

				                <v-flex xs12 mt-4>

								    <h3> In order that the form will be transmitted to us, you have to agree to the following terms:</h3>


									<div class="">

								    <v-checkbox v-model="isVerifyInformation">
								        <template v-slot:label style="font-size: 12px">
								            We hereby verify that all information and attachments on this form are fully true and correct to the best of my knowledge.
								        </template>
								    </v-checkbox>

								    <v-checkbox v-model="isConfirmProvideSamples">
								        <template v-slot:label>
								        		We confirm to provide samples and supply orders from client with no minimum quantity required.
								        </template>

								    </v-checkbox>

								    <v-checkbox v-model="isConfirmtoCheckBuyanyligh">
								        <template v-slot:label>
								            We confirm, that BuyAnyLight Inspector can visit our company/factory to check on all the information given in this form.

								        </template>

								    </v-checkbox>

								    <v-checkbox v-model="isConfirmLossorDamages">
								        <template v-slot:label>
								            We confirm, that any losses/damages caused of false information given in this form, BuyAnyLight has the right to claim for full compensation!

								        </template>
								    </v-checkbox>

								    <v-checkbox v-model="isAggreeInformation">
								        <template v-slot:label>

								            We agree that all submitted information can be used internally by BuyAnyLight for product sourcing inquiries. Those requests will be sent by our system or one of our employees to the contact details provided in this form. Make sure those details are correct in order to not miss our inquiries! You can unsubscribe from our sourcing database anytime by sending an email to:

								        </template>
								    </v-checkbox>

								    <v-checkbox v-model="isAgreeAllAboveInformation">
								        <template v-slot:label>
								            I agree to the above terms and conditions..

								        </template>
								    </v-checkbox>
									
									</div>

								</v-flex>


				               

							</v-layout>
							</v-flex>

				      <v-btn color="primary" @click="FourStep()">Save</v-btn>
				      <v-btn flat>Cancel</v-btn>

				    </v-stepper-content>

				
				  </v-stepper>

		      	   </v-card-text>
		        </v-card>

		        <!-- FOR 2ND 3RD 4RTH STEP -->

	      	</v-layout>

	      </v-flex>
	    </div>

	    <div class="registration-success" v-show="isComplete">
			 <v-flex xs8 class="offset-xs2">
			     	<v-card class=pa-5>
			     		<v-layout row wrap justify-center>
			    			<div class="heading">
			    				<h1 class="font-weight-bold">THANK YOU!</h1>	
			    			</div>
							<div class="main-content">
								<i class="fa fa-check"></i>
								<p class="main-content__body">
								
								    Thank you for your time, consideration and trust BuyAnyLight! If you have any further questions, please contact us on: info@buyanylight.com
								</p>
							</div>
						</v-layout>
			    	</v-card>  
		       </v-flex>
	    </div>

  </v-img>

</template>

<script>
import helpers from "@/mixins/helpers";
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'


const dform = {
  // 1st step 	
  email: 'james@gmail.com',
  password: 'belatting',
  confirmpassword: 'belatting',
  username: 'kabayan06',
  // 2nd step
  // can add multiple contacts if he/she wanted
  firstname: 'James',
  lastname: 'Cameron',
  designation: 'lighther Designer Manager',
  companyname: 'Almani Lighting LCC',
  country: 'United Arab Emirates',
  city: 'Dubai',
  street: '171 Tower 69',
  zipcode: '6969',
  phonenumber: '+12312',
  mobilenumber: '589647869',
  wechatid: '69696969',
  companywebsite: 'almani.ae',
  factoryaddress: '171 Tower 69',
  // optional
  managername: 'Zain Abdin',
  manageremail: 'zain@almani.ae',
  managerphone: '696969',
  // 3rd
  companyestablishedyear: '2017',
  numberofemployees: '20',
  numberofworkersinfactory: '100',
  factoryphotoinside: [],
  factoryphotooutside: [],
  // category list : what kind of led lights do you offer ?
  // 4RTH
  accountname: '',
  accountnumber: '',
  iban: '',
  bankname: '',
  bankaddress: '',
  swiftcode: '',

}

export default {

  mixins: [validationMixin],

  components: {

  	vueDropzone: vue2Dropzone,

  },


  validations: {

    form: {

      email: { required, email },
      username: { required },
      password: { required, minLength: minLength(6) },
      confirmpassword: {

        required,
        sameAsPassword: sameAs('password')
      },

      firstname: { required },
      lastname: { required },
      designation: { required },
      companyname: { required },
      country: { required },
      street: { required },
      city: { required },
      zipcode: { required },
      phonenumber: { required },
      mobilenumber: { required },
      wechatid: { required },
      companywebsite: { required },
      factoryaddress: { required },

      companyestablishedyear: { required },
      numberofemployees: { required },
      numberofworkersinfactory: { required },

   	  accountname: { required },
	  accountnumber: { required },
	  iban: { required },
	  bankname: { required },
	  bankaddress: { required },
	  swiftcode: { required },

    },



  },

  validationMessages: {

    form: {

      username: { required: 'Please enter an Username ' },
      email: { required: 'Please enter email', email: 'Email must be valid' },
      password: { required: 'Please enter password', minLength: 'Password must be of 6 characters' },
      confirmpassword: { required: 'Please confirm your Password.', sameAsPassword: 'Password does not match' },
      firstname: { required: 'Please enter your firstname.' },
      lastname: { required: 'Please enter your lastname.' },
      designation: { required: 'Please enter your designation. ' },
      companyname: { required: 'Please enter your Company name.' },
      country: { required: 'Please enter your Country.' },
      city: { required: 'Please enter your city.' },
      street: { required: 'Please enter your Street.'},
      zipcode: { required: 'Please enter your zipcode.' },
      phonenumber: { required: 'Please enter your Phone Number.' },
      mobilenumber: { required: 'Please enter your Moble Number.' },
      wechatid: { required: 'Please enter your We Chat ID' },
      companyestablishedyear: { required: 'Please enter Company Established year.'},
      numberofemployees: { required: 'Please enter the number of employees.'},
      numberofworkersinfactory: { required: 'Please enter the number of workers in factory.'},
      companywebsite: { required: 'Please enter your Company Website.' },
      factoryaddress: { required: 'Please enter your Factory Address.' },
      accountname: { required: 'Please enter your Account Name'},
      accountnumber: { required: 'Please enter your Account Number'},
      iban: { required: 'Please enter your IBAN'},
      bankname: { required: 'Please enter your Bank Name'},
      bankaddress: { required: 'Please enter your Bank Address'},
      swiftcode: { required: 'Please enter your Swift Code' },

    }

  },

  data() {

    return {

      type: 'supplier',
      backgroundImg: '/static/background/supplier-dashboard.jpg',
      form: Object.assign({}, dform),
      e1: 0,

      // hide hide show show
      isStepOne : true,
      isSteptwo : false,
      isComplete: false,



	    // Dropzone
	    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
	    // dddddddddddddddddddddddddddddddddddddddddddddddddddd

        useCustomSlot: true,
        dropzoneOptions: {
            url: config.main.awss3.urls.inquiry,
            thumbnailWidth: 200,
            maxFilesize: 0.5,
            headers: {},
            addRemoveLinks: true,            
            dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
        },

       //  checkboxes
       isVerifyInformation:false,
       isConfirmProvideSamples:false,
       isConfirmtoCheckBuyanyligh:false,
       isConfirmLossorDamages:false,
       isAggreeInformation:false,
       isAgreeAllAboveInformation:false,



	    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
	    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
	    // Dropzone

    }

  },

  methods: {

  	// Validate FORMS

  	FirstStep() {

  		this.$v.form.username.$touch();
  		this.$v.form.email.$touch();
  		this.$v.form.password.$touch();
  		this.$v.form.confirmpassword.$touch();

  		if (!this.$v.form.username.$invalid && !this.$v.form.email.$invalid && !this.$v.form.password.$invalid && ! this.$v.form.confirmpassword.$invalid) {

  			// hide the step one 
			this.isStepOne = false
			this.isSteptwo = true
  		}

  	},

  	SecondStep() {

  		// var fields[] = 

  		this.$v.form.firstname.$touch();
  		this.$v.form.lastname.$touch();
  		this.$v.form.designation.$touch();
  		this.$v.form.companywebsite.$touch();
  		this.$v.form.country.$touch();
  		this.$v.form.city.$touch();
  		this.$v.form.street.$touch();
  		this.$v.form.zipcode.$touch();
  		this.$v.form.phonenumber.$touch();
  		this.$v.form.mobilenumber.$touch();
  		this.$v.form.wechatid.$touch();
  		this.$v.form.companywebsite.$touch();
  		this.$v.form.factoryaddress.$touch();

  		if(!this.$v.form.firstname.$invalid 
  			&& !this.$v.form.lastname.$invalid 
  			&& !this.$v.form.designation.$invalid 
  			&& !this.$v.form.companywebsite.$invalid 
  			&& !this.$v.form.country.$invalid 
  			&& !this.$v.form.city.$invalid
  			&& !this.$v.form.street.$invalid 
  			&& !this.$v.form.zipcode.$invalid 
  			&& !this.$v.form.phonenumber.$invalid 
  			&& !this.$v.form.mobilenumber.$invalid 
  			&& !this.$v.form.wechatid.$invalid
  			&& !this.$v.form.companywebsite.$invalid
  			&& !this.$v.form.factoryaddress.$invalid) {

  			//  swithching
  			this.e1 = 2

  		}
  	},

  	ThirdStep() {

  		this.$v.form.companyestablishedyear.$touch();
  		this.$v.form.numberofemployees.$touch();
  		this.$v.form.numberofworkersinfactory.$touch();

  		if(!this.$v.form.companyestablishedyear.$invalid 
  			&& !this.$v.form.numberofemployees.$invalid 
  			&& !this.$v.form.numberofworkersinfactory.$invalid) {
  			this.e1 = 3
  		}
  	},

  	FourStep() {

  		console.log('hello')

 		this.$v.form.accountname.$touch();
 		this.$v.form.accountnumber.$touch();
 		this.$v.form.iban.$touch();
 		this.$v.form.bankname.$touch();
 		this.$v.form.bankaddress.$touch();
 		this.$v.form.swiftcode.$touch();

 		if(!this.$v.form.accountname.$invalid 
 			&& !this.$v.form.accountnumber.$invalid 
 			&& !this.$v.form.iban.$invalid
 			&& !this.$v.form.bankname.$invalid 
 			&& !this.$v.form.bankaddress.$invalid 
 			&& !this.$v.form.swiftcode.$invalid) {

 			// alert('gooood');
 			// console.log('--------')
 			// console.log(this.form);
 			// console.log('--------')

 			this.isSteptwo = false
 			this.isComplete = true


 		}


  		// validate last then save here
  	},

	// Validate FORMS


  	    // Dropzone
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    getAWSS3(upload_group){

        var awss3 =  {
            signingURL: config.main.awss3.signingURL,
            headers: {
                token:localStorage.access_token,
            },
            params : {
                action: upload_group,
            },
            sendFileToServer : true,
            withCredentials: false
        };

        return awss3;
    },

    vdz_success(file, upload_group){

        console.log("vdz_success file = ",file);
        console.log("vdz_success upload_group = ",upload_group);

        if(file.status=='success') {

            var attachment = {
                location: file.s3ObjectLocation,
                filename: file.name,
                filetype: file.type,
                filegroup: upload_group,
                filesize: _.round((file.size/1000), 2),
            };

            // console.log('attachment',attachment);
            this.formData.attachments.push(attachment);
            // for the preview when uploaded
            this.inquiry_images.push(attachment);

        }

    },
    // dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
    // Dropzone


  },

  computed: {

    countries() {
      return config.countries;
    },

  }, 

  created: function() {


 // get categories for category select box
    this.$store.dispatch('cat/getCategories_a')
      .then((data) => {
        this.categoryItems = data;
      })
      .catch((e) => {
        console.log('Error: ');
        console.log(e);
      });

  },



}

</script>
<style scoped lang="scss">

.registration-first {

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

}


.registration-success {

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  .heading {

  	h1 {

  		font-size: 6rem;
  		font-weight: bolder;
  		color: #555857;

  	}

  }
  .main-content {

  	text-align: center;
  	
  	i {
  		    color: #24b663;
  		    font-size: 10rem;
  	}

  	p {

	    font-weight: 500;
	    font-size: 1.2rem;
	    color: #555857;
	    letter-spacing: 1px;
	    text-transform: uppercase;

  	}


  }

}


.logo {
  margin: 22px 29px 15px;
  width: 81px;

}


.page-vimg {
  background-image:
    linear-gradient(to right bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7));
    // width: 40px;
}

.page-wrap {
  // top: 50%;
  // transform: translate(-50%, -50%);
  // width: 50%;
  // height: 100%;
  // padding: 100px;
  // position: relative;
  background: rgba(0, 0, 0, 0.6);
}

.page-content {
  position: relative;
  top: 30%;
  padding: 20px;
  // padding: 100px;

}

.header-title {
  font-size: 23px;
}

.sub-header-title {
  font-size: 18px;
  letter-spacing: 0.5px;
  line-height: 31px;
}

.dropzone-custom-content {
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}




</style>

<style scoped>

.v-input--selection-controls.v-input >>> .v-label { 

	    font-weight: 400;
    line-height: 23px;
    min-height: 16px;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    font-size: 13px;

}

.v-input--selection-controls {

	margin-top: 0px;
    padding-top: 0px;

}

 a {
    cursor: pointer;
    text-decoration: none;
}


</style>
