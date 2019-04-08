<template>
  <div>
    <v-toolbar color="grey darken-4" class="white--text" height="60px">
      <v-toolbar-title class="font-weight-thin body-2">Inquiry Details</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-thin body-2"> Posted on: {{ getDateTime('mmm dd, yyyy hh:mm',inquiry.created_at) }}</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-container>
     <!--    <v-layout row wrap pa-0 v-if="inquiry.stage_id == onVerification">
       <v-flex xs6>
         <v-btn @click="approvedInquiry(inquiry.id)" block class="green darken-1 font-weight-light ">
           <i class="fas fa-thumbs-up white--text"></i>
           <span class="ml-1 white--text font-weight-light ">Approved</span>
         </v-btn>
       </v-flex>
       <v-flex xs6>
         rejectInquiry(inquiry.id)
         <v-btn @click="rejectInquiry(inquiry.id)" block class="red darken-2 font-weight-light ">
           <i class="fas fa-thumbs-down white--text"></i>
           <span class="ml-1 white--text font-weight-light ">Reject</span>
         </v-btn>
       </v-flex>
     </v-layout> -->
        <v-layout row wrap>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex shrink>
                <h5 class="font-weight-thin">Keywords </h5>
                <h4 class="font-weight-bold">
                  <p class="mb-0">{{ inquiry.keyword }}</p>
                </h4>
              </v-flex>
              <v-flex shrink>
                <h5 class="font-weight-thin">Category</h5>
                <h4 class="font-weight-bold">
                  <span style="text-transform:uppercase;">{{ inquiry.categories.join(', ') }}</span>
                </h4>
              </v-flex>
              <v-flex shrink>
                <h5 class="font-weight-thin">Quantity</h5>
                <h4 class="font-weight-bold">
                  <span>{{ inquiry.quantity }} pcs</span>
                </h4> 
              </v-flex>
              <v-flex xs12>
                <h5 class="font-weight-thin">Message </h5>
                <h4 class="font-weight-bold">
                  <p class="mb-0">{{ inquiry.message }}</p>
                </h4>
              </v-flex>
              <v-flex xs12 class="attachments">
                <h5 class="font-weight-thin">Attachments </h5>
                <v-icon large>far fa-file-excel</v-icon>
                <v-icon large>far fa-file-archive</v-icon>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs12>
                <h5 class="font-weight-thin">Specifications</h5>
                <v-layout row wrap class="specifications">
                  <v-chip label dark outline text-color="black" v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index">
                    {{ specification.name }}: &nbsp;
                    <span class="font-weight-bold">
                      {{ specification.value.split(',').join(', ') }}
                    </span>
                  </v-chip>
                  <v-alert :value="!inquiry.specifications.length" type="warning" style="width: 100%;" class="ma-4" outline>
                    No specifications..
                  </v-alert>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
      <message-box :CommentData="CommentData" :openMessageDialog.sync="openMessageDialog" :inquiry="inquiry"> </message-box>
  </div>
</template>
<script>

import helpers from "@/mixins/helpers"
import inqEvntBs from "@/bus/inquiry"
import MessageBox from '@/views/Components/App/Admin/MessageDialog'

export default {

  mixins: [
    helpers,
  ],

    // 'inquiry',
    // 'openInquiry',
    // 'isClosed'

  props: {
    
    inquiry: {
      type: Object
    },

    openInquiry: {
      type:Boolean
    },

    isClosed: {
      type: Boolean
    }      

  },

  data: () => ({

    onVerification: 1001,
    openMessageDialog: false,
    CommentData: [],

  }),

  components: {
    MessageBox
  },

  methods: {

    // if query selected is set to true
    openMessageBox(inquiry_id) {

      this.$store.dispatch('admnInq/approvedInquiry_a', {
          inquiry_id: inquiry_id
        })
        .then((response) => {

          // create a event bus 
          // this.$emit('update:isClosed', true);
                          this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');

          // inqEvntBs.emitApproved();

        })
        .catch((e) => {
          console.log(e);
          // this.$emit('update:isClosed', true);
                          this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');


        })
        .finally(() => {
          // this.$emit('update:isClosed', true);
                          this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');

        });

    },


    rejectInquiry(inquiry_id) {

      this.$store.dispatch('admnInq/declinedInquiry_a', {
          inquiry_id: inquiry_id
        })
        .then((response) => {
          // create a event bus 
          // this.$emit('update:isClosed', true);
                                    this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');


          // inqEvntBs.emitApproved();
        })
        .catch((e) => {
          // this.$emit('update:isClosed', true);
                                    this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');

          console.log(e);
        })
        .finally(() => {

        });

    }

  },

}

</script>
<style scoped lang="scss">
.specifications {
  .v-chip {
    width: 220px;
  }
}

.attachments {
  .v-icon {
    width: 50px;
    margin-right: 15px;
    margin-top: 15px;
    font-size: 60px !important;
    cursor: pointer;
  }
}

</style>
