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




</v-layout>




</span>	
</template>

<script>
import config from '@/config/main';

export default {
	props: {
		'revision': {
			type: Object,
			default: {
				items:[],
			},
		}
	},


	data(){ return {
		btnLdng: false,
		confirmRevisionDialog: false,
		project: {},
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
			return config.myHome.psf;
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
				// this is for test
				this.project.selected_quotation_id = null;
			})
			.catch((e)=>{
				console.log(e);
			});
		},

		selectRevision(){

			// set project  status to Confirmation
			this.project.stage_id = 1004;
			this.project.selected_quotation_id = this.rev_id;

	    	this.$store.dispatch(this.getStore('myHm')+'/editProject_a',{
	    		proj_id: this.proj_id,
	    		formData:{
	    			...this.project,
	    		},    		
	    	})
	    	.then((rspns)=>{
	    		this.confirmRevisionDialog=false;
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
</style>