<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" style="background: rgba(0,0,0,0.4);">

	<div class="registration_container" id="">

				<div class="registration-first" v-show="isStepOne">
				  <v-container>
					<v-flex lg12 xs12>
					  <v-layout row wrap>
						<v-flex lg4 xs12 offset-lg2>
							<!-- FOR 1ST STEP -->
							<div>
							  <v-card class="pa-5">
								<div class="headline font-weight-medium text-xs-center">SIGN UP</div>
								<!-- <h4 color="grey--text" class="mt-2 text-xsc font-weight-light">Sign-up to find the lights that you are looking for.</h4> -->
								<v-layout row wrap>
								  <v-form @submit.prevent="$v.$invalid ? null : '' " ref="form" class="mt-3">
									<v-layout wrap row>



									  <!-- <v-flex xs12 pa-0><h1><pre>{{ $v.form }}</pre></h1></v-flex> -->

									  <v-flex xs12 pa-0>

										<v-text-field 
										color="black" 
										label="First Name" 
										v-model="form.first_name" 
										required 
										:error-messages="fieldErrors('form.first_name')" >
										</v-text-field>

										<v-text-field 
										color="black" 
										label="Last Name" 
										v-model="form.last_name" 
										required 
										validate-on-blur
										:error-messages="fieldErrors('form.last_name')" >
										</v-text-field>

										<v-text-field 
										color="black" 
										label="Email Address" 
										v-model="form.email" 
										placeholder=" "
										required
										:error-messages="fieldErrors('form.email')">
										</v-text-field>




										<v-text-field 
										color="black" 
										label="Password" 
										v-model="form.password" 
										placeholder=" "
										required type="password" 
										:error-messages="fieldErrors('form.password')" >
										</v-text-field>

										<v-text-field 
										color="black" 
										label="Confirm Password" 
										v-model="form.confirmpassword" 
										required type="password" 
										:error-messages="fieldErrors('form.confirmpassword')" >
										</v-text-field>

									  </v-flex>

									  <v-flex xs12 offset-xs4>
										<v-layout row wrap text-xs-center>
										  <!-- Login form submit -->
										  <v-flex xs6 class="white--text no-mrpd mt-3">
											<v-btn   color="black" type="submit" class="white--text" :loading="formloading" block @click="save()"> <span class="white--text font-weight-light ls-1" style="">SIGN UP</span></v-btn>
										  </v-flex>
										</v-layout>
									  </v-flex>
									  <v-flex xs12 mt-3>
										<p class="black--text text-xs-center font-weight-bold">
											<strong>
												Existing User ? Click 
												<router-link :to="{ name: 'Login' }" style="border-bottom: 1px solid #000;">here</router-link> 
												to login.</strong>
										</p>
									  </v-flex>
									</v-layout>
								  </v-form>
								</v-layout>
							  </v-card>
							</div>
							<!-- FOR 1ST STEP -->
						</v-flex>
						 <v-flex lg4 xs12  class="page-wrap">
							<v-layout row wrap fill-height>
							  <div >
								<!-- heading message -->
								  <div class="page-content">
									<h1 class="white--text header-title">Ready to get the best price the market can offer? </h1>
									<h4 class="white--text font-weight-light sub-header-title mt-4">
								  Please take a few moments to register and find out what we can do for your next LED lighting project! Rest assured, we’ll be with you every step of the way.</h4>
								  <!-- heading message -->

									<!-- <div class=" videocontent mt-5">
										<div id="player-wrapper">
										 <iframe width="560" height="315"  src="https://www.youtube.com/embed/aaJQLTaSgLk?autoplay=0&controls=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1&widget_referrer=https%3A%2F%2Fplyr.io%2F%23youtube&cc_load_policy=0&cc_lang_pref=auto&enablejsapi=1&origin=https%3A%2F%2Fplyr.io&widgetid=1?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe>
										</div>
									</div> -->
									<v-container fluid>
									<v-layout row wra justify-center align-center fill-height>
										<a href="https://buyanylight.com" target="_blank">
											<img class="logo" src="/static/logos/logo-white.png" alt="BuyAnyLight.com">
										</a>
									</v-layout>
									</v-container>


									</div>


							  </div>
							</v-layout>
						</v-flex>
					  </v-layout>
					</v-flex>
				  </v-container>
				</div>

				<div class="registration-success" v-show="isComplete">
					 <v-flex md6 xs12 class="offset-md3">
							<v-card class=pa-5>
								<v-layout row wrap justify-center>
									<div class="heading">
										<h1 class="font-weight-bold">THANK YOU <span style="text-transform: uppercase;" v-html="form.first_name"></span>!</h1>	
									</div>
									<div class="main-content mt-3">
										<!-- <i class="fa fa-check"></i> -->
										<!-- <p class="main-content__body">
											THANK YOU FOR YOUR TIME, CONSIDERATION AND TRUST BUYANYLIGHT! IF YOU HAVE ANY FURTHER QUESTIONS, PLEASE CONTACT US ON: INFO@BUYANYLIGHT.COM
										</p> -->

										<p class="main-content__body">
										   Registration confirmation: Thank you for interest in BuyAnyLight. If you have any further questions,please contact us at info@buyanylight.com.
										</p>

									<!-- 	<h3 class="font-weight-medium">What happens next?</h3>

										<p class="main-content__body mt-3">
										  A verification link has been sent to your email account. please click on the link provided and continue using buyanylight.com. <a href="">if not received please click here!</a>
										</p>
										
										<p class="main-content__body mt-3">
										 for the mean time, you can browse our packages below.
										</p> -->

									</div>

									<div>
										

										<v-flex xs12>

												<div class="pricing-container" style="display: none;">

														<v-flex xs4>
														  
															<!-- <div class="col-md-4"> -->
															<div class="pricing-item-container ">

																<div class="pricing-item grey">

																	<div class="pricing-item-title gold">

																		<h1>Gold</h1>
																		<h2>G+P+10</h2>

																	</div>

																	<div class="pricing-body">

																		<div class="pricing-item-list">

																			<ul>
																				<li> <i class="fas fa-check"> </i>
																					<span style="font-size: 20px;text-transform: uppercase;">Free Quotation</span>
																				</li>

																																									<li> <i class="fas fa-check"> </i> &nbsp;&nbsp;
																						Project Lighting Consultation                                                                                    </li>
																																										<li> <i class="fas fa-check"> </i> &nbsp;&nbsp;
																						2 Times of Revision Request                                                                                    </li>
																																										<li> <i class=" fas fa-check"> </i> &nbsp;&nbsp;
																						Designated Lighting Designer                                                                                    </li>
																																										<li> <i class="fas fa-check"> </i> &nbsp;&nbsp;
																						Request a Sample                                                                                    </li>
																																										<li> <i class=" fas fa-check"> </i> &nbsp;&nbsp;
																						Make your own Quote                                                                                    </li>
																																								</ul>
																		</div>

																		<div class="pricing-item-price">
																			<h1 class="text-light-gold">$ 1599 <span> / PROJECT SUBSCRIPTION FEE </span> </h1>
																		</div>

																		<!-- <p> it will be charged at the time of purchase </p> -->

																	</div>

																 <!--    <div class="text-xs-center button-holder">
																		<a class="button gold" href="#">Learn More</a>
																		<a class="button-outline text-light-gold border-light-gold" onclick="scrollToSection('#corporate')">Learn More</a>
																	</div>
																				  -->                                                

																																	</div>

															</div>
															<!-- </div> -->
														</v-flex>
														

														<v-flex xs4>
															  
															
															<!-- <div class="col-md-4"> -->
															<div  class="pricing-item-container ">
																<div class="pricing-item grey">

																	<div class="pricing-item-title diamond">

																		<h1>Diamond</h1>
																		<h2>G+P+20</h2>

																	</div>

																	<div class="pricing-body">

																		<div class="pricing-item-list">

																			<ul>
																				<li> <i class="fas fa-check"> </i>
																					<span style="font-size: 20px;text-transform: uppercase;">Free Quotation</span>
																				</li>

																																									<li> <i class="fas fa-check"> </i> &nbsp;&nbsp;
																						Project Lighting Consultation                                                                                    </li>
																																										<li> <i class="fas fa-check"> </i> &nbsp;&nbsp;
																						3 Times of Revision Request                                                                                    </li>
																																										<li> <i class=" fas fa-check"> </i> &nbsp;&nbsp;
																						Designated Lighting Designer                                                                                    </li>
																																										<li> <i class="fas fa-check"> </i> &nbsp;&nbsp;
																						Request a Sample                                                                                    </li>
																																										<li> <i class=" fas fa-check"> </i> &nbsp;&nbsp;
																						Make your own Quote                                                                                    </li>
																																								</ul>
																		</div>

																		<div class="pricing-item-price">
																			<h1 class="text-diamond">$ 1999 <span> / PROJECT SUBSCRIPTION FEE </span> </h1>
																		</div>

																		<!-- <p> it will be charged at the time of purchase </p> -->

																	</div>

																  <!--   <div class="text-xs-center button-holder">
																	  <a class="button diamond" href="#">Learn More</a>
																	  <a class="button-outline text-diamond border-diamond" onclick="scrollToSection('#corporate')">Learn More</a>
																  </div> -->
																</div>
															</div>
															<!-- </div> -->
														</v-flex>    
														

														<v-flex xs4>
															  
															
															<!-- <div class="col-md-4"> -->
															<div  class="pricing-item-container ">

																<div class="pricing-item grey">

																	<div class="pricing-item-title platinum">

																		<h1>Platinum</h1>
																		<h2>G+P+20</h2>

																	</div>

																	<div class="pricing-body">

																		<div class="pricing-item-list">

																			<ul>
																				<li> <i class="fas fa-check"> </i>
																					<span style="font-size: 20px;text-transform: uppercase;">Free Quotation</span>
																				</li>

																																									<li> <i class="fas fa-check"> </i> &nbsp;&nbsp;
																						Project Lighting Consultation                                                                                    </li>
																																										<li> <i class="fas fa-check"> </i> &nbsp;&nbsp;
																						4 Times of Revision Request                                                                                    </li>
																																										<li> <i class=" fas fa-check"> </i> &nbsp;&nbsp;
																						Designated Lighting Designer                                                                                    </li>
																																										<li> <i class="fas fa-check"> </i> &nbsp;&nbsp;
																						Request a Sample                                                                                    </li>
																																										<li> <i class=" fas fa-check"> </i> &nbsp;&nbsp;
																						Make your own Quote                                                                                    </li>
																																								</ul>
																		</div>

																		<div class="pricing-item-price">
																			<h1 class="text-platinum">$ 2499 <span> / PROJECT SUBSCRIPTION FEE </span> </h1>
																		</div>

																		<!-- <p> it will be charged at the time of purchase </p> -->

																	</div>

																 <!--    <div class="text-xs-center button-holder">
																	 <a class="button platinum" href="#">Learn More</a>
																	 <a class="button-outline text-platinum border-platinum" onclick="scrollToSection('#corporate')">Learn More</a>
																 </div>
																  -->
																</div>
															</div>
															<!-- </div> -->
															</v-flex>    
											</div>
										  
										</v-flex>

										
									</div>

								</v-layout>
							</v-card>  
					   </v-flex>
				</div>
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




