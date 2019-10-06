<template>
<v-dialog persistent
:value="dialogLocal" 
@input="closeDialog()" 
max-width="600px"
lazy>

    <v-card>
    	<v-card-title class="headline">
            <img 
            style="width: 88px;"
            src="/static/logos/logo-black.png" 
            title="BuyAnyLight.com">
    		<h2 class="ml-4">Crypto Currency Details</h2>

    		<v-btn dark flat icon
    		style="position: absolute; top: 0; right: 0; margin: 10px 10px;"
    		class="black--text"
    		@click="closeDialog()">
				<v-icon>close</v-icon>
			</v-btn>    
    	</v-card-title>
    	
    	<v-card-text>

    		<v-container pa-0>
					<!-- 
					Beneficiary:Standard Electronic Co., Limited
					A/C No.:168-734069-838
					Beneficiary's Bank:HSBC Hong Kong
					Swift: HSBCHKHHHKH
					Bank Address:HSBC Centre, 1 Sham Mong Road, Kowloon, Hong Kong
					-->
    			<v-layout row wrap>						
						<v-flex xs12 sm6 pa-2>
							<h2>BITCOIN</h2>
						</v-flex>
						<v-flex xs12 pa-2>
							<h4 class="font-weight-thin">Address</h4>
							<h3>1HUx1w6QgBYmNbaNtpH5mN8wJ5WuJmJSsm</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Amount to Pay</h4>
							<h1>&euro; {{ currency(amount) }}</h1>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">BITCOIN amount to send</h4>							
							<!-- <h1>0.00000001</h1> -->
							<h1>{{ bitcoin_amnt }}</h1>
						</v-flex>						

						 
						<v-flex xs12 py-4>
							<v-divider></v-divider>
						</v-flex>


						<v-flex xs12 sm6 pa-2>
							<h2>ETHEREUM</h2>
						</v-flex>
						<v-flex xs12 pa-2>
							<h4 class="font-weight-thin">Address</h4>
							<h3>0x44506E8e4F0f95dAA1F9e41E9ED23d01cacf6D09</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Amount to Pay</h4>
							<h1>$ {{ currency(amount) }}</h1>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">ETHEREUM amount to send</h4>							
							<!-- <h1>0.00000001</h1> -->
							<h1>{{ ethereum_amnt }}</h1>
						</v-flex>

						 



						<v-flex xs12 py-4>
							<v-divider></v-divider>
						</v-flex>


						<v-flex xs12 py-2 px-5 v-if="!confirmed">
          					<v-text-field 
          					v-model="transaction_id"
          					:error-messages="errorMsgs"
          					 @blur="$v.transaction_id.$touch()"
          					 @input="$v.transaction_id.$touch()"
          					label="Please write here the Transaction ID."></v-text-field>
						</v-flex>
						<v-flex xs12 pa-2 mt-3 v-if="confirmed">
                			<h2 style="text-align: center;">
                				We will check the Bank Transfer in a moment.
                			</h2>
						</v-flex>
    			</v-layout>
						




    		</v-container>
    		
    	</v-card-text>

		


		<v-card-actions>

			<v-layout row wrap align-center justify-center  ma-2 pa-2>

				<v-btn large block
				v-if="!confirmed"
				color="green darken-2" 
				class="white--text payBtn"
				:disabled="(bitcoin_amnt=='0.00000000' || ethereum_amnt=='0.00000000')"
				:loading="paymentLoading"
				@click="pay()">
					<v-icon class="mr-2">
				    	fas fa-money-check-alt
				    </v-icon>
					Transfer was confirmed!
				</v-btn>
				
				<v-btn large block
				v-if="error_banktransfer"
				color="red darken-2" 
				class="white--text payBtn"
				:loading="paymentLoading"
				@click="payFailed()">
					<v-icon class="mr-2">
				    	fas fa-money-check-alt
				    </v-icon>
					Transfer failed!
				</v-btn>


				<v-btn large block
				v-if="confirmed"
				color="blue darken-2" 
				class="white--text payBtn"
				@click="paySuccess()">
					<v-icon class="mr-2">far fa-check-circle</v-icon>
					close
				</v-btn>



			</v-layout>
		</v-card-actions>
    </v-card>

