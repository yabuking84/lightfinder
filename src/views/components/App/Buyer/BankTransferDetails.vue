<template>
<v-dialog 
:value="openDialog" 
@input="$emit('update:openDialog', false)" 
max-width="600px"
lazy>

    <v-card>
    	<v-card-title class="headline">
            <img 
            style="width: 88px;"
            src="/static/logos/logo-black.png" 
            title="BuyAnyLight.com">
    		<h2 class="ml-4">Bank Transfer Details</h2>
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
							<h4 class="font-weight-thin">Beneficiary</h4>
							<h3>Standard Electronic Co., Limited</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Account No.</h4>
							<h3>123-369-168838</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Beneficiary's Bank</h4>
							<h3>HSBC Hong Kong</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Swift</h4>
							<h3>HSBCHKHHHKH</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Bank Address</h4>
							<h3>168838 Siomai Ampao St.</h3>
						</v-flex>
						<v-flex xs12 sm6 pa-2>
							<h4 class="font-weight-thin">Amount to Pay</h4>
							<h1>$ {{ currency(amount) }}</h1>
						</v-flex>
						<v-flex xs12 py-4>
							<v-divider></v-divider>
						</v-flex>
						<v-flex xs12 pa-2 v-if="!confirmed">
							<h4 class="font-weight-thin">Please write this on the description:</h4>
                			<h2>{{ description }}</h2>                			
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
				@click="payByBankTransfer()">
					<v-icon class="mr-2">
				    	fas fa-money-check-alt
				    </v-icon>
					Confirm Bank Transfer was done!
				</v-btn>


				<v-btn large block
				v-if="confirmed"
				color="red darken-2" 
				class="white--text payBtn"
				@click="closeDialog()">
					<v-icon class="mr-2">
				    	far fa-times-circle
				    </v-icon>
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
export default {

	mixins: [
		// helpers,
		inqMixin,
	],

	props:{

		'openDialog': Boolean,
		'description': String,
		'id': String,
		'amount': Number,
		'paymentType': {
			type:String,
			default: 'inquiry',
		},
	},

	data(){return{
		confirmed: false,
	}},

	methods:{
		payByBankTransfer(){

			if(this.paymentType=='inquiry') {				
				this.$store.dispatch(this.getStore()+'/payByBankTransfer', {
					id: this.id,
					payment_type: this.paymentType,
				})
				.then((response) => {

					console.log('payByBankTransfer', response);
					this.confirmed = true;
					inqEvntBs.emitPaymentMade();
				})
				.catch((e) => {
					  console.log(e);				
				});			
			}
		},

		closeDialog(){

			this.confirmed = false;
			this.hideInquiry();
		},
	},

}
</script>

<style scoped lang="scss">
h4, h5, h3 {
	text-align: left;
}
</style>