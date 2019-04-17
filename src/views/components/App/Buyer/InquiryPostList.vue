<template>
  <div>
    <v-toolbar color="grey darken-4" class="white--text">
      <v-toolbar-title class="subheading font-weight-light">Bids</v-toolbar-title>
    </v-toolbar>
    <v-card class="pa-3">
        
        <!-- <h1 class="font-weight-light subheading">Layout</h1> -->
  
      <!-- <v-divider></v-divider> -->

        <!-- waiting for verification -->
        <v-layout v-if="verified" align-center justify-center row fill-height>

           <!--          <v-flex xs2>
                        <v-img src="https://image.flaticon.com/icons/svg/148/148855.svg" height="90px" contain></v-img>  
                    </v-flex> -->
                    
                    <v-flex xs12 mx-5 mt-3 mb-3>
                         <div>
                            <div class="headline font-weight-bold orange--text darken-3">WAITING FOR VERIFICATION</div>
                            <div class="blue-grey--text">We have already received your inquiry, please wait for a moment for reviewing the inquiry. our staff is given care of it! chow ..
                            </div>
                        </div>  
                    </v-flex>


        </v-layout>
        
        <!-- rejected inquiry -->
        <v-layout v-else-if="rejected" align-center justify-center row wrap fill-height>
            

                     <!--      <v-flex xs2>
                               <v-img src="https://image.flaticon.com/icons/svg/1497/1497760.svg" height="90px" contain></v-img>
                          </v-flex> -->
                          
                          <v-flex xs12 mx-5 mt-3 mb-3>
                                <div>
                                    <div class="headline font-weight-bold red--text darken-3">REJECTED INQUIRY</div>
                                    <div class="blue-grey--text">Your INQUIRY <b>#{{ inquiry.id }}</b> is decline by our verifier, please refer on the message box if you have concerns. thanks!
                                    </div>
                                </div>

                              <v-layout row wrap justify>
                                  <v-btn flat block dark large class="red darken-2" @click="EditInquiry()">
                                        <span class="font-weight-bold ml-1 white--text">Edit Now</span>
                                    </v-btn>
                              </v-layout>
                          </v-flex>

                  <v-flex xs12>
                        <comment-box :commentData="commentData"> </comment-box>
                  </v-flex>
        </v-layout>

        <div v-else>


            <!-- <pre>{{ bidItems }}</pre> -->

            <v-layout align-center justify-center row fill-height v-if="!bidItems.length">

