<template>
	<div>
		<v-card>

			<v-card-title>
				<v-layout 
				row wrap justify-space-between
				class="grey darken-4 heading-title">
					<h3 class="white--text ma-3">Wallet</h3>
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
			<v-card-text class="pa-0"  style="height: 506px; overflow: auto;">
				<template>

					<v-data-table 
					:headers="headers" 
					:items="inquiries" 
					hide-actions 
					class="elevation-0 pending-payments">
						<template v-slot:items="sp">
						<tr>

							<!-- <td><pre>{{ sp.item }}</pre></td> -->

							<td>{{ sp.item.id }}</td>

							<!-- <td>$ {{ currency(sp.item.unit_cost) }}</td> -->


							<td>$ {{ currency(sp.item.amount) }}</td>

							<td>
								<template v-if="[2001,2002,2003].indexOf(sp.item.stage_id)>=0">
									In Wallet
								</template>
								<template v-if="sp.item.stage_id==3001">
									Proccessing Bank Transfer
								</template>
							</td>

							<td class="text-xs-right pa-0">
								<v-btn 
								@click="viewInquiry(sp.item)"
								small
								color="black" 
								title="Pay"
								class="white--text">
									<v-icon>fas fa-search</v-icon>
								</v-btn>
							</td>

						</tr>
						</template>


					    <template v-slot:no-data>
					    	<h3 class="pa-4" style="text-align: center;">No confirmed orders..</h3>
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
		// {
		// 	text: 'Unit Cost',
		// 	align: 'left',
		// 	value: 'unit_cost',
		// },
		{
			text: 'Amount',
			align: 'left',
			value: 'amount',
		},
		{
			text: 'Status',
			align: 'left',
			value: 'status',
		},
		{ 
			text: '', 
			align: 'center' ,
			value: 'action', 
		}
	  ],
	  inquiries : [],

}},

methods: {
	fillTable() {
		// var storeType = this.$route.meta.storeType.inq;
		this.$store.dispatch(this.storeType+'/getInquiries_a', {stage_id:'2001,',with_bids:1})
		// this.$store.dispatch('byrInq/getInquiries_a', {stage_id:'1006'})
		.then((response)=>{
			// this.cnsl('supplier COT response',response);
			var inqs = this.setDataTableInquiry(response);
			// this.cnsl('supplier COT inqs',inqs);
			inqs = inqs.filter((inq)=>{
				return (inq.awarded_to_me)?true:false;
			});
			this.inquiries = inqs;
		})
		.catch((e) => {
			this.cnsl('Error: ' + e);
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

</style>
