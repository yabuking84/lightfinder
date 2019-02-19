<template>

  <v-img :src="backgroundImg" class="page-vimg with-header" >
      <img class="logo" src="/static/logos/logo-white.png">
		<v-container>
			<v-flex xs6 offset-xs3>
			  	<v-card>
			  		<v-container pa-2 align-center justify-center>
			  			<h2 class="pt-4 text-uppercase font-weight-medium text-lg-center">Company Information</h2>
			  			<h4 class="font-weight-light text-lg-center">
                   Just one more step, and you are good to go
              </h4>

			  		  	<CompanyFormDetailsComponent></CompanyFormDetailsComponent>

			  		</v-container>

			  	</v-card>
			</v-flex>
		</v-container>			
  </v-img>
</template>

<script>

  import CompanyFormDetailsComponent from '@/views/components/Supplier/CompanyFormDetailsComponent'

  export default {

    components: {

      CompanyFormDetailsComponent
      
    },
    data () {
      return {
        backgroundImg: '/static/background/supplier-dashboard.jpg'
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
