<template>

<!--     <v-card-title>
  Inquiries
  <v-spacer></v-spacer>
  <v-text-field
    v-model="search"
    append-icon="search"
    label="Search"
    single-line
    hide-details
  ></v-text-field>
</v-card-title> -->

    <v-data-table
      :headers="headers"
      :items="data"
      :search="search">
    
        <template slot="items" slot-scope="props">
            <td> <v-checkbox  v-model="props.select" primary hide-details  ></v-checkbox> </td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.country }}</td>
            <td class="text-xs-center">{{ props.item.inquiries }}</td>
            <td class="text-xs-center"> <span v-html="props.item.status"></span></td>
            <td class="text-xs-center">{{ props.item.date }}</td>
        </template>

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
        </v-alert>
        
    </v-data-table>

</template>


<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
            {
              text: 'Select',
              align: 'center',
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

        data: [
          {

            select: true,
            name: 'Ben Stiller',
            country: 'United Arab Emirates',
            inquiries: '1000 pieces of LED Garden Lights',
            status: '<span tabindex="0" class="v-chip v-chip--label v-chip--small theme--light teal white--text"><span class="v-chip__content">Open</span></span>',
            // status: '<v-chip close color="teal" text-color="white">  <v-avatar> <v-icon>check_circle</v-icon></v-avatar> Open </v-chip>'
            date: 'January 19, 2017'

          },

          {

            select: true,
            name: 'Ben Stiller',
            country: 'United Arab Emirates',
            inquiries: '1000 pieces of LED Garden Lights',
            status: '<span tabindex="0" class="v-chip v-chip--label v-chip--small theme--light teal white--text"><span class="v-chip__content">Open</span></span>',
            date: 'January 19, 2017'

          },
        ]
      }
    }
  }
</script>