export default {

mixins: [validationMixin],

validations: {
	form: {
		email: { 
			required, 
			email, 
			isUnq(value){				
				// standalone validator ideally should not assume a field is required
				if (value === '' || value === null) 
				return true
				else
				return this.$store.dispatch('auth/isEmailExist_a',{email:value});
			}, 
		},
		first_name: { required },
		last_name: { required }, 
		password: { required, minLength: minLength(6) },
		confirmpassword: {
			required,
			sameAsPassword: sameAs('password')
		},
		
	},
},

validationMessages: {

	form: {

	   first_name: { required: 'Please enter your first name.'},
	   last_name: { required: 'Please enter your last name.' },
	   email: { required: 'Please enter email', email: 'Email must be valid', isUnq: 'Email is already registered.' },
	   password: { required: 'Please enter password', minLength: 'Password must be of 6 characters' },	
	   confirmpassword: { required: 'Please confirm your Password.', sameAsPassword: 'Password does not match' },
		

	}

},



components: {

},

data () {

  return {
	type: 'buyer',
	backgroundImg: '/static/background/buyer-background2.jpg',
	logo: '/static/logos/logo-white.png',
	// form: Object.assign({}, dform),
	// form: {
	// 	email: 'james99@gmail.com',
	// 	password: '123456',
	// 	confirmpassword: 'belatting',
	// 	first_name: 'Leon',
	// 	last_name: 'Lapid',
	// },
	form: {
		email: null,
		password: null,
		confirmpassword: null,
		first_name: null,
		last_name: null,
	},
	formloading: false,
	isStepOne: true,
	isComplete: false,

  }

},


computed:{
	emailPending(){
		return this.$v.form.email.$pending;
	}, 

},

methods: {

	save() {

		
		this.$v.$touch();

		if (!this.$v.$invalid) {

				this.formloading = true
				let data = {
					'first_name': this.form.first_name,
					'last_name': this.form.last_name,
					'email': this.form.email,
					'password': this.form.password,
					'confirm_password': this.form.confirmpassword,
				};

				this.$store.dispatch('auth/buyerRegistration_a', {
					data: data,
				})
				.then((response) => {
					// this.formloading = false
					// console.log(response);
					if (response.status == 200) {
						this.isStepOne = false
						this.isComplete = true
						this.formloading = false
					} else {
						this.$v.$touch()
					}
				})
				.catch((e) => {			        
					this.formloading = false
				})
				.finally(() => {
					 this.formloading = false
				})


			}

	},

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

.registration-stepper {

  // position: absolute;
  // // top: 40%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // width: 75%;
  // margin-top: 25%;

}

.registration-success {

  position: relative;
  // top: 10%;
  width: 100%;
	  padding-bottom: 80px;

  .heading {

	h1 {

		font-size: 3rem;
		font-weight: bolder;
		color: #555857;

	}

  }
  .main-content {

	// text-align: center;
	
	i {
			color: #24b663;
			font-size: 2rem;
	}

	p {

		font-weight: 500;
		font-size: 1rem;
		color: #555857;
		letter-spacing: 1px;
		font-weight: 100;

	}



  }

}


.logo {
  margin: 50px 29px -30px;
  width: 180px;

}

.page-vimg {
	// height: 100vh;
	// overflow-y: scroll !important;
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
  // top: 8%;
  padding: 20px;
  // padding: 100px;
    height: 100%;

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
		> .container {
			padding: 16px;
			height: 100vh;
			overflow-y: scroll;
		}

	  // top: 64%;

	}

	.page-content {
		position: relative;
		top: 8%;
		padding: 20px;
		margin-bottom: 164px;
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

ul {

		list-style-type: none;
		padding-left: 0px;

	}






/* PRICING */

.pricing-area  {

	/*background-image: url(../img/section_images/pricing.PNG);*/
	background-position: bottom;
	background-size: cover;
	width: 100%;
	background-color: transparent;
/*     padding-top: 50px;
	padding-bottom: 50px;*/
}


.pricing-header {
	margin: 0 auto;
	width: 100%;
	display: flex;
	justify-content: center;
}

.pricing-header h1 {
	color: #000;
	text-align: center;
	font-size: 30px;

}

.pricing-header h6 {
	color: gray;
	text-align: center;
	font-size: 15px;
}


.pricing-header h6:after {
	content: '';
	position: absolute;
	height: 3px;
	width: 81px;
	background: #000;
	top: 70px;
	left: 47%;

}


.pricing-container {

	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 50px 50px 10px 50px;
	text-align: left;

}


.pricing-item {
	/*padding: 20px;*/
	box-shadow: 0px 0px 0px grey;
	-webkit-transition:  box-shadow .6s ease-out;
	box-shadow: .8px .9px 3px grey;
	margin-left: 10px;
	border-top-left-radius: 11px;
	border-top-right-radius: 11px;
}

.pricing-body {
	/*padding: 25px 0px 0px 20px;*/
	padding: 10px;
	background-color: white;
	padding-bottom: 20px;
}

.button {
	display: inline-block;
	border-radius: 50px;
	padding: 0px 10px;
	color: white;
	font-size: 9.5px;
	font-weight: 500;
	line-height: 34px;
	outline: none !important;
	box-shadow: none !important;
	text-align: center;
	cursor: pointer;
	transition: all 300ms linear 0s;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.button-holder {
	padding: 20px;
	background: white;
}


.button-outline {
	display: inline-block;
	border-radius: 50px;
	padding: 0px 10px;
	color: black;
	font-size: 9.5px;
	font-weight: 500;
	line-height: 29px;
	outline: none !important;
	box-shadow: none !important;
	text-align: center;
	cursor: pointer;
	transition: all 300ms linear 0s;
	text-transform: uppercase;
	letter-spacing: 1px;
}

.pricing-item:hover{ 
	 box-shadow: 1px 8px 20px grey;
	-webkit-transition:  box-shadow .6s ease-in;
}

.grey {
	background:#f6f6f6;
}

.white {
	background: #ffffff;
}


/* for enterprise coloring */

.light-blue{
	background: #0c8db3;
	color: #ffffff;
}

.text-light-blue {
	color: #0c8db3 !important;
}

.border-light-blue {
	border: 1px solid #0c8db3;  
}

.dark-blue{
	background: #0a3265;
	color: #ffffff;
}

.text-dark-blue {
   color: #0a3265 !important;
}

.border-dark-blue {
	border: 1px solid #0a3265;
}

.blue{
  background: #2b4271;
  color: #ffffff;
}

.text-blue {
  color: #2b4271 !important;
}

.border-blue {
 border: 1px solid #2b4271;
}

/* for enterprise coloring */




/* for corporate coloring  */

.gold{
  background: #b59807;
  color: #ffffff;
}

.text-light-gold {
	color: #b59807 !important;
}

.border-light-gold {
	border: 1px solid #b59807;  
}


.diamond{
  background: #595b5b;
  color: #ffffff;
}

.text-light-diamond {
	color: #595b5b !important;
}

.border-light-diamond {
	border: 1px solid #595b5b;  
}


.platinum{
  background: #708589;
  color: #ffffff;
}

.text-platinum {
	color: #708589 !important;
}

.border-platinum {
	border: 1px solid #708589;  
}
/* for corporate coloring  */






.basics{
  background: #007991;
  color: #ffffff;
}

.text-basics {
	color: #007991 !important;
}

.border-basics {
	border: 1px solid #007991;  
}



.essential{
  background: #131313;
  color: #ffffff;
}


.text-essential {
	color: #131313 !important;
}

.border-essential {
	border: 1px solid #131313;  
}





.pricing-item-title {
	padding: 31px 1px 28px 28px;
	border-top-left-radius: 11px;
	border-top-right-radius: 11px;
	background-image: url("https://www.transparenttextures.com/patterns/rice-paper-3.png");
}

.pricing-item-title h1 {

	font-size: 13px;
	letter-spacing: 2px;
	text-transform: uppercase;
	color: white;

}


.pricing-item-title h2 {

	font-size: 17px;
	letter-spacing: 2px;
	text-transform: uppercase;
	font-weight: 200;

}

.pricing-item-price h1 {
	   font-size: 25px !important;
	margin-bottom: 12px;
	text-align: center;
	margin-right: 30px;
}

.pricing-item-price h1 span {
	color: gray;
	font-size: 10px;
}

.pricing-item-list ul li {
	font-size: 11px;
	color: black;
	padding: 5px;
}

.pricing-item-list p {
	color: #ab1212;
	font-size: 14px;
	font-weight: 900;
}

.pricing-item-list i {
	margin-right: 15px;
}





.grey {
	background:#f6f6f6;
}

.white {
	background: #ffffff;
}




</style>
