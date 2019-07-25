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
				<router-link :to="{name:'BuyerMyHomeRevisionView', params:{proj_id:proj_id,rev_id:rev_id}}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						Revision {{ rev_id }}
					</h3>
				</router-link> 
				/
				<h3 class="d-inline-block ml-2">Order Samples</h3>
			</v-flex>

			<v-flex xs12>

				<v-card>

					<v-card-text class="item-box">
						<v-layout row wrap>

							<v-flex xs12>							  
								<h1 class="d-inline-block ml-2">Order Samples</h1>
							</v-flex>

							<v-flex xs4>							
								<payment-sample-summary :proj_id="proj_id" :samples="samples"></payment-sample-summary>
							</v-flex>

							<v-flex xs8>
								<payment-sample-order-table :samples.sync="samples"></payment-sample-order-table>
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

import PaymentSampleSummary from "@/views/Components/App/Buyer/MyHome/OrderSamples/OrderSamplesPaymentSummary"
import PaymentSampleOrderTable from "@/views/Components/App/Buyer/MyHome/OrderSamples/OrderSamplesTable"

export default {

	components: {
		PaymentSampleSummary,
		PaymentSampleOrderTable,
	},


	data() { return {

		samples: [],
		formData :{
			items:[],
		},

	}},

	computed:{
		proj_id(){
			return this.$route.params.proj_id;
		},
		rev_id(){
			return this.$route.params.rev_id;
		},
	},

	created(){
		this.getSamples();	
	},

	methods: {

	    getSamples(){
	    	this.$store.dispatch(this.getStore('myHm')+'/getQuotation_a',{
		    	proj_id: this.proj_id,
		    	rev_id: this.rev_id,
		    })
	    	.then((rspns)=>{
	    		
	    		this.samples = rspns.items.map((sample)=>{
	    			return {
	    				...sample,
	    				formData:{
	    					quantity:0,
	    					totalPrice:0,
	    					disabled:true,
	    					ordered:false,
	    				},
	    			}
	    		});

	    		console.log('getSamples',this.samples);

	    	})
	    	.catch((e)=>{
	    		console.log(e);
	    	});
	    },

	},



	watch:{

		dialog:{
			handler(nVal,oVal){
				this.formData.items = [];
			},
		},
	},



}	
</script>


<style scoped lang="scss">


</style>

