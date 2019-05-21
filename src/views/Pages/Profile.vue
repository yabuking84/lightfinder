<template>
	<div>
		  
		<v-container my-4>

			<v-layout row wrap>
				
				<v-flex xs5>
					<v-layout row wrap>

						<v-flex xs12 mb-4>
							<v-layout column align-center justify-center>
								<v-avatar
								size="356"
								color="grey lighten-4">
									<img :src="avatarImg" alt="avatar">
								</v-avatar>
							</v-layout>
						</v-flex>

						<v-flex mt-4 xs12 px-3>
							<v-btn 
							class="mb-4 mt-4"
							style="height: 50px; min-width: auto; width: 60px;"
							color="grey darken-4" 
							dark
							@click="showUploadProfileImage = !showUploadProfileImage" 
							:loading="formloading">
								<v-icon>fas fa-edit</v-icon>
							</v-btn>

							<template v-if="showUploadProfileImage">
							<v-layout row wrap>
								<!-- OEM DROPZONE  -->
								<vue-dropzone 
								id="dropzone_profileimage" 
								ref="dropzone_profileimage" 
								:options="dropzoneOptions" 
								:useCustomSlot="useCustomSlot"
								:awss3="getAWSS3('add-inquiry-oems')"
								@vdropzone-removed-file="vdz_removedFile"
								@vdropzone-success="vdz_success($event,'add-inquiry-oems')">
									<div class="dropzone-custom-content">
										<h3 class="dropzone-custom-title">Drag and drop to change your profile image</h3>
										<div class="subtitle">..or click to select a file from your computer</div>
									</div>
								</vue-dropzone>
								<!-- OEM DROPZONE  -->							
							</v-layout>

							<!-- v-if="showSaveProfileImage" -->
							<v-btn 
							class="mt-2 ml-0"
							color="success"
							dark  
							title="Save Image!"
							@click="saveProfileImage()"
							:loading="formloading">
								<v-icon class="mr-3">far fa-save</v-icon> Save New Profile Image
							</v-btn>

							</template>
						</v-flex>

					</v-layout>
				</v-flex>

				<v-flex xs7>
					<v-form @submit.prevent="$v.form.$invalid ? null : submitForm()" ref="form">
					<v-layout row wrap>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.first_name" 
							:error-messages="fieldErrors('form.first_name')" 
							@blur="$v.form.first_name.$touch()" 
							label="First Name" 
							required></v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.last_name" 
							:error-messages="fieldErrors('form.last_name')" 
							@blur="$v.form.last_name.$touch()" 
							label="Last Name" 
							required></v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.email" 
							:error-messages="fieldErrors('form.email')" 
							@blur="$v.form.email.$touch()" 
							label="Email Address" 
							required></v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.job_title" 
							:error-messages="fieldErrors('form.job_title')" 
							@blur="$v.form.job_title.$touch()" 
							label="Job Title" 
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.phone" 
							:error-messages="fieldErrors('form.phone')" 
							@blur="$v.form.phone.$touch()" 
							label="Phone" 
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.fax" 
							:error-messages="fieldErrors('form.fax')" 
							@blur="$v.form.fax.$touch()" 
							label="Fax"
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							color="black" 
							v-model="form.address" 
							:error-messages="fieldErrors('form.address')" 
							@blur="$v.form.address.$touch()" 
							label="Address" 
							required>
							</v-text-field>
						</v-flex>
						<v-flex xs10 offset-xs1>
							<!-- v-model="testSelect" -->
							<v-select 
							v-model="form.sel_country_id"
							:items="countries"
							item-text="name" 
							item-value="id" 
							:search-input.sync="search" 
							:error-messages="fieldErrors('form.country_id')" 
							@blur="$v.form.country_id.$touch()" 
							color="black" 
							label="Country" 
							data-vv-name="Country" required>
							</v-select>
						</v-flex>

						<v-flex xs10 offset-xs1>
							<v-layout align-center justify-end>
								<v-btn 
								color="grey darken-4" 
								dark 
								@click="$v.form.$invalid ? $v.form.$touch() : submitForm()" 
								:loading="formloading">
									Submit
								</v-btn>
							</v-layout>
						</v-flex>				
					</v-layout>
					</v-form>


					<!-- <v-form v-model="form.valid" @submit.prevent="" lazy-validation> -->
					<v-form @submit.prevent="$v.passwords.$invalid ? null : submitChangePassword()" ref="form">
					<v-layout row wrap style="margin-top:50px;">
						<v-flex xs10 offset-xs1>
							<v-text-field 
							v-model="passwords.oldPassword"
							:append-icon="showPassword.oldPassword ? 'visibility' : 'visibility_off'"
							:type="showPassword.oldPassword ? 'text' : 'password'"
							:error-messages="fieldErrors('passwords.oldPassword')" 							
							@click:append="showPassword.oldPassword = !showPassword.oldPassword"							
							color="black"
							label="Old Password">
							</v-text-field>									
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							v-model="passwords.newPassword"
							:append-icon="showPassword.newPassword ? 'visibility' : 'visibility_off'"
							:type="showPassword.newPassword ? 'text' : 'password'"
							:error-messages="fieldErrors('passwords.newPassword')" 							
							@click:append="showPassword.newPassword = !showPassword.newPassword"
							color="black"
							label="New Password">
							</v-text-field>									
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-text-field 
							v-model="passwords.newPasswordConfirm"
							:append-icon="showPassword.newPasswordConfirm ? 'visibility' : 'visibility_off'"
							:type="showPassword.newPasswordConfirm ? 'text' : 'password'"
							:error-messages="fieldErrors('passwords.newPasswordConfirm')" 							
							@click:append="showPassword.newPasswordConfirm = !showPassword.newPasswordConfirm"
							color="black"
							label="Confirm New Password">
							</v-text-field>									
						</v-flex>
						<v-flex xs10 offset-xs1>
							<v-layout align-center justify-end>
								<v-btn 
								color="grey darken-4" 
								dark 
								@click="$v.passwords.$invalid ? $v.passwords.$touch() : submitChangePassword()"
								:loading="formloading">
									Change Password
								</v-btn>
							</v-layout>
						</v-flex>
						<v-flex xs6>
							<!-- <v-btn v-text="clear" @click="(clear(), $validator.reset())" type="reset" /> -->
						</v-flex>
					</v-layout>
					</v-form>


				</v-flex>


			</v-layout>
		</v-container>

	</div>
