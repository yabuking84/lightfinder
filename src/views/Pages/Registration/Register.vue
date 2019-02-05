<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" >
      <img class="logo" src="/static/bal-logo.png">
      <v-container fill-height pa-0>
          <v-layout row wrap mt-5  px-5 * 3 justify-center>

             <v-flex xs6 class="pl-5 mt-5">

                <div class="mt-5 px-5"> 

                    <div mt-3>
                      <h1 class="white--text">Registration</h1>
                      <h4 class="white--text font-weight-light" >Buyer needs to register in order to obtain their log-in details</h4>
                    </div>

                    <div mt-4>
                      <h1 class="white--text">Buyers</h1>
                      <h4 class="white--text font-weight-light" >Register now to get access of thousand of reliable LED light manufacturers across the nation</h4>
                    </div>

                    <div class="mt-5 mb-3">
                      <h4 class="white--text font-weight-light">or Signup here</h4>
                    </div>
                    
                    <v-layout row column>
                        <a class="socialbox pinterest"  href="javascript:void(0)">
                          <div class="social-icon">
                            <i style="color: white !important" class="fa fa-fw fa-google"></i>
                          </div>
                          <div class="description">
                            <span class="ng-binding"></span>
                            <span>SIGN UP WITH GOOGLE</span>
                          </div>
                        </a>

                        <a class="white--text socialbox linkedin" href="javascript:void(0)">
                          <div class="social-icon white--text">
                            <i  style="color: white !important" class="fa fa-fw fa-linkedin"></i>
                          </div>
                          <div class="description">
                            <span class="ng-binding"></span>
                            <span>SIGN UP WITH LINKEDIN</span>
                          </div>
                        </a>
                    </v-layout>

                </div>

             </v-flex>


             <v-flex xs4 class="mt-5 p">
                <v-layout align-center row wrap class="mt-5 pr-5">
                  <v-card class="elevation-12">
                    <v-flex xs12 class="text-xs-center mt-5">
                      <div class="headline font-weight-medium">SIGN UP</div>
                      <h3 color="grey--text" class="mt-4 font-weight-light">Sign-up to find the lights that you are looking for.</h3>

                        <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form" class="mt-3">
                          <v-layout wrap row pa-4>
                            <v-flex xs12 pa-0>
                          

                              <v-text-field
                                color="black"
                                label="Email Address"
                                v-model="form.email"
                                required
                                :error-messages="fieldErrors('form.email')"
                                @blur="$v.form.email.$touch()"
                              ></v-text-field>

                                <v-text-field
                                color="black"
                                label="Password"
                                v-model="form.password"
                                required
                                type="password"
                                :error-messages="fieldErrors('form.password')"
                                @blur="$v.form.password.$touch()"
                              ></v-text-field>

                              <v-checkbox
                                color="primary"
                                v-model="form.agreeToPolicy"
                                required
                              >
                                <div slot="label" @click.stop="() => {}">
                                  Agree to <v-btn-toggle class="transparent blue--text" @click.native.stop="dialog = !dialog">terms & privacy policy</v-btn-toggle>.
                                </div>
                              </v-checkbox>
                            </v-flex>

                            <v-flex xs12 offset-xs4>
                              <v-layout row wrap text-xs-center>
                                <!-- Login form submit -->
                                <v-flex xs6  class="white--text no-mrpd">
                                  <v-btn round
                                    color="blue"
                                    type="submit"
                                    block
                                  > <span class="white--text font-weight-light ls-1" style="">SIGN UP</span></v-btn>
                                </v-flex>
                                <!-- Forgot password -->
                              </v-layout>
                            </v-flex>
                             <v-flex xs12 mt-3>
                                  <p class="blue--text font-weight-light" ><strong>Existing User ? Click here to login</strong></p>
                                </v-flex>
                          </v-layout>
                        </v-form>
                    </v-flex>
                  </v-card>
                </v-layout>
             </v-flex>
          </v-layout>
      </v-container>
  </v-img>
</template>

<script>

  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
  import validationMixin from '@/mixins/validationMixin'

  const defaultForm = {
    name: '',
    email: '',
    password: '',
    agreeToPolicy: false
  }

  export default {

    mixins: [validationMixin],
    validations: {
      form: {
        name: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        repeatPassword: {
          required,
          sameAsPassword: sameAs('password')
        },
        agreeToPolicy: { required }
      }
    },
    validationMessages: {
      form: {
        name: {
          required: 'Name is required.'
        },
        email: {
          required: 'Please enter email',
          email: 'Email must be valid'
        },
        password: {
          required: 'Please enter password',
          minLength: 'Password must be of 6 characters'
        },
        repeatPassword: {
          sameAsPassword: 'Password does not match'
        }
      }
    },
    data () {
      return {
        form: Object.assign({}, defaultForm),
        backgroundImg: '/static/background/buyer-background2.jpg'
      }
    },
    methods: {
      submit () {
        this.resetForm()
        this.$v.$reset()
        setTimeout(() => {
          this.$router.push({
            name: 'HelloWorld'
          })
        }, 2000)
      },
      resetForm () {
        this.form = Object.assign({}, defaultForm)
        this.$refs.form.reset()
      }
    }
  }
  
</script>


<style scoped lang="stylus">
   img.logo
      margin: 22px 29px 15px;
      width: 81px;
</style>

<style>

.ls-1 {
  letter-spacing: 1px;
}

  a.socialbox {
  font-weight: 500;
  display: inline-block;
  text-decoration: none;
  color: white;
  padding: 12px 51px;
  width: 320px;
  margin: 24px 0 0 24px;
}

a.socialbox.pinterest {
  background-color: #c0392b;
  -webkit-transition: background-color 0.25s ease-in-out;
  transition: background-color 0.25s ease-in-out;
  border-radius: 50px;
  letter-spacing: 1px;
  font-weight: 300;
}

a.socialbox.linkedin {
  background-color: #1076bc;
  -webkit-transition: background-color 0.25s ease-in-out;
  transition: background-color 0.25s ease-in-out;
  border-radius: 50px;
  letter-spacing: .5px;
  font-weight: 300;
}

a.socialbox .social-icon {
  line-height: 32px;
  font-size: 20px;
  display: inline-block;
  vertical-align: middle;
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  padding-right: 15px;
}

a.socialbox .description {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
  font-size: 13px;
}

a.socialbox .description span {
  display: block;
  line-height: 16px;
}

</style>
