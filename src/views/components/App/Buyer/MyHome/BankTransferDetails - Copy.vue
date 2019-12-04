<template>
<v-dialog 
:value="dialogLocal" 
@input="" 
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
				:loading="paymentLoading"
				@click="payByBankTransfer()">
					<v-icon class="mr-2">
				    	fas fa-money-check-alt
				    </v-icon>
					Confirm Bank Transfer was done!
				</v-btn>
				
				<v-btn large block
				v-if="!error_banktransfer"
				color="red darken-2" 
				class="white--text payBtn"
				:loading="closeDialog()"
				@click="banktransferFailed()">
					<v-icon class="mr-2">
				    	fas fa-money-check-alt
				    </v-icon>
					Bank Transfer failed!
				</v-btn>


				<v-btn large block
				v-if="confirmed"
				color="red darken-2" 
				class="white--text payBtn"
				@click="banktransferSuccess()">
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

		'dialog': Boolean,
		'description': String,
		'id': String,
		'amount': Number,
		'paymentType': {
			type:String,
			default: 'inquiry',
		},
	},

	data(){ return {
		dialogLocal: false,
		confirmed: false,
		error_banktransfer: false,
		paymentLoading: false,
	}},

	methods:{
		payByBankTransfer(){		
			this.paymentLoading = true;
			this.$store.dispatch(this.getStore('pymnt')+'/payByBankTransfer_a', {
				id: this.$route.params.proj_id,
				payment_type: 'project',
			})
			.then((response) => {
				this.paymentLoading = false;
				console.log('payByBankTransfer', response);
				this.confirmed = true;
				// this.$emit('banktransfer-success');
			})
			.catch((e) => {
				console.log(e);				
				this.paymentLoading = false;
				this.error_banktransfer = true;
				// this.$emit('banktransfer-failed');
			});			
			
		},

		banktransferSuccess() {
			this.$emit('banktransfer-success');
			this.closeDialog();
		},

		banktransferFailed() {
			this.$emit('banktransfer-failed');
			this.closeDialog();
		},


		openDialog(){
			console.log('this.dialogLocal',this.dialogLocal);
			this.dialogLocal = true;
			console.log('this.dialogLocal',this.dialogLocal);
		},

		closeDialog(){
			this.dialogLocal = false;
			this.$emit('update:dialog', false);			
		},
	},


	watch:{
		dialog:{
			handler(nVal,oVal){
				console.log('dialog prop',nVal);
				if(nVal){
					// this.openDialog();
					this.dialogLocal = true;
					console.log('this.openDialog()');
				} else {
					// this.closeDialog();					
					// console.log('this.closeDialog()');
				}
			},
		},
	}

}
</script>

<style scoped lang="scss">
h4, h5, h3 {
	text-align: left;
}
</style>