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
    		<h3 class="ml-4">Bank Transfer Confirmation</h3>

    		<v-btn dark flat icon
    		style="position: absolute; top: 0; right: 0; margin: 10px 10px;"
    		class="black--text"
    		@click="closeDialog()">
				<v-icon>close</v-icon>
			</v-btn>    
    	</v-card-title>
    	
    	<v-card-text>

    		<v-container pa-0>

    			<v-layout row wrap>

					<v-flex xs12 sm6 pa-2>
						<h4 class="font-weight-thin">First Name</h4>
						<h3>{{ buyer.first_name }}</h3>
					</v-flex>
					<v-flex xs12 sm6 pa-2>
						<h4 class="font-weight-thin">Last Name</h4>
						<h3>{{ buyer.last_name }}</h3>
					</v-flex>
					<v-flex xs12 sm6 pa-2>
						<h4 class="font-weight-thin">Email</h4>
						<h3>{{ buyer.email }}</h3>
					</v-flex>
					<v-flex xs12 sm6 pa-2>
						<h4 class="font-weight-thin">Subscription</h4>
						<h3>
							{{ buyer.subscription_data.package_name }} - 
							{{ buyer.subscription_data.package_duration_name }}
						</h3>
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
				@click="confirmBankTransfer()">
					<v-icon class="mr-2">
				    	fas fa-money-check-alt
				    </v-icon>
					Confirm Bank Transfer!
				</v-btn>
				

				<v-btn large block
				v-if="confirmed"
				color="blue darken-2" 
				class="white--text payBtn"
				@click="bankTransferConfirmationSuccess()">
					<v-icon class="mr-2">far fa-check-circle</v-icon>
					close
				</v-btn>
				

				<v-alert class="mt-3" type="error" :value="confirmedFailed">
					<v-icon class="mr-2">far fa-times-circle</v-icon>
					failed
				</v-alert>

			</v-layout>
		</v-card-actions>
    </v-card>

</v-dialog>      	
</template>

<script>
export default {

	props:{
		'dialog': {
			type: Boolean,
			default: false,
		},

		buyer: {
			type: Object,
			default: {
				first_name: '',
				last_name: '',
				email: '',
				subscription_data: {
					package_name:'',
					package_duration_name:'',
				}
			},
		},
	},

	data(){ return {
		dialogLocal: false,
		confirmed: false,
		confirmedFailed: false,
		error_banktransfer: false,
		paymentLoading: false,
	}},

	methods:{
		confirmBankTransfer(){
			this.paymentLoading = true;
			this.$store.dispatch('admnByr/markSubscriptionAsPaid_a',{
				buyer_id: this.buyer.id,
				subscription_id: this.buyer.subscription_data.id,
			})
			.then((rspns)=>{
				this.paymentLoading = false;
				this.confirmed = true;
			})
			.catch((e)=>{
				this.paymentLoading = false;
				this.confirmedFailed = true;
			});			
		},

		bankTransferConfirmationSuccess() {
			this.$emit('bankTransferConfirmation-success');
			this.closeDialog();
		},

		bankTransferConfirmationFailed() {
			this.$emit('bankTransferConfirmation-failed');
			// this.closeDialog();
		},


		openDialog(){
			this.confirmed = false;
			this.confirmedFailed = false;
			this.dialogLocal = true;
		},

		closeDialog(){
			this.dialogLocal = false;
			this.$emit('update:dialog', false);
		},
	},


	watch:{
		dialog:{
			handler(nVal,oVal){
				
				// console.log(this.buyer);

				if(nVal)
				this.openDialog();				
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