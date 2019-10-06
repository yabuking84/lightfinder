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

								<v-flex xs12 mt-3 mx-3>
									<!-- <h3 style="text-align: left;">
										<span class="font-weight-light">Amount to Pay: </span>
									</h3> -->
									<table class="amountBreakdown mt-3">
										<tr>
											<td class="pr-4">Inquiry Amount:</td>
											<td>$ {{ currency(inquiry.amount) }}</td>
										</tr>
										<tr>
											<td class="pr-4">Shipping Cost:</td>
											<td>$ {{ currency(inquiry.shipping_cost) }}</td>
										</tr>
										<tr>
											<td colspan="2">
												<v-divider></v-divider>
											</td>
										</tr>
										<tr class="totalRow">
											<td class="pr-4">Total Amount to Pay:</td>
											<td>$ {{ currency(amountToPay) }}</td>
										</tr>
									</table>										

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
									:loading="creditCardLoading"
									@click="payByCreditCard()">
										<v-icon class="mr-2">
											far fa-credit-card
										</v-icon>
										<h4>CREDIT CARD</h4>
									</v-btn>

									<!-- <form method="post" :action="creditCard.url" ref="creditCardForm">
										<input 
										type="hidden" 
										name="requestParameter" 
										:value="creditCard.requestParameter">
									</form> -->
								</v-flex>

							</v-layout>		                	
						</v-flex>
					</v-layout>
				</div>
			</v-card-title>

			<v-card-actions>
			</v-card-actions>

		</v-card>

		<bank-transfer-details 
		:description="'Payment for Inquiry# '+inquiry.id"
		:amount="amountToPay" 
		:id="inquiry.id" 
		:openDialog.sync="showBankTransferDetails">			
		</bank-transfer-details>


		<foloosi-payment 
		:reference_token="reference_token" 
		@payment-success="paymentSuccess($event)"
		@payment-failed="paymentFailed($event)">
		</foloosi-payment>

		</template>

	</v-alert>	
</template>
<script>
// import Foloosi from "@/assets/foloosipay.v2.js";

// import helpers from "@/mixins/helpers";
import BankTransferDetails from "@/views/Components/App/Buyer/BankTransferDetails";

import FoloosiPayment from "@/views/Components/App/Payment/FoloosiPayment";

import inqMixin from "@/mixins/inquiry"


export default {

	mixins: [
		// helpers,
		inqMixin,
	],

	components: {
		BankTransferDetails,
		FoloosiPayment,
	},

	props:[
		'inquiry',
	],

	data() { return {
		showBankTransferDetails: false,
		// creditCard:{
		// 	url: null,
		// 	requestParameter: null,
		// },
		amountToPay: this.inquiry.amount + this.inquiry.shipping_cost,


		
		// foloosi
		/////////////////////////////////////
		creditCardLoading: false,
		reference_token:'',
		/////////////////////////////////////
		// foloosi
	}},

	created(){
		console.log('inquiry',this.inquiry);        
	},

	methods:{

		payByCreditCard() {
			this.creditCardLoading = true;
			this.$store.dispatch(this.getStore('pymnt')+'/getCreditCardResource_a', {
				id: this.inquiry.id,
				type: "lightfinder.inquiry",
			})
			.then((response) => {
				console.log('getCreditCardResource', response);
				this.reference_token = response.reference_token;
				this.creditCardLoading = false;
			})
			.catch((e) => {
				  console.log(e);
			});
		},

		paymentSuccess(data){

			// 'inquiry'

			console.log('paymentDone',data);

			this.$store.dispatch(this.getStore('pymnt')+'/setPurchaseAsPaid_a',{
				transaction_id: data.transaction_no,
				id: this.inquiry.id,
				type: 'lightfinder.inquiry',
			})
			.then((rspns)=>{
				console.log(rspns);
				this.closeOpenInquiry();
			})
			.catch((e)=>{

			});
		},

		paymentFailed(data){
			console.log('paymentFailed',data);
		},

		closeOpenInquiry(){
            this.openInquiry = false;
		},
	},

	watch:{
		inquiry:{
			handler(nVal, oVal) {
				if(nVal)
				this.amountToPay = this.inquiry.amount + this.inquiry.shipping_cost;
			},
			deep: true,
		},
	},



}	
</script>

<style scoped lang="scss">
.payBtn {
	height: 65px
};

.amountBreakdown {
	width: 100%;
	td {
		text-align: left;
		font-size: 0.8em;
	}
	.totalRow {
		td {
			font-size: 1em;
			font-weight: bold;
		}
	}
}

</style>




