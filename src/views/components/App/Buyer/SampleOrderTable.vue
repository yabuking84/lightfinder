<template>
	<div>
		<v-card>

			<v-card-title>
				<v-layout 
				row wrap justify-space-between
				class="grey darken-4 heading-title">
					<h3 class="white--text ma-3">Sample Orders</h3>
					<v-btn 
					@click="fillTable()" 
					class="white--text ma-2"
					icon 
					style="margin: 0;">
					    <v-icon>refresh</v-icon>
					</v-btn>						
				
				</v-layout>
			</v-card-title>


			<!-- <v-divider></v-divider> -->
			<v-card-text class="pa-0"  style="height: 476px; overflow: auto;">
				<template>

					<v-data-table 
					:headers="headers" 
					:items="inquiries" 
					:expand="true"
					hide-actions 
					class="elevation-0 pending-payments">
						<template v-slot:items="sp">
							<tr>

								<!-- <td><pre>{{ sp.item }}</pre></td> -->

								<td>{{ sp.item.id }}</td>

								<!-- <td>$ {{ currency(sp.item.amount) }}</td> -->

								<td>{{ sp.item.bid_sample_stages_string.join(', ') }}</td>

								<td>
									<v-icon 
									v-if="!sp.expanded"
									@click="sp.expanded = !sp.expanded">
										fas fa-caret-up
									</v-icon>
									<v-icon 
									v-if="sp.expanded"
									@click="sp.expanded = !sp.expanded">
										fas fa-caret-down
									</v-icon>
								</td>
							</tr>
						</template>

				    	<template v-slot:expand="sp">
					    	<v-card flat>
						    	<!-- <v-card-title>
						    		<v-layout px-4 row wrap align-center justify-end>
							    		<h3 style="text-transform: uppercase;">
							    			{{ sp.item.keyword }}
							    		</h3>
						    		</v-layout>
						    	</v-card-title> -->
						    	<v-card-text>
						    		<v-layout px-4 mt-1 row wrap align-center justify-end>
										<!-- {{ displayBids() }} -->
										<!-- <pre>{{ sp.item.bids }}</pre> -->										
										<!-- x<pre>{{ sp.item.bid_stages }}</pre>xd -->
										<table class="bidTable">
											<thead>
												<tr>
													<th class="py-1">BID ID</th>
													<th class="py-1">Sample Amount</th>
													<th class="py-1">Status</th>
												</tr>
											</thead>
											<tbody>
												<template v-for="(bid,i) in sp.item.bids">
													<tr v-if="bid.sample_stage_id">
														<td>{{ bid.id }}</td>
														<td>$ {{ currency(bid.sample_cost) }}</td>
														<td> 
															<!-- <template v-if="bid.stage_id==2001">
																Production
															</template>
															<template v-if="bid.stage_id==2002">
																Sent
															</template>
															<template v-if="bid.stage_id==3001">
																Received
															</template> -->
															{{ getStatus(bid.sample_stage_id).name }}
														</td>
													</tr>
												</template>
											</tbody>
										</table>

										<v-btn 
										@click="viewInquiry(sp.item)"
										small
										color="black" 
										title="Pay"
										:loading="sp.item.loading"
										class="white--text mt-3 mb-3">
											<v-icon>fas fa-search</v-icon>
										</v-btn>


								    </v-layout>
						    	</v-card-text>
					    	</v-card>
				    	</template>

					    <template v-slot:no-data>
					    	<h3 class="pa-4" style="text-align: center;">No sample orders..</h3>
					    </template>

					</v-data-table>

				</template>
				<v-divider></v-divider>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
import { Projects } from '@/data/widgets/project'

// import helpers from "@/mixins/helpers"
import inqMixin from "@/mixins/inquiry";

import tblBs from "@/bus/table";

export default {

mixins: [
	// helpers,
	inqMixin,
],

data() { return {
	  headers: [
		{
			text: 'Inquiry #',
			align: 'left',
			value: 'id',
		},
		{
			text: 'Status',
			align: 'left',
			value: 'bid_sample_stages_string',
		},
		{
			text: '',
			align: '',
			value: '',
			sortable: false,
		},
	  ],
	  inquiries : [],
}},

methods: {
	fillTable() {
		this.$store.dispatch(this.storeType+'/getInquiries_a',{with_bids:1})
		.then((response)=>{
			var inqs = this.setDataTableInquiry(response);
			inqs = inqs.filter((inq)=>{
				return (inq.bid_stages.length)?true:false;
				// return 1;
			});
			// console.log('so response', response);
			// console.log('so inqs', inqs);

			this.inquiries = inqs;
		})
		.catch((e) => {
			console.log('so Error: ' + e);
			this.loading = false;
		})
		.finally(() => {
			this.loading = false;
		});
	},
    

	viewInquiry(arg) {
		arg.loading = true;
		this.showInquiry(arg.id)
		.then((data)=>{
			arg.loading = false;
		});
	},


},

created(){
	this.fillTable();
	
	// for refresh tableItems
	tblBs.onRefreshTablePolling(()=>{
		this.fillTable();
	});
},

}
</script>


<style scoped lang="scss">

.pending-payments /deep/ th .v-icon {
	margin-left:10px;
}

.v-btn {
	min-width: 50px;	
}

.v-icon.fa-search {
	font-size: 15px;
}


.pending-payments {
	/deep/ .theme--light.v-table tbody tr:not(:last-child)	{
	    border: none;
	    border-top: 1px solid rgba(0,0,0,1);
	    // border-bottom: 1px solid rgba(0,0,0,0.12);
	    // cursor: pointer;
	}
}

.bidTable {
	width: 100%;
	border-spacing: 0;
	border: 1px solid #000;		
	tbody td,
	thead tr,
	thead th {
		height:30px;		
		border-bottom: 1px solid #000;		

	} 
	
	thead tr {
		background-color: #000;		
	}

	thead th {
		color: #fff;
		font-weight: bold;
	    background: #000;				
		text-align: left;
	}
	tbody tr:last-child td {
		border-bottom: 0px solid #000;		
	}

}
</style>
