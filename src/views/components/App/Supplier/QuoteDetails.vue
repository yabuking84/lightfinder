<template>
  <div>
    <v-toolbar color="grey darken-4" class="white--text" height="50px">
      <v-toolbar-title class="subheading font-weight-light" v-if="hasBid">
        Your Current Quote is <span class="font-weight-bold">${{ bid.total_price }} </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="bidDialog=true" class="subheading font-weight-light pa-2">
        <v-btn v-if="hasBid && !inquiry.awarded" @click="openEditQuote()" class="font-weight-light" color="blue" dark small>
          <i class="fas fa-edit  white--text ma-2"> </i>
          Edit Quote
        </v-btn>
        <v-btn v-else-if="!inquiry.awarded" @click="openCreateQuote()" class="font-weight-light" color="green" dark small>
          <i class="fas fa-plus  white--text ma-2"> </i>
          Create Quote
        </v-btn>
      </v-toolbar-title>
    </v-toolbar>

    <v-card class="minh-500" color="grey lighten-5">
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
              <!--       <v-flex xs12 pt-0>
                  <h3 class="font-weight-regular">{{ bid.description }}</h3>
                </v-flex> -->
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
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <h5 class="font-weight-thin">Remarks</h5>
                <h4 class="font-weight-bold">
                  <p>{{ bid.remarks }}</p>
                </h4>
                <h5 class="font-weight-thin">Specifications</h5>
                <v-layout row wrap class="specifications">
                  <v-flex xs12>
                    <v-chip label dark outline text-color="black" v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index">
                      {{ specification.name }}: &nbsp;
                      <span class="font-weight-bold">
                        {{ specification.value.split(',').join(', ') }}
                      </span>
                    </v-chip>
                  </v-flex>
                  <v-alert :value="!inquiry.specifications.length" type="info" style="width: 100%;" class="ma-4" outline>
                    No specifications..
                  </v-alert>
                </v-layout>
              </v-flex>
            </v-flex>
            
            <!-- message box -->
				<comment-box> </comment-box>
            <!-- message box -->

          </template>
          <v-flex xs12 v-if="!hasBid">
            <v-alert :value="true" type="info" style="width: auto;" class="ma-4" outline>
              No Quote yet..
            </v-alert>
          </v-flex>
          <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
          <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
        </v-layout>
      </v-container>
    </v-card>
    <quote-dialog :openQuoteDialog.sync="openQuoteDialog" :editQuote.sync="editQuote" :inquiry="inquiry" :bid="bid"></quote-dialog>
  </div>
</template>
<script>
import ImageGallerySmall from "@/views/Components/App/ImageGallerySmall"
import CommentBox from "@/views/Components/App/CommentBox"
import InquiryDialog from "@/views/Components/App/Buyer/BuyerInquiryViewDialog"
import QuoteDialog from "@/views/Components/App/Supplier/QuoteDialog"
import inqEvntBs from "@/bus/inquiry";

export default {

  props: ['inquiry'],

  components: {
    InquiryDialog,
    QuoteDialog,
    ImageGallerySmall,
    CommentBox
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
  }),

  methods: {
    reloadBid() {
      this.$store.dispatch('spplrInq/getInquiryBid_a', { inq_id: this.inquiry.id })
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
    }

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
