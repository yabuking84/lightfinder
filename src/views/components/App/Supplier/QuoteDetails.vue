<template>
    <div>

        <v-toolbar color="white darken-4" dark class="black--text" >

            <v-toolbar-title class="subheading font-weight-light" v-if="hasBid">
                Your Current Quote is <span class="font-weight-bold">${{ bid.total_price }} </span>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-title @click="bidDialog=true" class="subheading font-weight-light pa-2">

                    <v-btn v-if="hasBid && !inquiry.awarded" @click="openEditQuote()" class="font-weight-light" color="light-blue lighten-1" dark small >
                        <i class="fas fa-edit  white--text ma-2"> </i> Edit Quote
                    </v-btn>

                    <v-btn v-else-if="!inquiry.awarded" @click="openCreateQuote()" class="font-weight-light" color="green" dark small >
                        <i class="fas fa-plus  white--text ma-2"> </i> Create Quote
                    </v-btn>

            </v-toolbar-title>

        </v-toolbar>

        <!-- minh-500 -->
        <v-card class="" color=" lighten-5">

            <v-divider></v-divider>

            <v-container fluid grid-list-md>
                <v-layout row wrap>
                    <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                    <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                    <template v-if="hasBid">










                        <v-flex xs5>
                            <image-gallery-small></image-gallery-small>
                        </v-flex>
                        <v-flex xs7>
                             <v-flex xs12>
                                <h5 class="font-weight-thin">Product code</h5>
                                <h2>{{ bid.product_name }}</h2>
                            </v-flex>
                            <v-flex xs12>
                            
                                <v-layout row wrap>
                                    <v-flex xs4 pa-2>
                                        <h5 class="font-weight-thin">Quantity</h5>
                                        <h3>{{ inquiry.quantity }} pcs</h3>
                                    </v-flex>
                                    <v-flex xs4 pa-2>
                                        <h5 class="font-weight-thin">Unit Price</h5>
                                        <h3>${{ bid.price }}</h3>
                                    </v-flex>
                                    <v-flex xs4 pa-2>
                                        <h5 class="font-weight-thin">Total Price</h5>
                                        <h2>${{ bid.total_price }}</h2>
                                    </v-flex>

                                    <v-flex xs4 pa-2 v-show="bid.sample_cost">
                                        <h5 class="font-weight-thin">Sample Quantity</h5>
                                        <h2>${{ bid.sample_cost }}</h2>
                                    </v-flex>

                                    <v-flex xs4 pa-2 v-if="bid.sample_shipment_cost">
                                        <h5 class="font-weight-thin">Sample Shipping Cost</h5>
                                        <h2>${{ bid.sample_shipment_cost }}</h2>
                                    </v-flex>

                                </v-layout>
                            </v-flex>
                            <v-flex xs12>
                                <h5 v-show="bid.remarks" class="font-weight-thin">Remarks</h5>
                                <h4 v-show="bid.remarks" class="font-weight-bold">
                                  <p>{{ bid.remarks }}</p>
                                </h4>
                                <h5 class="font-weight-thin">Specifications</h5>
                                <v-layout row wrap class="specifications">
                                    <v-flex xs12>
                                            <span v-for="(specification, index) in bid.specifications" :key="specification+'_'+index">
                                                  <v-chip label dark outline text-color="black" v-if="specification.value">
                                                      {{ specification.name }}: &nbsp;
                                                      <span class="font-weight-bold">
                                                        {{ specification.value.split(',').join(', ') }}
                                                      </span>
                                                  </v-chip>
                                            </span>
                                    </v-flex>
                                    <v-alert :value="!bid.specifications.length" type="info" style="width: 100%;" class="ma-4" outline>
                                        No specifications..
                                    </v-alert>
                                </v-layout>
                            </v-flex>
                        </v-flex>
                        <!-- message box -->
                    
                        <!-- message box -->
                    </template>

                    <v-flex xs12 v-if="!hasBid">

                        <v-layout justify-center row fill-height>

                                <v-flex xs12 mx-5 mt-2 mb-2>

                                     <v-layout row justify-center mx-5>  

                                          <v-flex xs2>

                                               <v-img src="https://image.flaticon.com/icons/svg/1283/1283305.svg" height="90px" contain></v-img>
                                               
                                          </v-flex>
                                          
                                          <v-flex xs10 mt-3>
                                                <div>
                                                    <div class="headline font-weight-bold darken-3" color="#BF4653">You have not quoted yet</div>
                                                    <div class="blue-grey--text" style="font-style: italic;">Be the one to quote this inquiry.</b>
                                                    </div>
                                                </div>
                                          </v-flex>

                                     </v-layout>

                            </v-flex> 

                        </v-layout>
                    </v-flex>


                        <!-- new -->
                        
                              <template v-if="inquiry.awarded && inquiry.awarded_to_me && inquiry.stage_id==1004">
                                           <v-flex xs12>

                                    <v-card class="pa-3">

                                                <v-alert
                                                  :value="true"
                                                  color="deep-orange"
                                                  icon="new_releases"
                                                >
                                                  Upon Confirming, Please make sure to include your Estimated Production Date and as well as the shipment cost.
                                                  
                                            </v-alert>

                                                <v-layout row wrap>

                                                    <v-flex xs4>
                                                        <h5 class="font-weight-thin">Shipping Method</h5>
                                                            <v-text-field 
                                                              :value="shipping_methods.filter(obj=>obj.id==inquiry.shipping_method_id)[0].name + ' Freight' "
                                                              placeholder=""
                                                              readonly>
                                                            </v-text-field>
                                                    </v-flex>

                                                    <v-flex xs4>
                                                        <h5 class="font-weight-thin">Estimated Production Date</h5>
                                                        <h4 class="font-weight-bold">
                                                        <!-- <h2 class="mb-0">                  
                                                        {{ getDateTime('mmm dd, yyyy',inquiry.desired_shipping_date) }}
                                                      </h2> -->
                                                        <v-menu 
                                                        v-model="calendar_menu" 
                                                        :close-on-content-click="false" 
                                                        :nudge-right="40" 
                                                        lazy 
                                                        transition="scale-transition"
                                                        offset-y full-width min-width="290px" class="">
                                                              <v-text-field   
                                                               v-model="formData.shipping_date" 
                                                              :error-messages="fieldErrors('formData.shipping_date')" 
                                                              @blur="$v.formData.shipping_date.$touch()"
                                                              slot="activator" 
                                                              label="Preferred Production Date" 
                                                              prepend-icon="event" 
                                                              readonly></v-text-field>
                                                              <v-date-picker 
                                                              v-model="formData.shipping_date" 
                                                              header-color="black" 
                                                              :min="minDate"
                                                               @input="calendar_menu = false">
                                                              </v-date-picker>
                                                        </v-menu>
                                                      </h4>
                                                    </v-flex>

                                                    <v-flex xs4>
                                                        <h5 class="font-weight-thin">Shipment Cost</h5>
                                                        <h4 class="font-weight-bold">
                                              
                                                          <v-text-field 
                                                          prefix="$"
                                                          placeholder=""
                                                          suffix="USD"
                                                          :error-messages="fieldErrors('formData.shipping_cost')" 
                                                          @blur="$v.formData.shipping_cost.$touch()" 
                                                          v-model="formData.shipping_cost" 
                                                          >
                                                          </v-text-field>
                                                 
                                                      </h4>
                                                    </v-flex>
                                                </v-layout>
                                           

                                            <v-flex xs12>
                                                

                                                <v-btn @click="confirmQuote()" large block dark color="green">
                                                    Confirm Order &nbsp
                                                    <!-- <i class="fas fa-thumbs-up"></i>  -->
                                                </v-btn>
                                            </v-flex>

                                    </v-card>
  </v-flex>  
                                      
                                        <!-- <v-flex xs6>
                                           <v-btn 
                                                @click=""
                                                block 
                                                class="red darken-2 font-weight-light ">
                                                <i class="fas fa-thumbs-down white--text"></i>
                                                <span class="ml-1 white--text font-weight-light ">Deny</span>
                                            </v-btn>
                                        </v-flex> -->
                              </template>

                        <!-- new -->


                    <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                    <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                </v-layout>
            </v-container>
        </v-card>

        <quote-dialog :openQuoteDialog.sync="openQuoteDialog" :editQuote.sync="editQuote" :inquiry="inquiry" :bid="bid"></quote-dialog>

    </div>
