<template>
<div>
	<v-container fluid grid-list-xl>
		<v-layout row wrap>
			
			<v-flex xs12 class="white--text">
				<router-link :to="{name:'BuyerMyHome'}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						My Home
					</h3>
				</router-link> 
				/
				<router-link :to="{name:'BuyerMyHomeProject', params:{proj_id:proj_id}}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						Project {{ proj_id }}
					</h3>
				</router-link> 
				/
				<h3 class="d-inline-block ml-2">Payment</h3>
			</v-flex>

			<v-flex xs12>

				<v-card>
					<v-card-text class="item-box">
					<v-layout row wrap>						  

						<v-flex xs12>							  
							<h1 class="d-inline-block ml-2">Payment</h1>
						</v-flex>

						<v-flex xs5>
							<payment-summary v-if="items.length" :proj_id="proj_id" :items="items"></payment-summary>
						</v-flex>

						<v-flex xs7>
							<items-table v-if="items.length" :proj_id="proj_id" :items="items"></items-table>
						</v-flex>
					</v-layout>

					</v-card-text>
				</v-card>

			</v-flex>
		</v-layout>
	</v-container>
</div>	
</template>

<script>	
import ItemsTable from '@/views/Components/App/Buyer/MyHome/PayQuotation/PayQuotationOrderTable';
import PaymentSummary from '@/views/Components/App/Buyer/MyHome/PayQuotation/PayQuotationSummary';

export default {

	components:{
		ItemsTable,
		PaymentSummary,
	},

	data() { return {

		items: [],

	}},

	computed:{
		proj_id(){
			return this.$route.params.proj_id;
		},
	},

	created(){
		this.getItems();	
	},

	methods: {

	    getItems(){
	    	this.$store.dispatch(this.getStore('myHm')+'/getQuotations_a',{
	    		proj_id: this.proj_id,
	    	})
	    	.then((rspns)=>{
	    		console.log(rspns);

	    		if(rspns[0])
	    		this.items = rspns[0].items;

	    	})
	    	.catch((e)=>{
	    		console.log(e);
	    	});
	    },

	},


}	
</script>