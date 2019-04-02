<template>
  <div>
    <v-toolbar color="grey darken-4" class="white--text" height="50px">
      <v-toolbar-title class="subheading font-weight-light">Bids</v-toolbar-title>
    </v-toolbar>
    <v-card color="grey lighten-5">
          <v-card class="mb-3" style="cursor: default;" :hover="true" :class="checkIfawarded(bidItem.awarded) ? 'is_selected' : 'is_blur' " v-for="(bidItem, i) in bidItems" :key="'bidItem_'+i">
              <v-card-text>
                  <v-layout row wrap>
                      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                      <v-flex xs5>
                          <image-gallery-small no-thumbnails height="310px"></image-gallery-small>
                      </v-flex>

                      <v-flex xs7>
                          <v-layout row wrap>
                              <!-- <v-container> -->

                              <!-- <h5 class="font-weight-light text-xs-right"> Date Bid: {{ getDateTime('mmm dd, yyyy hh:mm',bidItem.created_at) }}</h5> -->

                              <v-flex xs12 pl-2>
                                  <h5 class="font-weight-thin">Product name</h5>
                                  <v-spacer></v-spacer>

                                  <h2>{{ bidItem.product_name }}</h2>

                                  <!--
                                      <v-img
                                    v-if="bidItem.awarded"
                                      src="/static/images/award.png"
                                      class="awarded">
                                      </v-img> 
                                    -->
                                  <v-icon v-if="bidItem.awarded" class="awarded orange--text">
                                      fas fa-award
                                  </v-icon>
                              </v-flex>
                              <!--         <v-flex xs12 pt-0 pl-2>
                              <h3 class="font-weight-regular">{{ bidItem.description }}</h3>
                            </v-flex> -->
                              <v-flex xs12>
                                  <v-layout row wrap>
                                      <v-flex xs4 pa-2>
                                          <h5 class="font-weight-thin">Quantity</h5>
                                          <h3>{{ inquiry.quantity }} pcs</h3>
                                      </v-flex>
                                      <v-flex xs4 pa-2>
                                          <h5 class="font-weight-thin">Unit Price</h5>
                                          <h3>${{ bidItem.price }}</h3>
                                      </v-flex>
                                      <v-flex xs4 pa-2>
                                          <h5 class="font-weight-thin">Total Price</h5>
                                          <h2>${{ bidItem.total_price }}</h2>
                                      </v-flex>
                                  </v-layout>
                              </v-flex>
                              <v-flex xs12 pt-0>
                                  <h5 class="font-weight-thin">Remarks</h5>
                                  <h4>
                                <p class="mb-0" style="white-space: pre-line;">{{ bidItem.remarks }}</p>
                              </h4>
                              </v-flex>
                              <v-flex xs12>
                                  <h5 class="font-weight-thin">Specifications</h5>
                                  <v-layout row wrap class="specifications">
                                      <v-chip label dark outline text-color="black" v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index">
                                          {{ specification.name }}: &nbsp;
                                          <span class="font-weight-bold">
                                  {{ specification.value.split(',').join(', ') }}
                                </span>
                                      </v-chip>
                                      <v-alert :value="!inquiry.specifications.length" type="info" style="width: 100%;" class="ma-4" outline>
                                          No specifications..
                                      </v-alert>
                                  </v-layout>
                              </v-flex>

                              <!-- </v-container> -->
                          </v-layout>

                      </v-flex>

                      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

                      <v-flex xs12>
                          <!-- <h5 class="font-weight-light"> Date Bid: {{ getDateTime('mmm dd, yyyy hh:mm',bidItem.created_at) }}</h5> -->
                          <v-layout row wrap>
                              <v-flex xs6>
                                  <v-btn flat block :disabled="inquiry.awarded ? true : false" large class="red darken-2 " @click="openSample(bidItem)">
                                      <i class="fas fa-lightbulb white--text "></i>
                                      <span class="font-weight-bold ml-1 white--text ">Request Sample</span>
                                  </v-btn>
                              </v-flex>
                              <v-flex xs6>
                                  <v-btn flat block dark :disabled="inquiry.awarded ? true : false" large class="green darken-2" @click="openAwardBid(bidItem)">
                                      <i class="fas fa-award white--text"></i>
                                      <span class="font-weight-bold ml-1 white--text">Award</span>
                                  </v-btn>
                              </v-flex>
                          </v-layout>
                      </v-flex>

                      <v-flex xs12>

                          <v-divider></v-divider>
                          <!-- message box -->
                            <comment-box :commentData="commentData"  :biditem="bidItem.id"> </comment-box>
                          <!-- message box -->
                      </v-flex>

                  </v-layout>
              </v-card-text>

          </v-card>