</v-dialog>      	
</template>

<script>
// import helpers from "@/mixins/helpers";
import inqMixin from "@/mixins/inquiry"
import inqEvntBs from "@/bus/inquiry"

import { required, minLength, } from 'vuelidate/lib/validators'

import {round} from 'lodash'
import { mapGetters } from 'vuex'

export default {

	mixins: [
		// helpers,
		inqMixin,
	],

	validations: {
		transaction_id: { required, minLength: minLength(5), },
	},

	props:{

		'dialog': {
			type: Boolean,
			default: false,
		},
		'description': String,
		'id': String,
		'amount': Number,
		'paymentType': String,
		'plan': String,		
	},

	data(){ return {
		dialogLocal: false,
		confirmed: false,
		error_banktransfer: false,
		paymentLoading: true,
		amountEUR_USD: 0,
		transaction_id: '',
		
		bitcoin_amnt: '0.00000000',
		ethereum_amnt: '0.00000000',

	}},


	created(){
		
	},

	methods:{
		pay(){

			this.$v.$touch();
			// this.$v.transaction_id.$touch();

			if (!this.$v.$invalid) {
				var payload = {};

				this.paymentLoading = true;

				if(this.plan) { // for subscription
					payload = {
						id: this.id,
						payment_type: "subscribe",
						plan: this.plan,
						crypto_transaction_id: this.transaction_id,
					};

				} else {
					payload = {
						id: this.id,
						payment_type: this.paymentType,
						crypto_transaction_id: this.transaction_id,
					}
				}


				this.$store.dispatch(this.getStore('pymnt')+'/payByCryptoCurrency_a', payload)
				.then((response) => {
					this.paymentLoading = false;
					console.log('payByCryptoCurrency_a', response);
					this.confirmed = true;
				})
				.catch((e) => {
					console.log(e);
					this.paymentLoading = false;
					this.error_banktransfer = true;
				});


				// setTimeout(()=>{
				// 	this.paymentLoading = false;
				// 	this.confirmed = true;
				// },2000);
			} else {				

			}
		},

		paySuccess() {
			this.$emit('banktransfer-success');
			this.closeDialog();
		},

		payFailed() {
			this.$emit('banktransfer-failed');
			this.closeDialog();
		},


		openDialog(){
			this.dialogLocal = true;
		},

		closeDialog(){
			this.dialogLocal = false;
			this.bitcoin_amnt = '0.00000000';
			this.ethereum_amnt = '0.00000000';
			this.$emit('update:dialog', false);
		},

		getCryptoConversion(){
			this.$store.dispatch(this.getStore('pymnt')+'/getCryptoCurrency_a', {
				coin_currency: 'BTC-USD',
			})
			.then((rspns)=>{
				console.log(rspns);
				this.bitcoin_amnt = round(this.amount / rspns.amount,10);
				this.paymentLoading = false;				
			});

			this.$store.dispatch(this.getStore('pymnt')+'/getCryptoCurrency_a',{
				coin_currency: 'ETH-USD',
			})
			.then((rspns)=>{
				console.log(rspns);
				this.ethereum_amnt = round(this.amount / rspns.amount,10);
				this.paymentLoading = false;				
			});


		},


	},



	computed: {
		errorMsgs(){

			var msgs = [];

			if(this.$v.transaction_id.$dirty) {				
				if(!this.$v.transaction_id.required)
				msgs.push('This is required');
				
				if(!this.$v.transaction_id.minLength)
				msgs.push('At least 5 characters is required');			
			}

			return msgs;
		},
	},




	watch:{
		dialog:{
			handler(nVal,oVal){
				if(nVal){
					this.getCryptoConversion();
					this.openDialog();
				} else {
					this.closeDialog();
				}
			},
		},
	},

}
</script>

<style scoped lang="scss">
h4, h5, h3 {
	text-align: left;
}
</style>