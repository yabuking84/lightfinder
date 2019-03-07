<template>
  <v-layout column wrap class="pos-relative">
    <v-flex xs12 center-align>
      <v-layout wrap>
        <v-flex xs12 class="text-xs-center">
          <img src="/static/open-lock.svg" alt="" height="145px">
          <div class="headline">Set New Password</div>
        </v-flex>
      </v-layout>
      <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="sendpasscode">
        <v-container grid-list-xl fluid>
          <v-layout wrap pa-4>
            <v-flex xs12 pa-0>
              <password v-model="password" :badge="false" hint="" @next="handlePasswordScoreEvent" required></password>
              <v-text-field
                class="box-input"
                placeholder="Confirm New Password"
                type="password"
                v-model="repeatPassword"
                :error-messages="fieldErrors('repeatPassword')"
                @input="$v.repeatPassword.$touch()"
                @blur="$v.repeatPassword.$touch()"
                required
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
                    :disabled="(passwordScore < 50 || $v.$invalid)"
                    block
                    :class="$v.$invalid ? '' : 'white--text'"
                  >Set New Password</v-btn>
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
  import validationLangMixin from '@/mixins/validationLangMixin'
  import { required, sameAs } from 'vuelidate/lib/validators'
  import Password from '@/views/Components/PasswordStrength.vue'

  export default {
    props: ['email', 'code'],
    mixins: [validationLangMixin],
    validations: {
      password: { required },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      }
    },
    validationMessages: {
      password: { required: 'validation.password.required' },
      repeatPassword: {
        sameAsPassword: 'validation.password.confirm'
      }
    },
    components: {
      Password
    },
    created () {
    },
    data () {
      return {
        errors: null,
        password: null,
        repeatPassword: null,
        passwordScore: 0,
        loader: false
      }
    },
    methods: {
      handlePasswordScoreEvent (data) {
        this.passwordScore = data.score
      },
      submit () {
        this.loader = true
        setTimeout(() => {
          this.loader = false
          this.$emit('next', { next: true })
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
