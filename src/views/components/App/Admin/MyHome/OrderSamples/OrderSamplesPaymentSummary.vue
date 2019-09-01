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
        			<v-tooltip right>
	        		<template #activator="{ on }">
					<tr 
					v-if="sample.sample_quantity && sample.sample_price"
					v-on="on"
					:key="'sample_'+i">					
						<td class="px-4">							
							{{ sample.item_number }} - {{ sample.name }}
						</td>
						<td class="currency">$ {{ currency(getSampleTotal(sample)) }}</td>
					</tr>

                    </template>
					<span style="font-size: 1.8em;">
						({{ sample.sample_quantity }} x ${{ currency(sample.sample_price) }}) + ${{ currency(sample.sample_shipment_price_less_5) }}
					</span>
                	</v-tooltip>

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



	<!-- <v-flex xs12 text-xs-center mt-4>
		<div :value="true"
		class="payment-protection black--text">
			<v-icon class="black--text">fas fa-user-shield</v-icon>
			<span>100% Payment Protection</span>
		</div>
	</v-flex> -->

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



		getSampleTotal(sample){
			var retVal = 0;		
			retVal = (sample.sample_quantity * sample.sample_price) +  this.getSampleShipmentCost(sample);
		},

		getSampleShipmentCost(sample){
			var retVal = 0;

			if(sample.sample_quantity<=5)
			retVal = sample.sample_shipment_price_less_5;
			else if(sample.sample_quantity>5)
			retVal = sample.sample_shipment_price_5_10;
			
			return retVal;
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