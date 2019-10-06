<template>
<span>
<v-layout row wrap>
	  
	<v-flex xs12>
		<table class="payment-summary mt-3 ">
			<tr v-if="!this.project.project_fee_paid">
				<td class="px-4">PSF: </td>
				<td class="currency">$ {{ currency(psf) }}</td>
			</tr>
			<!-- //////////////////////////////////////////////////////////////// -->
			<template v-if="revision.shipping_cost">
				<tr>
					<td class="px-4">Shipping Cost</td>
					<td class="currency">$ {{ currency(revision.shipping_cost) }}</td>
				</tr>
			</template>
			<!-- //////////////////////////////////////////////////////////////// -->
			
			<!-- //////////////////////////////////////////////////////////////// -->
			<template v-if="revision.items && revision.items.length">
				<tr>
					<td colspan="2" class="px-4 pt-3">
						<span>Items: </span>
					</td>
				</tr>			
				
				<template v-for="(item, i) in revision.items" >				
					<tr :key="'item_'+i">
						<td class="px-4">{{ item.item_number }} - {{ item.name }}</td>
						<td class="currency">$ {{ currency(item.price*item.quantity) }}</td>
					</tr>
				</template>

				<tr>
					<td></td>
					<td>
						<v-divider class=""></v-divider>
					</td>
				</tr>

				<tr>
					<td class="px-4 pt-2 font-weight-bold">Ordered Amount:</td>
					<td class="font-weight-bold currency">$ {{ currency(itemTotal) }}</td>
				</tr>
			</template>
			<!-- //////////////////////////////////////////////////////////////// -->


			<tr>
				<td class="pt-3" colspan="2">
					<v-divider class="my-3 main-divider"></v-divider>
				</td>
			</tr>
			<tr class="totalRow">
				<td class="px-4">Total Amount to Pay:</td>
				<td class="currency">$ {{ currency(overAllTotal) }}</td>
			</tr>
		</table>
	</v-flex>



	<!-- {{ revision.shipping_cost }} - {{ project.stage_id }} - {{ project.selected_quotation_id }} -->
	<!-- <pre>{{ project }}</pre> -->

	<template v-if="this.project.stage_id == 1006">
		<v-flex xs8 offset-xs2 text-xs-center mt-4>
				<v-alert
				:value="true"
				type="info">
					BAL is confirming payment.
				</v-alert>			
		</v-flex>				
	</template>
	<template v-else-if="this.project.stage_id == 2001">
		<v-flex xs8 offset-xs2 text-xs-center mt-4>
				<v-alert
				:value="true"
				type="success">
					This is already paid.
				</v-alert>			
		</v-flex>				
	</template>
	<template v-else>
		<template v-if="project.selected_quotation_id == rev_id">
			<!-- <v-flex xs8 offset-xs2 text-xs-center mt-4>
				<v-btn 
				class="black white--text" 
				block
				:loading="btnLdng">
					Pay Quotation
				</v-btn>
			</v-flex> -->

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

			</v-flex>

		</template>

		<template v-else-if="!project.selected_quotation_id">
			<v-flex xs8 offset-xs2 text-xs-center mt-4>
				<v-btn 
				class="black white--text" 
				block
				@click="confirmRevisionDialog=true"
				:loading="btnLdng">
					Confirm this Revision
				</v-btn>
			</v-flex>
		</template>

		<template v-else>
			<v-flex xs8 offset-xs2 text-xs-center mt-4>
				<v-alert
				:value="true"
				type="info">
					Already selected a revision.
				</v-alert>			
			</v-flex>		
		</template>
	</template>



	<v-flex xs12 text-xs-center mt-4>
		<div :value="true"
		class="payment-protection black--text">
			<v-icon class="black--text">fas fa-user-shield</v-icon>
			<span>100% Payment Protection</span>
		</div>
	</v-flex>

</v-layout>





<v-dialog v-model="confirmRevisionDialog" width="800px">
    <v-card>

        <v-card-text>
        	<h3 class="mt-2 ml-3">Are you sure to select this Revision:</h3>
        	<h1 class="text-sm-center font-weight-regular my-3">Revision {{ revision.revision }} <span style="font-size: 0.8em;">({{ revision.id }})</span> </h1>
        </v-card-text>
        <v-card-actions>
        	<v-btn 
        	@click="selectRevision()"
        	class="green white--text">
        		CONFIRM
        	</v-btn>
        	<v-spacer></v-spacer>
        	<v-btn 
        	@click="confirmRevisionDialog=false"
        	class="black white--text">
        		cancel
        	</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

	


