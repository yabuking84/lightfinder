<template>
  <v-img
    :src="backgroundImg"
    class="page-vimg with-header"
  >
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto border-radius6 box-white-500-glow elevation-10 auth-box"
          >
            <v-layout align-center justify-center row fill-height wrap>
              <v-flex xs12 class="text-xs-center mt-3">
                <img src="/static/vuse-circle-white.svg" alt="Vuse" class="text-xs-center" height="100">
                <div class="headline">Create Account</div>
                <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
                  <v-layout wrap row pa-4>
                    <v-flex xs12 pa-0>
                      <v-text-field
                        color="purple darken-2"
                        label="Name"
                        v-model="form.name"
                        required
                        :error-messages="fieldErrors('form.name')"
                        @blur="$v.form.name.$touch()"
                      ></v-text-field>

                      <v-text-field
                        color="purple darken-2"
                        label="Email"
                        v-model="form.email"
                        required
                        :error-messages="fieldErrors('form.email')"
                        @blur="$v.form.email.$touch()"
                      ></v-text-field>

                      <v-text-field
                        color="purple darken-2"
                        label="Password"
                        v-model="form.password"
                        type="password"
                        required
                        :error-messages="fieldErrors('form.password')"
                        @blur="$v.form.password.$touch()"
                      ></v-text-field>
                      <v-text-field
                        type="password"
                        label="Confirm Password"
                        v-model="form.repeatPassword"
                        :error-messages="fieldErrors('form.repeatPassword')"
                        @input="$v.form.repeatPassword.$touch()"
                        @blur="$v.form.repeatPassword.$touch()"
                        required
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

                    <v-flex xs12>
                      <v-layout row wrap text-xs-center>
                        <!-- Login form submit -->
                        <v-flex xs12 class="no-mrpd">
                          <v-btn
                            color="act"
                            type="submit"
                            :disabled="$v.$invalid"
                            block
                            :class="$v.$invalid ? '' : 'white--text'"
                          >Register Account</v-btn>
                        </v-flex>
                        <!-- Forgot password -->
                        <v-flex xs12>
                          <!-- <router-link :to="{ name: 'ForgotpasswordPage' }" tag="div"
                            class="grey--text cursor-pointer"
                          >
                            <strong>Forgot Password ?</strong>
                          </router-link> -->
                          <p><strong>Already have an account?</strong></p>
                          <router-link :to="{ name: 'pages/authentication/LoginPage' }" tag="v-btn" class="primary">Sign in to your account</router-link>
                          <!--

                          <span class="heading-line title mt-4">
                            Or Sign in with
                          </span> -->
                        </v-flex>
                        <!-- Sign in with Social -->
                        <!-- <v-flex xs12>
                          <v-btn fab small color="blue darken-4">
                            <v-icon color="white">fa-facebook</v-icon>
                          </v-btn>
                          <v-btn fab small color="red darken-4">
                            <v-icon color="white">fa-google</v-icon>
                          </v-btn>
                          <v-btn fab small color="light-blue">
                            <v-icon color="white">fa-twitter</v-icon>
                          </v-btn>
                        </v-flex> -->
                        <!-- Register Btn -->
                        <!-- <v-flex xs12>
                          <p class="body-1"><strong>Don't have an account?</strong></p>
                          <router-link :to="{ name: 'RegisterPage' }" tag="v-btn" class="primary">Register Now</router-link>
                        </v-flex> -->
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="act"
    >
      <span>Sign in successful!</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
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
        dialog: false,
        snackbar: false,
        policyText: `
        <h5>What is privacy?</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <h5>Terms</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `,
        backgroundImg: '/static/doc-images/HexesisMaterial01.png'
      }
    },
    methods: {
      submit () {
        this.snackbar = true
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
