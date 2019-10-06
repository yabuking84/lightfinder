<template>
<span>
<v-layout row wrap>
	  
	<v-flex xs12>
		<table class="payment-summary mt-3 ">
			<tr v-if="!this.project.project_fee_paid">
				<td class="px-4">PSF:</td>
				<td class="currency">$ {{ currency(psf) }}</td>
			</tr>

			<!-- //////////////////////////////////////////////////////////////// -->
			<template v-if="sampleLength">				
				<tr>
					<td colspan="2" class="px-4 pt-3">
						<span>Items: </span>
					</td>
				</tr>			
				
				<template v-for="(sample, i) in samples" >				

					<tr 
					v-if="sample.formData.totalPrice && sample.formData.ordered"					
					:key="'sample_'+i">

		        	<v-tooltip right>
			        <template #activator="{ on }">

						<td class="px-4">							
							<!-- {{ sample.formData.quantity }} pc/s ({{ sample.item_number }}) {{ sample.name }} -->
							{{ sample.formData.quantity }} pc/s {{ sample.name }}
						</td>

						<td class="currency">
							<span v-on="on">$ {{ currency(sample.formData.totalPrice) }}</span>
						</td>

                    </template>
					<span style="font-size: 1.8em;">
						({{ sample.formData.quantity }} x ${{ currency(sample.sample_price) }}) + ${{ currency(sample.sample_shipment_price_less_5) }}
					</span>
                	</v-tooltip>

					</tr>

				</template>

				<tr>
					<td></td>
					<td>
						<v-divider class=""></v-divider>
					</td>
				</tr>

				<tr>
					<td class="px-4 pt-2 font-weight-bold">Sample Ordered Amount:</td>
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


	<v-flex xs8 offset-xs2 text-xs-center mt-4>
		<v-btn 
		class="green white--text payBtn" 
		block
		:disabled="sampleLength<=0"
		@click="paySamples()"
		:loading="creditCardLoading">
			<v-icon class="mr-2">
				far fa-credit-card
			</v-icon>
			<h4>Pay samples by <br>CREDIT CARD</h4>			
		</v-btn>
	</v-flex>


	<v-flex xs12 text-xs-center mt-4>
		<div :value="true"
		class="payment-protection black--text">
			<v-icon class="black--text">fas fa-user-shield</v-icon>
			<span>100% Payment Protection</span>
		</div>
	</v-flex>

</v-layout>




<foloosi-payment 
:reference_token="reference_token" 
@payment-success="paymentSuccess($event)"
@payment-failed="paymentFailed($event)">
</foloosi-payment>

</span>	
</template>

<script>
import config from '@/config/main';
import FoloosiPayment from "@/views/Components/App/Payment/FoloosiPayment";
import PackageMixin from '@/mixins/Package'

export default {
	props: {
		proj_id: String,
		samples: Array,
	},

	mixins: [PackageMixin],

	components: {
		FoloosiPayment,
	},

	data(){ return {
		btnLdng: false,
		smpl_ordr_grp_id: null,

		project: {},

		reference_token:'',
		creditCardLoading: false,		
	}},

	computed:{
		itemTotal(){
			var retVal = 0;

			this.samples.forEach((sample)=>{
				if(sample.formData.ordered)
				retVal = retVal + sample.formData.totalPrice;
			});

			return retVal;
		},

		psf(){
			
			if(!this.project.project_fee_paid)
			return this.$route.meta.psf;
			// return config.myHome.psf;
			else
			return 0;
		},

		sampleLength(){
			var rslt = this.samples.filter((sample)=>{
				return (sample.formData.totalPrice && sample.formData.ordered)
			});

			return rslt.length;
		},


		overAllTotal(){
			return this.psf + this.itemTotal;
		},
	},


	created(){
		this.getProject();
	},


	methods:{
		paySamples(){

			this.creditCardLoading = true;
			var samplesToRequest = [];
			this.samples.forEach((sample)=>{
				if(sample.formData.quantity>0 && sample.formData.ordered) {				
					samplesToRequest.push({
						id:sample.id,
						quantity:sample.formData.quantity,
					});
				}
			});

			// console.log(samplesToRequest);
			// console.log(this.getStore('myHm')+"/requestSample_a");

			this.$store.dispatch(this.getStore('myHm')+"/requestSample_a",{
				formData:samplesToRequest,
				proj_id: this.proj_id,
			})
			.then((rspns)=>{
				// console.log('paySamples',rspns);

				this.smpl_ordr_grp_id = rspns.group_id;


				this.$store.dispatch(this.getStore('pymnt')+'/getCreditCardResource_a', {
					id: this.smpl_ordr_grp_id,
					type: "project.sample",
				})
				.then((response) => {

					// console.log('getCreditCardResource', response);
					this.reference_token = response.reference_token;
					this.creditCardLoading = false;

				})
				.catch((e) => {
					 console.log(e);				
					this.creditCardLoading = false;
				});				


			})
			.catch((e)=>{
				console.log(e);
				this.creditCardLoading = false;
			});


		},		



		getProject(){
			// console.log('xxxxxxx'+this.getStore('myHm')+'/getProject_a');
			this.$store.dispatch(this.getStore('myHm')+'/getProject_a',{
				proj_id:this.proj_id,
			})
			.then((rspns) => {
				console.log('getProject_a',rspns);
				this.project = rspns;
			})
			.catch((e) => {
				console.log(e);
			});
		},

		paymentSuccess(data){

			console.log(data);

			this.$store.dispatch(this.getStore('pymnt')+'/setPurchaseAsPaid_a', {
				transaction_id: data.transaction_no,
				id: this.smpl_ordr_grp_id,
				type: "project.sample",
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
			font-size: 1.3em;
			font-weight: bold;
		}
	}

	td.currency {
		padding-left: 5px;
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
	    font-size: 15px;
	}
}
</style>