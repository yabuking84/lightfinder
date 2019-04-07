<template>
  <div>
    <v-toolbar color="grey darken-4" class="white--text">
      <v-toolbar-title class="subheading font-weight-light">Bids</v-toolbar-title>
    </v-toolbar>
    <v-card>
        
        <!-- <h1 class="font-weight-light subheading">Layout</h1> -->
  
      <v-divider></v-divider>

    <v-card color="grey lighten-5">

        <template v-if="!loading">
        <v-card 
        class="mb-3" 
        style="cursor: default;" 
        :hover="true" 
        :class="checkIfawarded(bidItem.awarded) ? 'is_selected' : 'is_blur' " 
        v-for="(bidItem, i) in bidItems" :key="'bidItem_'+i">
              <v-card-text>
                  <v-layout row wrap>
                      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                      <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                      <v-flex xs5>
                          <image-gallery-small no-thumbnails height="310px"></image-gallery-small>
                      </v-flex>
        <!-- waiting for verification -->
        <v-layout v-if="inquiry.stage_id == 1001" align-center justify-center row fill-height>
                      
                          <v-flex xs12 mx-5 mt-3 mb-3>

                               <v-layout row justify-center mx-5>  

                                    <v-flex xs2>
                                        <v-img src="https://image.flaticon.com/icons/svg/148/148855.svg" height="90px" contain></v-img>  
                                    </v-flex>
                                    
                                    <v-flex xs10>
                                         <div>
                                            <div class="headline font-weight-bold orange--text darken-3">WAITING FOR VERIFICATION</div>
                                            <div class="blue-grey--text" style="font-style: italic;">We have already received your inquiry, please wait for a moment for reviewing the inquiry. our staff is given care of it! chow ..
                                            </div>
                                        </div>  
                                    </v-flex>

                               </v-layout>

                          </v-flex> 
        </v-layout>
        
        <!-- rejected inquiry -->
        <v-layout v-else-if="inquiry.stage_id == 1003" align-center justify-center row wrap fill-height>
            

                <v-flex xs12 mx-5 mt-3 mb-3>


    </v-card>
    
    <inquiry-create :isEdit.sync="isEdit" :dialog.sync="dialog" :inquiry="bidinquiry"> </inquiry-create>
    <award-dialog v-if="bidinquiry" :bidinquiry="bidinquiry" :openAwardDialog.sync="openAwardDialog" :bid="bidToAward"> </award-dialog>
    <request-sample-dialog v-if="bidinquiry" :bidinquiry="bidinquiry" :openSampleDialog.sync="openSampleDialog" :bid="bidToAward"> </request-sample-dialog>

  </div>
</template>
<script>

import ImageGallerySmall from "@/views/Components/App/ImageGallerySmall"
import InquiryCreate from "@/views/Components/App/Buyer/InquiryCreate"

import AwardDialog from "@/views/Components/App/Buyer/AwardDialog"
import RequestSampleDialog from "@/views/Components/App/Buyer/RequestSampleDialog"

import CommentBox from "@/views/Components/App/Buyer/InquiryPostListCommentBox"

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

    ImageGallerySmall,
    AwardDialog,
    RequestSampleDialog,
    CommentBox,
    InquiryCreate

  },

  props: {

    inquiry: {

      type: Object

    },

    openInquiry: {
        type: Boolean
  
    }

  },
    

    data: ()=>({

        openAwardDialog: false,
        openSampleDialog: false,
        bidItems: [],
        hasBid: true,
        bidToAward: null,
        bidToRequestSample: null,
        has_awarded: true,
        isEdit:false,
        dialog:false,
        // comment Data composed of the comment useridid and inquiry
        commentData: [

            // {
            //     id: 1,
            //     user_id: 1,fillBidTable 
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
  

  methods: {

        fillBidTable() {


            this.$store.dispatch('byrInq/getAllInquiryBids_a', {
                    inq_id: this.inquiry.id
             })
            .then(response => {
          
               this.bidItems = response;

               console.log('============================================')
               console.log(this.bidItems);
               console.log('============================================')

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
            this.openAwardDialog = true;
        },

        openSample(bid) {
            this.bidToAward = bid;
            this.bidToRequestSample = bid;
            this.openSampleDialog = true
        },

        // for the blurring
        checkIfawarded: function(awarded, btn) {

            let is_awarded = false;

            // console.log(typeof awarded);
            // console.log(typeof this.inquiry.awarded)
            if (this.inquiry.awarded == 1) {
                if (awarded == 1)
                is_awarded = true;
            } else {
                // trick here if its not awarded yet i will set it to true
                is_awarded = true;
            }

            return is_awarded;
        },

        EditInquiry() {

             this.bidinquiry = this.inquiry;
             this.dialog=true 
             this.isEdit=true

         }

    },

    sockets: {
        buyerAwardedQuote: function (data) {
            console.log('buyerAwardedQuote')
            this.fillBidTable();
        },
    },

    created() {

        this.fillBidTable();
        inqEvntBs.$on('award-bid-form-submitted', () => {
            this.fillBidTable();
            $emit('update:inquiry.awarded', 1)
        });
        
    },

      watch: {

          inquiry: {

              handler(nVal, oVal) {
                      this.fillBidTable();
              },

              deep: true,

          },

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
