<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" >
    <img class="logo" :src="logo">

        <v-flex lg10 offset-lg1>

               <v-container mt-5>
                    <v-layout row justify-center grid-list-xl>

                          <v-flex lg5 xs12>
                                 
                                 <!-- message section -->
                                        <heading-message> </heading-message>
                                 <!-- message section -->
                                  

                                  <!-- social buttons -->
                                        <social-buttons> </social-buttons>
                                  <!-- social buttons -->
                                
                          </v-flex>

                          <v-flex lg4 xs12> 

                            <v-layout row wrap>

                                   <!-- form -->
                                        <first-step-form> </first-step-form>
                                    <!-- form -->
  
                            </v-layout>

                          </v-flex>

                    </v-layout>
              </v-container>
        </v-flex>

      </v-img>
</template>

<script>

  

  import HeadingMessage from '@/views/components/App/Registration/HeadingMessage'
  import SocialButtons from '@/views/components/App/Registration/SocialButtons'
  import FirstStepForm from '@/views/components/App/Buyer/Registration/FirstStepForm'


  const defaultForm = {
    name: '',
    email: '',
    password: '',
    agreeToPolicy: false
  }

  export default {

    components: {

      SocialButtons,
      HeadingMessage,
      FirstStepForm

    },
    
    data () {

      return {

        backgroundImg: '/static/background/buyer-background2.jpg',
        logo: '/static/logos/logo-white.png'

      }
    },
    methods: {

    }
    
  }
  
</script>


<style scoped lang="stylus">
   img.logo
      margin: 22px 29px 15px;
      width: 81px;
</style>
