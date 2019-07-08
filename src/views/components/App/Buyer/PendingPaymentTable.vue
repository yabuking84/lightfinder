<template>
	<div>
		<v-card>

			<v-card-title>
				<v-layout 
				row wrap justify-space-between
				class="grey darken-4 heading-title">
					<h3 class="white--text ma-3">Pending Payments</h3>			
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
			<v-card-text class="pa-0"  style="height: 454px; overflow: auto;">
				<template>

					<v-data-table 
					:headers="headers" 
					:items="inquiries" 
					hide-actions 
					class="elevation-0 pending-payments">
						<template v-slot:items="sp">

		<!-- <transition-group name="trans"> -->

						<tr :key="sp.item.id" class="inq">
							
							<!-- <td><pre>{{ sp.item }}</pre></td> -->

							<td>{{ sp.item.id }}</td>

							<td>$ {{ currency(sp.item.amount+sp.item.shipping_cost) }}</td>

							<td class="px-1">
								<span 
								v-if="sp.item.stage_id==1005"
								class="font-weight-bold">
									Pending
								</span>
								<span 
								v-if="sp.item.stage_id==1006"
								class="font-weight-bold">
									Confirming Payment
								</span>
							</td>

							<td class="text-xs-right pa-0">

								<v-btn 
								@click="viewInquiry(sp.item)"
								color="green" 
								title="Pay"
								:loading="sp.item.loading"
								class="white--text">
									<!-- <v-icon>fas fa-money-check-alt</v-icon> &nbsp;  -->
									Pay
								</v-btn>

								<!-- <v-btn 
								@click="gotoNotfication(sp.item)"
								color="black" 
								title="Pay"
								class="white--text">
									<v-icon>fas fa-search</v-icon>
								</v-btn> -->

							</td>

						</tr>
						
		<!-- </transition-group> -->

						</template>


					    <template v-slot:no-data>
					    	<h3 class="pa-4" style="text-align: center;">No pending payments..</h3>
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
import inqEvntBs from "@/bus/inquiry";
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
			text: 'Amount',
			align: 'left',
			value: 'amount',
		},
		{
			text: 'Status',
			align: 'left',
			value: 'stage_id',
			class: 'px-1',
		},
		{
			text: '', 
			align: 'center' ,
			value: 'action', 
			sortable: false,
		},
	],
	inquiries : [],

}},

methods: {
	fillTable() {
		// var storeType = this.$route.meta.storeType.inq;
		this.$store.dispatch(this.storeType+'/getInquiries_a', {stage_id:'1005,1006',with_bids:1})
		.then((response)=>{
			this.inquiries = this.setDataTableInquiry(response);
		})
		.catch((e) => {
			this.cnsl('Error: ' + e);
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

	inqEvntBs.onPaymentMade(()=>{
		this.fillTable();		
	});

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




// transitions
// ttttttttttttttttttttttttttttttttttttttttttttttttttttttt
.inq {
	transition: all 0.5s;

}
.trans-enter, .trans-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  // transform: translateX(30px);
}

.trans-leave-active {
  position: absolute;
}
// ttttttttttttttttttttttttttttttttttttttttttttttttttttttt
// transitions

</style>
