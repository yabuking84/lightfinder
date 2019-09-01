<template>
<span>

	  	<v-form class="form pa-3">
	    <v-container>
	    <v-layout row wrap>

			<v-flex xs12 style="text-align: center;">
				<h1 class="mt-2">CONTACT US</h1>
				<p class="mb-0 mt-2">
					You can also get in touch with us and we'll get back to you.
				</p>
			</v-flex>

			<v-flex xs6>
        		<v-text-field
        		v-model="formData.name"
        		label="Name"></v-text-field>
			</v-flex>

			<v-flex xs6>
        		<v-text-field
        		v-model="formData.email"
				:error-messages="fieldErrors('formData.email')" 
        		label="Email"></v-text-field>
			</v-flex>

			<v-flex xs12>
        		<v-text-field
        		v-model="formData.subject"
        		label="Subject"></v-text-field>
			</v-flex>

			<v-flex xs12>
		        <v-textarea outline
        		v-model="formData.message"
		        label="Message"></v-textarea>
			</v-flex>

			<v-flex xs12>
		        <v-btn 
		        @click="submit()"
		        :loading="btnLdng"
		        class="black white--text">submit</v-btn>
			</v-flex>


    	</v-layout>
    	</v-container>
    	</v-form>





		<v-dialog v-model="dialog" width="600px">
			<v-card>
				<!-- <v-card-title class="headline white black--text py-2" primary-title>
					<v-layout row wrap justify-end>
						<v-btn 
						@click="closeDialog()"
						fab small flat
						class="white black--text">
							<v-icon>fas fa-close</v-icon>
						</v-btn>
					</v-layout>
				</v-card-title> -->

				<v-card-text>

					<v-container>
						<v-layout row wrap align-center>
							<v-flex xs6 style="text-align: center;">
								<img style="height: 150px;" src="/static/logos/logo-black.png"/>
							</v-flex>
							<v-flex xs6 style="text-align: center;">
								<v-btn 
								@click="dialog=false"
								fab small flat
								class="white black--text closeBtn">
									<v-icon>fas fa-close</v-icon>
								</v-btn>								
								<h1 class="mb-2">Thank you!</h1>
								<p>We will get back to you shortly.</p>
							</v-flex>
						</v-layout>
					</v-container>

				</v-card-text>

			</v-card>
		</v-dialog>



</span>
</template>


<script>
import validationMixin from '@/mixins/validationMixin'
import { required, email } from 'vuelidate/lib/validators'
	
export default {
	mixins:[	
		validationMixin,
	],

	props:['subject'],
	
	validations: {
		formData: {
			email: { required, email },
		},
	},

	validationMessages: {
		formData: {
			email: { 
				email: 'not a valid email', 
				required: 'email is required', 
			},
		},
	},


	data(){return {
		btnLdng: false,

		dialog: false,

		formData:{
			name: this.$store.state.auth.auth_user.firstname+" "+this.$store.state.auth.auth_user.lastname,
			email: this.$store.state.auth.auth_user.email,
			subject: this.subject,
			message: '',
		},
	}},

	methods: {
		submit(){
			this.btnLdng = true;

			this.$v.$touch();

			if(!this.$v.formData.$error) {

				this.$store.dispatch(this.getStore('auth')+'/sendContactUs_a', {
					...this.formData,    				
    				phone: '',
				})
				.then((rspns)=>{
					// alert(rspns);
					this.btnLdng = false;
					this.dialog = true;
				})
				.catch((e)=>{
					console.log(e);
				});

			}
		},
	},

	watch:{
		subject:{
			handler(nVal,oVal){
				this.formData.subject = nVal;
			},
		},
	},


}
</script>



<style scoped lang="scss">
.v-text-field--outline:not(.v-input--is-focused):not(.v-input--has-state) > /deep/ .v-input__control > .v-input__slot:hover,
.v-text-field--outline > /deep/ .v-input__control > .v-input__slot {
	border: 1px solid #000;
}

.form {
	width:500px; 
	background-color: #fff; 
	border: 1px solid #000; 
	color: #000;	
}	


.closeBtn {
    position: absolute !important;
    right: 10px;
    top: 10px;	
}
</style>
