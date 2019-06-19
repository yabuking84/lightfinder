<template>
	<div>
		<v-card>

			<v-card-title>
				<v-layout row wrap class="grey darken-4 heading-title" style="width:100%;">
				<v-flex xs12>
					<h3 class="white--text ma-1">Confirmed Orders</h3>
				</v-flex>								 
				</v-layout>
			</v-card-title>


			<!-- <v-divider></v-divider> -->
			<v-card-text class="pa-0"  style="height: 476px; overflow: auto;">
				<template>

					<v-data-table 
					:headers="headers" 
					:items="inquiries" 
					hide-actions 
					class="elevation-0 pending-payments">
						<template v-slot:items="props">
						<tr>

							<!-- <td><pre>{{ props.item }}</pre></td> -->

							<td>{{ props.item.data.id }}</td>

							<td>$5677.99</td>

							<td class="text-xs-right pa-0">
								<v-btn 
								@click="gotoNotfication(props.item)"
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
export default {
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
			value: 'name',
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
	setInquiries() {
		var storeType = this.$route.meta.storeType.inq;

		this.$store.dispatch(storeType+'/getInquiries_a', {stage_id:'2001'})
		// this.$store.dispatch('byrInq/getInquiries_a', {stage_id:'1006'})
		.then((response)=>{
			// console.log('response', response);

			var inquiries = response.map((inquiry)=>{

				return {
					data: {
						'id': inquiry.id,
						'bid_id': null,
						'notification_id': null,
					},
					dataType: "inquiry",
					isRead: true,
					textSnackbar: null,
					title: null,
				}				
			});

			// console.log('inquiries', inquiries);


			this.inquiries = inquiries;

		})
		.catch((e) => {
			console.log('Error: ' + e);
			this.loading = false;
		})
		.finally(() => {
			this.loading = false;
		});
	},
    
    // gotonotification
    // /////////////////////////////////////////////////////////

    gotoNotfication(ntfctn){
        this.$store.dispatch('ntfctns/gotoNotfication_a',ntfctn);
    },

    // /////////////////////////////////////////////////////////
    // gotonotification


},

created(){
	this.setInquiries();
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
