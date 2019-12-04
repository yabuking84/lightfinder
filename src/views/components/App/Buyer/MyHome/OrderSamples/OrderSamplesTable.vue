<template>
	<v-card>
		<!-- <v-card-title class="title black white--text py-2">
			<v-layout row wrap justify-space-between align-center>
				<span>Samples</span>
			</v-layout>
		</v-card-title> -->

		<v-card-text class="sample-box">


				<v-layout row wrap>

					<v-flex xs12>
						
						<table class="sample-table">
							<thead>
								<tr>
									<th>Details</th>
									<th>
										Unit Price<br>
										<span class="font-weight-regular">(Shipping Cost)</span>
									</th>
									<th>Quantity</th>
									<th>Total Price</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(sample,i) in samplesLocal"
								:key="'sample_'+i">
									
									<td>
										<v-layout 
										row wrap 
										align-center
										justify-start>
											<!-- <img :src="sample.image"> -->
											
											<image-view 
											v-if="sample.image"
											:src="sample.image" 
											width="70px" height="70px" 
											custom-class="my-2 mr-3"></image-view>

											<div class="sample-details">
												<h5>{{ sample.item_number }}</h5>
												<h5>{{ sample.name }}</h5>
											</div>
										</v-layout>
									</td>

									<td>
										<v-layout 
										column wrap 
										align-center
										justify-center>
											<h3 class="unit_price">${{ currency(sample.sample_price) }}</h3> 
											<h4 class="unit_price font-weight-regular">(${{ currency(sample.sample_shipment_price_less_5) }})</h4>
										</v-layout>
									</td>
											
									<td>
										<v-layout 
										style="width: 140px; margin: auto;"
										row wrap 
										align-center
										justify-center>
											
											
											
											<v-btn flat small 											
											class="btn-operation"
											@click="changeQty(sample,'minus')">
												<v-icon>fas fa-minus</v-icon>
											</v-btn>
											
											<input 
											class="quantity" 
											type="number" 
											v-model="sample.formData.quantity"
											readonly>
											
											<v-btn flat small											
											class="btn-operation"
											@click="changeQty(sample,'plus')">
												<v-icon>fas fa-plus</v-icon>
											</v-btn>

 											<!-- <v-text-field box
 											label="Qty"
 											prepend-icon="fas fa-minus"
 											append-icon="fas fa-plus"></v-text-field> -->

										</v-layout>
									</td>

									<td>
										<v-layout 
										row wrap 
										align-center
										justify-center>
											<h3 class="unit_price">${{ currency(sample.formData.totalPrice) }}</h3>
										</v-layout>
									</td>
										
									<td>

										<v-btn 
										small
										v-if="sample.formData.ordered"
										@click="removeSampleFromList(sample)"
										class="red white--text">
											remove
										</v-btn>

										<v-btn 
										v-else 
										small
										:disabled="sample.formData.disabled"
										@click="addSampleToList(sample)"
										class="black white--text">
											add
										</v-btn>
									</td>
								</tr>
							</tbody>
						</table>				

					</v-flex>



				</v-layout>


		</v-card-text>

		<!-- <v-divider></v-divider> -->

		<!-- <v-card-actions>
			<v-btn 
			class="black white--text" 
			:loading="btnLdng">
				submit
			</v-btn>
		</v-card-actions> -->
	</v-card>	
</template>
<script>
import ImageView from "@/views/Components/App/MyHome/ImageView";


export default {

components: {
	ImageView,
},

props:[
	'samples',
],

data(){ return {
	samplesLocal: [],
}},

created(){
	this.samplesLocal = this.samples;
},

methods:{


    changeQty(sample,operation){
    	if (operation=='minus' && sample.formData.quantity > 0) {
    		sample.formData.quantity--;
    		sample.formData.totalPrice = (sample.sample_price * sample.formData.quantity);
    		sample.formData.totalPrice = (sample.formData.totalPrice)?sample.formData.totalPrice+sample.sample_shipment_price_less_5:0;
			sample.formData.disabled = false;

			if(sample.formData.quantity <= 0)
			sample.formData.disabled = true;
    	} 
    	else if (operation=='plus' && sample.formData.quantity < 99) {
    		sample.formData.quantity++;
    		sample.formData.totalPrice = (sample.sample_price * sample.formData.quantity);
    		sample.formData.totalPrice = (sample.formData.totalPrice)?sample.formData.totalPrice+sample.sample_shipment_price_less_5:0;
			sample.formData.disabled = false;
    	}
        this.$emit('update:samples', this.samplesLocal);
    },


    addSampleToList(sample) {
    	if(sample.formData.totalPrice>0)
    	sample.formData.ordered = true;
        this.$emit('update:samples', this.samplesLocal);
    },

    removeSampleFromList(sample) {
    	sample.formData.ordered = false;
        this.$emit('update:samples', this.samplesLocal);
    },


},


watch:{
	samples:{		
		handler(nVal,oVal){
			this.samplesLocal = nVal;
		},
		deep: true,
	}
},

}
</script>

<style scoped lang="scss">

table.sample-table {
	width: 100%;
	thead {		
		th:first-child {
 			text-align: left;
		}
		th {
			padding: 10px;
 			text-align: center;
		}
	}
	
	tbody {
		td:first-child {
			text-align: left;			
			.sample-details {
				text-align: left;
			}
		}
		td {
			padding: 10px;
			.v-btn {
				min-width: 60px
			}

			.unit_price { 
				margin: 0 5px; 
			}
			.quantity {
				border: 1px solid gainsboro;
				width: 35px;
				padding: 5px;				
    			text-align: center;
			}
			.v-btn.btn-operation {
				width: 35px;
		    	min-width: auto;
			}			
		}
	}

	// img {
	// 	width: 70px;
	// 	margin-right: 10px;
	// 	height: auto;
	// }


}

.sample-box {
    overflow-y: auto;
    height: 495px;	
}

.v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat) {
    font-size: 13px;	
}

</style>
