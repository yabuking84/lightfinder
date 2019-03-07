<template>
 <div>
    <v-card>
        <v-layout row wrap mb-3>
            <!-- toolbar -->
            <v-toolbar dark color="grey darken-4">


                <v-btn-toggle multiple v-model="inquiryStatus">
                    <!-- for loop -->
                    <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                    <!-- <span v-for="(status, index) in statusesSupplier" class="grey darken-4 pa-2">
                        <v-btn flat @click="inquiryStatus=status.id+''" :value="status.id+''" :title="status.name">
                            <i class="white--text" :class="status.icon"></i> 
                            <span class="ml-1 font-weight-light white--text">{{ status.name }}</span>
                        </v-btn>
                    </span> -->
                    <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                    <!-- for loop -->

                    <!-- for loop -->
                    <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                    <span v-for="(status, index) in statuses" class="grey darken-4 pa-2">
                        <v-btn flat :value="status.id" :title="status.name">
                            <i class="white--text" :class="status.icon"></i> 
                            <!-- <span class="ml-1 font-weight-light white--text">{{ status.name }}</span> -->
                        </v-btn>
                    </span>
                    <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                    <!-- for loop -->
                </v-btn-toggle>
                
                <v-spacer></v-spacer>

                <v-btn icon @click="refresh()">
                    <v-icon>refresh</v-icon>
                </v-btn>




            </v-toolbar>
            <!--/ toolbar -->
        </v-layout>

        <v-card-title>
            <v-layout row wrap>

                <v-flex xs7>
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
                        label="select categories..">
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

                <v-flex xs4>
                    <v-text-field 
                        label="Search" 
                        v-model="search" 
                        placeholder="Search" 
                        prepend-inner-icon="search" 
                        solo 
                        clearable>
                    </v-text-field>
                </v-flex>


            </v-layout>
        </v-card-title>

        <v-divider></v-divider>

        <v-data-table :headers="headers" :items="tableItems" :loading="loading" :search="search">
            <template slot="items" slot-scope="props">
                <tr class="th-heading">

                    <td>
                        <v-checkbox v-model="props.item.select" :inq-id="props.item.inq_id" primary hide-details></v-checkbox>
                    </td>

                    <td class="text-xs-left font-weight-medium">
                        <h3 class="mt-3 mb-0">Inquiry # <span>{{ props.item.inq_id }}</span></h3>
                        <h3 class="mt-1 mb-1">{{ props.item.keywords }}</h3>
                        <p class="mb-3">{{ props.item.message }}</p>
                    </td>

                    <td class="text-xs-left font-weight-medium">{{ props.item.categories }}</td>

                    <td class="text-xs-left">{{ props.item.quantity }}</td>

                    <td class="text-xs-left">
                        <div class="dateCellWidth">{{ getDateTime('mmm dd, yyyy',props.item.shipping_date) }}</div>
                    </td>

                    <td class="text-xs-left">
                        <div class="dateCellWidth">{{ getDateTime('mmm dd, yyyy hh:mm',props.item.created_at) }}</div>
                    </td>

                    <td class="text-xs-left">
                        <inquiry-status-buttons :status-id="props.item.status" />
                    </td>

                    <td class="text-xs-center">
                            <v-btn 
                                small 
                                flat 
                                value="left" 
                                @click="viewInquiry(props.item.inq_id)"
                                class="v-btn--active grey darken-1 font-weight-light text-decoration-none">
                                <i class="fas fa-eye white--text"></i>
                                <span class="ml-1 white--text font-weight-light ">View</span>
                            </v-btn>
                        <!-- <router-link :to="{ name: 'SupplierInquiryView', params: { inq_id: props.item.inq_id }}">
                        </router-link> -->
                    </td>

                </tr>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
            </v-alert>
        </v-data-table>


    </v-card>


    
    <span>
        <inquiry-view :openInquiry.sync="openInquiry" :inquiry="inquiry" ></inquiry-view>     
    </span>


 </div>
</template>

<script>

import helpers from "@/mixins/helpers";
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";

import InquiryView from "@/views/Pages/Supplier/InquiryView";

