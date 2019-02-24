<template>
 <div>
     <v-flex xs3 offset-xs9 mr-2 ml3>
             <v-text-field label="Search" v-model="search" placeholder="Search" prepend-inner-icon="search" solo clearable >
             </v-text-field>   
    </v-flex>
    <v-divider></v-divider>
    <v-data-table
          :headers="headers"
          :items="dataItems"
          :loading="loading"
          :search="search">
        <template slot="items" slot-scope="props">
            <tr class="th-heading"  @click="click(props.item.name)">
                
                <td> <v-checkbox  v-model="props.item.select" :inq-id="props.item.inq_id" primary hide-details  ></v-checkbox></td>
                
                <td class="text-xs-center font-weight-medium">{{ props.item.keywords }}</td>

                <td class="text-xs-center font-weight-medium">{{ props.item.message }}</td>
                
                <td class="text-xs-center font-weight-medium">{{ props.item.categories }}</td>

                <td class="text-xs-center">{{ props.item.quantity }}</td>

                
                <td class="text-xs-center">{{ props.item.shipping_date }}</td>

                <td class="text-xs-center">{{ props.item.created_at }}</td>

                <td class="text-xs-center">
                       <!-- <inquiry-status :status=props.item.status> </inquiry-status> -->
                       {{ props.item.status }}
                </td>

                <td class="text-xs-center">
                  <!-- <v-btn small flat @click="dialog = true" value="left" class="v-btn--active grey darken-1  -->
                     <v-btn small flat value="left" class="v-btn--active grey darken-1 font-weight-light text-decoration-none">  
                        <router-link :to="{ name: 'BuyerInquiryView', params: { userId: 123 }}">
                           <i class="fas fa-eye white--text"></i>             
                          <span class="ml-1 white--text font-weight-light ">View</span>
                      </router-link>
                    </v-btn>
                    
                </td>

            </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>
    </v-data-table>

    <dialog-test :dialog.sync="dialog" ></dialog-test>
<!--     <test1></test1>
    <test2></test2> -->

 </div>
</template>

<script>
    
import helpers from "@/mixins/helpers";
import DialogTest from "@/views/Components/App/Buyer/DialogTest";
import InquiryStatus from "@/views/Components/App/Buyer/InquiryStatus";

  export default {
    mixins: [
        helpers,
    ],
    data: function () {
    return {

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
              text: 'Keywords',
              align: 'center',  
              sortable: false,
              value: 'keywords'
            },
           
            {
              text: 'Message',
              align: 'center',  
              sortable: false,
              value: 'message'
            },

            {
              text: 'Categories',
              align: 'center',  
              sortable: false,
              value: 'categories'
            },
            
            {
              text: 'Quantity',
              align: 'center',
              sortable: false,
              value: 'quantity'
            },
            
            {
              text: 'Preferred Shipping Date',
              align: 'center',
              sortable: false,
              value: 'shipping_date'
            },
            
            {
              text: 'Date',
              align: 'center',
              sortable: false,
              value: 'created_at'
            },

            {
              text: 'Status',
              align: 'center',
              sortable: false,
              value: 'status'
            },

            {
              text: 'Action',
              align: 'center',
              sortable: false,
            },
        ],

        dataItems: []
      }
    },
    components: {
      InquiryStatus,
      DialogTest
    },
    methods: {
      click: function(name) {
        // window.location.href = '/buyer/view'
      }
    },

    created(){
        this.loading = true;
        this.$store.dispatch('inq/getInquiries_a')
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
                this.dataItems.push(item);
            }

            this.loading = false;


        })
        .catch((e) => {
            console.log('Error: '+e);
            this.loading = false;
        })
        .finally(()=>{
            console.log('finally');
            this.loading = false;
        });;


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