<!-- 
                            <v-flex xs2>
                                  <v-img src="https://image.flaticon.com/icons/svg/1283/1283305.svg" height="90px" contain></v-img>
                            </v-flex> -->
                            
                            <v-flex xs12 mx-5 mt-3 mb-3>
                                        <div>
                                          <div class="headline font-weight-bold error--text darken-3" color="#BF4653">NO QUOTE FOR NOW!</div>
                                          <div class="blue-grey--text" >
                                            Just Wait for While, quotation are coming. thanks
                                          </div>

                                      </div>
                            </v-flex>
            </v-layout>

            <v-card 
            v-else 
            class="mb-5 ma-3" 
            color="grey lighten-4" 
            :hover="true" 
            :class="checkIfawarded(bidItem.awarded) ? 'is_selected' : 'is_blur' " 
            v-for="(bidItem, i) in bidItems" 
            :key="'bidItem_'+i">
              
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

                                <v-flex xs12 pl-2>
                                    <h5 class="font-weight-thin">Product name</h5>
                                    <h2>{{ bidItem.product_name }}</h2>

                                    <v-img v-if="bidItem.awarded" src="/static/images/award.png" class="awarded">
                                    </v-img>

                                </v-flex>

                                <v-flex xs12 pt-0 pl-2>
                                    <h3 class="font-weight-regular">{{ bidItem.description }}</h3>
                                </v-flex>

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
                              <p class="mb-0">{{ bidItem.remarks }}</p>
                            </h4>
                                </v-flex>
                                <v-flex xs12>
                                <h5 class="font-weight-thin">Specifications </h5>
                                <v-layout row wrap class="specifications mt-2">
                                   
          
                                    <template v-for="(specification, index) in bidItem.specifications">

                                    <v-flex 
                                    v-if="specification.value"
                                    :key="specification+'_'+index"
                                    xs6 ma-0 pa-0 pr-0 pl-2>
                                        <div                                         
                                        text-color="black" 
                                        class="spec">
                                            {{ specification.name }}: &nbsp;
                                            <span class="font-weight-bold">
                                                {{ specification.value.split(',').join(', ') }}
                                            </span>
                                        </div>
                                    </v-flex>

                                    </template>


                                    <!-- <template v-for="">
                                    <v-flex xs6 ma-0 pa-0 pr-1>
                                        <div text-color="black" class="">
                                            Dimmable: &nbsp;
                                            <span class="font-weight-bold">
                                                TRIAC, 0-10v, DALI
                                            </span>
                                        </div>                                    
                                    </v-flex>
                                    </template> -->

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


                           <v-flex xs12><p></p>
                                      <v-layout row wrap>
                                          <v-flex xs6>
                                            <template v-if="!inquiry.awarded">                                                
                                              <v-btn flat block :disabled="(inquiry.awarded)?true:false" large class="green darken-2 " @click="openSample(bidItem)">
                                                  <i class="fas fa-lightbulb white--text "></i>
                                                  <span class="font-weight-bold ml-1 white--text ">Request Sample</span>
                                              </v-btn>
                                            </template>
                                          </v-flex>
                                          <v-flex xs6>
                                            <template v-if="!inquiry.awarded">                                                
                                              <v-btn flat block dark :disabled="(inquiry.awarded)?true:false" large class="blue-grey darken-2" @click="openAwardBid(bidItem)">
                                                  <i class="fas fa-award white--text"></i>
                                                  <span class="font-weight-bold ml-1 white--text">Award</span>
                                              </v-btn>
                                            </template>
                                          </v-flex>
                                      </v-layout>
                                  </v-flex>

                                  <v-flex xs12>
                                      <v-divider></v-divider>
                                      <!-- message box -->
                                      <comment-box :commentData="commentData" :biditem="bidItem.id"> </comment-box>
                                      <!-- message box -->
                                  </v-flex>
                    </v-layout>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <h5 class="font-weight-light"> Date Bid: {{ getDateTime('mmm dd, yyyy hh:mm',bidItem.created_at)  }}</h5>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>

        </div>

    </v-card>
    
    <inquiry-create v-if="inquiry" :isEdit.sync="isEdit" :dialog.sync="dialog" :inquiry="inquiry"> </inquiry-create>    
    <award-dialog v-if="bidToAward" :inquiry="inquiry" :openAwardDialog.sync="openAwardDialog" :bid="bidToAward"> </award-dialog>
    <request-sample-dialog v-if="bidToAward" :inquiry="inquiry" :openSampleDialog.sync="openSampleDialog" :bid="bidToAward"> </request-sample-dialog>

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
        verified : false,
        rejected : false,

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

            this.checkInquiryStatus();

            this.$store.dispatch('byrInq/getAllInquiryBids_a', {
                    inq_id: this.inquiry.id
             })
            .then(response => {
                

               this.bidItems = response;

               // console.log('============================================')
               // console.log(this.bidItems);
               // console.log('============================================')

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

             this.dialog=true 
             this.isEdit=true

        },

        checkInquiryStatus(){
            
            this.verified = (this.inquiry.stage_id == 1001)?true:false;
            this.rejected = (this.inquiry.stage_id == 1003)?true:false;

            console.log("this.inquiry.stage_id = "+this.inquiry.stage_id);
            console.log("this.verified = "+this.verified);
            console.log("this.rejected = "+this.rejected);

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

    computed: {

    },

    sockets:{

        supplierCreatedBid(){            
            console.log('Buyer InquiryPostList = supplierCreatedQuote');
            this.fillBidTable();
        },
        supplierModifiedBid(){
            console.log('Buyer InquiryPostList = supplierModifiedBid');
            this.fillBidTable();
        },
        adminApprovedInquiry(){
            console.log('Buyer InquiryPostList = adminApprovedInquiry');
            this.fillBidTable();            
        },
        buyerAwardedBid: function (data) {
            console.log('Buyer InquiryPostList = buyerAwardedQuote')
            this.fillBidTable();
        },
    },


     computed: {

            countries(){
                
                return config.countries;
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



</style>
