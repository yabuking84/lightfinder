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
			<template v-if="items.length">				
				<tr>
					<td colspan="2" class="px-4 pt-3">
						<span>Items: </span>
					</td>
				</tr>			
				
				<template v-for="(item, i) in items" >				
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


	<v-flex xs8 offset-xs2 text-xs-center mt-4>
		<v-btn 
		class="black white--text" 
		block
		:loading="btnLdng">
			Pay
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
		'items':{
			type: Array,
			default: ()=>[],
		},
	},


	data(){ return {
		btnLdng: false,
	}},

	computed:{
		itemTotal(){
			var retVal = 0;

			this.items.forEach((item)=>{				
				retVal = retVal + (item.price*item.quantity);
			});

			return retVal;
		},

		psf(){
			return config.myHome.psf;
		},

		overAllTotal(){
			return this.psf + this.itemTotal;
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
</style>