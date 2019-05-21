<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" style="background: rgba(0,0,0,0.4);">

  	<div class="registration_container" id="">

  		  	<img class="logo" src="/static/logos/logo-white.png">
			    <div class="registration-first" v-show="isStepOne">
			      <v-container>
			        <v-flex lg12 xs12>
			          <v-layout row wrap>
			            <v-flex lg4 xs12 offset-lg2>
			                <!-- FOR 1ST STEP -->
			                <div>
			                  <v-card class="pa-5">
			                    <div class="headline font-weight-medium text-xs-center">SIGN UP</div>
			                    <h4 color="grey--text" class="mt-2 text-xsc font-weight-light">Sign-up to find the lights that you are looking for.</h4>
			                    <v-layout row wrap>
			                      <v-form @submit.prevent="$v.$invalid ? null : '' " ref="form" class="mt-3">
			                        <v-layout wrap row>

			                          <v-flex xs12 pa-0>

			                            <v-text-field 
			                            color="black" 
			                            label="First Name" 
			                            v-model="form.first_name" 
			                            required 
			                            :error-messages="fieldErrors('form.first_name')" 
			                            @blur="$v.form.first_name.$touch()">
			                            </v-text-field>

			                            <v-text-field 
			                            color="black" 
			                            label="Last Name" 
			                            v-model="form.last_name" 
			                            required 
			                            :error-messages="fieldErrors('form.last_name')" 
			                            @blur="$v.form.last_name.$touch()">
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
			                              <v-flex xs6 class="white--text no-mrpd mt-3">
			                                <v-btn   color="black " type="submit" :loading="formloading" block @click="save()"> <span class="white--text font-weight-light ls-1" style="">SIGN UP</span></v-btn>
			                              </v-flex>
			                            </v-layout>
			                          </v-flex>
			                          <v-flex xs12 mt-3>
			                            <router-link :to="{ name: 'Login' }">
			                              <p class="black--text text-xs-center font-weight-bold"><strong>Existing User ? Click here to login</strong></p>
			                            </router-link>
			                          </v-flex>
			                        </v-layout>
			                      </v-form>
			                    </v-layout>
			                  </v-card>
			                </div>
			                <!-- FOR 1ST STEP -->
			            </v-flex>
			             <v-flex lg4 xs12  class="page-wrap">
			            	<v-layout row wrap>
			            	  <div >
					            <!-- heading message -->
					              <div class="page-content">
					                <h1 class="white--text header-title">How to become a BAL Buyer?</h1>
					                <h4 class="white--text font-weight-light sub-header-title">We are committed to helping you 	increase your turnover significantly and become as competitive as possible. Sign up now 	and start receiving inquiries from buyers across the globe. </h4>
					              </div>
					              <!-- heading message -->
			            	  </div>
			            	</v-layout>
			            </v-flex>
			          </v-layout>
			        </v-flex>
			      </v-container>
			    </div>

			    <div class="registration-success" v-show="isComplete">
					 <v-flex xs6 class="offset-xs3">
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
										   Thank you for the your time, consideration and trust buyanylight! if you have any further questions, please contact us on: info@buyanylight.com
										</p>

										<h3 class="font-weight-medium">What happens next?</h3>

										<p class="main-content__body mt-3">
										  A verification link has been sent to your email account. please click on the link provided and continue using buyanylight.com. <a href="">if not received please click here!</a>
										</p>
										
										<p class="main-content__body mt-3">
										 for the mean time, you can browse our packages below.
										</p>

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

import helpers from "@/mixins/helpers";
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import config from '@/config/index'



  const dform = {

	  email: 'james@gmail.com',
	  password: 'belatting',
	  confirmpassword: 'belatting',
	  first_name: 'Leon',
	  last_name: 'Lapid'

  }

  export default {

  	mixins: [validationMixin],

  	  validations: {

	    form: {

	      email: { required, email },
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
		      email: { required: 'Please enter email', email: 'Email must be valid' },
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
        form: Object.assign({}, dform),
      	formloading: false,
        isStepOne: true,
        isComplete: false,

      }

    },
    methods: {

    	save() {



    		if (this.$v.$invalid) {
       	      this.$v.$touch()
    		} else {

			      this.formloading = true

			      let data = {

			      	'first_name': this.form.first_name,
			      	'last_name': this.form.last_name,
			      	'email': this.form.email,
			      	'password': this.form.password,
			      	'confirm_password': this.form.confirmpassword

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

			          } else {

			          	   this.$v.$touch()
			         
			          }

			        })
			        .catch((e) => {
			        	  console.log(e);
			        	  this.formloading = false
			        })
			        .finally(() => {
			         	 this.formloading = false
			        })

		        }

    	},

    }

  }
  
</script>



<style scoped lang="scss">

.registration_container {
	overflow-y: scroll;
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
	    text-transform: capitalize;

  	}



  }

}


.logo {
  margin: 22px 29px 15px;
  width: 81px;

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
