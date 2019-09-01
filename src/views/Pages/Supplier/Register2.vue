<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" style="background: rgba(0,0,0,0.4);">
		
		<!-- <img class="logo" src="/static/logos/logo-white.png"> -->

		<div class="registration-first" v-show="isStepOne">
		  <v-container>
			<v-flex lg12 xs12>
			  <v-layout row wrap>

				<v-flex lg4 xs12 offset-lg2 class="page-wrap">
					<v-layout row wrap>
						<!-- heading message -->
						<div class="page-content mt-5">

							<h1 class="white--text header-title">How to become a BAL supplier?</h1>
							<h4 class="white--text font-weight-light sub-header-title mt-4">We are committed to helping you increase your turnover significantly and become as competitive as possible. Sign up now and start receiving inquiries from buyers across the globe. </h4>

							<v-container fluid>
							<v-layout row wra justify-center align-center fill-height>
								<a href="https://buyanylight.com" target="_blank">
									<img class="logo" src="/static/logos/logo-white.png" alt="BuyAnyLight.com">
								</a>
							</v-layout>
							</v-container>


						</div>
						  <!-- heading message -->
					</v-layout>
				</v-flex>

				<v-flex lg4 xs12>
				  <v-layout row wrap fill-height>
					<!-- FOR 1ST STEP -->
					<div class="frmcontainer">
					  <v-card class="pa-5">
						<div class="headline font-weight-medium text-xs-center">SIGN UP</div>
						<!-- <h4 color="grey--text" class="mt-2 text-xsc font-weight-light">Sign-up to find the lights that you are looking for.</h4> -->
						<v-layout row wrap>
						  <v-form @submit.prevent="$v.$invalid ? null : FirstStep() " ref="form" class="mt-3">
							<v-layout wrap row>

							  <v-flex xs12 pa-0>


								  <v-text-field 
								  color="black" 
								  label="First Name" 
								  v-model="form.firstname" 
								  required 
								  :error-messages="fieldErrors('form.firstname')" 
								  @blur="$v.form.firstname.$touch()">
								  </v-text-field>

								  <v-text-field 
								  color="black" 
								  label="Last Name" 
								  v-model="form.lastname"
								  required 
								  :error-messages="fieldErrors('form.lastname')"
								  @blur="$v.form.lastname.$touch()">
								  </v-text-field>

								<v-text-field 
								color="black"  
								label="Email Address" 
								v-model="form.email" 
								placeholder=" "
								required 
								:error-messages="fieldErrors('form.email')" 
								@blur="$v.form.email.$touch()">
								</v-text-field>

								<v-text-field 
								color="black" 
								label="Password" 
								v-model="form.password" 
								placeholder=" "
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
								  <p class="black--text text-xs-center font-weight-light"><strong>Existing User ? Click here to login</strong></p>
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
	   
		  <v-flex offset-md2 offset-lg2 lg8 md8 xs12 pa-2>	

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

								<v-flex md6 xs12 pa-2>
								  <v-text-field 
								  color="black" 
								  label="First Name" 
								  v-model="form.firstname" 
								  required 
								  :error-messages="fieldErrors('form.firstname')" 
								  @blur="$v.form.firstname.$touch()">
								  </v-text-field>
								</v-flex>

								<v-flex md6 xs12 pa-2>
								  <v-text-field 
								  color="black" 
								  label="Last Name" 
								  v-model="form.lastname"
								  required 
								  :error-messages="fieldErrors('form.lastname')"
								  @blur="$v.form.lastname.$touch()">
								  </v-text-field>
								</v-flex>

								<v-flex md6 xs12 pa-2>
								  <v-text-field 
								  color="black" 
								  label="Designation" 
								  v-model="form.designation" 
								  required 
								  :error-messages="fieldErrors('form.designation')" 
								  @blur="$v.form.designation.$touch()">
								  </v-text-field>
								</v-flex>

								<v-flex md6 xs12 pa-2>
								  <v-text-field 
								  color="black" 
								  label="Company Name" 
								  v-model="form.companyname" 
								  required 
								  :error-messages="fieldErrors('form.companyname')" 
								  @blur="$v.form.companyname.$touch()">
								  </v-text-field>
								</v-flex>

								<v-flex md3 xs12 pa-2>
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

								<v-flex md2 xs12 pa-2>
								  <v-text-field 
								  color="black" 
								  label="City" 
								  v-model="form.city" 
								  required 
								  :error-messages="fieldErrors('form.city')" 
								  @blur="$v.form.city.$touch()">
								  </v-text-field>
								</v-flex>

								<v-flex md5 xs12 pa-2>
								  <v-text-field 
								  color="black" 
								  label="Street" 
								  v-model="form.street" 
								  required 
								  :error-messages="fieldErrors('form.street')" 
								  @blur="$v.form.street.$touch()">
								  </v-text-field>           
								</v-flex>

								<v-flex md2 xs12 pa-2>
								   <v-text-field 
									  color="black" 
									  label="Zip Code" 
									  v-model="form.zipcode" 
									  required 
									  :error-messages="fieldErrors('form.zipcode')" 
									  @blur="$v.form.zipcode.$touch()">
									</v-text-field>   
								</v-flex>

								<v-flex md4 xs12 pa-2>
									<v-text-field 
									  color="black" 
									  label="Phone Number" 
									  v-model="form.phonenumber" 
									  required 
									  :error-messages="fieldErrors('form.phonenumber')" 
									  @blur="$v.form.phonenumber.$touch()">
									</v-text-field>   
								</v-flex>


								<v-flex md4 xs12 pa-2>
									<v-text-field 
									  color="black" 
									  label="Mobile Number" 
									  v-model="form.mobilenumber" 
									  required 
									  :error-messages="fieldErrors('form.mobilenumber')" 
									  @blur="$v.form.mobilenumber.$touch()">
									</v-text-field>  
								</v-flex>

								<v-flex md4 xs12 pa-2>
									<v-text-field 
									  color="black" 
									  label="We Chat Id" 
									  v-model="form.wechatid" 
									  required 
									  :error-messages="fieldErrors('form.wechatid')" 
									  @blur="$v.form.wechatid.$touch()">
									</v-text-field>  
								</v-flex>

								<v-flex md6 xs12 pa-2>
									<v-text-field 
									  color="black" 
									  label="Company Website" 
									  v-model="form.companywebsite" 
									  required 
									  :error-messages="fieldErrors('form.companywebsite')" 
									  @blur="$v.form.companywebsite.$touch()">
									</v-text-field>  
								</v-flex>

								<v-flex md6 xs12 pa-2>
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
					  <!-- <v-btn   @click="FirstStep()" flat>back</v-btn> -->

					</v-stepper-content>

					<v-stepper-step :complete="e1 > 2" step="2">Company Information</v-stepper-step>

					<v-stepper-content step="2">


							 <v-flex xs12>

									<v-layout row wrap>

									<v-flex xs12 lg4 md4 pa-2>

										 <v-text-field 
											  color="black" 
											  label="Company established year:" 
											  v-model="form.companyestablishedyear" 
											  required 
											  :error-messages="fieldErrors('form.companyestablishedyear')" 
											  @blur="$v.form.companyestablishedyear.$touch()">
										  </v-text-field>

									</v-flex>

									<v-flex xs12 lg4 md4 pa-2>

										  <v-text-field 
											  color="black" 
											  label="Number of employees in total" 
											  v-model="form.numberofemployees" 
											  required 
											  :error-messages="fieldErrors('form.numberofemployees')" 
											  @blur="$v.form.numberofemployees.$touch()">
										  </v-text-field>

									</v-flex>  

									<v-flex xs12 lg4 md4 pa-2>

										  <v-text-field 
											  color="black" 
											  label="Number of workers in factory" 
											  v-model="form.numberofworkersinfactory" 
											  required 
											  :error-messages="fieldErrors('form.numberofworkersinfactory')" 
											  @blur="$v.form.numberofworkersinfactory.$touch()">
										  </v-text-field>

									</v-flex>


									  <v-flex xs12 mt-2 mb-4>

										<h2 class="font-weight-medium text--grey">PRODUCT QUESTIONS</h2>
										<h5 class="font-weight-light ">What kind of LED lights do you offer?</h5>

										<v-layout row wrap pa-2>
											<v-autocomplete v-model="categories" :items="categoryItems" item-text="name" item-value="id" ref="categorySelect" cache-items chips multiple hide-no-data clearable hide-details label="List your Products ">
											  <template v-slot:selection="slotData">
												<v-chip :selected="slotData.selected" close class="chip--select-multi" @input="removeFromCategories(slotData.item)">
												  {{ slotData.item.name }}
												</v-chip>
											  </template>
											</v-autocomplete>
										</v-layout>	

									</v-flex>


									<v-flex xs6 pa-2 style="display: none;">

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

									<v-flex xs6 pa-2 style="display: none;">

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
					  <v-btn @click="FirstStep()" flat>back</v-btn>

					</v-stepper-content>

					<v-stepper-step :complete="e1 > 3" step="3">Bank Details</v-stepper-step>

					<v-stepper-content step="3">


							<v-flex xs12>
							<v-layout row wrap>

								<v-flex xs12 lg4 pa-2>

								  <v-text-field 
										  color="black" 
										  label="Account Name:" 
										  v-model="form.accountname" 
										  required 
										  :error-messages="fieldErrors('form.accountname')" 
										  @blur="$v.form.accountname.$touch()">
								   </v-text-field>

								</v-flex> 


								<v-flex xs12 lg4 pa-2>
									  
									  <v-text-field 
										  color="black" 
										  label="Account Number:" 
										  v-model="form.accountnumber" 
										  required 
										  :error-messages="fieldErrors('form.accountnumber')" 
										  @blur="$v.form.accountnumber.$touch()">
									   </v-text-field>

								</v-flex>

								<v-flex xs12 lg4 pa-2>
								  
								   <v-text-field 
										  color="black" 
										  label="IBAN:" 
										  v-model="form.iban" 
										  required 
										  :error-messages="fieldErrors('form.iban')" 
										  @blur="$v.form.iban.$touch()">
								   </v-text-field>

								</v-flex>


								<v-flex xs12 lg4 pa-2>
								  
									<v-text-field 
										  color="black" 
										  label="Bank Name:" 
										  v-model="form.bankname" 
										  required 
										  :error-messages="fieldErrors('form.bankname')" 
										  @blur="$v.form.bankname.$touch()">
								   </v-text-field>

								</v-flex>

								<v-flex xs12 lg4 pa-2>

								  <v-text-field 
										  color="black" 
										  label="Bank Address:" 
										  v-model="form.bankaddress" 
										  required 
										  :error-messages="fieldErrors('form.bankaddress')" 
										  @blur="$v.form.bankaddress.$touch()">
								   </v-text-field>

								</v-flex>

								<v-flex xs12 lg4 pa-2>
								  
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

									<h4 class="text--grey"> In order that the form will be transmitted to us, you have to agree to the following terms:</h4>

									<div class="agree">

										<p> 
											<span> 1.) We hereby verify that all information and attachments on this form are fully true and correct to the best of my knowledge.</span>
											<span> 2.) We confirm to provide samples and supply orders from client with no minimum quantity required.</span>
											<span> 3.) We confirm, that BuyAnyLight Inspector can visit our company/factory to check on all the information given in this form.</span>
											<span> 4.) We confirm, that any losses/damages caused of false information given in this form, BuyAnyLight has the right to claim for full compensation!</span>
											<span> 5.) We agree that all submitted information can be used internally by BuyAnyLight for product sourcing inquiries. Those requests will be sent by our system or one of our employees to the contact details provided in this form. Make sure those details are correct in order to not miss our inquiries! You can unsubscribe from our sourcing database anytime by sending an email to:</span>
										</p>

										<p class="mb-1"> 
											* By clicking the submit button you agree the above conditions.
										</p>
										<p class="">
											* Every lighting manufacturer's registration is subject to approval from BAL
										</p>
										
									
									</div>

								</v-flex>


							   

							</v-layout>
							</v-flex>

					  <v-btn color="primary" class="white--text" :loading="formloading"  @click="FourthStep()">Submit</v-btn>
					  <v-btn @click="SecondStep()" flat>back</v-btn>
					  

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
// import helpers from "@/mixins/helpers";
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'


