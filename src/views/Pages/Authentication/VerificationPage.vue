<template>
<div class="bg-image-cont">
<!-- <v-img src="/static/background/buyer-background.jpg" class="page-vimg"> -->

	<v-container  justify-center align-center fill-height pa-0 >
	  <v-layout row wrap justify-center align-center style="width: 100%;">
		<v-flex xs12>
			<v-card class="text-xs-center pa-3 mt-3 mb-5">
				<v-layout align-center justify-center row fill-height wrap>
				  	<v-flex xs12 class="text-xs-center">				
						<!-- <img src="/static/vuse-circle-white.svg" alt="Vuse" class="text-xs-center" height="100"> -->
						<a href="https://buyanylight.com">					
						<img src="/static/logos/logo-black.png" alt="Buy Any Light" class="text-xs-center" id="logo" >
						</a>
					</v-flex>

				  	<v-flex 
				  	v-if="verificationResult" 
				  	xs12 class="text-xs-center mt-3 px-4 message">
						<p style="font-size: 2.5em; text-align: center; font-weight: bold;">
							THANK YOU!
						</p>

						<p>
							We are please to inform you that you may utilize all the advanced features of our platform. 
						
							We will be sending you updates, news and future configurations via this email. 
						</p>
						<p>
							Feel free to contact us at <a href="mailto:info@buyanylight.com" class="strong">info@buyanylight.com</a> if you have any inquiries, comments and suggestions.
						</p>

						<p class="mb-0" style="font-size: 1.5em; text-align: center;">
							<strong>
								<v-btn
								href="https://buyanylight.com"
								class="white--text black">
									Back to Home
								</v-btn>
							</strong>
						</p>

						<h3>or</h3>							
						
						<p class="mb-0" style="font-size: 1.5em; text-align: center;">
							<strong>
								<v-btn
								href="https://lightfinder.buyanylight.com"
								class="white--text black">
									Login
								</v-btn>
							</strong>
						</p>
				  	</v-flex>

				  	<v-flex v-else xs12 class="text-xs-center mt-3 px-4 message">

				  	</v-flex>


				</v-layout>
			</v-card>          	
		</v-flex>
	  </v-layout>

	</v-container>


	<div class="doc-links">
		<div class="cont">
			
			<a v-if="isInMobile()" target="_blank" href="https://buyanylight.com/#contact">Help</a>
			<a v-else target="_blank" href="https://buyanylight.com/contact">Help</a>

			<a target="_blank" href="https://buyanylight.com/terms">Terms of Use</a>
			<a target="_blank" href="https://buyanylight.com/privacy">Privacy & Cookies</a>
		</div>
	</div>

<!-- </v-img> -->
</div>
</template>






<script>
import hlprs from '@/mixins/helpers'


export default {
	mixins: [
		hlprs,
	],

	components: {
	},

	data: () => ({

	}),

	created() {

	},

	methods: {

	},

	computed: {
		verificationResult(){
			if(this.$route.params.result.toLowerCase()=="success")
			return true;
			else
			return false;
		},
	},

}
</script>





<style scoped lang="scss">
#logo {
	width: 200px;
	margin: 15px 0 5px 15px;
}  

.doc-links {
	// position: absolute;
	position: fixed;
	bottom: 0px;
	width: 100%;
	left: 0;
	text-align: center;    
	background-color: rgba(0, 0, 0, 0.45);
	.cont {
		// background-color: rgba(0, 0, 0, 0.7);
		width: 350px;
		margin: auto;
		padding: 5px 0px;
		a {
			margin: 20px 10px 30px;
			color: #fff;
			text-decoration: none;
			font-size: 1em;
		}
	}
}

.google-login {
	height: auto;
	padding: 0;
	box-shadow: none !important;
	background-color: transparent !important; 
	
	border: 1px solid #e0e0e0;
	img {
		margin-right: 10px;
		height: 25px;
		margin: 5px 10px 5px 5px;
	}

	/deep/ .v-btn__loading {
		color: #000;
	}
}


.social-buttons {
	/deep/ .v-btn__loading {
	    color: #000;
	}
}

.bg-image-cont {
	height:100vh; 
	background-image: url(/static/background/buyer-background.jpg);
	overflow: auto;
}

.v-card {
	max-width: 440px;
	margin: 30px auto;
}

.message {
	p {
		text-align: center;
		font-size: 1em;
	}
}


a.strong {
	font-weight: bold;
	text-decoration: none;
}
</style>