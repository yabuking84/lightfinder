<template>
  <v-img
    :src="backgroundImg"
    class="page-vimg with-header"
  >
    <toolbar-simple></toolbar-simple>
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto border-radius6 box-purple-500-glow elevation-10 card-center-box"
          >
            <v-img
              :src="backgroundImg"
            >
              <v-layout align-center justify-center row fill-height wrap>
                <v-flex xs12>
                  <div class="display-3 white--text" v-text="title"></div>
                  <Countdown deadline="November 26, 2019" :dark="true" class="my-2"></Countdown>
                  <p class="subheading white--text" v-html="description"></p>
                  <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
                    <v-container grid-list-xl fluid text-xs-center>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field
                            solo
                            label="Email"
                            v-model="form.email"
                            required
                            :error-messages="fieldErrors('form.email')"
                            @blur="$v.form.email.$touch()"
                            class="max-width-400x margin-auto"
                          ></v-text-field>
                          <v-btn
                            color="secondary"
                            type="submit"
                            :disabled="$v.$invalid"
                            class="width-200x"
                            dark
                          >Notify Me!</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                  <!-- <v-btn :to="{ name: 'dashboard/Dashboardv1' }" round color="primary" dark>Go Home</v-btn> -->
                </v-flex>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
  import ToolbarSimple from '@/layouts/FullPageSimple/Toolbar'
  import Countdown from '@/components/Elements/Countdown'
  import { required, email } from 'vuelidate/lib/validators'
  import validationMixin from '@/mixins/validationMixin'

  const defaultForm = {
    email: ''
  }
  export default {
    mixins: [validationMixin],
    validations: {
      form: {
        email: { required, email }
      }
    },
    validationMessages: {
      form: {
        email: {
          required: 'Please enter email',
          email: 'Email must be valid'
        }
      }
    },
    data () {
      return {
        title: 'Coming Soon',
        description: `
          <h3>Heyo, Thanks for visiting us!</h3>
          <span class="subheading">We are currently working on our new website</span><br>
          <span class="subheading">We will be here soon, click on "Notify Me!" <br>to be ready for the Grand Welcome day!</span>
        `,
        form: Object.assign({}, defaultForm),
        snackbar: false
      }
    },
    components: {
      ToolbarSimple,
      Countdown
    },
    methods: {
      submit () {
        this.resetForm()
        this.$v.$reset()
      }
    },
    computed: {
      backgroundImg () {
        return '/static/doc-images/HexesisMaterial01.png'
      }
    }
  }
</script>
