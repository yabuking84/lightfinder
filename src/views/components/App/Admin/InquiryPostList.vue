<template>

    <div>

        <v-toolbar color="grey darken-4" class="white--text" height="60px">
            <v-toolbar-title class="subheading font-weight-light">Bids</v-toolbar-title>
        </v-toolbar>

        <v-card color="grey lighten-5">

            <v-flex xs12 v-if="inquiry.stage_id == 1001">

                <v-layout justify-center row fill-height>

                    <v-flex xs12 mx-5 mt-3 mb-3>


                           <!--  <v-flex xs2>
                                <v-img src="https://image.flaticon.com/icons/svg/148/148855.svg" height="90px" contain></v-img>
                            </v-flex> -->

                                <div>
                                    <div class="headline font-weight-bold orange--text darken-3">WAITING FOR VERIFICATION</div>
                                    <div class="blue-grey--text" >We have already received your inquiry, please wait for a moment for reviewing the inquiry. our staff is given care of it! chow ..
                                    </div>
                                </div>


                    </v-flex>

                </v-layout>

                <v-layout row wrap pa-0 v-if="inquiry.stage_id == 1001">
                    <v-flex xs6>
                        <v-btn @click="approvedInquiry(inquiry.id)" block class="green darken-1 large font-weight-light ">
                            <i class="fas fa-thumbs-up white--text"></i>
                            <span class="ml-1 white--text font-weight-light ">Approved</span>
                        </v-btn>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn @click="rejectInquiry(inquiry.id)" block class="red darken-2 large font-weight-light ">
                            <i class="fas fa-thumbs-down white--text"></i>
                            <span class="ml-1 white--text font-weight-light ">Reject</span>
                        </v-btn>
                    </v-flex>
                </v-layout>

            </v-flex>

            <v-flex xs12 v-else-if="inquiry.stage_id == 1003">

                <v-layout row wrap>

                        <v-flex xs12 mx-5 mt-3 >


                                    <div>
                                        <div class="headline font-weight-bold red--text darken-3">REJECTED INQUIRY</div>
                                        <div class="blue-grey--text" style="font-style: italic;">the INQUIRY <b>#{{ inquiry.id }}</b> is decline by our verifier, please refer on the message box if you have concerns. thanks!
                                        </div>
                                    </div>


                        </v-flex>


                            <v-flex xs12 mx-5>
                                <v-btn @click="approvedInquiry(inquiry.id)" block class="grey darken-4 large font-weight-light ">
                                    <span class="ml-1 white--text font-weight-light ">Approved</span>
                                </v-btn>
                            </v-flex>

                    <v-flex xs12>
                        <v-layout row wrap>                         

                            <!-- if rejected -->
                            <v-flex xs12>
                                <messaging :inquiry="inquiry"> </messaging>
                            </v-flex>

                        </v-layout>
                        <!-- <comment-box :commentData="commentData" :biditem="inquiry.id"> </comment-box> -->
                    </v-flex>

                </v-layout>
            </v-flex>

            <v-card-text v-else>

                <v-layout justify-center row fill-height v-if="!bidItems.length">

                    <v-flex xs12 mx-5 mt-3 mb-3>

                                <div>
                                    <div class="headline font-weight-bold darken-3" color="#BF4653">NO QUOTE FOR NOW!</div>
                                    <div class="blue-grey--text">INQUIRY <b>#{{ inquiry.id }}</b>
                                    </div>

                                </div>

                    </v-flex>

                </v-layout>
            
                <v-card v-else class="mb-3" :hover="true" :class="checkIfawarded(bidItem.awarded) ? 'is_selected' : 'is_blur' " v-for="(bidItem, i) in bidItems" :key="'bidItem_'+i">
    
                    <v-card-text>
						
						<div>
							<v-btn v-if="bidItem.active == 0" @click="approvedBid(bidItem)" large flat block class="grey darken-4">
		                            <span class="ml-1 white--text font-weight-bold">Approved bid</span>
		                            <i class="ml-1 white--text font-weight-light  far fa-check-circle white--text"></i>
		                    </v-btn>	
						</div>
						 
                    
                        <v-layout row wrap>

                            <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                            <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

                            <v-flex xs5>
                                    <image-gallery-small :images="bidItem.attachments" noThumbnails height="120px"></image-gallery-small> 
                            </v-flex>

                            <v-flex xs7>


                                <v-layout row wrap>

                            <!--         <pre>
								{{ bidItem }}
							</pre> -->

                                    <!-- <v-container> -->

                                    <v-flex xs12 pl-2>

                                        <h5 class="font-weight-thin">Brand Name</h5>
                                        <h2>{{ bidItem.supplier.brand_name }}</h2>

                                    </v-flex>

                                    <v-flex xs12 pl-2>

                                        <h5 class="font-weight-thin">Owner name</h5>
                                        <h2>{{ bidItem.supplier.first_name }} {{ bidItem.supplier.last_name }}</h2>

                                    </v-flex>

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

                                    <!-- </v-container> -->
                                </v-layout>
                            </v-flex>

                            <v-flex xs12 mx-5 mt-2 mb-2 pt-0>
                                <h5 class="font-weight-thin">Specifications</h5>
                                <v-layout row wrap class="specifications">
                                    <v-chip label dark outline text-color="black" v-for="(specification, index) in bidItem.specifications" :key="specification+'_'+index">
                                        {{ specification.name }}: &nbsp;
                                        <span class="font-weight-bold">
                                            <!-- {{ specification.value.split(',').join(', ') }} -->
                                            {{ (specification.value)?specification.value.split(',').join(', '):'' }}
                                        </span>
                                    </v-chip>
                                    <v-alert :value="!inquiry.specifications.length" type="warning" style="width: 100%;" class="ma-4" outline>
                                        No specifications..
                                    </v-alert>
                                </v-layout>
                            </v-flex>

                            <v-flex xs12>
                                <!-- <v-divider></v-divider> -->                                
                                <!-- <comment-box :commentData="commentData" :biditem="inquiry.id"> </comment-box> -->
                                <messaging :bid="bidItem"> </messaging>
                            </v-flex>

                            <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                            <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                        </v-layout>
                    </v-card-text>

                    <v-card-actions>
                        <h5 class="font-weight-light"> Date Bid: {{ getDateTime('mmm dd, yyyy hh:mm',bidItem.created_at)  }}</h5>
                        <v-spacer></v-spacer>
                    </v-card-actions>

                </v-card>

            </v-card-text>


        </v-card>

        <message-box :commentData="commentData" :openMessageDialog.sync="openMessageDialog" :inquiry="inquiry"> </message-box>

    </div>