import main from "@/config/main"

  export default {
    components: {
      InquiryStatusButtons,
      InquiryView,

    },

    mixins: [
        helpers,
    ],    
    props: {
    },
    data: function () {
    return {

        statuses: main.inquiry_statuses.default,
        statusesSupplier: main.inquiry_statuses.suppliers,
        search: '1551612312798',
        headers: [
            {
              text: 'Select',
              align: 'left',
              sortable: false,
              value: 'inq_id'
            },
           
            {
              text: 'Keywords & Message',
              align: 'center',  
              sortable: true,
              value: 'keywordsMessage'
            },
           
            {
              text: 'Categories',
              align: 'left',  
              sortable: true,
              value: 'categories'
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

        openInquiry: false,
        inquiry: null,

      }
    },

    methods: {


        viewInquiry(inq_id){            

            this.$store.dispatch('spplrInq/getInquiry_a',{inq_id:inq_id})
            .then((data)=>{
                this.inquiry = data;
                this.openInquiry = true;
            })
            .catch((error)=>{
                console.log(error);
            });


        },

        fillTable() {
            this.loading = true;
            this.allInquiries = [];
            this.$store.dispatch('spplrInq/getInquiries_a')
            .then((response) => {

                // console.log(response);

                for (var i = response.length - 1; i >= 0; i--) {
                    var item = {};
                    item.inq_id = response[i].id;
                    item.keywords = this.ucwords(response[i].keyword);
                    item.message = response[i].message;
                    item.keywordsMessage = response[i].keyword+" "+response[i].message;
                    item.categories = response[i].categories.join(', ');
                    item.quantity = response[i].quantity;
                    item.shipping_date = response[i].desired_shipping_date;
                    item.created_at = response[i].created_at;
                    item.status = response[i].stage_id;
                    item.inquiry = response[i];
                    this.allInquiries.push(item);
                }
                this.tableItems = this.allInquiries;
                this.loading = false;

            })
            .catch((e) => {
                console.log('Error: '+e);
                this.loading = false;
            })
            .finally(()=>{
                this.loading = false;
            });

        },

        refresh(){
            this.inquiryStatus = [];
            this.categories = [];
            this.search = "";
        },

        filterTable(){

            var items = this.allInquiries;
            if(this.inquiryStatus.length || this.categories.length) {

                // filter for statuses only
                var isBuff = this.inquiryStatus;
                function callBackStat(inq){
                    return (isBuff.length)?isBuff.includes(inq.status):true;
                };
                items = items.filter(callBackStat);
                

                // filter for categories
                isBuff = this.categories;
                function callBackCat(inq){
                    return (isBuff.length)?isBuff.includes(inq.categories.trim()):true;
                };
                items = items.filter(callBackCat);
            }

            this.tableItems = items;
        },

        removeFromCategories (item) {
            const index = this.categories.indexOf(item.name);            
            if (index >= 0) 
            this.categories.splice(index, 1)
        }        

    },


    created(){
        this.fillTable();

        // get categories for category select box
        this.$store.dispatch('cat/getCategories_a')
        .then((data)=>{
            this.categoryItems = data;
            // console.log(this.categoryItems);
        })
        .catch((e) => {
            console.log('Error: ');
            console.log(e);
        });        
    },

    watch: {
        inquiryStatus(nVal,oVal){
            this.filterTable();
        },

        categories(nVal,oVal){
            this.filterTable();
        },
    },    
    
  }
</script>


<style scoped lang="stylus">
    .theme--light.v-table thead tr
      background:#000000;
      color:#fff;
    .fix-width
      width:198px;
    .th-heading 
       cursor: pointer; 
    .text-decoration-none
       text-decoration: none;
    .th-heading a 
       text-decoration:none;

</style>

<style scoped lang="scss">

.theme--light.v-datatable thead th.column.sortable.active .v-icon,
.v-datatable thead th.column.sortable:focus .v-icon, 
.v-datatable thead th.column.sortable:hover .v-icon {
    // margin-right: 5px;
}

.dateCellWidth {
    min-width: 110px;
}

</style>
