<template>
	<v-card>
		<!-- <v-card-title class="title black white--text py-2">
			<v-layout row wrap justify-space-between align-center>
				<span>items</span>
			</v-layout>
		</v-card-title> -->

		<v-card-text class="item-box">


				<v-layout row wrap>

					<v-flex xs12>
						
						<table class="item-table">
							<thead>
								<tr>									
									<th style="text-align: left; padding-left: 15px;">Details</th>
									<th style="text-align: left; padding-left: 0;">Unit Price</th>
									<th style="text-align: left; padding-left: 0;">Quantity</th>
									<th style="text-align: left; padding-left: 0;">Total Price</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,i) in items"
								:key="'item_'+i">
									
									<td>
										<v-layout 
										row wrap 
										align-center
										justify-start>
											<img :src="item.image_url">
											<div class="item-details">
												<h5>{{ item.item_no }}</h5>
												<h5>{{ item.item_name }}</h5>
											</div>
										</v-layout>
									</td>

									<td>
										<v-layout 
										row wrap 
										align-center
										justify-start>
											<h3 class="unit_price">${{ currency(item.unit_price) }}</h3> 
										</v-layout>
									</td>
											
									<td>
										<v-layout 
										row wrap 
										align-center
										justify-start>
											<h3 class="unit_price font-weight-regular">{{ item.quantity }}</h3>
										</v-layout>
									</td>

									<td>
										<v-layout 
										row wrap 
										align-center
										justify-start>
											<h3 class="unit_price">${{ currency(item.unit_price*item.quantity) }}</h3>
										</v-layout>
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


export default {
	props:[
		'proj_id',
		'items',
	],

	data(){ return {

	}},

	created(){

	},

	methods:{

	},


	watch:{

	},

}
</script>

<style scoped lang="scss">

table.item-table {
	width: 100%;
	thead {		
		th:first-child {
		}
		th {
			padding: 10px;
 			text-align: center;
		}
	}
	
	tbody {
		td:first-child {
			text-align: left;			
			.item-details {
				text-align: left;
			}
		}
		td {
			padding: 10px;
			.unit_price { 
				margin: 0 5px; 
			}
			.quantity {
				border: 1px solid gainsboro;
				width: 50px;
				padding: 5px;				
    			text-align: center;
			}
		}
	}

	img {
		width: 70px;
		margin-right: 10px;
		height: auto;
	}

	.btn-operation {
		width: 35px;
    	min-width: auto;
	}
}

.item-box {
    // overflow-y: auto;
    // height: 495px;	
}
	
</style>
