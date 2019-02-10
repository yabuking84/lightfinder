<template>
	<v-img :src="backgroundImg" class="page-vimg with-header" >
    	<img class="logo" src="/static/bal-logo.png">
		 <v-container>
		   <v-layout align-center justify-center row fill-height>

		         <v-flex lg3 xs12>

		         	<v-card>
		         		<h1 class="text-xs-center pa-1">Package 1</h1>  
		         	</v-card>
		         </v-flex>

		         <v-flex lg3 xs12>
		         	<v-card>
		         		<h1 class="text-xs-center pa-1">Package 1</h1>    
		         	</v-card>
		         </v-flex>

		         <v-flex lg3 xs12>
		           <v-card>
		            	<h1 class="text-xs-center pa-1">Package 1</h1>  
						<v-divider></v-divider>
						<div class="pa-2">
							<h2>HJllasldk</h2>
						</div>
		           </v-card>
		         </v-flex>

		   </v-layout>
		 </v-container>
	</v-img>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				backgroundImg: '/static/background/buyer-background2.jpg'
			}
		}
	}
</script>

<style scoped lang="stylus">
	img.logo
		margin: 22px 29px 15px;
		width: 81px;
</style>