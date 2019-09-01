<template>
  <div>
    <v-layout row wrap>
      <v-spacer></v-spacer>
      <div>
        <v-btn @click="openDialog()" class="font-weight-light" dark color="grey darken-4"><i class="fas fa-user-plus white--text"></i>&nbsp Add Supplier </v-btn>
      </div>
    </v-layout>
    <v-card>
      <v-toolbar dark color="grey darken-4">
        <h1 class="font-weight-light title">Supplier</h1>
        <v-spacer></v-spacer>
        <v-btn icon @click="refresh()">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- component  -->
      <div class="mt-4">
        <v-flex xs3 offset-xs9 mr-2 ml3>
          <v-text-field label="Search" v-model="search" placeholder="Search" prepend-inner-icon="search" solo clearable>
          </v-text-field>
        </v-flex>
        <v-divider></v-divider>

        <v-data-table :headers="headers" :items="dataItems" :loading="loading" :search="search">
          <template slot="items" slot-scope="props">
            <tr class="th-heading">
              <td>
                <v-checkbox v-model="props.item.select" :inq-id="props.item.id" primary hide-details></v-checkbox>
              </td>
              <td class="font-weight-medium">
                <v-avatar size="40px">
                  <img v-if="props.item.avatar" :src="props.item.avatar" alt="Avatar">
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
                <v-btn @click="editSupplier(props.item.id)" small class="red darken-1 font-weight-light">
                  <i class="fas fa-edit white--text"></i>
                  <span class="ml-1 white--text font-weight-light ">Edit</span>
                </v-btn>
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
    <!-- supplier dialog -->
    <supplier-dialog :dialog.sync="dialog" :supplierCategories="supplierCategories" :supplierData="supplierData" :supplier_id.sync="supplier_id" :is_new.sync="is_new"> </supplier-dialog>
    <!-- supplier dialog -->
  </div>
</template>
<script>
import adminSupplierBus from "@/bus/admin-supplier"
// import helpers from "@/mixins/helpers"
import InquiryStatusButtons from "@/views/Components/App/InquiryStatusButtons"
import SupplierDialog from '@/views/Components/app/Admin/SupplierDialog'


export default {
  mixins: [
    // helpers,
  ],
  data: function() {
    return {

      search: '',
      dialog: false,
      loading: false,
      headers: [{
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
          align: 'center',
          sortable: false,
          width: '150'

        },
      ],

      dataItems: [],
      supplierData: null,
      supplierCategories: [],
      is_new: false,
      supplier_id: null

    }
  },

  components: {
    InquiryStatusButtons,
    SupplierDialog
  },
  methods: {


    fillTable() {

      this.loading = true;
      this.dataItems = [];
      this.$store.dispatch('admnSpplr/getAllSupplier_a')

        .then((response) => {

          console.log(response);

          for (var i = response.length - 1; i >= 0; i--) {

            var item = {};

            item.id = response[i].id;
            item.avatar = response[i].avatar;
            item.first_name = response[i].first_name;
            item.last_name = response[i].last_name;
            item.email = response[i].email;
            item.job_title = response[i].job_title;
            item.date_created = response[i].created_at;

            this.dataItems.push(item);
          }

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



    editSupplier(supplier_id) {

      let data = {
        id: supplier_id
      }

      this.$store.dispatch('admnSpplr/getSupplier_a', {
          data: data
        })
        .then((response) => {

          this.dialog = true
          this.supplierData = response
          this.supplier_id = supplier_id

          
          this.getSupplierCategories(supplier_id)

        })
        .catch((e) => {
          this.dialog = true
        })
        .finally(() => {
          this.dialog = true
        })

    },


    getSupplierCategories(supplier_id) {

      let data = {
        id: supplier_id
      }

      this.$store.dispatch('admnSpplr/getSupplierCat_a', {
          data: data
        })
        .then((response) => {
          this.supplierCategories = response
        })
        .catch((e) => {
          this.dialog = true
        })
        .finally(() => {
          this.dialog = true
        });

    },



    refresh() {

      this.fillTable();

    },


    openDialog() {
      this.dialog = true
      this.is_new = true
    }
  },

  created() {

    this.fillTable();

    // adminSupplierBus.$on('supplier-form-submitted', () => {
    //   this.fillTable();
    // });

  },
}

</script>
<!-- <style scoped lang="stylus">
.theme--light.v-table thead tr background:#000000;
color:#fff;
.fix-width width:198px;
.th-heading cursor: pointer;
.text-decoration-none text-decoration: none;
.th-heading a text-decoration:none;

</style>
 -->
