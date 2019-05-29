<template>
	<v-alert 
	:value="(inquiry.stage_id==1005)?1:0"
	color="red darken-3" 
	style="width: auto; text-align:center; font-size:20px;"
	class="mb-2">
		Pending Payment!

		<template v-if="inquiry.etd != null && inquiry.eta != null">

		<v-card color="white darken-4 mt-3" class="black--text">
			<v-card-title primary-title>
				<div>
					<v-layout row wrap>
						<v-flex xs12>
							<div class="subheading">Shipment Details</div>
						</v-flex>
						<v-flex xs6>
							<span class="font-weight-light" style="font-size:70%;">
								Estimated Time Departure: 								
							</span>
							<br/>
							<span class="font-weight-medium">
								{{  getDateTime('mmm dd, yyyy', inquiry.etd ) }} 
							</span>
						</v-flex>
						<v-flex xs6>
							<span class="font-weight-light" style="font-size:70%;">
								Estimated Time Arrival: 
							</span>
							<br/>
							<span class="font-weight-medium">
								{{  getDateTime('mmm dd, yyyy', inquiry.eta ) }} 
							</span>
						</v-flex>
						<v-flex xs12>
							<v-layout row wrap>

								<v-flex xs12 mt-3>
									<h3>PAY BY:</h3>
								</v-flex>
								<v-flex xs6>
									<v-btn block 
									color="green darken-2" 
									class="white--text payBtn"
									@click="showBankTransferDetails=true">
										<v-icon class="mr-2">
											fas fa-money-check-alt
										</v-icon>
										<h4>BANK TRANSFER</h4>
									</v-btn>
								</v-flex>
								<v-flex xs6>
									<v-btn block 
									color="blue darken-2" 
									class="white--text payBtn"
									@click="payByCreditCard()">
										<v-icon class="mr-2">
											far fa-credit-card
										</v-icon>
										<h4>CREDIT CARD</h4>
									</v-btn>

									<form method="post" :action="creditCard.url" ref="creditCardForm">
										<input 
										type="hidden" 
										name="requestParameter" 
										:value="creditCard.requestParameter">
									</form>									
								</v-flex>

							</v-layout>		                	
						</v-flex>
					</v-layout>
				</div>
			</v-card-title>

			<v-card-actions>
			</v-card-actions>

		</v-card>

		<bank-transfer-details :inquiry="inquiry" :openDialog.sync="showBankTransferDetails"></bank-transfer-details>

		</template>

	</v-alert>	
</template>
<script>
import helpers from "@/mixins/helpers";
import BankTransferDetails from "@/views/Components/App/Buyer/BankTransferDetails";
export default {

	mixins: [
		helpers,
	],

	components: {
		BankTransferDetails,
	},

	props:[
		'inquiry',
	],

	data() { return {
		showBankTransferDetails: false,
		creditCard:{
			url: null,
			url: 'https://google.com',
			requestParameter: null,
		},
	}},

	methods:{

		payByCreditCard() {

			this.$store.dispatch('byrInq/getCreditCardResource', {
				inquiry_id: this.inquiry.id
			})
			.then((response) => {

				console.log('getCreditCardResource', response);

				this.creditCard.requestParameter = response.request_parameter;
				this.creditCard.url = response.request_url;

				this.$nextTick()
				.then(() => {
					this.$refs.creditCardForm.submit();
				});

			})
			.catch((e) => {
				  console.log(e);				
			});

		},

	},

}	
</script>

<style scoped lang="scss">
.payBtn {
	height: 65px};

</style>




