<template>
	<v-container>

		<v-layout row wrap>

			  <v-flex xs10>
			  	<h2 class="subheading">MY INQUIRIES</h2>
	   			<v-btn color="light-green" left dark>  <v-icon color="white"> create </v-icon> Compose Inquiry </v-btn>
			  </v-flex>

			  <v-flex xs2>
				<v-layout row column>
					  <v-btn color="red darken-4" dark>	1 Send Remaining </v-btn>
					  <router-link to="/packages" tag="v-btn" color="black" >
				          <span>Click here to Buy more</span>
				      </router-link> 
				</v-layout>
			  </v-flex>

		</v-layout>

		<div class="mt-4">
			<v-toolbar flat color="black lighten-2">

	   			<v-btn color="blue darken-1" dark> Open Inquiries </v-btn>
	   			<v-btn color="blue darken-1" dark> In-Progress Inquiries </v-btn>
	   			<v-btn color="blue darken-1" dark> Closed Inquiries </v-btn>

			    <v-divider class="mx-2" inset vertical ></v-divider>

			    <v-spacer></v-spacer>

			    <v-dialog v-model="dialog" max-width="500px">
 					<v-text-field  v-model="firstname"  :rules="nameRules"  :counter="10" label="First name" required  ></v-text-field> 
			    </v-dialog>

		    </v-toolbar>
		</div>

		<v-layout row wrap >
			    <v-flex xs12>
					<v-data-table
					    :headers="headers"
					    :items="listof"
					    :search="search"
					    v-model="selected"
					    item-key="name"
					    select-all
					    class="elevation-1"
					  >
					    <template slot="headerCell" slot-scope="props">
					      <v-tooltip bottom>
					        <span slot="activator">
					          {{ props.header.text }}
					        </span>
					        <span>
					          {{ props.header.text }}
					        </span>
					      </v-tooltip>
					    </template>
					    <template slot="items" slot-scope="props">
					      <td>
					        <v-checkbox
					          v-model="props.selected"
					          primary
					          hide-details
					        ></v-checkbox>
					      </td>
					      <td>{{ props.item.name }}</td>
					      <td class="text-xs">{{ props.item.country }}</td>
					      <td class="text-xs">{{ props.item.inquiry }}</td>
					      <td class="text-xs"> <span v-html="props.item.status"></span></td>
					      <td class="text-xs">{{ props.item.date }}</td>
					    </template>
					  </v-data-table>
			    </v-flex>
		</v-layout>

	</v-container>

</template>

<script>
	import { mapGetters } from 'vuex'

	export default {

		    data () {
		      return {
		        search: '',
		        selected: [],
		        headers: [
		          {
		            text: 'Name',
		            sortable: false,
		            value: 'name'
		          },
		          { 
		          	text: 'Country', 
		          	value: 'country',
		          	sortable: false,
		          },
		          { 
		          	text: 'Inquiries', 
		            value: 'inquiry', 
		            sortable: false
		          },
		          { 
		          	text: 'Status', 
		          	value: 'status',
		          	sortable: false 
		          },
		          { 
		          	text: 'Date', 
		          	value: 'date',
		          	sortable:false 
		          },
		        ],
		        listof: [
		          {
		            value: true,
		            name: 'Ben Stiller',
		            country: 'United Arab Emirates',
		            inquiry: '1000 pieces of LED Garden Lights',
		            status: '<span tabindex="0" class="v-chip v-chip--label v-chip--small theme--light lime white--text"><span class="v-chip__content">Open</span></span>',
		            date: 'January 19, 2017'
		          },
		          {
		            value: true,
		            name: 'Ben Stiller',
		            country: 'United Arab Emirates',
		            inquiry: '1000 pieces of LED Garden Lights',
		            status: '<span tabindex="0" class="v-chip v-chip--label v-chip--small theme--light lime white--text"><span class="v-chip__content">Open</span></span>',
		            date: 'January 19, 2017'
		          },
		          {
		            value: true,
		            name: 'Ben Stiller',
		            country: 'United Arab Emirates',
		            inquiry: '1000 pieces of LED Garden Lights',
		            status: '<span tabindex="0" class="v-chip v-chip--label v-chip--small theme--light yellow white--text"><span class="v-chip__content">Verifying</span></span>',
		            date: 'January 19, 2017'
		          },
		          {
		            value: true,
		            name: 'Ben Stiller',
		            country: 'United Arab Emirates',
		            inquiry: '1000 pieces of LED Garden Lights',
		            status: '<span tabindex="0" class="v-chip v-chip--label v-chip--small theme--light red white--text"><span class="v-chip__content">Rejected</span></span>',
		            date: 'January 19, 2017'
		          },
		          {
		            value: true,
		            name: 'Ben Stiller',
		            country: 'United Arab Emirates',
		            inquiry: '1000 pieces of LED Garden Lights',
		            status: '<span tabindex="0" class="v-chip v-chip--label v-chip--small theme--light blue white--text"><span class="v-chip__content">Waiting for Confirmation</span></span>',
		            date: 'January 19, 2017'
		          },
		        ]
		      }
		    },





			created: function() {
				
			}

	}
</script>

<style>
	  .card--flex-toolbar {
	    margin-top: -64px;
	  }
</style>
