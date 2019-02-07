<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" >
    <img class="logo" src="/static/bal-logo.png">
        <v-flex lg10 offset-lg1>
               <v-container mt-5>
                  <v-layout row justify-center grid-list-xl>

                        <v-flex lg5 xs12>
                            <v-layout row column>
                                  <div class="mt-3">
                                        <h1 class="white--text">Registration</h1>
                                        <h4 class="white--text font-weight-light" >The Seller who can be manufacturers and distributors are required to register on the <br/> BUY ANY LIGHT platform</h4>
                                  </div>
                                  <div class="mt-4">
                                        <h1 class="white--text">Buyer</h1>
                                        <h4 class="white--text font-weight-light" >Receive Thousands of Enquiries from Buyers Worldwide</h4>
                                  </div>
                                  <div class="mt-4">
                                        <h4 class="white--text font-weight-light">or Sign-up here</h4>
                                  </div>
                            </v-layout>
                              <SocialButtonCompenent></SocialButtonCompenent>   
                        </v-flex>

                        <v-flex lg4 xs12>
                          <v-layout row wrap>
                              <v-card class="pa-5">
                                  <div class="headline font-weight-medium text-xs-center">SIGN UP</div>
                                  <h3 color="grey--text" class="mt-2 font-weight-light">Sign-up to find the lights that you are looking for.</h3>
                                  <v-layout row wrap>
                                        <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form" class="mt-3">
                                      <v-layout wrap row >
                                        <v-flex xs12 pa-0 >
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
                                    
                                  </v-layout>
                              </v-card>

                          </v-layout>
                        </v-flex>

                  </v-layout>
              </v-container>
        </v-flex>
      </v-img>
</template>

<script>

  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
  import validationMixin from '@/mixins/validationMixin'
  import SocialButtonCompenent from '@/views/components/Supplier/SocialButtonComponent'


  const defaultForm = {
    name: '',
    email: '',
    password: '',
    agreeToPolicy: false
  }

  export default {

    components: {
      SocialButtonCompenent
    },
    
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
