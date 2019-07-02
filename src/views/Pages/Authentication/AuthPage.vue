<template>
  <v-img
    :gradient="gradient"
    :height="`${height}px`"
    :src="backgroundImg"
    v-resize="onResize"
  >
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto"
            width="320"
          >
            <v-card-text>
              <img src="/static/vuse-oneline-black.svg" width="275">
              <p class="an-16 text-xs-center regular-text">Powered By VueJS</p>
              <v-btn color="act" class="white--text btn--xlarge" @click.native.stop="dialog.signin=true">Sign In</v-btn>
              <v-btn color="sidebar" class="white--text btn--xlarge" @click.native.stop="dialog.signup=true">Sign Up</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog.signin" max-width="320" scrollable>
      <v-card>
        <v-card-title class="pos-relative">
          <v-btn
            absolute
            flat
            icon
            class="pos-tr-1px"
            @click="dialog.signin= !dialog.signin">
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="no-mrpd">
          <signin @forgotPassword="onForgotPasswordClickHandler" @success="loginSuccessHandler"></signin>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.forgotpassword" max-width="320" scrollable>
      <v-card>
        <v-card-text class="no-mrpd">
          <forgot-password @close="dialog.forgotpassword = false" @success="forgotPasswordSuccessHandler"></forgot-password>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.signup" max-width="800" scrollable>
      <v-card>
        <v-card-text class="no-mrpd">
          <signup @success="singUpSuccessHandler" @close="dialog.signup = false"></signup>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar.visibility"
      absolute
      top
      right
      :color="snackbar.color"
    >
      <span v-text="snackbar.text"></span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
  </v-img>
</template>
<script>
  import { rgba as rgbaGradients } from '@/data/gradients'
  import Signin from '@/views/Pages/Authentication/AuthpageSigninWizard/Signin'
  import ForgotPassword from '@/views/Pages/Authentication/AuthpageSigninWizard/ForgotPassword'
  import Signup from '@/views/Pages/Authentication/AuthpageSignupWizard/Signup'

  export default {
    components: {
      Signin,
      ForgotPassword,
      Signup
    },
    data () {
      return {
        height: window.innerHeight,
        gradient: rgbaGradients[8].gradient,
        dialog: {
          signin: false,
          signup: false,
          forgotpassword: false
        },
        snackbar: {
          visibility: false,
          color: 'act',
          text: null,
          icon: 'check_circle'
        },
        loading: 0
      }
    },
    beforeDestroy () {
      this.$eventBus.$off('resetSignIn')
    },
    methods: {
      onResize () {
        this.height = window.innerHeight
      },
      onForgotPasswordClickHandler () {
        this.dialog.signin = false
        this.dialog.forgotpassword = true
      },
      loginSuccessHandler (args) {
        this.snackbar = args
        this.dialog.signin = false
      },
      forgotPasswordSuccessHandler (args) {
        this.snackbar = args
        this.dialog.forgotpassword = false
      },
      singUpSuccessHandler (args) {
        this.snackbar = args
        this.dialog.signup = false
      }
    },
    computed: {
      backgroundImg () {
        return '/static/doc-images/HexesisMaterial03.png'
      },
      cardHeight () {
        this.cnsl(this.height)
        const height = this.height < 700 ? this.height - 100 + 'px' : 'auto'
        return height
      }
    },
    watch: {
      'dialog.signin' (to, from) {
        if (to === false && from === true) {
          this.$eventBus.$emit('resetSignIn')
        }
      }
    }
  }
</script>
