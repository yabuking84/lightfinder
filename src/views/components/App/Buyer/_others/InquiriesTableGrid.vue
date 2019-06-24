<template>
  <!-- <div> -->
<v-card>

	<v-card-title>

		<v-layout 
		row wrap 
		class="grey darken-4 heading-title" 
		style="width:100%;">
		<v-flex xs12>
			
			<v-btn-toggle 
			multiple light
			v-model="inquiryStatus" 
			class="grey darken-4 px-2 py-1"
			style="box-shadow: none;">
			    <span v-for="(status, index) in statuses" class="white--text">
					<v-btn 
					flat 
					:value="status.id" 
					:title="status.name"  
					class="white--text status-btn">
						<v-icon style="font-size: 1em;">{{ status.icon }}</v-icon>
				    </v-btn>
			    </span>
			</v-btn-toggle>

			    <!-- <span v-for="(status, index) in statuses" class="white--text">
					<v-btn 
					flat 
					:value="status.id" 
					:title="status.name"  
					class="white--text status-btn">
						<v-icon style="font-size: 1em;">{{ status.icon }}</v-icon>
				    </v-btn>
			    </span> -->

			<!-- <v-spacer></v-spacer> -->
			<v-btn icon @click="refresh()" class="white--text">
			    <v-icon>refresh</v-icon>
			</v-btn>
		</v-flex>
		</v-layout>



		<v-layout row wrap>
		<v-flex xs4>
			<v-autocomplete 
			v-model="categories" 
			:items="categoryItems" 
			item-text="name" 
			item-value="name" 
			ref="categorySelect" 
			cache-items 
			chips 
			multiple 
			hide-no-data 
			clearable 
			hide-details 
			label="Select categories..">
				<template v-slot:selection="slotData">
					<v-chip 
					:selected="slotData.selected" 
					close 
					class="chip--select-multi" 
					@input="removeFromCategories(slotData.item)">
						{{ slotData.item.name }}
					</v-chip>
				</template>
			</v-autocomplete>
	  	</v-flex>
	

		<v-spacer></v-spacer>

		   <v-flex xs4 class="">
			<v-text-field label="Search Inquiry #" v-model="search"  prepend-inner-icon="search" clearable>
			</v-text-field>
		</v-flex>



						 
		</v-layout>
	</v-card-title>





	<v-divider></v-divider>








	<v-card-text style="height: 400px; overflow: auto;">

		<transition-group 
		tag="v-layout" 
		v-if="tableItems.length > 0" 
		name="tiItems" 
		class="row wrap align-start justify-center">
	
			<template v-for="(inquiry, key, index) in tableItems">				
				<inquiry-table-grid-item
				:key="inquiry.inq_id"
				:inquiry="inquiry"
				:statuses="statuses"
				class="inquiry">
				</inquiry-table-grid-item>
			</template>

		</transition-group>


		<v-layout 
		v-else 
		justify-center  
		row wrap pa-5>

		   <v-flex xs2>
				  <!-- will download this later when going live -->
				  <v-img src="https://image.flaticon.com/icons/svg/751/751381.svg" height="90px" contain></v-img>  
			</v-flex>

			<v-flex xs12 mt-4>
					<span v-if="search">
						<h1 class="text-xs-center red--text">Nothing Found on "{{ search }}"</h1>  
					</span>
					<span v-else>
					 <h1 class="text-xs-center red--text">Haven't Found Something</h1>
				   </span>
			 </v-flex>
		</v-layout>
		




	</v-card-text>
		










</v-card>   




 <!-- </div> -->
</template>
<script>
import inqEvntBs from "@/bus/inquiry";

import helpers from "@/mixins/helpers";
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";
import InquiryTableGridItem from "@/views/Components/App/InquiryTableGridItem";
import config from "@/config/main"

import isotope from 'vueisotope'

