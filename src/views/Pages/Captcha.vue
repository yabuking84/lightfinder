<template>
  	<div class="form">
  		<v-text-field :value="email"/>
		<v-btn color="success" @click="recaptcha">Execute recaptcha</v-btn>
  	</div>
</template>


<script>

import { VueReCaptcha } from 'vue-recaptcha-v3'
	
export default {

	data(){ return {
		email: null,
		googleToken: null,
	}},

	methods: {
	    recaptcha() {
	      	this.$recaptcha('registration').then((token) => {
	        	console.log(token) // Will print the token
	        	this.googleToken = token;
	      	})
	    },
	},

	created(){

		this.use(VueReCaptcha, { 
			siteKey: '6Lc8aL4UAAAAAF_ke1eo_DaLKtrNK3Y1xTC6lQKe',
			loaderOptions: {
				useRecaptchaNet: true,
			},	
		})	

		
	},
}
</script>

<style scope>

</style>