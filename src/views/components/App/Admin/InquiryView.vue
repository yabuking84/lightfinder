<template>
  <v-dialog 
  :value="openInquiry" 
  @input="$emit('update:openInquiry', false)" 
  @keydown.escape="keyPress"
  fullscreen
  scrollable>
    <!-- <v-dialog :value="openInquiry" @input="$emit('update:openInquiry', false)" fullscreen scrollable> -->
    <v-card id="InquiryView">

        <v-toolbar dark color="primary">         
            <v-toolbar-title>Inquiry # {{ inquiry.id }} </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark flat @click="closeOpenInquiry()">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>


      <v-card-text>
        <v-container fluid grid-list-xl>
          <v-layout row wrap>
            <!-- inquiry details card -->
            <v-flex xs5>
              <inquiry-details-card :isClosed.sync="isClosed" :openInquiry="openInquiry" :inquiry="inquiry"> </inquiry-details-card>
            </v-flex>
            <!-- end of detils  -->
            <!-- supplier quote / bids -->
            <v-flex xs7>
              <inquiry-post-list :inquiry="inquiry"> </inquiry-post-list>
            </v-flex>
            <!-- supplier quote -->
          </v-layout>
        </v-container>
      </v-card-text>
      
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="closeOpenInquiry()">
          close
        </v-btn>
      </v-card-actions> -->

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

  props: ['inquiry', 'openInquiry'],

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
  },

    methods: {

        closeOpenInquiry() {
          this.$emit('update:openInquiry', false);
        },

        keyPress(e){

            if(e.target.querySelector("#InquiryView"))
            this.$emit('update:openInquiry', false)
            
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
          this.$emit('update:openInquiry', false);
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
