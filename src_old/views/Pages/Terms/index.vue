<template>
  <v-img :src="backgroundImg" class="page-vimg with-header" >
      <img class="logo" src="/static/bal-logo.png">
  </v-img>
</template>

<script>

  import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
  import validationMixin from '@/mixins/validationMixin'


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
        backgroundImg: '/static/background/buyer-background2.jpg'
      }
    },
    methods: {
      submit () {
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


<style scoped lang="stylus">
   img.logo
      margin: 22px 29px 15px;
      width: 81px;
</style>