</template>

<script>
    // import ImageGallerySmall from "@/views/Components/App/ImageGallerySmall"
    import ImageGallerySmall from "@/views/Components/App/ImageGallery"


    import MessageBox from '@/views/Components/App/Admin/MessageDialog'

    // import CommentBox from "@/views/Components/App/CommentBox"
    import Messaging from "@/views/Components/App/MessagingBox"

    import helpers from "@/mixins/helpers";
    import inqEvntBs from "@/bus/inquiry"

    import config from "@/config/main"
    import VueTimers from 'vue-timers/mixin'

    export default {

        mixins: [

            helpers,
            VueTimers,

        ],

        components: {

            ImageGallerySmall,
            Messaging,
            MessageBox

        },

        // timers: [     
        //        { 
        //            name: 'InquiryTableTimer',
        //            time: config.polling.inquiryTable.time, 
        //            repeat: true,
        //            autostart: true,
        //            callback: function(){
        //                this.fillBidTable();
        //            },
        //        }
        //    ],

        props: ['inquiry', 'isClosed'],

        timers: [{
            name: 'InquiryTableTimer',
            time: config.polling.inquiryTable.time,
            repeat: true,
            autostart: false,
            callback: function() {
                this.fillBidTable();
            },
        }],

        data() {

            return {

                openAwardDialog: false,
                bidItems: [],
                hasBid: true,
                bidToAward: null,
                bidinquiry: null,
                has_awarded: true,
                commentData: [],
                openMessageDialog: false,
                bidImages:[],

            }

        },

        watch: {

            inquiry: {

                handler(nVal, oVal) {

                        this.fillBidTable();

                    },

                    deep: true,

            }

        },

        computed: {

            // sortArray: function() {
            //  if(a.name < b.name) {
            //      return < b
            //  }
            // }

        },

        methods: {

            fillBidTable() {

                    this.$store.dispatch('admnInq/getAllInquiryBids_a', {
                        inq_id: this.inquiry.id
                    })

                    .then(response => {

                        // console.log(this.inquiry.id);

                        this.bidItems = response;


                        this.bidItems.sort((a, b) => {
                            // return b.total_price - a.total_price;
                            return a.total_price - b.total_price;

                        });

                        // console.log(this.inquiry.id);

                    })

                },

                approvedInquiry(inquiry_id) {

                    this.$store.dispatch('admnInq/approvedInquiry_a', {
                            inquiry_id: inquiry_id
                        })
                        .then((response) => {

                            // create a event bus 
                            // this.$emit('update:isClosed', true);
                              this.$store.commit('admnInq/HIDE_OPENINQUIRYVIEW_M');

                            inqEvntBs.emitApproved();

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

                    // console.log('--------------tae-----------------')
                    // this.openMessageDialog = true
                    // console.log('--------------tae-----------------')

                    console.log(inquiry_id);

                    this.$store.dispatch('admnInq/declinedInquiry_a', {
                            inquiry_id: inquiry_id
                        })
                        .then((response) => {
                            // create a event bus 
                            this.openMessageDialog = true
                                // this.$emit('update:isClosed', true);
                            inqEvntBs.emitApproved();

                        })
                        .catch((e) => {
                            this.$emit('update:isClosed', true);
                            console.log(e);
                        })
                        .finally(() => {

                        });

                },


                approvedBid(bidItem) {

                	 this.$store.dispatch('admnInq/approvedBid_a', {
                            inquiry_id: this.inquiry.id,
                            bid_id: bidItem.id
                        })
                        .then((response) => {

                        	console.log(response)
                        	bidItem.active = 1

                            // create a event bus 
                            // this.openMessageDialog = true
                                // this.$emit('update:isClosed', true);
                            // inqEvntBs.emitApproved();

                        })
                        .catch((e) => {
                            this.$emit('update:isClosed', true);
                            console.log(e);
                        })
                        .finally(() => {

                        });

                },

                // for the blurring
                checkIfawarded: function(awarded, btn) {

                    let is_awarded = false;

                    // console.log(this.inquiry)

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


                sortImage: function(attachments) {
                	console.log(attachments);
                },

        },

        created() {

            // console.log(this.inquiry)

            this.fillBidTable();
            inqEvntBs.$on('award-bid-form-submitted', () => {
                this.fillBidTable();
                this.inquiry.awarded = 1
            });

        },

    }
</script>

<style scoped lang="scss">
    .specifications {
        .v-chip {
            width: 180px;
        }
    }
    
    .proposal-section {
        max-height: 80vh;
        overflow-y: auto;
    }
    
    .minh-400 {
        min-height: 400px;
    }
    
    .awarded {
        position: absolute;
        height: 50px;
        width: 50px;
        top: 2px;
        right: 0px;
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