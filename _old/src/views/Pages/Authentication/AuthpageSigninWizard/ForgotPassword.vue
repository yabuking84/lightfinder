<template>
  <v-layout column wrap class="pos-relative">
    <v-toolbar absolute dense flat class="transparent pos-top-1px">
      <v-toolbar-title class="body-2 grey--text cursor-pointer"
        @click="stageHandler" v-if="stage !== 1">Back</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="$emit('close')">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-flex xs12>
      <v-stepper v-model="stage" class="no-box-shadow reset-top-padding">
        <v-stepper-header class="hide">
          <v-stepper-step step="1" :complete="stage > 1">Name of step 1</v-stepper-step>
          <v-stepper-step step="2" :complete="stage > 2">Name of step 2</v-stepper-step>
          <v-stepper-step step="3">Name of step 3</v-stepper-step>
        </v-stepper-header>

        <v-stepper-content step="1">
          <send-passcode @next="sendPasscodeSuccessHandler"></send-passcode>
        </v-stepper-content>

        <v-stepper-content step="2">
          <verify-passcode @next="verifyPasscodeSuccessHandler" :email="email"></verify-passcode>
        </v-stepper-content>

        <v-stepper-content step="3">
          <password-reset @next="resetPasswordSuccessHandler" :code="code" :email="email"></password-reset>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>
<script>
  import SendPasscode from '@/views/Pages/Authentication/ForgotPasswordWizard/SendPasscode'
  import VerifyPasscode from '@/views/Pages/Authentication/ForgotPasswordWizard/VerifyPasscode'
  import PasswordReset from '@/views/Pages/Authentication/ForgotPasswordWizard/PasswordReset'
  export default {
    components: {
      SendPasscode,
      VerifyPasscode,
      PasswordReset
    },
    data () {
      return {
        stage: 1,
        email: null,
        code: null
      }
    },
    methods: {
      stageHandler () {
        if (this.stage > 1) {
          this.stage -= 1
        }
      },
      sendPasscodeSuccessHandler (data) {
        this.email = data.email
        this.stage = 2
      },
      verifyPasscodeSuccessHandler (data) {
        this.code = data.code
        this.stage = 3
      },
      resetPasswordSuccessHandler () {
        this.$emit('success', {
          visibility: true,
          color: 'act',
          text: 'Password reset successfully'
        })
      }
    }
  }
</script>