</template>
<script>


    import { required, email, maxLength } from 'vuelidate/lib/validators'
    import validationMixin from '@/mixins/validationMixin'

    import ImageGallerySmall from "@/views/Components/App/ImageGallerySmall"
    import InquiryDialog from "@/views/Components/App/Buyer/BuyerInquiryViewDialog"
    import QuoteDialog from "@/views/Components/App/Supplier/QuoteDialog"
    import inqEvntBs from "@/bus/inquiry";
    import config from "@/config/main";


    export default {

        props: ['inquiry'],

        mixins: [

            validationMixin

        ],

        validations: {

            formData: {

              shipping_date: { required },
              shipping_cost: { required }

            }

        },

        validationMessages: {

            formData: {

              shipping_date: { required: 'Please specified your "Estimated Production Date". ' },
              shipping_cost: { required: 'Please Include your Shipping Cost. ' },

            }

        },

        components: {
            InquiryDialog,
            QuoteDialog,
            ImageGallerySmall,
        },

        data: () => ({

            bidDialog: false,
            openQuoteDialog: false,
            bid: {
                price: null,
                total_price: null,
                product_name: null,
                remarks: null,
                description: null,
            },
            editButton: false,
            hasBid: false,
            bidAdded: false,
            editQuote: false,
            commentData: [],

            payment_methods: config.payment_methods,
            shipping_methods: config.shipping_methods,

            calendar_menu: false,
            minDate: null,

            formData: {
                shipping_date:null,
                shipping_cost:null,
                confirm: 1,

            },

        }),

        computed: {

        },

        methods: {
            reloadBid() {

                    this.$store.dispatch('spplrInq/getInquiryBid_a', {
                            inq_id: this.inquiry.id
                        })
                        .then((data) => {
                            this.bid = (data) ? data : null;

                            // console.log("this.bid");
                            // console.log(this.bid);

                            // check if  already has bid
                            this.hasBid = (this.bid) ? true : false;

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                },

                confirmQuote() {
                    // console.log("confirm");


                  if (this.$v.$invalid) {

                    this.$v.$touch()


                  } else {

                     this.$store.dispatch('spplrInq/confirmAward_a', {
                            inq_id: this.inquiry.id,
                            formData: this.formData,
                        })
                        .catch(error => {
                            console.log(error);
                        });

                        // this.$emit('update:openInquiry', false)
                        this.$store.commit('spplrInq/HIDE_OPENINQUIRYVIEW_M');
                  }

                },

                openEditQuote() {
                    this.openQuoteDialog = true;
                    this.editQuote = true;
                },

                openCreateQuote() {
                    this.openQuoteDialog = true;
                    this.editQuote = false;
                },
        },

        watch: {

            inquiry: {
                handler(nVal, oVal) {
                    this.reloadBid();
                },
                deep: true,
            },

        },

        created() {

            this.reloadBid();

            inqEvntBs.onBidFormSubmitted(() => {
                this.reloadBid();
            });

        },

    }
</script>
<style scoped lang="scss">
    .minh-500 {
        min-height: 300px;
        overflow-y: auto;
    }
    
    .specifications {
        .v-chip {
            width: 180px;
        }
    }
</style>