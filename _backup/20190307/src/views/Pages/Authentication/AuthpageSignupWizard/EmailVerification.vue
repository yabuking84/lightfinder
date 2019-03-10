<template>
  <v-layout wrap>
    <v-flex xs12 sm6>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            flat
            height="480"
            class="margin-auto transparent"
            width="360"
          >
            <v-container fill-height pa-0>
              <v-layout align-center>
                <v-flex xs12>
                  <v-card-text>
                    <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
                      <v-container grid-list-xl fluid>
                        <v-layout wrap>
                          <v-flex xs12 px-0>
                            <div class="dialog-title">
                              <strong>Create a</strong>
                              <br>
                              <strong class="primary--text">
                                New Account
                              </strong>
                            </div>
                          </v-flex>
                          <v-flex xs12 px-0>
                            <v-divider class="section-spacer"></v-divider>
                          </v-flex>
                          <v-flex xs12 pa-0>
                            <v-text-field
                              color="primary"
                              placeholder="Your E-mail Address"
                              v-model="email"
                              required
                              class="box-input"
                              :error-messages="fieldErrors('email')"
                              @blur="$v.email.$touch()"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12>
                            <v-layout row wrap text-xs-left>
                              <!-- Login form submit -->
                              <v-flex xs12 class="no-mrpd">
                                <v-btn
                                  :loading="loader"
                                  color="act"
                                  type="submit"
                                  :disabled="$v.$invalid"
                                  class="ml-0"
                                  :class="$v.$invalid ? '' : 'white--text'"
                                >Continue</v-btn>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm6 primary>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex xs12 class="text-xs-center">
            <img src="/static/vuse.svg" alt="Vuse" class="text-xs-center" height="100">
            <div class="body-2 white--text">Enter your emaill address, we will send you a mail for verification code.</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
  import { required, email } from 'vuelidate/lib/validators'
  import validationMixin from '@/mixins/validationMixin'
  import ResizeMixin from '@/mixins/ResizeMixin'

  export default {
    mixins: [validationMixin, ResizeMixin],
    validations: {
      email: { required, email }
    },
    validationMessages: {
      email: {
        required: 'Please enter email',
        email: 'Email must be valid'
      }
    },
    data () {
      return {
        email: null,
        loader: false
      }
    },
    methods: {
      submit () {
        this.loader = true
        setTimeout(() => {
          this.$emit('next', { email: this.email })
        }, 2000)
      }
    }
  }
</script>
