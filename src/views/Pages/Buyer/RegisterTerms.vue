<template>
  <v-img :src="backgroundImg" class="page-vimg with-header" >
      <img class="logo" src="/static/logos/logo-white.png">
		<v-container>
			<v-flex xs4 offset-xs4>
			  	<v-card>
			  	    <v-layout justify-center align-center row column>
            <img class="logo2" src="/static/logos/logo-black.png">
                    <h1 class="">Terms and Condition</h1>
                    <p class="text-uppercase font-weight-light">Please Read These terms and conditions carefully.</p>
                    <p class="text-xs-center text-uppercase font-weight-bold">These Terms and Conditions shall be binding upon users of www.buyanylight.com.</p>
                    <v-divider></v-divider>
                            <v-card>
                              <v-container pa-3>
                                <v-flex class="terms-container" xs10 offset-xs1>
                                  <TermsConditionComponent> </TermsConditionComponent>
                                </v-flex>
                              </v-container>
                              <v-layout justify-center pb-3>
                                  <v-btn class="font-weight-light" large round outline color="red lighten-1 text-uppercase">Decline</v-btn>
                                  <v-btn class="font-weight-light" large round outline color="cyan lighten-1 text-uppercase">Accept</v-btn>
                              </v-layout>
                          </v-card>
               </v-layout>
			  	</v-card>
			</v-flex>
		</v-container>			
  </v-img>
</template>

<script>

  import TermsConditionComponent from '@/views/Components/App/Supplier/Terms&ConditionComponent'

  export default {

    components: {

      TermsConditionComponent
      
    },
    data () {
      return {
        backgroundImg: '/static/background/buyer-background2.jpg'
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
    img.logo2
      margin: 22px 29px 2px;
      width: 100px;
   .l-spacing
      letter-spacing: 1px;
    .terms-container  
      height: 38vh;
      overflow-y: auto;
      padding-right: 10px;
</style>
