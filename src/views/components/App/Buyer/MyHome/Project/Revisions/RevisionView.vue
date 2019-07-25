<template>
<span>
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
				<h3 class="d-inline-block ml-2">Revision {{ rev_id }} </h3>
			</v-flex>

			<v-flex xs12>

				<v-card>
					<v-card-text class="item-box">
					<v-layout row wrap>						  

						<v-flex xs12>
							<v-layout row wrap justify-space-between align-center py-3 px-3>
								<h1 class="d-inline-block">
									{{ revision.revision }} <span class="font-weight-regular title">({{ rev_id }})</span>
								</h1>

								<router-link :to="{name:'BuyerMyHomeOrderSamples', params:{proj_id:proj_id,rev_id:rev_id}}">
									<v-btn class="black white--text">
										order samples
									</v-btn>
			                    </router-link>
		                	</v-layout>
						</v-flex>

						<v-flex xs12>



						</v-flex>
					</v-layout>

					</v-card-text>
				</v-card>

			</v-flex>
		</v-layout>
	</v-container>





</span>	
</template>

<script>
import ImageView from "@/views/Components/App/Buyer/MyHome/ImageView";
import RevisionViewTable from "@/views/Components/App/Buyer/MyHome/Project/Revisions/RevisionViewTable";

export default {

	components:{
		ImageView,
		RevisionViewTable,
	},

	data() { return {

		revision: {},
		dialog: false,		
		dialogImage: '',
		tableSettings: {

	        headers: [
	        	{
	        	  text: 'Details',
	        	  align: 'left',
	        	  value: 'item_number',
	        	  sortable: true,
	        	},
	        	{
	        	  text: 'Unit Price',
	        	  align: 'left',
	        	  value: 'price',
	        	  sortable: true,
	        	},
	        	{
	        	  text: 'Quantity',
	        	  align: 'left',
	        	  value: 'quantity',
	        	  sortable: true,
	        	},
	        	{
	        	  text: 'Total Price',
	        	  align: 'left',
	        	  value: 'price',
	        	  sortable: true,
	        	},
	        ],

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
		this.getRevision();	
	},

	methods: {

	    getRevision(){
	    	this.$store.dispatch(this.getStore('myHm')+'/getQuotation_a',{
	    		proj_id: this.proj_id,
	    		rev_id: this.rev_id,
	    	})
	    	.then((rspns)=>{
	    		console.log(rspns);

	    		this.revision = rspns;
	    	})
	    	.catch((e)=>{
	    		console.log(e);
	    	});
	    },

	},


}	
</script>


<style scoped lang="scss">

.item-table /deep/ {
	width: 100%;
	table {
		thead {
			th {
				.v-icon {
					margin-left: 10px;
				}
			}
		}
		tbody {
			tr {
				td {
					img {
						// width: 150px;
						// margin-left: 0px;
						// margin-right: 20px;
						// margin-top: 20px;
						// margin-bottom: 20px;
					}
				}
			}
		}
	}
}	
</style>