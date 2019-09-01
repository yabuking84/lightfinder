<template>
    <div>
        <!-- <v-card class="minh-500" color="grey lighten-5"> -->
        <v-toolbar color="grey darken-4" class="white--text" height="55px">
            <!-- <v-toolbar-title class="subheading font-weight-light">Proposal List</v-toolbar-title> -->
            <v-toolbar-title class="subheading font-weight-light">Quotation List</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-card-text>

            
        <div v-for="bidItem in bidItems">
            <v-card class="mb-2 pa-2" :class="(bidItem.owned)?'md-green-500': ''">
                <v-layout row wrap class="pa-2">
                    <v-flex xs6>
                        <h3 class="text-xs-left ml-3">
		                  <span class="font-weight-light">Overall: </span>
		                  ${{ bidItem.total_price}}
		                </h3>
                    </v-flex>
                    <v-flex xs5>
                        <h3 class="font-weight-light text-xs-left ml-3">
		                  ${{ bidItem.price }} / piece
		                </h3>
                    </v-flex>
                    <v-flex xs1>
                        <v-icon v-if="bidItem.awarded" class="awarded orange--text">
                            fas fa-award
                        </v-icon>
                    </v-flex>
                </v-layout>
            </v-card>
        </div>

          <!--   <v-alert :value="!bidItems.length" type="info" style="width: auto;" class="ma-4" outline>
                No bids yet..
            </v-alert> -->


        <v-layout v-if="!bidItems.length" justify-center row fill-height>
                <v-flex xs12 mx-5>
                 	<v-layout row justify-center mx-5>  
                      	<v-flex xs12>
                            <!-- <v-img src="https://image.flaticon.com/icons/svg/1490/1490328.svg" height="90px" contain></v-img> -->
                            <h1 color="#BF4653" class="headline mt-2 text-xs-center font-weight-bold darken-4">
                            No bids yet..</h1>
                      	</v-flex>
                 	</v-layout>
            </v-flex> 
        </v-layout>





        </v-card-text>
        <!-- </v-card> -->
        <!-- <bid-dialog :bidDialog.sync="bidDialog"> </bid-dialog> -->
    </div>
</template>
<script>
    import InquiryDialog from "@/views/Components/App/Buyer/BuyerInquiryViewDialog"
    import BidDialog from "@/views/Components/App/Supplier/BidDialog"
    import inqEvntBs from "@/bus/inquiry";
    // import helpers from "@/mixins/helpers";

    import config from "@/config/main";


    export default {
        mixins: [
            // helpers,
        ],


        components: {
            InquiryDialog,
            BidDialog
        },

        props: {
            inquiry: {
                type: Object,
            },
            
        },

        data: () => ({
            bidDialog: false,
            bidItems: [],
            payment_methods: config.payment_methods,
            shipping_methods: config.shipping_methods,
            calendar_menu: false,
            minDate: null,


        }),

        methods: {

            fillBidTable() {

                    this.$store.dispatch('spplrInq/getAllInquiryBids_a', {
                            inq_id: this.inquiry.id
                        })
                        .then(response => {
                            // console.log(response);
                            this.bidItems = response;

                            this.bidItems.sort((a, b) => {
                                return a.total_price - b.total_price;
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        });

                },


                updateTime: function() {
                    setInterval(function() {
                        this.displayTime = moment().format()
                    }.bind(this), 1000);
                }

        },

        created() {
            this.fillBidTable();
            // inqEvntBs.onBidFormSubmitted(this.fillBidTable);

            // this.formData.shipping_date = null;
            this.minDate = this.getDateTime();

        },

        mounted() {

        },

        computed: {

            countries(){
                
                return config.countries;
            },
   

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
    .minh-500 {
        min-height: 300px;
        overflow-y: auto;
    }
</style>