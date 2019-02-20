<template>
  <v-img
    :src="backgroundImg"
    class="page-vimg"
  >
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto border-radius6 box-white-500-glow elevation-10 auth-box"
          >
            <v-layout align-center justify-center row fill-height wrap>
              <v-flex xs12 class="text-xs-center mt-3">
                
                <!-- <img src="/static/vuse-circle-white.svg" alt="Vuse" class="text-xs-center" height="100"> -->
                <img src="/static/logos/logo-black.png" alt="Buy Any Light" class="text-xs-center" id="logo" >
                
                <div class="headline">Sign in to your account</div>
                <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
                  <v-layout wrap row pa-4>
                    <v-flex xs12 pa-0>
                      <v-text-field
                        color="primary"
                        label="Email"
                        v-model="form.email"
                        required
                        :error-messages="fieldErrors('form.email')"
                        @blur="$v.form.email.$touch()"
                      ></v-text-field>

                      <v-text-field
                        color="primary"
                        label="Password"
                        v-model="form.password"
                        type="password"
                        required
                        :error-messages="fieldErrors('form.password')"
                        @blur="$v.form.password.$touch()"
                      ></v-text-field>
                      <!-- <div class="width-150x margin-horiz-center">
                        <v-checkbox
                          color="primary"
                          v-model="form.rememberme"
                          required
                        >
                          <div slot="label" @click.stop="() => {}">
                            Remember me
                          </div>
                        </v-checkbox>
                      </div> -->
                    </v-flex>

                    <v-flex xs12>
                      <v-layout row wrap text-xs-center>
                        <!-- Login form submit -->
                        <v-flex xs12 class="no-mrpd">
                          <v-btn
                            color="md-black-500"
                            type="submit"
                            :disabled="$v.$invalid"
                            :loading="loading"
                            block
                            :class="$v.$invalid ? '' : 'white--text'"
                          >Login</v-btn>
                        </v-flex>
                        <!-- Forgot password -->
                        <v-flex xs12>
                          <!-- <router-link :to="{ name: 'pages/authentication/ForgotPasswordPage' }" tag="div"
                            class="grey--text cursor-pointer"
                          >
                            <strong>Forgot Password ?</strong>
                          </router-link> -->
                        </v-flex>
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

    <v-snackbar
      v-model="snackbar_error"
      absolute
      top
      right
      color="red"
    >
      <span>Sign in unsuccessful!</span>
      <v-icon dark>error</v-icon>
    </v-snackbar>

  </v-img>
</template>







<script>
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import validationMixin from '@/mixins/validationMixin'
  const defaultForm = {
    // email: 'buyer@buyanylight.com',
    // password: 'password',
    email: 'info@bal.com',
    password: '123456',
    rememberme: false
  }
  export default {
    mixins: [validationMixin],
    validations: {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(6) }
      }
    },
    validationMessages: {
      form: {
        email: {
          required: 'Please enter email',
          email: 'Email must be valid'
        },
        password: {
          required: 'Please enter password',
          minLength: 'Password must be of 6 characters'
        }
      }
    },

    data: () => ({      
        form: Object.assign({}, defaultForm),
        snackbar: false,
        snackbar_error: false,
        // backgroundImg: '/static/doc-images/HexesisMaterial01.png'
        // backgroundImg: '/static/background-img/dubai-waters-blue-1.jpg'
        // backgroundImg: '/static/boats/boats-uploaded/boat4.jpg',
        backgroundImg: '/static/login_bg.jpg',
        loading: false,
        test: 'testes',
        test2: 'testes2',
    }),
    components: {

    },
    methods: {

      submit () {

        // setTimeout(() => {
        //   this.$router.push({
        //     name: 'dashboard/Dashboardv1'
        //   })
        // }, 2000)


        this.loading = true;
        
        this.$store.dispatch('auth/retrieveToken_a',{
            username: this.form.email,
            password: this.form.password,
        }).then((response) => {
            this.snackbar = true
            this.snackbar_error = false
            this.resetForm()
            this.$v.$reset()

            var vueThis = this;
            setTimeout(function(){
                vueThis.$store.dispatch('auth/loginSuccess_a',response);
                vueThis.loading = false;
            }, 1500, vueThis);

            

        }).catch((e) => {
            this.snackbar = false
            this.snackbar_error = true
            this.loading = false;
            console.log('Error: '+e);
        }).finally(()=>{
            console.log('finally');
            this.loading = false;
        });

      },
      resetForm () {
        this.form = Object.assign({}, defaultForm)
        this.$refs.form.reset()
      }
    }
  }
</script>





<style scoped>
#logo {
    width: 75%;
    margin: 15px 0 30px 15px;
}  
</style>