const dform = {
  // // 1st step 	
  // email: 'maderfahkaer@gmail.com',
  // password: '123456',
  // confirmpassword: '123456',
  // username: 'kabayan06',
  // // 2nd step
  // // can add multiple contacts if he/she wanted
  // firstname: 'Mader',
  // lastname: 'Fahkaer',
  // designation: 'lighther Designer Manager',
  // companyname: 'MF Lighting LCC',
  // country: 'United Arab Emirates',
  // city: 'Dubai',
  // street: '171 Tower 69',
  // zipcode: '6969',
  // phonenumber: '+12312',
  // mobilenumber: '123817',
  // designation: '589647869',
  // wechatid: '69696969',
  // companywebsite: 'almani.ae',
  // factoryaddress: '171 Tower 69',
  // // optional
  // managername: 'Zain Abdin',
  // manageremail: 'zain@almani.ae',
  // managerphone: '696969',
  // // 3rd
  // companyestablishedyear: '2017',
  // numberofemployees: '20',
  // numberofworkersinfactory: '100',
  // factoryphotoinside: [],
  // factoryphotooutside: [],

  // // category list : what kind of led lights do you offer ?
  // // 4RTH
  // accountname: 'accountname',
  // accountnumber: 'accountnumber',
  // iban: 'iban',
  // bankname: 'bankname',
  // bankaddress: 'bankaddress',
  // swiftcode: 'swiftcode',

///////////////////////////////////////////////////////////////////////////////////////////////////////

	// 1st step 	
	email: '',
	password: '',
	confirmpassword: '',
	username: '',
	// 2nd step
	// can add multiple contacts if he/she wanted
	firstname: '',
	lastname: '',
	designation: '',
	companyname: '',
	country: '',
	city: '',
	street: '',
	zipcode: '',
	phonenumber: '',
	mobilenumber: '',
	designation: '',
	wechatid: '',
	companywebsite: '',
	factoryaddress: '',
	// optional
	managername: '',
	manageremail: '',
	managerphone: '',
	// 3rd
	companyestablishedyear: '',
	numberofemployees: '',
	numberofworkersinfactory: '',
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

	  email: { 
		required, 
		email, 
		isUnique(value){
			// standalone validator ideally should not assume a field is required
			if (value === '') 
			return true;

			// no then and catch because validator need the Promise instance
			return this.$store.dispatch('auth/isEmailExist_a',{email:value});
		}, 
	  },
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
	  email: { required: 'Please enter email', email: 'Email must be valid', isUnique: 'Email is already registered.'  },
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

	  formloading: false, 

		// Dropzone
		// dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd

		useCustomSlot: true,
		dropzoneOptions: {
			url: config.main.awss3.urls.inquiry,
			thumbnailWidth: 200,
			maxFilesize: 50,
			headers: {},
			addRemoveLinks: true,            
			dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
		},

	   //  checkboxes
	   isAgreeAllAboveInformation:false,

		// dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd
		// Dropzone

	  categories: [],
	  categoryItems: [],

	}

  },

  methods: {

	// Validate FORMS

	FirstStep() {

		console.log('firststep');

		this.$v.form.firstname.$touch();
		this.$v.form.lastname.$touch();  	
		this.$v.form.email.$touch();
		this.$v.form.password.$touch();
		this.$v.form.confirmpassword.$touch();

		if (!this.$v.form.firstname.$invalid && !this.$v.form.lastname.$invalid && !this.$v.form.email.$invalid && !this.$v.form.password.$invalid && ! this.$v.form.confirmpassword.$invalid) {

			// hide the step one 
			this.isStepOne = false
			this.isSteptwo = true
			console.log(' hide the step one ');
			this.e1 = 1
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

	FourthStep() {

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

				this.save();
		} 

		// validate last then save here
	},

	save() {


			let data = {

					'first_name': this.form.firstname,
					'last_name': this.form.lastname,
					'email': this.form.email,
					'password': this.form.password,
					'confirm_password': this.form.confirmpassword,
					'website': this.form.companywebsite,
					'street': this.form.street,
					'city': this.form.city,
					'country_id': this.form.country,

					'phone': this.form.phonenumber,
					'mobile': this.form.mobilenumber,
					'wechatid': this.form.wechatid,

					'company_name': this.form.companyname,
					'job_title': this.form.designation,






					'factory_address': this.form.factoryaddress,
					'company_established_year': this.form.companyestablishedyear,
					'no_of_employees_factory': this.form.numberofworkersinfactory,
					'no_of_employees_total': this.form.numberofemployees,

					'bank_account_name': this.form.accountname,
					'bank_account_no': this.form.accountnumber,
					'bank_iban': this.form.iban,
					'bank_name': this.form.bankname,
					'bank_address': this.form.bankaddress,
					'bank_swift': this.form.swiftcode,
					'categories': this.categories
			};

			// console.log(data);

			this.formloading = true;

			this.$store.dispatch("auth/supplierRegistration_a", {
			  data: data
			})
			.then(response => {

				  if (response.status == 200) {

						this.isSteptwo = false
						this.isComplete = true
						this.formloading = false;

				  } else {

						this.$v.$touch();

				  }

			})
			.catch(e => {

			  console.log(e);
			  this.formloading = false;

			})
			.finally(() => {

			  this.formloading = false;

			});

		

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
		console.log(e);
	  });

  },



}

