<template>
<div>

<v-card>

    <v-toolbar dark color="grey darken-4">
        <v-btn-toggle multiple v-model="inquiryStatus">
            <span v-for="(status, index) in statuses" class="grey darken-4 pa-2">
              <v-btn flat value="left" :value="status.id" :title="status.name">
				<v-icon>{{ status.icon }}</v-icon>
                <!-- <i class="white--text" :class="status.icon"></i> -->
                <!-- <span class="ml-1 font-weight-light white--text">{{ status.name }} </span> -->
            </v-btn>
            </span>
        </v-btn-toggle>
        <v-spacer></v-spacer>
        <v-btn icon @click="refresh()">
            <v-icon>refresh</v-icon>
        </v-btn>
    </v-toolbar>

    <v-card-title>
    <v-layout row wrap>
       
      
         

        <v-flex xs4>
            <v-autocomplete v-model="categories" :items="categoryItems" item-text="name" item-value="name" ref="categorySelect" cache-items chips multiple hide-no-data clearable hide-details label="Select categories..">
              <template v-slot:selection="slotData">
                <v-chip :selected="slotData.selected" close class="chip--select-multi" @input="removeFromCategories(slotData.item)">
                  {{ slotData.item.name }}
                </v-chip>
              </template>
            </v-autocomplete>
          </v-flex>
    

         <v-spacer></v-spacer>

           <v-flex xs4 class="">
            <v-text-field label="Search" v-model="search"  prepend-inner-icon="search" clearable>
            </v-text-field>
          </v-flex>



                         
        </v-layout>
    </v-card-title>

    <v-divider></v-divider>


            <transition-group 
            tag="v-layout" 
            v-if="tableItems.length > 0" 
            name="tiItems" 
            class="layout grey lighten-5 row wrap">
	              
				<template v-for="(inquiry, key, index) in tableItems">				
					<inquiry-grid-item
					:key="inquiry.inq_id"
					:inquiry="inquiry"
					:statuses="statuses"
					class="inquiry">
						<template v-slot:details="sp">
			                <v-flex xs6 mt-2>
			                    <h5 class="grey--text lighten-4">Inquiry Holder</h5>
			                    <h3 class="mt-0 blue-grey--text font-weight-bold ">
			                    	{{ sp.inquiry.inquiry.buyer.first_name + ' ' + sp.inquiry.inquiry.buyer.last_name }}
			                    </h3>
			                </v-flex>

			                <v-flex xs6 mt-2>
			                    <h5 class="grey--text">Job Title</h5>
			                    <h3 class="mt-0 blue-grey--text  font-weight-bold ">
			                    	{{ sp.inquiry.inquiry.buyer.job_title }}
			                    </h3>
			                </v-flex>

			                <v-flex xs6 mt-2>
			                    <h5 class="grey--text lighten-4">Inquiry</h5>
			                    <h3 class="mt-0 font-weight-medium ">{{ sp.inquiry.inq_id }}</h3>
			                </v-flex>

			                <v-flex xs6 mt-2>
			                    <h5 class="grey--text">Date</h5>
			                    <h3 class="mt-0 font-weight-medium ">
			                        {{  getDateTime('mmm dd, yyyy hh:mm', sp.inquiry.created_at ) }} 
			                    </h3>
			                </v-flex>
						</template>
					</inquiry-grid-item>
				</template>

            </transition-group>



         <v-layout v-else class="grey lighten-4" justify-center  row wrap pa-5>

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



</v-card>

<!-- 
<span>
    <inquiry-view></inquiry-view>
</span>     -->





</div>
</template>
<script>
import inqEvntBs from "@/bus/inquiry";

// import helpers from "@/mixins/helpers";

import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";
import InquiryGridItem from "@/views/Components/App/InquiryGridItem";

import config from "@/config/main"

import VueTimers from 'vue-timers/mixin'
import isotope from 'vueisotope'

// import InquiryView from "@/views/Components/App/admin/InquiryView";


export default {

  mixins: [
    // helpers,
    VueTimers,
  ],

  components: {

    InquiryStatusButtons,
	InquiryGridItem,
    // InquiryView,
    isotope

  },
  
  data: function() {
    return {

      statuses: [
        ...config.inquiry_statuses.default,
        ...config.inquiry_statuses.buyers,
      ],
      // search: '844',
      // search: '1554795137726',
      // search: '1554969763787',
		search: '1559132882113', // 2 bids
      dialog: false,
      loading: false,
      headers: [{
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

      snackbar: true,
      rowsPerPageItems: [10, 15, 20, 30, 40],
      pagination: {
        rowsPerPage: 15
    },



    // xxxxxxxxxxxxxxxxxxxxx
    inquiryTableOptions: {
        getSortData: {
            ca: "created_at",  
        },
        sortBy : "ca",
        sortAscending: {
            ca: false,
        },
    },
    // xxxxxxxxxxxxxxxxxxxxx




    }
  },



  methods: {

    fillTable(withLoading = true) {

      this.loading = withLoading;

      // this.allInquiries = [];
      this.$store.dispatch('admnInq/getInquiries_a')
        .then((response) => {
        	// this.cnsl('response',response);
            var buffer = [];
            for (var i = response.length - 1; i >= 0; i--) {
                var item = {};
                item.inq_id = response[i].id;
                item.keywords = this.ucwords(response[i].keyword);
                item.message = response[i].message;
                item.keywordsMessage = response[i].keyword + " " + response[i].message;
                item.categories = response[i].categories.join(', ');
                item.quantity = response[i].quantity;
                item.shipping_date = response[i].desired_shipping_date;
                item.created_at = response[i].created_at;
                item.status = response[i].stage_id;
                item.inquiry = response[i];
                // item.loading = false;
                buffer.push(item);
            }
    
            this.allInquiries = buffer;
            // this.filterTable();
            this.tableItems = this.allInquiries;

            this.filterTable();

            this.loading = false;

        })
        .catch((e) => {
          this.cnsl('Error: ' + e);
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });

    },

    refresh() {

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

    inqEvntBs.$on('approved-submitted', () => {

      // this.fillTable();

    });


    // get categories for category select box
    this.$store.dispatch('cat/getCategories_a')
      .then((data) => {
        this.categoryItems = data;
        // this.cnsl(this.categoryItems);
      })
      .catch((e) => {
        this.cnsl('Error: ');
      });

  },


    computed: {



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


  }

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

</style>


<style scoped lang="scss">
.theme--light.v-table thead tr {
  background: #000000;
  color: #fff;
}

.fix-width {
  width: 198px;
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


.dateCellWidth {
  min-width: 110px;
}

table.v-table tbody td,
table.v-table tbody th {
  vertical-align: top;
}

.hey {
  color: red;
  background-color: red;
}


#root_isotope {
  
    width: 100%;
    margin: 0.5em -0.5em;
    

    .item {
      padding: 1em;
      margin: 0.5em;
      color: white;
      transition: box-shadow 0.2s;

      min-width: 100px;
      width: calc(25% - 1em);
      @media(max-width: 767px) {
        width: calc(50% - 1em);
      }
      @media(max-width: 500px) {
        width: calc(100% - 1em);
      }
    }

}


.tnt-height {
	height: 35px;
	overflow: hidden;
}

.rounded-card{
    border-radius:10px;
    // border-top: 5px solid #5d5d5d;
    border-bottom: 5px solid #dedede ;
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


</style>
