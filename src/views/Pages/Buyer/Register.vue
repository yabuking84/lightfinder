<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" style="background: rgba(0,0,0,0.4);">
	   	
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
	                      <v-form @submit.prevent="$v.$invalid ? null : FirstStep() " ref="form" class="mt-3">
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
	            </v-flex>
	             <v-flex lg4 xs12  class="page-wrap">
	            	<v-layout row wrap>
	            	  <div >
			            <!-- heading message -->
			              <div class="page-content">
			                <h1 class="white--text header-title">How to become a BAL Buyer?</h1>
			                <h4 class="white--text font-weight-light sub-header-title">We are committed to helping you increase your turnover significantly and become as competitive as possible. Sign up now and start receiving inquiries from buyers across the globe. </h4>
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

	  email: 'james@gmail.com',
	  password: 'belatting',
	  confirmpassword: 'belatting',
	  // username: 'kabayan06',
	  first_name: 'Leon',
	  last_name: 'Lapid'


  }

  export default {

  	mixins: [validationMixin],

  	  validations: {

    form: {

      email: { required, email },
      username: { required },
      password: { required, minLength: minLength(6) },
      confirmpassword: {

        required,
        sameAsPassword: sameAs('password')
      },

      first_name: { required },
      last_name: { required }

    },

  },

    validationMessages: {

    form: {

      username: { required: 'Please enter an Username ' },
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
        isStepOne: true,
        isComplete: false,
              form: Object.assign({}, dform),


      }
    },
    methods: {

    }

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

.registration-stepper {

  // position: absolute;
  // // top: 40%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // width: 75%;
  // margin-top: 25%;

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
