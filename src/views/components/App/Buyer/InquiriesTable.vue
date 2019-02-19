<template>
 <div>
     <v-flex xs3 offset-xs9 mr-2 ml3>
             <v-text-field label="Search" v-model="search" placeholder="Search" prepend-inner-icon="search" solo clearable ></v-text-field>   
    </v-flex>
    <v-divider></v-divider>
    <v-data-table
          :headers="headers"
          :items="dataItems"
          :search="search">
        <template slot="items" slot-scope="props">
            <td> <v-checkbox  v-model="props.select" primary hide-details  ></v-checkbox> </td>
            <td class="text-xs-center font-weight-medium">{{ props.item.name }}</td>
            <td class="text-xs-center font-weight-medium">{{ props.item.country }}</td>
            <td class="text-xs-center font-weight-medium">{{ props.item.inquiries }}</td>
            <td class="text-xs-center">
                <status-component :status=props.item.status> </status-component>
            </td>
            <td class="text-xs-center">{{ props.item.date }}</td>
            <td class="text-xs-center">
                 <v-btn small flat @click="dialog = true" value="left" class="v-btn--active grey darken-1 font-weight-light">       
                    <i class="fas fa-eye white--text"></i>             
                    <span class="ml-1 white--text font-weight-light ">View</span>
                </v-btn>
            </td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>
    </v-data-table>
    <dialog-test :openDialog="dialog" :closeDialog="closeDialog" ></dialog-test>
 </div>
</template>

<script>
    
 import DialogTest from "@/views/Components/App/Buyer/DialogTest";
 import StatusComponent from "@/views/Components/App/Buyer/StatusComponent";

  export default {

    data: function () {
      return {
        search: '',
        dialog: false,
        headers: [
            {
              text: 'Select',
              align: 'left',
              sortable: false,
              value: 'select'
            },
            {
              text: 'Name',
              align: 'center',
              sortable: false,
              value: 'name'
            },
            {
              text: 'Country',
              align: 'center',
              sortable: false,
              value: 'country'
            },
            {
              text: 'Inquiries',
              align: 'center',  
              sortable: false,
              value: 'inquiries'
            },
            {
              text: 'Status',
              align: 'center',
              sortable: false,
              value: 'status'
            },
            {
              text: 'Date',
              align: 'center',
              sortable: false,
              value: 'date'
            },
             {
              text: 'Action',
              align: 'center',
              sortable: false,
              value: 'date'
            },
        ],

        dataItems: [
          {
            // open
            select: true,
            name: 'Jane Doe Inquiries',
            country: 'United Arab Emirates',
            inquiries: '1000 pieces of LED Garden Lights',
            status: 'Open',
            date: 'January 19, 2017'

          },
           {
            // open
            select: true,
            name: 'Jane Doe',
            country: 'United Arab Emirates',
            inquiries: '1000 pieces of LED Garden Lights',
            status: 'Confirmation',
            date: 'January 19, 2017'
          },
          // verifying
          {

            select: true,
            name: 'Ben Stiller',
            country: 'United Arab Emirates',
            inquiries: '1000 pieces of LED Garden Lights',
            status: 'Verifying',
            date: 'January 19, 2017'
          },
          {

            select: true,
            name: 'Ben Stiller',
            country: 'United Arab Emirates',
            inquiries: '1000 pieces of LED Garden Lights',
            status: 'Rejected',
            date: 'January 19, 2017'
          },
          // waiting for your confirmation
        ]
      }
    },

    components: {
        DialogTest,
        StatusComponent
    },

    methods: {

        closeDialog: function(val){
            // alert(val);
            this.dialog=false;

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
</style>