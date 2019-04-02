<template>
<div>

<v-card>

    <v-toolbar dark color="grey darken-4">
        <v-btn-toggle multiple v-model="inquiryStatus">
            <span v-for="(status, index) in statuses" class="grey darken-4 pa-2">
              <v-btn flat value="left" :value="status.id" :title="status.name">
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
            <v-flex xs4>
                <v-text-field label="Search" v-model="search" placeholder="Search" prepend-inner-icon="search" solo clearable>
                </v-text-field>
            </v-flex>
        </v-layout>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination"  :headers="headers" :items="tableItems" :loading="loading" :search="search">
        <template slot="items" slot-scope="props">
            <tr class="th-heading">
                <td>
                <v-layout align-start justify-start column fill-height pt-3>
                    <v-checkbox v-model="props.item.select" :inq-id="props.item.inq_id" primary hide-details></v-checkbox>
                </v-layout>
                </td>

                <td class="text-xs-left font-weight-medium">
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

                <td class="text-xs-left">
                <v-layout align-start justify-start column fill-height pt-3>
                    {{ props.item.quantity }}
                </v-layout>
                </td>

                <td class="text-xs-left">
                <v-layout align-start justify-start column fill-height pt-3>
                    <div class="dateCellWidth">
                        {{ getDateTime('mmm dd, yyyy',props.item.shipping_date) }}
                    </div>
                </v-layout>
                </td>

                <td class="text-xs-left">
                <v-layout align-start justify-start column fill-height pt-3>
                    <div class="dateCellWidth">
                        {{ getDateTime('mmm dd, yyyy hh:mm', props.item.created_at ) }}
                    </div>
                </v-layout>
                </td>

                <td class="text-xs-left">
                <v-layout align-start justify-start column fill-height pt-0>
                    <inquiry-status-buttons :statuses="statuses" :status-id="props.item.status" />
                </v-layout>
                </td>

                <td class="text-xs-center">
                <v-layout align-start justify-start column fill-height pt-3>
                    <v-btn @click="viewInquiry(props.item.inq_id)" small class="grey darken-1 font-weight-light">
                        <i class="fas fa-eye white--text"></i>
                        <span class="ml-1 white--text font-weight-light ">View</span>
                    </v-btn>
                </v-layout>
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
import config from "@/config/main"

import VueTimers from 'vue-timers/mixin'

import InquiryView from "@/views/Components/App/admin/InquiryView";


export default {

  mixins: [
    helpers,
    VueTimers,

  ],
  data: function() {
    return {

      statuses: [
        ...config.inquiry_statuses.default,
        ...config.inquiry_statuses.buyers,
      ],
      search: '',
      dialog: false,
      loading: false,
      headers: [{
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

      openInquiry: false,
      inquiry: null,
      snackbar: true,
      rowsPerPageItems: [10, 15, 20, 30, 40],
      pagination: {
        rowsPerPage: 15
    },

    }
  },
  components: {

    InquiryStatusButtons,
    InquiryView

  },

  timers: [{
    name: 'InquiryTableTimer',
    time: config.polling.inquiryTable.time,
    repeat: true,
    autostart: false,
    callback: function() {
      this.fillTable(false);
    },
  }],


  methods: {

    fillTable(withLoading = true) {

      this.loading = withLoading;

      this.allInquiries = [];
      this.$store.dispatch('admnInq/getAllInquiries_a')
        .then((response) => {

          for (var i = response.length - 1; i >= 0; i--) {
            var item = {};
            item.inq_id = response[i].id;
            item.keywords = this.ucwords(response[i].keyword);
            item.message = response[i].message;
            item.keywordsMessage = response[i].keyword + " " + response[i].message;
            item.categories = response[i].categories.join(', ');
            item.quantity = response[i].quantity;
            item.shipping_date = response[i].desired_shipping_date;
            item.created_at = response[i].created_at;
            item.status = response[i].stage_id;
            item.inquiry = response[i];
            item.loading = false;
            this.allInquiries.push(item);
          }

          this.filterTable();

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
        var isBuff = this.inquiryStatus;
        items = items.filter(function(inq) {
          return (isBuff.length) ? isBuff.includes(inq.status) : true;
        });

        // filter for categories
        isBuff = this.categories;

        function callBackCat(inq) {
          return (isBuff.length) ? isBuff.includes(inq.categories.trim()) : true;
        };
        items = items.filter(callBackCat);
      }

      this.tableItems = items;

    },


    removeFromCategories(item) {
      const index = this.categories.indexOf(item.name);
      if (index >= 0)
        this.categories.splice(index, 1)
    },

    viewInquiry(inq_id) {

      this.$store.dispatch('admnInq/getInquiry_a', { inq_id: inq_id })

        .then((response) => {

          this.inquiry = response
          this.openInquiry = true
        })
        .catch((error) => {
          

        })
    }
  },


  created() {

    this.fillTable();

    inqEvntBs.$on('approved-submitted', () => {

      this.fillTable();

    });


    // get categories for category select box
    this.$store.dispatch('cat/getCategories_a')
      .then((data) => {
        this.categoryItems = data;
        // console.log(this.categoryItems);
      })
      .catch((e) => {
        console.log('Error: ');
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

      // if (nVal)
      //   this.$timer.stop('InquiryTableTimer');
      // else
      //   this.$timer.start('InquiryTableTimer');
    },


  }

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

</style>


<style scoped lang="scss">
.theme--light.v-table thead tr {
  background: #000000;
  color: #fff;
}

.fix-width {
  width: 198px;
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


.dateCellWidth {
  min-width: 110px;
}

table.v-table tbody td,
table.v-table tbody th {
  vertical-align: top;
}

.hey {
  color: red;
  background-color: red;
}

</style>
