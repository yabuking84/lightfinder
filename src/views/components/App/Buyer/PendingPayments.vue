<template>
	<div>
		<v-card>
			<v-toolbar card dense color="transparent">
				<v-toolbar-title>
					<h4>PENDING PAYMENTS</h4>
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<!-- <v-btn icon>
					<v-icon>more_vert</v-icon>
				</v-btn> -->
			</v-toolbar>
			<v-divider></v-divider>
			<v-card-text class="pa-0">
				<template>

					<v-data-table 
					:headers="headers" 
					:items="inquiries" 
					hide-actions 
					class="elevation-0 pending-payments">
						<template v-slot:items="props">
							<tr>
								
							<td>{{ props.item.id }}</td>
							<td>$3000 <pre>{{ props.item.stage_id }}</pre></td>
							<td class="text-xs-right pa-0">

								<v-btn flat icon color="grey" title="Pay">
									<!-- <v-icon>fas fa-money-bill</v-icon> -->
									<v-icon>fas fa-hand-holding-usd</v-icon>
								</v-btn>

								<v-btn flat icon color="grey" title="View">
									<v-icon>fas fa-search</v-icon>
								</v-btn>

							</td>
							</tr>
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
			text: 'Action', 
			align: 'center' ,
			value: 'action', 
		}
	  ],
	  inquiries : [],
}},

methods: {
	setInquiries() {
		this.$store.dispatch('byrInq/getInquiries_a')
	  	.then((response)=>{
	  		console.log('response', response);
	  		this.inquiries = response;
	  	})
		.catch((e) => {
			console.log('Error: ' + e);
			this.loading = false;
		})
		.finally(() => {
			this.loading = false;
		});
	}
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

</style>
