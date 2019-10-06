<template>
<span>

<v-dialog 
@input="closeDialog()" 
:value="dialog" 
width="80%"
scrollable>


	<v-card>
		<v-card-title class="black darken-4 ">
			<h2 class="font-weight-bold white--text">
				Sample Order Ref No. {{ group_id }}
			</h2>
			<v-spacer></v-spacer>
			<v-btn dark flat @click="closeDialog()">
				<v-icon>close</v-icon>
			</v-btn>
		</v-card-title>

		<v-divider></v-divider>

		<v-card-text>
			<v-container fluid grid-list-xl pa-0>

				<!-- <v-layout row wrap>
					<v-flex>
						<pre>{{ samples }}</pre>
					</v-flex>
				</v-layout> -->

				<v-layout row wrap>
					<v-flex px-5 py-3 style="min-height: 300px;">
						







						<!-- table -->
						<!-- ///////////////////////////////////////////////////////// -->
						<table class="sample-table" style="width: 100%;">
							<thead>
								<tr>
									<th class="py-3" style="text-align: left;">Details</th>
									<th class="py-3"></th>
									<th class="py-3"> Unit Price<br> <!-- <span class="font-weight-regular">(Shipping Cost)</span> --> </th>
									<th class="py-3">Quantity</th>
									<th class="py-3">Shipping Cost</th>
									<th class="py-3">Total Price</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(sample,i) in samples"
								:key="'sample_'+i">
									
									<td>
										<v-flex xs12>
										<v-layout 
										row wrap 
										align-center
										justify-start>
											<image-view 
											v-if="sample.image"
											:src="sample.image" 
											width="70px" height="70px" 											
											custom-class="my-2 mr-3"></image-view>											

											<div class="sample-details">
												<h5>#{{ sample.item_number }} {{ sample.name }}</h5>
											</div>											
										</v-layout>
										</v-flex>
									</td>

									<td>
										<v-flex xs12 v-if="sample.stage_id">
										<v-layout 
										column wrap 
										align-center
										justify-center>
											<div class="status-box">{{ getStatus(sample.stage_id) }}</div>												
										</v-layout>
										</v-flex>
									</td>

									<td>
										<v-layout 
										column wrap 
										align-center
										justify-center>
											<h3 class="font-weight-regular">${{ currency(sample.sample_price) }}</h3> 
										</v-layout>
									</td>

									<td>
										<v-layout 
										row wrap 
										align-center
										justify-center>
											<h3 class="font-weight-regular">{{ sample.quantity }} pc/s</h3>

										</v-layout>
									</td>

									<td>
										<v-layout 
										column wrap 
										align-center
										justify-center>
											<h3 class="font-weight-regular">${{ currency(shipmentPrice(sample)) }}</h3>

										</v-layout>
									</td>
											
									<td>
										<v-layout 
										row wrap 
										align-center
										justify-center>
											<h3 class="unit_price">${{ currency(shipmentPrice(sample)+(sample.sample_price*sample.quantity)) }}</h3>
										</v-layout>
									</td>
								</tr>

								<tr>
									<td colspan="5"></td>
									<td>
										<v-layout 
										row wrap 
										align-center
										justify-center>
										<v-flex xs12>										  
											<h3 style="border-top: 1px solid #000; text-align: center;" 
											class="unit_price mt-3 pt-3">${{ currency(totalPrice) }}</h3>
										</v-flex>
										</v-layout>										
									</td>
								</tr>
							</tbody>
						</table>
						<!-- ///////////////////////////////////////////////////////// -->
						<!-- table -->









					</v-flex>
				</v-layout>
			</v-container>
		</v-card-text>
	</v-card>

	

</v-dialog>


</span>	
</template>

<script>
import ImageView from "@/views/Components/App/MyHome/ImageView";

export default {

	components: {
		ImageView,
	},

	props: {
		proj_id: {
			type: String,	
			default: null,
		},
		group_id: {
			type: String,	
			default: null,
		},		
		dialogOpen: {
			type: Boolean,	
			default: false,
		},
	},

	data(){ return {
		dialog: false,
		samples: [],
		totalPrice: 0,
	}},

	methods:{
		closeDialog(){
			this.dialog = false;			
			this.samples = [];
			this.$emit('update:dialogOpen',false);
		},
		openDialog(){
			this.dialog = true;
		},

		getOrderedSampleGroup(){
			console.log('getOrderedSampleGroup('+this.group_id+')');
			this.$store.dispatch(this.getStore('myHm')+'/getOrderedSamplesByGrpId_a',{
				proj_id: this.proj_id,
				group_id: this.group_id,
			})
			.then((rspns)=>{
				console.log(rspns);
				this.totalPrice = 0;
				this.samples = rspns;

				this.samples.forEach((sample)=>{
					this.totalPrice+= this.shipmentPrice(sample)+(sample.sample_price*sample.quantity);
				});


				this.$nextTick(()=>{					
					this.$emit('loading-success');
					this.openDialog();
				});
				
			})
			.catch((e)=>{
				this.$emit('loading-failed');
				console.log(e);			
			});
		},

		shipmentPrice(sample){
			if(sample.quantity<5)
			return sample.sample_shipment_price_less_5;
			else
			return sample.sample_shipment_price_5_10;
		},

		getStatus(stage_id){
			var retVal = '';

			if(stage_id ==  3001)
			retVal = 'Delivered';
			if(stage_id ==  2001)
			retVal = 'Production';
			if(stage_id ==  2002)
			retVal = 'Shipped';

			return retVal;
		},
	},

	watch: {
		dialogOpen:{
			handler(nVal,oVal){
				if(nVal)
				this.getOrderedSampleGroup();
				else
				this.closeDialog();
			},
		},
	},

};

</script>

<style scoped lang="scss">
.status-box {
    border: 1px solid #000;
    padding: 0px 5px;
    width: auto;
    min-width: 100px;
    display: inline-block;
    text-align: center;    
}
	
</style>