<template>
	  <v-img :src="backgroundImg" class="page-vimg with-header" >
	  	    <img class="logo" src="/static/logos/logo-white.png">
			
			 <v-layout align-center justify-center row wrap >
		   	<v-container>
		   	  <v-flex md8 offset-md2 xs12>
		   	    <v-card color="white">
		   	       <v-layout justify-center align-center row column>
		 				<img class="logo2" src="/static/logos/logo-black.png">
		   	         	<h1 class="">Terms and Condition</h1>
		   	         	<p class="text-uppercase font-weight-light">Please Read These terms and conditions carefully.</p>
		   	         	<p class="text-uppercase font-weight-medium">These Terms and Conditions shall be binding upon users of www.buyanylight.com.</p>
		   	         	<v-divider></v-divider>
						<v-card>
							<v-container>
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
		 </v-layout>

	  </v-img>
</template>

<script>
	
	import TermsConditionComponent from '@/views/components/App/Supplier/Terms&ConditionComponent'

	export default {
		components: {
			TermsConditionComponent
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
   img.logo2
      margin: 22px 29px 2px;
      width: 100px;
   .terms-container  
		  height: 47vh;
		  overflow-y: auto;
		  padding-right: 10px;
</style>
