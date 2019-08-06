<template>
<span>
<v-layout row wrap>
	  
	<v-flex xs12>
		<table class="payment-summary mt-3 ">
			<tr>
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
		class="black white--text" 
		block
		@click="paySamples()"
		:loading="btnLdng">
			Pay samples
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
</span>	
</template>

<script>
import config from '@/config/main';

export default {
	props: {
		proj_id: String,
		samples: Array,
	},

	data(){ return {
		btnLdng: false,
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
			return config.myHome.psf;
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

	methods:{
		paySamples(){

			var samplesToRequest = [];

			this.samples.forEach((sample)=>{
				if(sample.formData.quantity>0 && sample.formData.ordered) {				
					samplesToRequest.push({
						id:sample.id,
						quantity:sample.formData.quantity,
					});
				}
			});

			console.log(samplesToRequest);

			this.$store.dispatch(this.getStore('myHm')+"/requestSample_a",{
				formData:samplesToRequest,
				proj_id: this.proj_id,
			})
			.then((rspns)=>{
				console.log(rspns);
				this.$router.push({
					name:'BuyerMyHomeProject',
					params:{
						proj_id: this.proj_id,
					},
				});
			})
			.catch((e)=>{
				console.log(e);
			});


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
</style>