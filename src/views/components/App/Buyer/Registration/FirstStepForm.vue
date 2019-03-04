<template>
  <div>
    <v-layout row wrap>

      <v-card class="pa-5" width="430px">

        <div class="headline font-weight-medium text-xs-center">SIGN UP</div>

        <h4 color="grey--text" class="mt-2 text-xs-center font-weight-light">Sign-up to find the lights that you are looking for.</h4>
       
        <v-layout row wrap>

          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form" class="mt-3">

            <v-layout wrap row>

              <v-flex xs12 pa-0>

                <v-text-field color="black" label="Email Address" 
                v-model="form.email" required
                 :error-messages="fieldErrors('form.email')" 
                 @blur="$v.form.email.$touch()"></v-text-field>

                <v-text-field color="black" label="Password"
                 v-model="form.password" 
                 required type="password" 
                 :error-messages="fieldErrors('form.password')"
                  @blur="$v.form.password.$touch()"></v-text-field>

              </v-flex>

              <v-flex xs12 offset-xs4>
                <v-layout row wrap text-xs-center>
                  <!-- Login form submit -->
                  <v-flex xs6 class="white--text no-mrpd">
                    <v-btn round color="blue" type="submit" block> <span class="white--text font-weight-light ls-1" style="">SIGN UP</span></v-btn>
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

    </v-layout>
  </div>
</template>

<script>

import helpers from "@/mixins/helpers";
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

const dform = {

  email: '',
  password: '',

}

export default {

  mixins: [ validationMixin ],

  validations: {

    form: {
      email:    { required, email },
      password: { required, minLength: minLength(6) },
    }

  },

  validationMessages: {

    form: {

      email:    { required: 'Please enter email', email: 'Email must be valid' },
      password: { required: 'Please enter password', minLength: 'Password must be of 6 characters'  },
   
    }

  },


  data() {

    return {

      form: Object.assign({}, dform),

    }

  },

  methods: {

    submit() {

        let data = {
          email: this.form.email,
          password: this.form.password
        }

        console.log(data);
        this.$refs.form.reset()
        this.resetForm()




      /*  
       this.store.dispatch('registration/buyer', {

          email:    this.form.email,
          password: this.form.password

        })
        .then(response => {
            this.snackbar = true
            this.snackbar_error = false
            this.resetForm()
            this.$v.$reset()
        })
        .catch((e) => {
            this.snackbar = false
            this.snackbar_error = true
            this.loading = false;
            console.log('Error: '+e);
        })
        .finally(() => {
            this.loading = false
        });
      */

    },

    resetForm() {
      this.form = Object.assign({}, defaultForm)
      this.$refs.form.reset()
    }

  }

}

</script>


<style scoped lang="scss">
  a {
    text-decoration: none;
  }
</style>