<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" >
      <img class="logo" src="/static/logos/logo-white.png">
		<v-container>

<v-layout align-center justify-center row fill-height>
    <v-flex lg3 xs12>
          <v-card>
            <v-container pa-2 align-center justify-center>
              <h2 class="pt-4 text-uppercase font-weight-medium text-lg-center">ACCOUNT INFORMATION</h2>
              <h4 class="font-weight-light text-lg-center">
                               Just one more step, and you are good to go
                         </h4>
            </v-container>
                 <BuyerFormDetailsComponent> </BuyerFormDetailsComponent>
             <v-container align-center justify-space-between fill-height>
                           <div class="text-xs-center">
                                <v-btn round large flat color="grey darken-1" class="font-weight-light" dark>
                                      <span class="text-uppercase l-spacing">
<i class="fas fa-arrow-left"></i>
                                           Back
                                        </span>
                                </v-btn>
                          </div>
        
                          <div class="text-xs-center">
                                <v-btn round large color="cyan lighten-2
" class="font-weight-light" dark>
                                <span class="text-capitalize l-spacing"><i class="fas fa-save" ></i> Save and Proceed</span>
                                </v-btn>
                          </div>
                      </v-container>  
                      
          </v-card>
      </v-flex>
</v-layout>
		


		</v-container>			
  </v-img>
</template>

<script>

  
  import BuyerFormDetailsComponent from '@/views/components/App/Buyer/BuyerFormDetails'

  export default {

    components: {

      BuyerFormDetailsComponent

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
   .l-spacing
      letter-spacing: 1px;
</style>
