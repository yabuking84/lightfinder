<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" >
    <img class="logo" src="/static/logos/logo-white.png">
        <v-flex lg12 xs12>
                 <v-container mt-5>
                  <v-layout row justify-center grid-list-xl>

                        <v-flex lg6 xs12>

                              <!-- heading message -->
                                  <heading-message> </heading-message>
                              <!-- heading message -->


                              <!-- social buttons -->
                                  <social-buttons> </social-buttons>
                              <!-- social buttons -->
              
                        </v-flex>

                        <v-flex lg6 xs12>
                            <v-layout row wrap>
                                    <first-step-form :type="type"> </first-step-form>
                            </v-layout>
                        </v-flex>

                  </v-layout>
                </v-container>
          </v-flex>
      </v-img>
</template>

<script>

  import SocialButtons from '@/views/components/App/Registration/SocialButtons'
  import HeadingMessage from '@/views/components/App/Registration/HeadingMessage'
  import FirstStepForm from '@/views/components/App/Registration/FirstStepForm'

  export default {

    components: {

      SocialButtons,
      HeadingMessage,
      FirstStepForm

    },

    data () {

      return {
        type: 'supplier',
        backgroundImg: '/static/background/supplier-dashboard.jpg'

      }
    },
    
  }
  
</script>


<style scoped lang="stylus">
   img.logo
      margin: 22px 29px 15px;
      width: 81px;
</style>