<bank-transfer-details 
paymentType="project" 
:description="'Payment for My Home Project No. '+revision.id"
:amount="overAllTotal" 
:id="$route.params.proj_id" 
:dialog.sync="showBankTransferDetails"
@banktransfer-success="banktransferSuccess($event)"
@banktransfer-failed="banktransfertFailed($event)">
</bank-transfer-details>


<foloosi-payment 
:reference_token="reference_token" 
@payment-success="paymentSuccess($event)"
@payment-failed="paymentFailed($event)">
</foloosi-payment>



</span>	
</template>

<script>
import config from '@/config/main';
import BankTransferDetails from "@/views/Components/App/Buyer/MyHome/BankTransferDetails";
import FoloosiPayment from "@/views/Components/App/Payment/FoloosiPayment";
import PackageMixin from '@/mixins/Package'

export default {
	props: {
		'revision': {
			type: Object,
			default: {
				items:[],
			},
		}
	},

	mixins: [
		PackageMixin,
	],

	components: {
		BankTransferDetails,
		FoloosiPayment,
	},

	data(){ return {
		btnLdng: false,
		confirmRevisionDialog: false,
		project: {},
		showBankTransferDetails: false,

		reference_token:'',
		creditCardLoading: false,
	}},

	computed:{
		proj_id(){
			return this.$route.params.proj_id;
		},
		rev_id(){
			return this.$route.params.rev_id;
		},

		itemTotal(){
			var retVal = 0;

			if(this.revision.items) {				
				this.revision.items.forEach((item)=>{				
					retVal = retVal + (item.price*item.quantity);
				});
			}

			return retVal;
		},

		psf(){
			if(!this.project.project_fee_paid)
			return this.$route.meta.psf;
			// return config.myHome.psf;
			else
			return 0;
		},

		overAllTotal(){
			if(this.revision.shipping_cost)
			return this.psf + this.itemTotal + this.revision.shipping_cost;
			else
			return this.psf + this.itemTotal;
		},
	},

	created(){
		this.getProject();

		// this is for test
		// this.revision.shipping_cost = 10000;
	},

	methods:{
		
		getProject(){
			// console.log('xxxxxxx'+this.getStore('myHm')+'/getProject_a');
			this.$store.dispatch(this.getStore('myHm')+'/getProject_a',{
				proj_id:this.proj_id,
			})
			.then((rspns)=>{
				this.project = rspns;
			})
			.catch((e)=>{
				console.log(e);
			});
		},

		selectRevision(){

			// set project  status to Confirmation
			// this.project.stage_id = 1004;
			this.project.selected_quotation_id = this.rev_id;

	    	this.$store.dispatch(this.getStore('myHm')+'/editProject_a',{
	    		proj_id: this.proj_id,
	    		formData:{
	    			...this.project,
	    		},    		
	    	})
	    	.then((rspns)=>{
				this.project.status_id = 1004;
	    		this.confirmRevisionDialog=false;
	    	})
	    	.catch((e)=>{
	    		console.log(e);
	    	});

		},

		payByCreditCard() {
			this.creditCardLoading = true;
			this.$store.dispatch(this.getStore('pymnt')+'/getCreditCardResource_a', {
				id: this.proj_id,
				type: "project",
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

			console.log(data);

			this.$store.dispatch(this.getStore('pymnt')+'/setPurchaseAsPaid_a', {
				transaction_id: data.transaction_no,
				id: this.proj_id,
				type: "project",
			})
			.then((response) => {

				this.$router.push({
					name: this.package.routeName.project,
					params:{
						proj_id: this.proj_id,
					},
				});				

			})
			.catch((e) => {
				console.log(e);				

				this.$router.push({
					name: this.package.routeName.project,
					params:{
						proj_id: this.proj_id,
					},
				});				

				
			});

		},

		paymentFailed(data){
			console.log(data);
		},


		banktransferSuccess(data){
			this.$router.push({
				name: this.package.routeName.project,
				params:{
					proj_id: this.proj_id,
				},
			});		
		},
		banktransferFailed(data){

		},
	},

}
</script>



<style scoped lang="scss">
.payment-summary {
	width: 100%;
	tr {
		td {
			padding: 0px;
			// padding-left: 20px;
			text-align: left;
			font-size: 1.1em;
		}
	}
	.totalRow {
		td {
			font-size: 1.2em;
			font-weight: bold;
		}
	}

	td.currency {
		padding-left: 15px;
	}

}
	
.main-divider {
    border-width: 1px;
    border-color: #000;
}

.payment-protection {
    padding: 20px;
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #000;
}

.payBtn {
	height: 55px;
	h4 {
		white-space: normal;
		line-height: normal;
	    text-align: left;
	    padding-left: 10px;		
	}
}
</style>