<template>
	<div>

	  	  <v-dialog :value="inquirylookup" @input="$emit('update:inquirylookup',false)" fullscreen >
	 		      
		        <v-toolbar dark color="green" height="50px">
		            <v-toolbar-title class="font-weight-light subheading">
		                Use Existing Inquiry
		            </v-toolbar-title>
		            <v-spacer></v-spacer>
		            <v-btn icon @click="closeDialog()">
		                <v-icon>close</v-icon>
		            </v-btn>
		        </v-toolbar>

	        <v-card height=500>

		          <v-card-text>

					 <v-data-table   
					        :rows-per-page-items="rowsPerPageItems"
					        :pagination.sync="pagination" 
					        :headers="headers" 
					        :items="tableItems" 
					        :loading="loading" 
					        :search="search">

					        <template  v-slot:items="props">

						          <tr class="th-heading">

						            <td class="text-xs-left font-weight-medium ">
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

						            <!-- <td class="text-xs-left">{{ props.item.quantity }}</td> -->

						           <!--  <td class="text-xs-center">
						              <inquiry-status-buttons :status-id="props.item.status" :statuses="statuses"></inquiry-status-buttons>
						            </td> -->

						            <td class="text-xs-center">
						              <v-btn @click="viewInquiry(props.item)" :loading="props.item.loading" small flat value="left" class="red darken-2 v-btn--active font-weight-light text-decoration-none">
						                <i class="fas fa-eye white--text"></i>
						                <span class="ml-1 white--text font-weight-light ">Use</span>
						              </v-btn>
						            </td>

						          </tr>

						        </template>

						        <v-alert slot="no-results" :value="true" color="error" icon="warning">
						          Your search for "{{ search }}" found no results.
						        </v-alert>

					      </v-data-table>

	         	 </v-card-text>

	        </v-card>

	    </v-dialog>
	</div>
</template>

<script>


	import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";

	export default {

		components: {
			
			InquiryStatusButtons
		
		},

		data() {

			return {
				search: '',
			    headers: [

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


			      // {
			      //   text: 'Quantity',
			      //   align: 'left',
			      //   sortable: true,
			      //   value: 'quantity'
			      // },

			      // {
			      //   text: 'Status',
			      //   align: 'left',
			      //   sortable: true,
			      //   value: 'status'
			      // },

			      {
			        text: 'Action',
			        align: 'center',
			        sortable: false,
			      },

			    ],

			    allInquiries:[],

			    tableItems:[],

			    rowsPerPageItems: [10, 15, 20, 30, 40],

			    pagination: {
			        rowsPerPage: 10
			    },

			    loading:false

			}

		},

		props: {

			inquirylookup: {
				type: Boolean
			},
		},

        methods: {
        	
            fillTable(withLoading = true) {

              this.tableItems = [];

		      if (withLoading)
		        this.loading = true;

			      this.allInquiries = [];
			      this.$store.dispatch('byrInq/getInquiries_a')
			        .then((response) => {

			          for (var i = response.length - 1; i >= 0; i--) {
			            var item = {};
			            item.inq_id = response[i].id;
			            item.keywords = response[i].keyword;
			            item.message = response[i].message;
			            item.categories = response[i].categories.join(', ');
			            item.quantity = response[i].quantity;
			            item.shipping_date = response[i].desired_shipping_date;
			            item.created_at = response[i].created_at;
			            item.status = response[i].stage_id;
			            item.loading = false;
			            this.tableItems.push(item);
			          }

     				  // this.tableItems = items;
			        //   console.log(this.allInquiries);

			        })
			        .catch((e) => {
			          console.log('Error: ' + e);
			          this.loading = false;
			        })
			        .finally(() => {
			          this.loading = false;
			        });

		    },

		    closeDialog() {
		    	this.$emit('update:inquirylookup',false)
		    },

        },

         created() {

         	// this.fillTable();

         },

         watch: {

         	inquirylookup(nVal, oVal) {
         		if(nVal) {
         			this.fillTable();
         		}
         	},

         	deep: true

         }


	}
	
</script>

<style scoped lang="">
.v-messages {
  -webkit-box-flex: 1 !important;
  -ms-flex: 1 1 auto !important;
  flex: 1 1 auto !important;
  font-size: 12px !important;
  min-height: 0px !important;
  min-width: 1px !important;
  position: relative !important;
}

</style>
