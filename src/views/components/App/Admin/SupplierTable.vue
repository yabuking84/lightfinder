<template>
 <div>

   <v-card>
          <v-toolbar dark color="grey darken-4">
            <h1 class="font-weight-light title">Supplier</h1>  
           <v-spacer></v-spacer>
            <v-btn icon @click="Sort('desc')">
              <v-icon>sort</v-icon>
            </v-btn>
            <v-btn icon @click="Refresh('refresh')">
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-toolbar>

            <!-- component  -->
            <div class="mt-4">
              
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

                          <tr class="th-heading">

                              <td> <v-checkbox  v-model="props.item.select" :inq-id="props.item.id" primary hide-details  ></v-checkbox></td>
                              <td class="font-weight-medium"> 


                                <v-avatar size="40px">
                                    <img
                                      v-if="props.item.avatar"
                                      :src="props.item.avatar"
                                      alt="Avatar"
                                  >

                                <v-icon v-else color="grey darken-4" dark>account_circle</v-icon>


                                   </v-avatar>

                              </td>
                              <td class="font-weight-medium">{{ props.item.first_name }}</td>
                              <td class="font-weight-medium">{{ props.item.last_name }}</td>
                              <td class="">{{ props.item.email }}</td>
                              <td class="">{{ props.item.job_title }}</td>
                              <td class="">
                                     {{ props.item.date_created }}
                              </td>

                                <td> 

                                 <v-icon
                                    small
                                    class="mr-2"
                                    @click="editBuyer(props.item.id)"
                                  >
                                    edit
                                  </v-icon>
                                  <v-icon
                                    small
                                    @click="deleteBuyer(props.item.id)"
                                  >
                                    delete
                                  </v-icon>
                                </td>
                          </tr>

                      </template>

                      <v-alert slot="no-results" :value="true" color="error" icon="warning">
                          Your search for "{{ search }}" found no results.
                      </v-alert>

                  </v-data-table>
  
            </div>
            <!-- component  -->

        </v-card>

 </div>
</template>

<script>
import inqEvntBs from "@/bus/inquiry";
    
import helpers from "@/mixins/helpers";
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";

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
              value: 'id'
            },

            {
              text: 'Avatar',
              align: 'left',
              sortable: false,
              value: 'avatar'
            },
           
            {
              text: 'Firstname',
              align: 'left',  
              sortable: true,
              value: 'first_name'
            },
           
            {
              text: 'Lastname',
              align: 'left',  
              sortable: true,
              value: 'last_name'
            },

            {
              text: 'Email',
              align: 'left',  
              sortable: true,
              value: 'email'
            },
            
            {
              text: 'Job Title',
              align: 'left',
              sortable: true,
              value: 'job_title'
            },

             {
              text: 'Date Created',
              align: 'left',
              sortable: true,
              value: 'created_at'
            },
            
            {
              text: 'Action',
              align: 'left',
              sortable: false,
            },
        ],
        dataItems: [],
      }
    },
    
    components: {
      InquiryStatusButtons,
    },
    methods: {

  
        fillTable() {

            this.loading = true;
            this.dataItems = [];
            this.$store.dispatch('adminSupplier/getAllSupplier_a')

            .then((response) => {

                console.log(response);

                for (var i = response.length - 1; i >= 0; i--) {

                    var item = {};

                    item.id           = response[i].id;
                    item.avatar       = response[i].avatar;
                    item.first_name   = response[i].first_name;
                    item.last_name    = response[i].last_name;
                    item.email        = response[i].email;
                    item.job_title    = response[i].job_title;
                    item.date_created = response[i].created_at;

                    this.dataItems.push(item);
                }

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
    },

    created(){

        this.fillTable();
        
        inqEvntBs.$on('inquiry-form-submitted',()=>{
            this.fillTable();
        });

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