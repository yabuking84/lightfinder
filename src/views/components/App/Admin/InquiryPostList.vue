<template>
	<div>

    <v-toolbar color="grey
     darken-4" class="white--text" height="60px">
        <v-toolbar-title class="subheading font-weight-light">Bids</v-toolbar-title>
    </v-toolbar>

    <v-card color="grey lighten-5">

        <v-flex xs12 v-if="inquiry.stage_id == 1001">
            <v-alert :value="true" type="warning" style="width: auto;" class="ma-4" outline>
                Waiting for Verification
            </v-alert>
        </v-flex>

        <v-flex xs12 v-else-if="inquiry.stage_id == 1003">
        	
            <v-alert :value="true" type="error" style="width: auto;" class="ma-4" outline>
                Inquiry is Rejected
            </v-alert>


        </v-flex>

        <v-card-text v-else>

            <v-card class="mb-3" :hover="true" :class="checkIfawarded(bidItem.awarded) ? 'is_selected' : 'is_blur' " v-for="(bidItem, i) in bidItems" :key="'bidItem_'+i">
                <v-card-text>

                    <v-layout row wrap>

                        <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                        <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

                        <v-flex xs5>
                            <image-gallery-small no-thumbnails height="200px"></image-gallery-small>
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
                                <!-- </v-container> -->
                            </v-layout>
                        </v-flex>

                        <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                        <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->

                    </v-layout>

                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>

                    <h5 class="font-weight-light"> Date Bid: {{ getDateTime('mmm dd, yyyy hh:mm',bidItem.created_at)  }}</h5>
                    <v-spacer></v-spacer>
                    <!-- 
				   	 	     		<v-btn 
				   	 	     			:disabled="inquiry.awarded ? true : false"
				   	 	     			class="black" 
				   	 	     			@click="openAwardBid(bidItem)"> 
				   	 	     			<i class="fas fa-award white--text"></i>
				   	 	     			<span class="font-weight-light ml-1 white--text" >Award</span>
								    </v-btn> 
 -->
                    <!-- <v-btn class="orange darken-3" @click="dialog = true">
									    <i class="fas fa-tasks white--text"></i>
									    <span class="font-weight-light ml-1 white--text" >Request Sample</span>
								    </v-btn>  -->

                </v-card-actions>
            </v-card>

            <!-- <v-layout row wrap> -->
            <v-layout align-center justify-center row fill-height v-if="!bidItems.length">
                <v-flex xs12>
                    <v-alert :value="true" type="info" style="width: auto;" class="ma-4" outline>
                        No Quote yet..
                    </v-alert>
                </v-flex>
            </v-layout>
        </v-card-text>

    </v-card>

</div>
</template>

<script>

import ImageGallerySmall from "@/views/Components/App/ImageGallerySmall"
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


props: ['inquiry'],

data: function () {

	return {

		openAwardDialog: false,
		bidItems: [],
		hasBid: true,
		bidToAward: null,
		bidinquiry: null,
		has_awarded:true,
	

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
	// 	if(a.name < b.name) {
	// 		return < b
	// 	}
	// }

},

methods: {

	fillBidTable(){

		this.$store.dispatch('byrInq/getAllInquiryBids_a',{ inq_id: this.inquiry.id })

		.then(response=> {

			console.log(this.inquiry.id);

			this.bidItems = response;

			this.bidItems.sort((a,b)=>{
				// return b.total_price - a.total_price;
				return a.total_price - b.total_price;

			});

		})
		.catch(error=>{
            console.log(error);					
		});

	},

	// for the blurring
	checkIfawarded: function (awarded, btn) {

		let is_awarded = false;

		console.log(typeof awarded);
		console.log(typeof this.inquiry.awarded)

		if(this.inquiry.awarded == 1) {
				
			if(awarded == 1) {
				is_awarded = true;
			}

		} else {

			// trick here if its not awarded yet i will set it to true
			is_awarded = true;

		}

		return is_awarded;
	},

},

	created(){

		console.log(this.inquiry)

		this.fillBidTable();
		 inqEvntBs.$on('award-bid-form-submitted',()=>{
            this.fillBidTable();
            this.inquiry.awarded = 1
        });

	},

}
</script>



<style scoped lang="scss">
	.proposal-section {	
		max-height:80vh;
		overflow-y: auto;
	}

	.minh-400 {
		min-height: 400px;
	}

	.awarded {

		position: absolute;
		height: 50px;
		width: 50px;
		top:2px;
		right: 0px;

	}

	.is_blur {
		  opacity: 0.3;
  		  filter: alpha(opacity=70); /* For IE8 and earlier */
	}

	.is_selected {
		 opacity: 1;
  		 filter: alpha(opacity=70); /* For IE8 and earlier */
	}

</style>