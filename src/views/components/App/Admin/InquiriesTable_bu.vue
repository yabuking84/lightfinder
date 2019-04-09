<template>
<div>

<v-card>

    <v-toolbar dark color="grey darken-4">
        <v-btn-toggle multiple v-model="inquiryStatus">
            <span v-for="(status, index) in statuses" class="grey darken-4 pa-2">
              <v-btn flat value="left" :value="status.id" :title="status.name">
                <i class="white--text" :class="status.icon"></i>
                <span class="ml-1 font-weight-light white--text">{{ status.name }} </span>
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
            <v-flex xs7>
                <v-autocomplete v-model="categories" :items="categoryItems" item-text="name" item-value="name" ref="categorySelect" cache-items chips multiple hide-no-data clearable hide-details label="select categories..">
                    <template v-slot:selection="slotData">
                        <v-chip :selected="slotData.selected" close class="chip--select-multi" @input="removeFromCategories(slotData.item)">
                            {{ slotData.item.name }}
                        </v-chip>
                    </template>
                </v-autocomplete>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs4>
                <v-text-field label="Search" v-model="search" placeholder="Search" prepend-inner-icon="search" solo clearable>
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-card-title>

    <v-divider></v-divider>

<!--     <v-data-table :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination"  :headers="headers" :items="tableItems" :loading="loading" :search="search">
        <template slot="items" slot-scope="props">
            <tr class="th-heading">
                <td>
                <v-layout align-start justify-start column fill-height pt-3>
                    <v-checkbox v-model="props.item.select" :inq-id="props.item.inq_id" primary hide-details></v-checkbox>
                </v-layout>
                </td>

                <td class="text-xs-left font-weight-medium">
                <v-layout align-start justify-start column fill-height pt-3>
                    <h3 class="mb-2" style="min-width:190px;">Inquiry # <span>{{ props.item.inq_id }}</span></h3>
                    {{ props.item.categories }}
                </v-layout>
                </td>

                <td class="text-xs-left font-weight-medium">
                <v-layout align-start justify-start column fill-height pt-3>
                    <h3 class="mb-1">{{ props.item.keywords }}</h3>
                    <p class="mb-3">{{ props.item.message }}</p>
                </v-layout>
                </td>

                <td class="text-xs-left">
                <v-layout align-start justify-start column fill-height pt-3>
                    {{ props.item.quantity }}
                </v-layout>
                </td>

                <td class="text-xs-left">
                <v-layout align-start justify-start column fill-height pt-3>
                    <div class="dateCellWidth">
                        {{ getDateTime('mmm dd, yyyy',props.item.shipping_date) }}
                    </div>
                </v-layout>
                </td>

                <td class="text-xs-left">
                <v-layout align-start justify-start column fill-height pt-3>
                    <div class="dateCellWidth">
                        {{ getDateTime('mmm dd, yyyy hh:mm', props.item.created_at ) }}
                    </div>
                </v-layout>
                </td>

                <td class="text-xs-left">
                <v-layout align-start justify-start column fill-height pt-0>
                    <inquiry-status-buttons :statuses="statuses" :status-id="props.item.status" />
                </v-layout>
                </td>

                <td class="text-xs-center">
                <v-layout align-start justify-start column fill-height pt-3>
                    <v-btn @click="viewInquiry(props.item.inq_id)" small class="grey darken-1 font-weight-light">
                        <i class="fas fa-eye white--text"></i>
                        <span class="ml-1 white--text font-weight-light ">View</span>
                    </v-btn>
                </v-layout>
                </td>
            </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>
    </v-data-table> -->

        <v-layout v-if="allInquiries.length > 0" class="grey lighten-5" row wrap >

            <!-- [ {{ allInquiries[0] }}, {{ allInquiries[1] }}, {{ allInquiries[2] }},{{ allInquiries[3] }}, ] -->
            <pre>{{ allInquiries[0] }}</pre>
            

            <isotope :options='inquiryTableOptions' :list="allInquiries" id="root_isotope">

                  <v-flex  xs12 md4 xl3 pa-2 
                  v-for="(inquiry, index) in allInquiries" 
                  :key="'item'+index">
                          <!-- {{ allInquiries }} -->
                        <v-card class="rounded-card pa-3 mx-2 my-3" :hover="true">
                        
                            <v-layout row wrap>

                                     <v-flex xs6>

                                      <h3 class="grey--text lighten-4">Inquiry</h3>
                                      <h4 class="mt-2 font-weight-medium ">#{{ inquiry.inq_id }}</h4>

                                    </v-flex>

                                    <v-flex xs6>
                                        <h3 class="grey--text">Date</h3>
                                        <h4 class="mt-2 font-weight-medium ">
                                            {{  getDateTime('mmm dd, yyyy hh:mm', inquiry.created_at ) }} 
                                            <br> {{ inquiry.created_at }}
                                        </h4>
                                    </v-flex>   

                            </v-layout>

                            <v-layout  row wrap mt-2>

                                     <v-flex xs6>
                                          <h3 class="grey--text lighten-4">Quantity</h3>
                                          <h4 class="mt-3  font-weight-medium ">{{ inquiry.quantity }} pcs</h4>
                                    </v-flex>
                                    <!-- {{ inquiry }} -->
                                    <v-flex xs6>
                                      <h3 class="grey--text lighten-4">Status</h3>
                                      <!-- verifying -->
                                       <div v-if="inquiry.status==1001">
                                            <small class="orange--text">Inquiry sent for BAL approval</small>
                                       </div>
                                       <!-- open -->
                                       <div v-else-if="inquiry.status==1002">
                                            <small class="green--text">Approved inquiry, open for bidding</small>
                                       </div>
                                       <!-- rejected -->
                                       <div v-else-if="inquiry.status==1003">
                                            <small class="red--text">Declined by BAL</small>
                                       </div>
                                       <!-- confirmation-->
                                       <div v-else-if="inquiry.status==1004">
                                            <small class="teal--text">Waiting for supplier confirmation</small>
                                       </div>
                                       <!-- pending payment-->
                                        <div v-else-if="inquiry.status==1005">
                                            <small class="deep-orange--text">Awarded inquiry, supplier confirmed, waiting for buyer payment</small>
                                       </div>
                                       <!-- Production -->
                                       <div v-else-if="inquiry.status==2001">
                                            <small class="blue--text">Products are on the production line</small>
                                       </div>
                                       <!-- Shipment -->
                                       <div v-else-if="inquiry.status==2002">
                                            <small class="light-green--text">Order is sent for shipment</small>
                                       </div>
                                       <!-- Receiving -->
                                       <div v-else-if="inquiry.status==2003">
                                            <small class="orange--text">Order reached the destination, waiting for buyer confirmation</small>
                                       </div>
                                       <!-- Return -->
                                       <div v-else-if="inquiry.status==2004">
                                            <small class="red--text">Order is returning to the supplier</small>
                                       </div>
                                       <!-- Success -->
                                       <div v-else-if="inquiry.status==3001">
                                            <small class="light-blue--text">Order is successful</small>
                                       </div>
                                       <!-- Cancelled -->
                                       <div v-else-if="inquiry.status==3002">
                                            <small class="red--text">Order is cancelled</small>
                                       </div>
                                        <inquiry-status-buttons :status-id="inquiry.status" :statuses="statuses"></inquiry-status-buttons>
                                    </v-flex>   

                            </v-layout>


                            <v-layout row wrap mt-2>
                      
                                     <v-flex xs12>
                                         <h3 class="mt-2 font-weight-medium black--text lighten-4">{{ inquiry.categories }}</h3>
                                    </v-flex>

                            </v-layout>


                            <v-layout row wrap mt-2 class="tnt-height">
                      
                                     <v-flex xs12>
                                          <!-- <h4 class="font-weight-medium black--text lighten-4">Details</h4> -->
                                          <h5 class="mt-2 black--text font-weight-light">
                                              {{ inquiry.message.length > 150 ?  inquiry.message.substring(0,250) + '...' : inquiry.message   }}
                                          </h5>
                                    </v-flex>

                            </v-layout>


                             <v-layout row wrap mt-4 >
                      
                                     <v-flex xs12 class="text-xs-center">
                                            <v-btn @click="viewInquiry(inquiry.inq_id)" :loading="inquiry.loading" block small class=" v-btn--active blue-grey darken-2 font-weight-light text-decoration-none">
                                                <i class="fas fa-eye white--text"></i>
                                                <span class="ml-1 white--text font-weight-light ">Manage</span>
                                              </v-btn>

                                    </v-flex>

                            </v-layout>
                        </v-card>

                  </v-flex>
                 </isotope>
        </v-layout>

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