</script>
<style scoped lang="scss">

.registration_container {
	overflow-y: auto;
	height: 100vh;
}

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
  // top: 30%;
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


.agree {
	
	margin-top: 20px;

	p {

		font-weight: 400;
		line-height: 23px;
		min-height: 16px;
		-webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
		transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
		font-size: 12px;
		color: grey;
	
		span {
				display: block;
		}

	}
}


.videocontent { 

	 width: 100%;
	 height:304px;
	 display: flex;
	 justify-content: center;
	 align-content: center;
	 flex-flow: row column;
	 /*padding: 50px;*/

}

.videocontent iframe {
	border-radius:2%; /*use for circle 50% */
	border:solid 0px #999;
	width: 100%;
	height: 100%;


}

#player {

	width: 100%;
	height: 100%;

}

#player-wrapper {
   
	border-radius:2%;  /* use for circle 50% */
	border:solid 0px #999;
	overflow:hidden;
	position: relative;
	width: 100%;
	/*top:40px;*/
	z-index:10;
   -webkit-box-shadow: 1px 11px 20px 4px rgba(0,0,0,0.28);
   -moz-box-shadow: 1px 11px 20px 4px rgba(0,0,0,0.28);
   box-shadow: 1px 11px 20px 4px rgba(0,0,0,0.28);
   /*float: left;*/
   /*margin: 50px;*/
 
}

.video-area h6 {

	color: white;
	margin-top: 20px;
	font-weight: lighter;
	font-size: 13px;

}


</style>

<style scoped lang="scss">


@media only screen and (max-width: 959px) {


	.registration-first {
		.container {
			padding: 16px;
			height: 100vh;
			overflow-y: scroll;
		}
	  	// top: 61%;
	}

	.frmcontainer {
	}

	.page-content {
		position: relative;
		top: 8%;
		padding: 20px;
		margin-bottom: 164px;
		// display: none;
	}

	.registration-success {
		position: relative;
		width: 100%;
		padding: 10px;
	}

	.registration-success .heading h1{
			text-align: center;
			font-size: 2rem;
	}



}

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




.logo {
  margin: 50px 29px -30px;
  width: 180px;

}
</style>
