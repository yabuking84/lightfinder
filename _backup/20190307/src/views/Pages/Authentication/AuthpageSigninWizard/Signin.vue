<template>
  <v-layout column wrap class="pos-relative">
    <v-flex xs12 center-align>
      <v-layout wrap>
        <v-flex xs12 class="text-xs-center">
          <img src="/static/vuse-circle-white.svg" alt="" height="145px">
          <div class="headline">Login To Vuse</div>
        </v-flex>
      </v-layout>
      <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="signinmodalform">
        <v-container grid-list-xl fluid>
          <v-layout wrap>
            <v-flex xs12 px-2 py-0>
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
              <div class="width-150x margin-horiz-center">
                <v-checkbox
                  color="primary"
                  v-model="form.remeberme"
                  required
                >
                  <div slot="label" @click.stop="form.remeberme = !form.remeberme">
                    Remember me
                  </div>
                </v-checkbox>
              </div>
            </v-flex>

            <v-flex xs12 px-3>
              <v-layout row wrap text-xs-center>
                <!-- Login form submit -->
                <v-flex xs12 class="no-mrpd">
                  <v-btn
                    color="act"
                    type="submit"
                    :disabled="$v.$invalid"
                    block
                    :class="$v.$invalid ? '' : 'white--text'"
                  >Login</v-btn>
                </v-flex>
                <!-- Forgot password -->
                <v-flex xs12>
                  <div @click="$emit('forgotPassword')" class="grey--text cursor-pointer"
                  >
                    <strong>Forgot Password ?</strong>
                  </div>
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
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import validationMixin from '@/mixins/validationMixin'
  const defaultForm = {
    email: '',
    password: '',
    remeberme: false
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
    beforeCreate () {
      this.$eventBus.$off('resetSignIn')
    },
    created () {
      this.$eventBus.$on('resetSignIn', this.resetForm)
    },
    beforeDestroy () {
      this.$eventBus.$off('resetSignIn')
    },
    data () {
      return {
        errors: null,
        email: null,
        password: null,
        currentComponent: 'signin',
        loader: false,
        form: Object.assign({}, defaultForm)
      }
    },
    methods: {
      submit () {
        this.$emit('success', {
          visibility: true,
          color: 'act',
          text: 'Login successful!'
        })
        this.resetForm()
      },
      resetForm () {
        this.form = Object.assign({}, defaultForm)
        this.$refs.signinmodalform.reset()
        this.$v.$reset()
      }
    },
    watch: {
      dialog (val) {
        if (!val) return
        requestAnimationFrame(() => {
          this.$refs.signinmodalform.focus.focus()
        })
      }
    }
  }
</script>