export default {

	mixins: [
		helpers,
	],

	components: {
		InquiryStatusButtons,
		InquiryTableGridItem,
		isotope
	},

	data: () => ({

		statuses: [
			...config.inquiry_statuses.default,
			...config.inquiry_statuses.buyers,
		],
		// search: '1554969763787',
		// search: '1557905644572',
		// search: '1553672466844', // 2 bids
		// search: '1559132882113', // 2 bids
		// search: '1554876629708', // 3 bids
		search: '08',
		dialog: false,
		loading: false,
		headers: [
			{
				text: 'Select',
				align: 'left',
				sortable: false,
				value: 'inq_id'
			},

			{
				text: 'Inquiry & Categories',
				align: 'left',
				sortable: true,
				value: 'categories'
			},

			{
				text: 'Keywords & Message',
				align: 'left',
				sortable: true,
				value: 'keywordsAndMessage'
			},

			{
				text: 'Quantity',
				align: 'left',
				sortable: true,
				value: 'quantity'
			},

			{
				text: 'Preferred Shipping Date',
				align: 'left',
				sortable: true,
				value: 'shipping_date'
			},

			{
				text: 'Date',
				align: 'left',
				sortable: true,
				value: 'created_at'
			},

			{
				text: 'Status',
				align: 'left',
				sortable: true,
				value: 'status'
			},

			{
				text: 'Action',
				align: 'center',
				sortable: false,
			},
		],

		inquiryStatus: [],
		allInquiries: [],
		tableItems: [],

		categories: [],
		categoryItems: [],

		rowsPerPageItems: [10, 15, 20, 30, 40],
		pagination: {
			rowsPerPage: 15
		},


		// test
		// ttttttttttttttttttttttttt
		testItems: [
			{inq_id:'1111',},
			{inq_id:'2222',},
			{inq_id:'3333',},
			{inq_id:'4444',},
			{inq_id:'5555',},
		],
		// ttttttttttttttttttttttttt
		// test

	}),

	methods: {


		fillTable(withLoading = true) {

			if (withLoading)
				this.loading = true;

			this.allInquiries = [];
			
			var storeType = this.$route.meta.storeType.inq;
			this.$store.dispatch(storeType+'/getInquiries_a',{with_bids:1})
			.then((response) => {
				// console.log('InquiryTableGrid response',response);
				for (var i = response.length - 1; i >= 0; i--) {
					var item = {};
					item.inq_id = response[i].id;
					item.keywords = this.ucwords(response[i].keyword);
					item.message = response[i].message+"";
					item.categories = response[i].categories.join(', ');
					item.quantity = response[i].quantity;
					item.shipping_date = response[i].desired_shipping_date;
					item.created_at = response[i].created_at;
					item.status = response[i].stage_id;
					item.loading = false;
					this.allInquiries.push(item);
				}
				// console.log('InquiryTableGrid this.allInquiries',this.allInquiries);

				// this.tableItems = this.allInquiries;
				this.filterTable();

				if (withLoading)
					this.loading = false;

			})
			.catch((e) => {
				console.log('Error: ' + e);
				this.loading = false;
			})
			.finally(() => {
				this.loading = false;
			});

			// this.filterInquiries = this.allInquiries
		},


		refresh() {
			// this.inquiryStatus = [];
			// this.categories = [];
			// this.search = "";
			this.fillTable();
		},

		filterTable() {

			 var items = this.allInquiries;

			  // filter for statuses only
			  if (this.inquiryStatus.length) {

				  var isBuff = this.inquiryStatus;
				  items = items.filter(function(inq) {
					return (isBuff.length) ? isBuff.includes(inq.status) : true;
				  });
			  }


			  // filter for categories
			  if (this.categories.length) {
				  isBuff = this.categories;
				  function callBackCat(inq) {
					return (isBuff.length) ? isBuff.includes(inq.categories.trim()) : true;
				  };
				  items = items.filter(callBackCat);
			  }


			  // filter by search field
			  if(this.search) {
				  items = items.filter(inquiry => {
					  // add key to search in the dom
					  return (inquiry.inq_id.includes(this.search) || inquiry.inq_id.toLowerCase().includes(this.search))
				  })            
				  // console.log(this.search);
			  }

			  this.tableItems = items;


		},

		removeFromCategories(item) {
			const index = this.categories.indexOf(item.name);
			if (index >= 0)
				this.categories.splice(index, 1)
		},

	},

	created() {
		
		this.fillTable();
		inqEvntBs.onFormSubmitted(this.fillTable);
		

		inqEvntBs.onBidAwarded(()=>{
			this.fillTable();
		});

		// inqEvntBs.onClosed(this.fillTable);

		// $on('closed-submitted', () => {
		//   this.fillTable(false);
		// });

		// get categories for category select box
		this.$store.dispatch('cat/getCategories_a')
		.then((data) => {
			this.categoryItems = data;
			// console.log(this.categoryItems);
		})
		.catch((e) => {
			console.log('Error: ');
			console.log(e);
		});


	},

	watch: {

		inquiryStatus(nVal, oVal) {
			this.filterTable();
		},

		categories(nVal, oVal) {
			this.filterTable();
		},

	   search(nVal, oVal) {
		 this.filterTable();
	   },
		   
	},

	computed: {



		
	},

}


</script>

<style scoped lang="scss">

.theme--light.v-datatable thead th.column.sortable.active .v-icon,
.v-datatable thead th.column.sortable:focus .v-icon,
.v-datatable thead th.column.sortable:hover .v-icon {
  // margin-right: 5px;
}

.dateCellWidth {
  min-width: 110px;
}

.theme--light.v-table thead tr {
  background: #000000;
  color: #fff;
}

.th-heading {
  cursor: pointer;
}

.text-decoration-none {
  text-decoration: none;
}

.th-heading a {
  text-decoration: none;
}


.btn-with-loading {
	color: #ffff;
}


.rounded-card{
	border-radius:10px;
	// border-top: 5px solid #5d5d5d;
	border-bottom: 5px solid #dedede ;
}


#root_isotope {
  
	width: 100%;
	margin: 0.5em -0.5em;

	.item {
	  
	  padding: 1em;
	  margin: 0.5em;
	  // width: calc(25% - 1em);
	  min-width: 100px;
	  // text-align: center;
	  color: white;
	  transition: box-shadow 0.2s;
		max-width: none;

	  @media(max-width: 1400px) {

		// width: calc(100% - 1em);

	  }

	  @media(max-width: 767px) {

		// width: calc(50% - 1em);

	  }

	  @media(max-width: 500px) {

		// width: calc(100% - 1em);

	  }

	}

}

.status-btn {
	height: auto;
	padding: 5px 15px;
}



// transitions
// ttttttttttttttttttttttttttttttttttttttttttttttttttttttt
.inquiry {
	transition: all 1s;
}

// .tiItems-enter-active, .tiItems-leave-active {
//   transition: all 3s;
// }

.tiItems-enter, .tiItems-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  // transform: translateX(30px);
}

.tiItems-leave-active {
  position: absolute;
}
// ttttttttttttttttttttttttttttttttttttttttttttttttttttttt
// transitions

</style>
