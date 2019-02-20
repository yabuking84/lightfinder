<template>
 <div>
     
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
                <v-btn flat @click="dialog = true" value="left" class="v-btn--active">                    
                    <span class="ml-1 white--text font-weight-light subheading">Open</span>
                </v-btn>                   
            </td>
            <td class="text-xs-center">{{ props.item.date }}</td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>
    </v-data-table>

    <dialog-test :openDialog="dialog" @closeDialog="dialog=false"></dialog-test>

 </div>
</template>


<script>
    
 import DialogTest from "@/views/Components/App/Buyer/DialogTest";

  export default {
    data: function () {
      return {

        search: '',
        dialog: false,
        class: 'color:red;',
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
        ],

        dataItems: [
          {
            // open
            select: true,
            name: 'Jane Doe',
            country: 'United Arab Emirates Close Table',
            inquiries: '1000 pieces of LED Garden Lights',
            status: '<span tabindex="0" class="v-chip pa-3 v-chip--label v-chip--small theme--light fix-width blue-grey lighten-4 white--text"><span class="v-chip__content text-xs-center">Open</span></span>',
            date: 'January 19, 2017'

          },
           {
            // open
            select: true,
            name: 'Jane Doe',
            country: 'United Arab Emirates',
            inquiries: '1000 pieces of LED Garden Lights',
            status: '<span tabindex="0" class="fix-width v-chip pa-3 v-chip--label v-chip--small fix-width theme--light amber darken-4 white--text text-xs-center"><span class="v-chip__content">Waiting for Confirmation</span></span>',
            date: 'January 19, 2017'
          },
          // verifying
          {

            select: true,
            name: 'Ben Stiller',
            country: 'United Arab Emirates',
            inquiries: '1000 pieces of LED Garden Lights',
            status: '  ',
            date: 'January 19, 2017'
          },
          // waiting for your confirmation
        ]
      }
    },


    components: {
        DialogTest
    },

    methods: {
        
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