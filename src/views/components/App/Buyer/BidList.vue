<template>
	<div>
	 <v-toolbar color="grey darken-4" class="justify-center white--text" height="40px">
		<v-layout row wrap justify-center>
			<h1 class="subheading font-weight-light text-xs-center">Recent Bids</h1>  
		</v-layout>
	  </v-toolbar>
	  <v-card class="bids-section">
	  	<v-container fluid >

			<div v-for="bid in bids">
				<div class="pa-0 mb-2 mt-2">
					<v-chip color="green" text-color="white">{{ bid.status }}</v-chip>
					<a href="#" class="text-no-underline caption black--text font-weight-light text-xs-center">Supplier #129981723 Set Price @ $200.00 on January 3, 2019 - 2:14 PM </a> 
				</div>
		  		<v-divider></v-divider>	
			</div>
			
	  	</v-container>
	  </v-card>
	</div>
</template>


<script>
	
	export default {

		data: function () {

			return {

				bids: [
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					},
					{
					  status: 'New',
					  supplier: 'Suuplier China',
					  price: '$12.00',
					  date: 'January 3, 2019',
					  time: '2:14'
					}
				]

			}
		}
	}

</script>


<style scoped lang="stylus">
	.bids-section
		height:37.3vh;
		overflow-y: auto;
	.text-no-underline
		text-decoration:none;
</style>