<!-- <v-layout row wrap> -->
<v-layout align-center justify-center row fill-height v-if="!bidItems.length">
    <v-flex xs12>
        <v-alert :value="true" type="info" style="width: auto;" class="ma-4" outline>
            No Quote yet..
        </v-alert>
    </v-flex>
</v-layout>


    </v-card>
    <!-- <inquiry-confirm v-if="bidinquiry" :bidinquiry="bidinquiry" :openAwardDialog.sync="openAwardDialog" :bid="bidToAward"> </inquiry-confirm> -->
    <award-dialog v-if="bidinquiry" :bidinquiry="bidinquiry" :openAwardDialog.sync="openAwardDialog" :bid="bidToAward"> </award-dialog>
    <request-sample-dialog v-if="bidinquiry" :bidinquiry="bidinquiry" :openSampleDialog.sync="openSampleDialog" :bid="bidToAward"> </request-sample-dialog>

  </div>
</template>


<script>
  
import ImageGallerySmall from "@/views/Components/App/ImageGallerySmall"
    // 
import InquiryConfirm from "@/views/Components/App/Buyer/InquiryConfirm"

import AwardDialog from "@/views/Components/App/Buyer/AwardDialog"
import RequestSampleDialog from "@/views/Components/App/Buyer/RequestSampleDialog"

import CommentBox from "@/views/Components/App/CommentBox"

import helpers from "@/mixins/helpers"
import inqEvntBs from "@/bus/inquiry"

import VueTimers from 'vue-timers/mixin'
import config from "@/config/main"

export default {

    mixins: [
        helpers,
        VueTimers,
    ],

    components: {

        InquiryConfirm,
        ImageGallerySmall,
        AwardDialog,
        RequestSampleDialog,
        CommentBox

    },

    props: ['inquiry', 'openInquiry'],

    data: ()=>({
        openAwardDialog: false,
        openSampleDialog: false,
        bidItems: [],
        hasBid: true,
        bidToAward: null,
        bidinquiry: null,
        has_awarded: true,

        // comment Data composed of the comment useridid and inquiry
        commentData: [

            // {
            //     id: 1,
            //     user_id: 1,
            //     name: 'Jonh Doe',
            //     message: 'Original Branded LED chips with high luminous flux density creats less glare, low heat resistance and stable light output.',

            // },

        ],

    }),

    timers: [{
        name: 'BidTableTimer',
        time: config.polling.bidTable.time,
        immediate: true,
        repeat: true,
        autostart: false,
        callback: function() {
            console.log("BidTableTimer");
            this.fillBidTable();
        },
    }],

  

    computed: {

    },

    methods: {

        fillBidTable() {

            this.$store.dispatch('byrInq/getAllInquiryBids_a', {
                    inq_id: this.inquiry.id
                })
                .then(response => {

                    // console.log(this.inquiry.id);

                    this.bidItems = response;

                    this.bidItems.sort((a, b) => {
                        // return b.total_price - a.total_price;
                        return a.total_price - b.total_price;

                    });

                })
                .catch(error => {
                    console.log(error);
                });

        },

        openAwardBid(bid) {

            this.bidToAward = bid;
            this.bidinquiry = this.inquiry;
            this.openAwardDialog = true;

        },

        openSample(bid) {
            this.bidToAward = bid;
            this.bidinquiry = this.inquiry
            this.openSampleDialog = true
        },

        // for the blurring
        checkIfawarded: function(awarded, btn) {

            let is_awarded = false;

            // console.log(typeof awarded);
            // console.log(typeof this.inquiry.awarded)

            if (this.inquiry.awarded == 1) {

                if (awarded == 1) {
                    is_awarded = true;
                }

            } else {
                // trick here if its not awarded yet i will set it to true
                is_awarded = true;
            }

            return is_awarded;
        },

    },

    created() {

        // console.log(this.inquiry)

        this.fillBidTable();
        inqEvntBs.$on('award-bid-form-submitted', () => {
            this.fillBidTable();
            this.inquiry.awarded = 1
        });

        this.fillBidTable();
        inqEvntBs.$on('award-bid-form-submitted', () => {
          this.fillBidTable();
          this.inquiry.awarded = 1
        });
    },

}
</script>
<style scoped lang="scss">
.proposal-section {
  max-height: 80vh;
  overflow-y: auto;
}

.minh-400 {
  min-height: 400px;
}

.awarded {

  // position: absolute;
  // height: 50px;
  // width: 50px;
  // top:10px;
  // right: 5px;
  // font-size: 50px;

  position: absolute;
  height: 50px;
  width: 50px;
  top: 0px;
  right: 1px;
  font-size: 30px;

}

.is_blur {
  opacity: 0.3;
  filter: alpha(opacity=70);
  /* For IE8 and earlier */
}

.is_selected {
  opacity: 1;
  filter: alpha(opacity=70);
  /* For IE8 and earlier */
}

.specifications {
  .v-chip {
    width: 180px;
  }
}

</style>
