<template>
   <v-dialog :value="openInquiry" @input="$emit('update:openInquiry', false)" width="90%" scrollable>
    <!-- <v-dialog :value="openInquiry" @input="$emit('update:openInquiry', false)" fullscreen scrollable> -->
    <v-card>
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
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="closeOpenInquiry()">
          close
        </v-btn>
      </v-card-actions>
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
