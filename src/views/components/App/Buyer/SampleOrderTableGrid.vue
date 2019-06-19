<template>
  <!-- <div> -->
<v-card>

	<v-card-title>


		<v-layout row wrap class="grey darken-4 heading-title" style="width:100%;">
		<v-flex xs12>			
			<h3 class="white--text ma-1">Sample Orders</h3>
		</v-flex>
		</v-layout>



		<v-layout row wrap>	

		<v-spacer></v-spacer>

	   	<v-flex xs7 py-1>
			<v-text-field label="Search" v-model="search"  prepend-inner-icon="search" clearable>
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
					<template v-slot:inquiry-section="sp">
						<v-flex xs3 py-1>
							<h4 class="black--text lighten-4">Order #</h4>
							<h5 class="mt-0 font-weight-medium ">{{ sp.inquiry.inq_id }}-DO</h5>
						</v-flex>						
					</template>
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
import inqMixin from "@/mixins/inquiry";

import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";
import InquiryTableGridItem from "@/views/Components/App/InquiryTableGridItem";
import config from "@/config/main"

import isotope from 'vueisotope'

export default {

	mixins: [
		helpers,
		inqMixin,
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
		search: '',
		dialog: false,
		loading: false,

		inquiryStatus: [],
		allInquiries: [],
		tableItems: [],

		categories: [],
		categoryItems: [],

		rowsPerPageItems: [10, 15, 20, 30, 40],
		pagination: {
			rowsPerPage: 15
		},


	}),

	methods: {


		fillTable(withLoading = true) {

			if (withLoading)
			this.loading = true;

			var storeType = this.$route.meta.storeType.inq;

			this.allInquiries = [];
			this.$store.dispatch(storeType+'/getInquiries_a')
				.then((response) => {

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