</template>
<script>
import AdminBuyerBus from "@/bus/admin-buyer";
import helpers from "@/mixins/helpers";
import { required, email, minValue, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

import config from '@/config/index'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

const dform = {

	email: '',
	first_name: '',
	last_name: '',
	job_title: '',
	phone: '',
	fax: '',
	address: '',
	country_id: '',

}

export default {

	mixins: [
		validationMixin,
		helpers,
	],

	
	components: {
	    vueDropzone: vue2Dropzone,		
	},


	validations: {

		form: {
			email:       { required, email },
			first_name:  { required },
			last_name:   { required },
			job_title:   { required },
			phone:       { required },
			fax:         { required },
			address:     { required },
			country_id:  { required },
		}, 

		passwords: {
			oldPassword: {
				required,
				minLen: minLength(6),
			},
			newPassword: {
				required,
				minLen: minLength(6),
			},
			newPasswordConfirm: {
				sameAs: sameAs(function(){					
					return this.passwords.newPassword;
				}),
			},
		},

	},


	validationMessages: {

		form: {
			email:      { required: 'Email is Required. ', email: 'Email is Invalid.' },
			first_name: { required: 'First Name is Required.' },
			last_name:  { required: 'Last Name is Required.' },
			job_title:  { required: 'Job Title is Required.' },
			phone:      { required: 'Phone is Required.' },
			fax:        { required: 'fax is Required.' },
			address:    { required: 'Address is Required.' },
			country:    { required: 'Country is Required.' },
		},

		passwords: {
			oldPassword: {
				required: 'Password is required.',
				minLen: 'Minimum of 6 characters.',
			},
			newPassword: {
				required: 'Password is required.',
				minLen: 'Minimum of 6 characters.',
			},
			newPasswordConfirm: {
				sameAs: 'Passwords are not the same.',
			},
		},

	},

	data: () => ({

		form: {

			email:       '',
			first_name:  '',
			last_name:   '',
			job_title:   '',
			phone:       '',
			fax:         '',
			address:     '',
			country_id:  '',

		},

		passwords: {
			oldPassword: 		  null,
			newPassword: 		  null,
			newPasswordConfirm:   null,
		},

		showPassword:{
			oldPassword: false,
			newPassword: false,
			newPasswordConfirm: false,
		},

		countries: [],
		search: '',
		formloading: false,

	    // Dropzone
	    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
	    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
		attachment: null,
        showUploadProfileImage: false,
        showSaveProfileImage: false,
        useCustomSlot: true,
        dropzoneOptions: {
            url: config.main.awss3.urls.inquiry,
            thumbnailWidth: 250,
            maxFilesize: 5,
            maxFiles: 1,
            autoProcessQueue: false,
			maxfilesexceeded: function(file) {
				this.removeAllFiles();
				this.addFile(file);
			},
            headers: {},
            addRemoveLinks: true,            
            dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
        },
	    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
	    // dddddddddddddddddddddddddddddddddddddddddddddddddddd
	    // Dropzone

	}),


	watch: {

	},


	props: ['dialog', 'buyerData', 'is_new', 'buyer_id'],

	computed: {

		authUser () {        
			return this.$store.state.auth.auth_user;
		},

		avatarImg() {
		  
		  if(!this.$store.state.auth.auth_user.avatar)
		  // default image to be download later - https://image.flaticon.com/icons/svg/149/149071.svg
		  this.$store.state.auth.auth_user.avatar = 'https://image.flaticon.com/icons/svg/149/149071.svg'

			return this.$store.state.auth.auth_user.avatar;
		},

		testSelect() {
			return { 
				id: this.authUser.country_id,
			}
		},

	},

	created: function() {

		/*
			get countries
		*/



		this.getCountries()
		.then((response) => {
			this.countries = response;			
			this.fillForm();			
		})
		.catch((e) => {
			console.log('Error: ')
			console.log(e);
		});

		// setTimeout(()=>{
		// 	this.fillForm();			
		// 	this.form.sel_country_id = {id:this.authUser.country_id};
		// },2000);

	},



	methods: {



		fillForm() {
			this.form.email =       this.authUser.email;
			this.form.first_name =  this.authUser.firstname;
			this.form.last_name =   this.authUser.lastname;
			this.form.job_title =   this.authUser.job_title;
			this.form.phone =       this.authUser.phone;
			this.form.fax =         this.authUser.fax;
			this.form.address =     this.authUser.address;
			this.form.country_id =  this.authUser.country_id;
			this.form.sel_country_id =  {id:this.authUser.country_id};
			console.log("form",this.form);
			console.log("testSelect",this.testSelect);

			// reset profile upload_group
			this.showUploadProfileImage = false;
			this.showSaveProfileImage = false;
			this.attachment = null;

		},

		resetForm() {

		  this.form = Object.assign({}, dform)
		  this.$refs.form.reset()
		  this.$v.$reset()

		},

		submitForm() {		

			alert("submitForm!!");
			// if (this.is_new) {
			// 	this.addBuyer()
			// } else {
			// 	this.updateBuyer();
			// }

		},


		addBuyer() {


		  this.formloading = true

		  let data = {

			"email": this.form.email,
			"password": this.form.password,
			"first_name": this.form.first_name,
			"last_name": this.form.last_name,
			"job_title": this.form.job_title,
			"phone": this.form.phone,
			"fax": this.form.fax,
			"address": this.form.address,
			"country_id": this.form.country_id,
		  };

		  console.log(data);

		  this.$store.dispatch('admnByr/postBuyer_a', {
			  data: data,
			})
			.then((response) => {

			  this.formloading = false
			  console.log(response);

			  // create a event bus 
			  this.$emit('update:dialog', false);
			  AdminBuyerBus.emitFormSubmitted()

			  this.resetForm();


			})
			.catch((e) => {
			  console.log(e);
			  this.formloading = false
			})
			.finally(() => {
			  this.formloading = false
			})

		},


		updateBuyer() {

			this.formloading = true

			let data = {

				"email": this.form.email,
				"password": this.form.password,
				"first_name": this.form.first_name,
				"last_name": this.form.last_name,
				"job_title": this.form.job_title,
				"phone": this.form.phone,
				"fax": this.form.fax,
				"address": this.form.address,
				"country_id": this.form.country_id,
				"id": this.buyer_id

			}

			this.$store.dispatch('admnByr/updateBuyer_a', {
				data: data,
			})
			.then((response) => {
				this.formloading = false
				// create a event bus 
				this.$emit('update:dialog', false);
				AdminBuyerBus.emitFormSubmitted()
				this.resetForm();
			})
			.catch((e) => {
				console.log(e);
				this.formloading = false
			})
			.finally(() => {
				this.formloading = false
			})

		},

		closeDialog() {
			this.$emit('update:dialog', false);
			this.$emit('update:is_new', false);
			this.$emit('update:buyer_id', null);
			this.resetForm();
		},


		submitChangePassword(){
			alert("Submit Change Passsword!!");
		},



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

		vdz_removedFile: function(file, error, xhr){
			console.log("file",file);

			// clear attachment
			this.showSaveProfileImage = false;
			this.attachment=null;
		},

		vdz_s3UploadSuccess: function(s3ObjectLocation){
			// console.log("vdz_s3UploadSuccess",s3ObjectLocation);
		},

		vdz_success(file, upload_group){
			// console.log("vdz_success file = ",file);
			// console.log("vdz_success upload_group = ",upload_group);

			if(file.status=='success') {

				this.attachment = {
					location: file.s3ObjectLocation,
					filename: file.name,
					filetype: file.type,
					filegroup: upload_group,
					filesize: _.round((file.size/1000), 2),
				};

				this.showSaveProfileImage = true;

				console.log('UPLOADED!');
				console.log('this.attachment',this.attachment);



			}

			// if(upload_group=='attachments')    
			// action = "add-inquiry-attachments";
			// else if(upload_group=='images')
			// action = "add-inquiry-images";
			// else
			// action = "add-inquiry-attachments";



			// this.formData.attachments.push({

			// });

		},

		saveProfileImage(){
			this.$refs.dropzone_profileimage.processQueue();
			
			// console.log('saveProfileImage()');
			// console.log('getQueuedFiles',this.$refs.dropzone_profileimage.getQueuedFiles());

		},
		// dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
		// dddddddddddddddddddddddddddddddddddddddddddddddddddd
		// Dropzone

	},
}

</script>



<style></style>
