<template>
  <div>
    <v-card>
      <v-layout row wrap mb-3>
        <v-toolbar dark color="grey darken-4">
          <v-btn-toggle multiple v-model="inquiryStatus">
            <span v-for="(status, index) in statuses" class="grey darken-4 pa-2">
              <v-btn flat :value="status.id" :title="status.name">
                <i class="white--text" :class="status.icon"></i>
                <span class="ml-1 font-weight-light white--text">{{ status.name }}</span>
              </v-btn>
            </span>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-btn icon @click="refresh()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
      </v-layout>

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
          <v-flex xs3 pt-2>
            <v-text-field label="Search" v-model="search"  prepend-inner-icon="search" clearable>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-card-title>

      <v-divider></v-divider>
      
      <v-data-table   
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination" 
        :headers="headers" 
        :items="tableItems" 
        :loading="loading" 
        :search="search">
        <template  v-slot:items="props">
          <tr class="th-heading">
            
            <td>
              <v-checkbox v-model="props.item.select" :inq-id="props.item.inq_id" primary hide-details></v-checkbox>
            </td>

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
            <td class="text-xs-left">{{ props.item.quantity }}</td>

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
              <inquiry-status-buttons :status-id="props.item.status" :statuses="statuses"></inquiry-status-buttons>
            </td>

            <td class="text-xs-center">
              <v-btn 
              @click="viewInquiry(props.item)" 
              :loading="props.item.loading" 
              small 
              flat 
              value="left" 
              class="v-btn--active blue-grey darken-4 font-weight-light text-decoration-none btn-with-loading">
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


<!--   <v-card class="post-card">
  <v-toolbar color="transparent" flat dense card>
    <v-toolbar-title class="subheading ft-200">Recent Posts</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon class="text--secondary">more_vert</v-icon>
    </v-btn>
  </v-toolbar>
  <v-divider></v-divider>
  <v-card-text class="pa-0">
    <ul class="post--list flex-list vertical">
      <li class="post--item" v-for="(item, key) in tableItems" :key="key">
        <a href="#" class=" post--link pa-4 layout row ma-0 text--primary">
          <div class="post--media">
            <img :src="item.featuredImage" alt="" height="100" class="image-scale">
          </div>
          <div class="post--content ml-3">
            <h3 class="title post--title">
              {{item.inq_id}}
            </h3>
{{ item.message | truncate({length: 150}) }}

            <div class="post--desc py-2 text--secondary">
              {{ item.message }}
            </div>
            <div class="post--meta o-flex justify-space-between">
              <div class="post--author caption grey--text text--darken-1">
                <span>{{item.quantity}}</span>
                <time class="px-2">{{item.created_at}}</time>
              </div>
              <div class="social">
                <a @click="handleThumb" class="grey--text text--darken-1">
                  <v-icon small>thumb_up</v-icon>
                  <small>100+</small>
                </a>
                <a @click="handleComment" class="grey--text text--darken-1 mx-3">
                  <v-icon small>mode_comment</v-icon>
                  <small>12+</small>
                </a>
                <a @click="handleFavorite" class="grey--text text--darken-1">
                  <v-icon small>favorite</v-icon>
                  <small>50+</small>
                </a>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </v-card-text>
</v-card>
 -->


    <span>
      <inquiry-view></inquiry-view>
    </span>


  </div>
</template>
<script>
import inqEvntBs from "@/bus/inquiry";

import helpers from "@/mixins/helpers";
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons";
import InquiryView from "@/views/Components/App/Buyer/InquiryView";
import config from "@/config/main"


import VueTimers from 'vue-timers/mixin'

export default {

    mixins: [
        helpers,
        VueTimers,
    ],

    components: {
        InquiryStatusButtons,
        InquiryView,
    },

    data: () => ({

        statuses: [
            ...config.inquiry_statuses.default,
            ...config.inquiry_statuses.buyers,
        ],
        search: '844',
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

        rowsPerPageItems: [10, 15, 20, 30, 40],
        pagination: {
            rowsPerPage: 15
        },

    }),

    // timers: [{
    //   name: 'InquiryTableTimer',
    //   time: config.polling.inquiryTable.time,
    //   repeat: true,
    //   autostart: false,
    //   callback: function() {
    //     console.log("InquiryTableTimer");
    //     this.fillTable(false);
    //   },
    // }],
    // to execute timer
    // this.$timer.stop('InquiryTableTimer');

    methods: {

        fillTable(withLoading = true) {

                if (withLoading)
                    this.loading = true;

                this.allInquiries = [];
                this.$store.dispatch('byrInq/getInquiries_a')
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
                            item.loading = false;
                            this.allInquiries.push(item);
                        }

                        // this.tableItems = this.allInquiries;
                        this.filterTable();

                        if (withLoading)
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

            viewInquiry(inq) {
                inq.loading = true;
                this.$store.dispatch('byrInq/getInquiry_a', {
                        inq_id: inq.inq_id
                    })
                    .then((data) => {

                        // console.log('viewInquiry');
                        // console.log(data);

                        inq.loading = false;
                        this.inquiry = data;
                        this.openInquiry = true;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },

            refresh() {
                // this.inquiryStatus = [];
                // this.categories = [];
                // this.search = "";
                this.fillTable();
            },

            filterTable() {

                var items = this.allInquiries;
                if (this.inquiryStatus.length || this.categories.length) {
                    // filter for statuses only
                    var buff = this.inquiryStatus;
                    items = items.filter(function(inq) {
                        return (buff.length) ? buff.includes(inq.status) : true;
                    });

                    // filter for categories
                    buff = this.categories;
                    items = items.filter(function(inq) {
                        return (buff.length) ? buff.includes(inq.categories.trim()) : true;
                    });
                }
                this.tableItems = items;
            },

            removeFromCategories(item) {
                const index = this.categories.indexOf(item.name);
                if (index >= 0)
                    this.categories.splice(index, 1)
            },

    },

    created() {

        this.fillTable();
        inqEvntBs.onFormSubmitted(this.fillTable);

        // inqEvntBs.onClosed(this.fillTable);

        // $on('closed-submitted', () => {
        //   this.fillTable(false);
        // });

        // get categories for category select box
        this.$store.dispatch('cat/getCategories_a')
            .then((data) => {
                this.categoryItems = data;
                // console.log(this.categoryItems);
            })
            .catch((e) => {
                console.log('Error: ');
                console.log(e);
            });

    },

    watch: {

        inquiryStatus(nVal, oVal) {
                this.filterTable();
            },

            categories(nVal, oVal) {
                this.filterTable();
            },

            openInquiry(nVal) {

                // if (!nVal) {
                //     this.fillTable(false);
                // }
            },
    },

    computed: {
        openInquiry: {
            get() {
                return this.$store.state.byrInq.openInquiryView;
            },
            set(nVal){
                if(nVal)
                this.$store.commit('byrInq/SHOW_OPENINQUIRYVIEW_M');
                else
                this.$store.commit('byrInq/HIDE_OPENINQUIRYVIEW_M');
            },
        },

        inquiry: {
            get() {
                return this.$store.state.byrInq.inquiry;
            },
            set(nVal) {
                // console.log('setVal');
                // console.log(nVal);
                this.$store.commit('byrInq/UPDATE_INQUIRY_M',{inquiry:nVal});
            },
        },
    },

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


.btn-with-loading {
    color: #ffff;
}

</style>
