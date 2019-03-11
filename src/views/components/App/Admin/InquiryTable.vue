<template>

 <div>

        <v-toolbar dark color="grey darken-4">

           <v-btn-toggle multiple v-model="inquiryStatus">
                <span v-for="(status, index) in statuses" class="grey darken-4 pa-2">
                      <v-btn flat value="left" :value="status.id" :title="status.name" >
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

           <v-card>

                    <v-flex xs3 offset-xs9 pt-4>
                         <v-text-field label="Search" v-model="search" placeholder="Search" prepend-inner-icon="search" solo clearable >
                         </v-text-field>   
                    </v-flex>
                  
                  <v-divider></v-divider>
                 
                  <v-data-table
                  
                        :headers="headers"
                        :items="tableItems"
                        :loading="loading"
                        :search="search">

                      <template slot="items" slot-scope="props">

                          <tr class="th-heading">

                              <td>
                                <v-checkbox  v-model="props.item.select" :inq-id="props.item.inq_id" primary hide-details ></v-checkbox>
                              </td>

                              <td class="text-xs-left font-weight-medium">
                                  <h4 class="mt-3"># {{ props.item.inq_id }}</h4>
                                  <h3 class="mb-1">{{ props.item.keywords }}</h3>
                                  <p class="mb-3">{{ props.item.message }}</p>
                              </td>

                              <td class="text-xs-center font-weight-medium">{{ props.item.categories }}</td>
                              
                              <td class="text-xs-center">{{ props.item.quantity }}</td>

                              <td class="text-xs-left">
                                  <div class="dateCellWidth">
                                      {{ getDateTime('mmm dd, yyyy',props.item.shipping_date) }}
                                  </div>
                              </td>
                              
                              <td class="text-xs-center">
                                  <div class="dateCellWidth">
                                      {{ getDateTime('mmm dd, yyyy hh:mm', props.item.created_at ) }}
                                  </div>
                              </td>
                              
                              <td class="text-xs-center">
                                     <inquiry-status-buttons :status-id="props.item.status"/>
                              </td>
                              
                              <td class="text-xs-center">
                                      <v-btn 
                                        @click="viewInquiry(props.item.inq_id)"
                                        small 
                                        class="grey darken-1 font-weight-light">

                                          <i class="fas fa-eye white--text"></i>
                                          <span class="ml-1 white--text font-weight-light ">View</span>
                                      </v-btn>
                              </td>

                          </tr>

                      </template>

                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                            Your search for "{{ search }}" found no results.
                        </v-alert>

                  </v-data-table>
                
            </v-card>


            <span>
               <inquiry-view :openInquiry.sync="openInquiry" v-if="inquiry" :inquiry="inquiry"></inquiry-view>     
            </span>

  </div>
</template>

<script>

import inqEvntBs from "@/bus/inquiry";
    
import helpers from "@/mixins/helpers";
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";
import main from "@/config/main"


import InquiryView from "@/views/Components/App/admin/InquiryView";



export default {

    mixins: [
        helpers,
    ],
    data: function () {
    return {

        statuses: main.inquiry_statuses.default,
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
              text: 'Keywords & Message',
              align: 'left',  
              sortable: true,
              value: 'keywordsAndMessage'
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
        inquiry:null,
        openInquiry:false,

      }
    },
    components: {

      InquiryStatusButtons,
      InquiryView

    },
    methods: {

        fillTable() {

            this.loading = true;
            this.allInquiries = [];
            this.$store.dispatch('adminInquiries/getAllInquiries_a')
            .then((response) => {

                for (var i = response.length - 1; i >= 0; i--) {
                    var item = {};
                    item.inq_id = response[i].id;
                    item.keywords = this.ucwords(response[i].keyword);
                    item.message = response[i].message;
                    item.categories = response[i].categories.join(', ');
                    item.quantity = response[i].quantity;
                    item.shipping_date = response[i].desired_shipping_date;
                    item.created_at = response[i].created_at;
                    item.status = response[i].stage_id;
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
            this.fillTable();
            this.inquiryStatus = [];
        },

        filterTable(){
              if(!this.inquiryStatus.length) {
                  this.tableItems = this.allInquiries;
              } else {
                  this.tableItems = this.allInquiries.filter(inq=>this.inquiryStatus.includes(inq.status));
              }
        },

        viewInquiry(inq_id) {

            this.$store.dispatch('adminInquiries/getInquiry_a',{inq_id:inq_id})

           .then((response) => {

                this.inquiry = response
                console.log(this.inquiry);
                this.openInquiry = true
           })
           .catch((error) => {
              console.log(error);
        
           })
        }
    },
 

    created(){

        this.fillTable();
        inqEvntBs.OnApproved(this.fillTable);

    },

    watch: {

        inquiryStatus(nVal,oVal){
            this.filterTable();
         },

    }

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
