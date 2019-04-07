<template>
<div class="text-xs-center">
<v-dialog 
  :value="openInquiry" 
  @keydown.escape="keyPress"
  fullscreen
  transition="dialog-bottom-transition"
  >

    <v-card id="InquiryView">
        <!-- <v-card-title class="headline grey lighten-2" primary-title>
            Privacy Policy
        </v-card-title> -->
        <v-toolbar dark color="grey darken-4 ">
           <h2 v-if="inquiry" class="font-weight-bold">INQUIRY # {{ inquiry.id }}</h2> 
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="closeOpenInquiry()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <!-- <v-card-text> -->
          <div class="scopedcontainer">
            <v-container fluid grid-list-xl>
              <v-layout row wrap>
                <!-- Inquiry Details  -->
                <v-flex xs5>
                  <inquiry-details-card v-if="inquiry" :inquiry="inquiry"> </inquiry-details-card>
                </v-flex>
                <!-- Inquiry Details  -->
                <!-- supplier QuoteDetails -->
                <v-flex xs7>
                  <quote-details v-if="inquiry" :inquiry="inquiry"> </quote-details>
                </v-flex>
                <!-- supplier QuoteDetails -->
                <!-- proposal list -->
                <!-- <v-flex xs4>
                  <inquiry-post-list v-if="inquiry" :openInquiry="openInquiry" :inquiry="inquiry"> </inquiry-post-list>
                </v-flex> -->
                <!-- proposal list -->
              </v-layout>
            </v-container>
          </div>
        <!-- </v-card-text> -->
        <!-- <v-card-actions >
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="closeOpenInquiry()">
                close
            </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import QuoteDetails from "@/views/Components/App/Supplier/QuoteDetails"
import InquiryPostList from "@/views/Components/App/Supplier/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Supplier/InquiryDetailsCard"
import BidDialog from "@/views/Components/App/Supplier/BidDialog"

import inqEvntBs from "@/bus/inquiry";

export default {


  components: {

    QuoteDetails,
    InquiryPostList,
    InquiryDetailsCard,
    BidDialog,

  },


  // props: {
  //  inq_id: {
  //    type: String,
  //  },
  // },

  data: () => ({

    title: 'Inquiry Details',
    icon: null,
    bidDialog: false,
    bids: false,

  }),

  computed: {

    buyer: {

      set(data) {
        this.$store.commit('auth/CHANGE_TEST_M', data);
      },

      get() {
        return this.$store.state.auth.auth_user.name;
      },
    },

      openInquiry: {

          get() {
              return this.$store.state.spplrInq.openInquiryView;
          },
          set(nVal){
              console.log('computed openInquiry');
              if(nVal)
              this.$store.commit('spplrInq/SHOW_OPENINQUIRYVIEW_M');
              else
              this.$store.commit('spplrInq/HIDE_OPENINQUIRYVIEW_M');
          },

      },

      inquiry: {
          get() {
              return this.$store.state.spplrInq.inquiry;
          },
          set(nVal) {
              // console.log('setVal');
              // console.log(nVal);
              this.$store.commit('spplrInq/UPDATE_INQUIRY_M',{inquiry:nVal});
          },
      },

  },

  methods: {

    closeOpenInquiry() {
      this.openInquiry = false
      inqEvntBs.EmitClosed()
    },

    keyPress(e) {

      if (e.target.querySelector("#InquiryView"))
      this.openInquiry = false

      // console.log(e.target);

    },
  },

  watch: {

  },

  created() {

  },

  mounted() {


  },

}

</script>
<style scoped lang="scss">
.scopedcontainer a {
  text-decoration: none;
}

</style>
