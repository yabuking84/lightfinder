<template>
  <div>
	<h1>Test</h1>
	<v-btn color="success" @click="handleClickGetAuth" :disabled="!isInit">get auth code</v-btn>
	<v-btn color="success" @click="handleClickSignIn" v-if="!isSignIn" :disabled="!isInit">signIn</v-btn>
	<v-btn color="success" @click="handleClickSignOut" v-if="isSignIn" :disabled="!isInit">signOut</v-btn>
  </div>
</template>

<script>
/** 
* You should first need to place these 2 lines of code in your APP ENTRY file, e.g. src/main.js
*
* import GAuth from 'vue-google-oauth2'
* Vue.use(GAuth, {clientId: '4584XXXXXXXX-2gqknkvdjfkdfkvb8uja2k65sldsms7qo9.apps.googleusercontent.com'})
* 
*/
export default {
	name: 'test',
	data () {
		return {
			isInit: false, isSignIn: false
		}
	},
	methods: {
		handleClickGetAuth() {
			this.$gAuth.getAuthCode()
			.then(authCode => {
				// On success
				return this.$http.post('http://your-backend-server.com/auth/google', {
					code: authCode,
					redirect_uri: 'postmessage'
				})
			})
			.then(response => {
				// And then
			})
			.catch(error => {
				// On fail do something
			})
		},
		handleClickSignIn() {
			console.log('handleClickSignIn')
			this.$gAuth.signIn()
			.then(user => {
				// On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
				// console.log('GoogleUser', GoogleUser)
				console.log('user', user)
				this.isSignIn = this.$gAuth.isAuthorized
			})
			.catch(error => {
				// On fail do something
				console.log('handleClickSignIn error',error)
			})
		},
		handleClickSignOut() {
			this.$gAuth.signOut()
			.then(() => {
				// On success do something
				this.isSignIn = this.$gAuth.isAuthorized
			})
			.catch(error => {
				// On fail do something
			})
		}
	},
	mounted() {
		let that = this;
		let checkGauthLoad = setInterval(function() {

			that.isInit = (that.$gAuth) ? that.$gAuth.isInit : false;
			that.isSignIn = (that.$gAuth) ? that.$gAuth.isAuthorized : false

			console.log('that.$gAuth', that.$gAuth);
			console.log('that.isInit', that.isInit);

			if (that.isInit)
				clearInterval(checkGauthLoad)

		}, 1000);
	}
  
}
</script>