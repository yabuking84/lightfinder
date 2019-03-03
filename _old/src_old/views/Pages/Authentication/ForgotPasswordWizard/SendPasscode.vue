<template>
  <v-layout column wrap class="pos-relative">
    <v-flex xs12 center-align>
      <v-layout wrap>
        <v-flex xs12 class="text-xs-center">
          <img src="/static/forgotpassword-vuse.svg" alt="" height="145px">
          <div class="headline">Forgot Password?</div>
          <p class="centered headline-caption-text mt-3 px-4">Provide your e-mail address to reset your password</p>
        </v-flex>
      </v-layout>
      <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="sendpasscode">
        <v-container grid-list-xl fluid>
          <v-layout wrap pa-4>
            <v-flex xs12 pa-0>
              <v-text-field
                color="primary"
                label="Your email address"
                v-model="email"
                required
                :error-messages="fieldErrors('email')"
                @blur="$v.email.$touch()"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 px-2>
              <v-layout row wrap text-xs-center>
                <!-- Login form submit -->
                <v-flex xs12 class="no-mrpd">
                  <v-btn
                    color="act"
                    type="submit"
                    :loading="loader"
                    :disabled="($v.$invalid || loader)"
                    block
                    :class="$v.$invalid ? '' : 'white--text'"
                  >Get OTP</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>
<script>
  import { required, email } from 'vuelidate/lib/validators'
  import validationMixin from '@/mixins/validationMixin'

  export default {
    mixins: [validationMixin],
    validations: {
      email: { required, email }
    },
    validationMessages: {
      email: {
        required: 'Please enter email',
        email: 'Email must be valid'
      }
    },
    created () {
    },
    data () {
      return {
        errors: null,
        email: null,
        loader: false
      }
    },
    methods: {
      submit () {
        this.loader = true
        setTimeout(() => {
          this.loader = false
          this.$emit('next', { email: this.email })
        }, 2000)
      },
      resetForm () {
        // this.form = Object.assign({}, defaultForm)
        // this.$refs.sendpasscode.reset()
        // this.$v.$reset()
      }
    },
    watch: {

    }
  }
</script>
