<template>
  
  <v-dialog 
  :value="openInquiry" 
  @input="$emit('update:openInquiry', false)" 
  @keydown.escape="keyPress"
  fullscreen
  >
    <!-- <v-dialog :value="openInquiry" @input="$emit('update:openInquiry', false)" fullscreen scrollable> -->
    <v-card id="InquiryView">

        <v-toolbar dark color="primary">         
            <v-toolbar-title v-if="inquiry">Inquiry # {{ inquiry.id }} </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click="closeOpenInquiry()">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>


        <v-container fluid grid-list-xl>
          <v-layout row wrap>

            <!-- inquiry details card -->
            <v-flex xs5>
              <inquiry-details-card v-if="inquiry" :isClosed.sync="isClosed" :openInquiry="openInquiry" :inquiry="inquiry"> </inquiry-details-card>
            </v-flex>
            <!-- end of detils  -->

            <!-- supplier quote / bids -->
            <v-flex xs7>
              <inquiry-post-list v-if="inquiry" :inquiry="inquiry"> </inquiry-post-list>
            </v-flex>
            <!-- supplier quote -->

          </v-layout>
        </v-container>
      
    </v-card>
  </v-dialog>
</template>
<script>
import InquiryPostList from "@/views/Components/App/Admin/InquiryPostList"
import InquiryDetailsCard from "@/views/Components/App/Admin/InquiryDetailsCard"

import inqEvntBs from "@/bus/inquiry";

export default {

  components: {

    InquiryPostList,
    InquiryDetailsCard,

  },


  data: () => ({

    title: 'Inquiry Details',
    icon: null,
    isClosed: false,

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
            return this.$store.state.admnInq.openInquiryView;
        },
        set(nVal){
            if(nVal)
            this.$store.commit('admnInq/SHOW_OPENINQUIRYVIEW_M');
            else
            this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');
        },
    },

    inquiry: {
        get() {
            return this.$store.state.admnInq.inquiry;
        },
        set(nVal) {
            // console.log('setVal');
            // console.log(nVal);
            this.$store.commit('admnInq/UPDATE_INQUIRY_M',{inquiry:nVal});
        },
    },       



  },

    methods: {

        closeOpenInquiry() {
            this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');
        },

        keyPress(e){

            if(e.target.querySelector("#InquiryView"))
            this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');
            
            // console.log(e.target);

        },
    },

  created() {

  },

  watch: { 

    isClosed: {

      handler(nVal, oVal) {

        if (nVal) {
            this.isClosed = false
            this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');
        }

      },

      deep: true
    }

  },






}

</script>
<style scoped lang="scss">
.scopedcontainer a {
  text-decoration: none;
}

</style>
