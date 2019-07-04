<template>
  <div>
<v-card>

	<v-card-title>

		<v-layout 
		row wrap justify-space-between 
		class="grey darken-4 heading-title" 
		style="width:100%;">

			<v-flex xs12 mb-0 pb-0 pl-3> 
				<h3 class="white--text">
					Inquiries				
				</h3>
			</v-flex>

			<slot name="statuses" :statuses="statuses">
			<v-flex xs11 my-1 pa-0>
				<v-btn-toggle 
				multiple light
				v-model="inquiryStatus" 
				class="grey darken-4 px-2 py-1 status_buttons"
				style="">
				    <span 
				    v-for="(status, index) in statuses" 
				    class="white--text ma-1">
						<v-btn 
						flat 
						:value="status.id" 
						:title="status.name"  
						class="white--text status-btn">
							<v-icon style="font-size: 1em;" class="ma-0">{{ status.icon }}</v-icon>
							<!-- {{ status.name }} -->
					    </v-btn>
				    </span>
				</v-btn-toggle>
			</v-flex>
			</slot>


			<!-- <v-spacer></v-spacer> -->
			<v-flex xs1>
			<v-btn 
			@click="refresh()" 
			class="white--text ma-2"
			icon 
			style="margin: 0; position: absolute; top: 0; right: 0;">
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








	<v-card-text :style="{height:height}" style="overflow: auto;">

		<transition-group 
		tag="v-layout" 
		v-if="tableItems.length > 0" 
		name="tiItems" 
		class="row wrap align-start justify-start">
	
			<template v-for="(inquiry, key, index) in tableItems">

				<inquiry-table-grid-item
				:key="inquiry.inq_id"
				:inquiry="inquiry"
				:statuses="statuses"
				:gridItemClass="gridItemClass"
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




</div>


</template>
<script>
import inqEvntBs from "@/bus/inquiry";

// import helpers from "@/mixins/helpers";
import inqMixin from "@/mixins/inquiry";
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";
import InquiryTableGridItem from "@/views/Components/App/InquiryTableGridItem";

import config from "@/config/main"

import isotope from 'vueisotope'

export default {

	mixins: [
		// helpers,
		inqMixin,
	],

	components: {
		InquiryStatusButtons,
		InquiryTableGridItem,
		isotope,
	},

	props:{
		'gridItemClass':{
			type:String,
		},
		'height': {
			type:String,
			default:'357px',
		},

	},

	data() { return {

		statuses: this.$route.meta.statuses,
		// search: '1554969763787',
		// search: '1557905644572',
		// search: '1553672466844', // 2 bids
		// search: '1559132882113', // 2 bids
		// search: '1554876629708', // 3 bids
		// search: '708',
		// search: '1554723725801',
		// search: '287',
		search: '',
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

	}},

	methods: {


		fillTable(withLoading = true) {

			if (withLoading)
				this.loading = true;

			this.allInquiries = [];
			// 
			this.cnsl('test');
						
			this.$store.dispatch(this.getStore()+'/getInquiries_a',{with_bids:1})
			.then((response) => {
				// this.cnsl('InquiryTableGrid response',response);

				// for (var i = response.length - 1; i >= 0; i--) {
				// 	var item = {};
				// 	item.inq_id = response[i].id;
				// 	item.keywords = this.ucwords(response[i].keyword);
				// 	item.message = response[i].message+"";
				// 	item.categories = response[i].categories.join(', ');
				// 	item.quantity = response[i].quantity;
				// 	item.shipping_date = response[i].desired_shipping_date;
				// 	item.created_at = response[i].created_at;
				// 	item.status = response[i].stage_id;
				// 	item.loading = false;
				// 	this.allInquiries.push(item);
				// }

				this.allInquiries = this.setDataTableGrid(response);


				// this.cnsl('InquiryTableGrid this.allInquiries',this.allInquiries);

				// this.tableItems = this.allInquiries;
				this.filterTable();

				if (withLoading)
					this.loading = false;

			})
			.catch((e) => {
				this.cnsl('Error: ' + e);
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
				  // this.cnsl(this.search);
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
			// this.cnsl(this.categoryItems);
		})
		.catch((e) => {
			this.cnsl('Error: ');
			this.cnsl(e);
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

.status_buttons {
	// max-width: 600px;
    box-shadow: none;
    align-items: center;
    justify-content: start;
    width: auto;
    display: inline-flex;
    height: auto;
    flex-wrap: wrap;	
    > * {
    	flex: none;
    }
	.status-btn {
		height: auto;
		min-width: 50px;
		padding: 5px 15px;
	}


}

// transitions
// ttttttttttttttttttttttttttttttttttttttttttttttttttttttt
.inquiry {
	transition: all 0.5s;
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