<span>
    <inquiry-view></inquiry-view>
</span>    





</div>
</template>
<script>
import inqEvntBs from "@/bus/inquiry";

import helpers from "@/mixins/helpers";
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";

import main from "@/config/main"
import config from "@/config/main"

import VueTimers from 'vue-timers/mixin'
import isotope from 'vueisotope'

import InquiryView from "@/views/Components/App/admin/InquiryView";


export default {

  mixins: [
    helpers,
    VueTimers,
    

  ],
  data: function() {
    return {

      statuses: [
        ...config.inquiry_statuses.default,
        ...config.inquiry_statuses.buyers,
      ],
      // search: '844',
      search: '',
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

    inquiryTableOptions: {

        sortBy : "categories",
        sortAscending: {
            categories: false,
        },
    } ,

    }
  },
  components: {

    InquiryStatusButtons,
    InquiryView,
    isotope

  },


  methods: {

    fillTable(withLoading = true) {

      this.loading = withLoading;

      // this.allInquiries = [];
      this.$store.dispatch('admnInq/getAllInquiries_a')
        .then((response) => {
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
            item.loading = false;
            buffer.push(item);
          }

            this.allInquiries = buffer;
          // this.filterTable();

          this.loading = false;

        })
        .catch((e) => {
          console.log('Error: ' + e);
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
      if (this.inquiryStatus.length || this.categories.length) {

        // filter for statuses only
        var isBuff = this.inquiryStatus;
        items = items.filter(function(inq) {
          return (isBuff.length) ? isBuff.includes(inq.status) : true;
        });

        // filter for categories
        isBuff = this.categories;

        function callBackCat(inq) {
          return (isBuff.length) ? isBuff.includes(inq.categories.trim()) : true;
        };
        items = items.filter(callBackCat);
      }

      this.tableItems = items;

    },


    removeFromCategories(item) {
      const index = this.categories.indexOf(item.name);
      if (index >= 0)
        this.categories.splice(index, 1)
    },

    viewInquiry(inq_id) {

        this.$store.dispatch('admnInq/getInquiry_a', { inq_id: inq_id })
        .then((response) => {

          this.inquiry = response
          this.openInquiry = true
        })
        .catch((error) => {}) 
    }
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
        // console.log(this.categoryItems);
      })
      .catch((e) => {
        console.log('Error: ');
      });

  },


    computed: {


        filterInquiries() {

                  var items = this.allInquiries

                  if(this.search) {

                      items.sort(function (a, b) {
                          return a.value - b.value
                      })

                      items = items.filter(inquiry => {
                              // add key to search in the dom
                              return (inquiry.inq_id.includes(this.search) || inquiry.keywords.toLowerCase().includes(this.search))
                      })

                    }

                      var buff = this.categories;
                      items = items.filter(function(inquiry) {
                              return (buff.length) ? buff.includes(inquiry.categories.trim()) : true
                      });

                      var buff = this.inquiryStatus;
                      items = items.filter(function(inquiry) {
                          return (buff.length) ? buff.includes(inquiry.status) : true
                      });

                      // console.log(items);


                  return items;

        },


        openInquiry: {
            get() {
                return this.$store.state.admnInq.openInquiryView;
            },
            set(nVal){
                if(nVal)
                this.$store.commit('admnInq/SHOW_OPENINQUIRYVIEW_M');
                else
                this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');
            },
        },

        inquiry: {
            get() {
                return this.$store.state.admnInq.inquiry;
            },
            set(nVal) {
                // console.log('setVal');
                // console.log(nVal);
                this.$store.commit('admnInq/UPDATE_INQUIRY_M',{inquiry:nVal});
            },
        },
    },


  watch: {

    inquiryStatus(nVal, oVal) {
      this.filterTable();
    },

    categories(nVal, oVal) {
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
      width: calc(25% - 1em);
      min-width: 100px;
      // text-align: center;
      color: white;
      transition: box-shadow 0.2s;

      @media(max-width: 767px) {
        width: calc(50% - 1em);
      }

      @media(max-width: 500px) {
        width: calc(100% - 1em);
      }

    }

  }


.tnt-height {
    height: 70px;
}

.rounded-card{
    border-radius:10px;
    // border-top: 5px solid #5d5d5d;
    border-bottom: 5px solid #dedede ;
}



</style>
