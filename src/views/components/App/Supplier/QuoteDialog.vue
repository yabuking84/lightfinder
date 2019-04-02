<template>
  <div class="text-xs-center">
    <v-dialog :value="openQuoteDialog" @input="$emit('update:openQuoteDialog', false)" @keydown.escape="keyPress" width="80%" scrollable>
      <v-card id="QuoteDialog">
        
        <!--   <v-card-title class="black white--text" height="20px">
          <h3 class="font-weight-light">{{ quoteAction }} Quote</h3>
        </v-card-title> -->

        <!-- #69779b blue-grey darken-4 -->
        <v-toolbar card color="blue-grey darken-4" dark height="50px">
          <v-toolbar-title> <span class="font-weight-bold">Add Quotation</span> </v-toolbar-title>
          <v-spacer></v-spacer>
          <h2 class="font-weight-bold">INQUIRY # <span class="font-weight-thin">{{ inquiry.id }}</span> </h2>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text style="max-height: 100%;">
          <!-- 
        <v-flex xs12 mb-3>
              <h2 class="font-weight-bold">INQUIRY # <span class="font-weight-thin">{{ inquiry.id }}</span> </h2>
               <v-divider></v-divider>
          </v-flex> 
      -->
          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="formData">
            <v-layout row wrap>
              <v-flex xs5>
                <v-container class="pt-2">
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-layout row wrap>
                        <v-flex xs12 mr-4 mb-3>
                          <h5 class="font-weight-thin">Keywords </h5>
                          <h4 class="font-weight-bold">
                            <p class="mb-0">{{ inquiry.keyword }}</p>
                          </h4>
                        </v-flex>
                        <v-flex xs12 mr-4 mb-3>
                          <h5 class="font-weight-thin">Category</h5>
                          <h4 class="font-weight-bold">
                            <span style="text-transform:uppercase;">{{ inquiry.categories.join(', ') }}</span>
                          </h4>
                        </v-flex>
                        <v-flex xs12 mr-4 mb-3>
                          <h5 class="font-weight-thin">Quantity</h5>
                          <h4 class="font-weight-bold">
                            <span>{{ inquiry.quantity }} pcs</span>
                          </h4>
                        </v-flex>
                        <v-flex xs12 mr-4 mb-3>
                          <h5 class="font-weight-thin">Message </h5>
                          <h4 class="font-weight-bold">
                            <p class="mb-0">{{ inquiry.message }}</p>
                          </h4>
                        </v-flex>
                        <v-flex xs12 mr-4 mb-3 class="attachments">
                          <h5 class="font-weight-thin">Attachments </h5>
                          <v-icon large>far fa-file-excel</v-icon>
                          <v-icon large>far fa-file-archive</v-icon>
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
                            <v-alert :value="!inquiry.specifications.length" type="info" style="width: 100%;" class="mt-4 ml-0" outline>
                              No specifications..
                            </v-alert>
                          </v-layout>
                        </v-flex>


                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
              <!--  -->
              <v-flex xs7 pa-2>
                <h4>Product Details</h4>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <!-- change to product code  -->
                        <v-text-field label="Product Code" v-model="formData.product_name">
                        </v-text-field>
                      </v-flex>
                      <!--    <v-flex xs12>
                        <v-textarea label="Product Details" v-model="formData.description">
                        </v-textarea>
                      </v-flex> -->
                      <v-flex xs4 pa-1>
                        <v-text-field label="Quantity" placeholder="0" readonly :value="inquiry.quantity" style="color: #000;" suffix="pcs">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4 pa-1>
                        <v-text-field label="Unit Price" v-model="formData.price" :error-messages="fieldErrors('formData.price')" @blur="$v.formData.price.$touch()" placeholder="0.00" type="number" min="0" step="0.01" prefix="$">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs4 pa-1>
                        <v-text-field label="Total Price" v-model="formData.total_price" placeholder="0.00" :error-messages="fieldErrors('formData.total_price')" @blur="$v.formData.total_price.$touch()" type="number" min="0" step="0.01" prefix="$">
                        </v-text-field>
                      </v-flex>
                      <!-- specification -->
                      <h4 class="mb-2">Product Specifications</h4>&nbsp&nbsp
                      <v-layout row wrap mb-3 v-show="inquiry.specifications.length">
                        <v-flex xs12>
                          <v-layout row wrap>
                            <v-flex xs4 v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index">
                              <v-text-field solo flat class="ml-1 pa-1 border-textfield" :v-model="specification.name" :prefix="specification.name == 'Beam Angle' ? 'Angle:' : specification.name  + ':'"></v-text-field>
                            </v-flex>
                            <v-alert :value="!inquiry.specifications.length" type="info" style="width: 100%;" class="mt-4 ml-0" outline>
                              No specifications..
                            </v-alert>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                      <h4 class="mb-2">Product Sample Details</h4>&nbsp&nbsp
                      <small>Note: for the developer this is required when the buyer put sample details on the inquiry: to be delete later</small>
                      <v-flex xs12>
                        <v-layout row wrap>
                          <v-flex xs5 mr-5>
                            <v-text-field label="Sample Cost" style="color: #000;" prefix="$" suffix="USD"> </v-text-field>
                          </v-flex>
                          <v-flex xs6 ml-3>
                            <v-text-field label="Sample Shipment Cost" style="color: #000;"> </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea label="Message" placeholder="Enter Remarks Here" v-model="formData.remarks">
                        </v-textarea>
                      </v-flex>
                      <v-flex xs12>
                        <h5 class="font-weight-thin mt-3">Attachments </h5>
                        <!-- <upload-file></upload-file> -->
                        <vue-dropzone id="dropzone" :options="dropzoneOptions" :useCustomSlot=true>
                          <div class="dropzone-custom-content">
                            <h3 class="dropzone-custom-title">Drag and drop to upload images or file</h3>
                            <div class="subtitle">...or click to select a file from your computer</div>
                          </div>
                        </vue-dropzone>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="">
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="loading" @click="submitForm()"> Submit </v-btn>


            <v-btn 
            @click="triggerTestEvent()">
                Trigger Create Inquiry Event
            </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import helpers from "@/mixins/helpers";
import UploadFile from "@/views/Components/App/UploadFile";
import inqEvntBs from "@/bus/inquiry";

import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import vue2Dropzone from 'vue2-dropzone'

import { required, email, maxLength, requiredIf, requiredUnless } from 'vuelidate/lib/validators'
import validationMixin from '@/mixins/validationMixin'

export default {
mixins: [
  helpers,
  validationMixin
],


validations: {
  formData: {
    price: { required },
    total_price: { required },
  }
},
validationMessages: {
  formData: {
    price: { required: 'Please enter a price.' },
    total_price: { required: 'Please enter a total price.' }
  }
},


components: {
  UploadFile,
  vueDropzone: vue2Dropzone
},



props: {
  openQuoteDialog: {
    type: Boolean,
    default: false,
  },
  inquiry: {
    type: Object,
  },
  bid: {
    type: Object,
  },
  editQuote: {
    type: Boolean,
  },
},



data: () => ({
  loading: false,
  formData: {
    // price: 11.11,
    // total_price: 7777.56,
    // product_name: "Super LED Industrial",
    // remarks: "Nice light",
    // description: "Last multiple years!",
    price: null,
    total_price: null,
    product_name: null,
    remarks: null,
    description: null,
  },
  quoteAction: "Add",
  initBid: {
    price: null,
    total_price: null,
    product_name: null,
    remarks: null,
    description: null,
  },
  /* DROPZONE FOR AWS 3*/
  dropzoneOptions: {
    url: 'https://httpbin.org/post',
    thumbnailWidth: 200,
    maxFilesize: 0.5,
    headers: { "My-Awesome-Header": "header value" },
    addRemoveLinks: true,
    dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME"
  }
  /* DROPZONE FOR AWS 3*/
}),






methods: {
    submitForm() {
        var formData = {
          "price": this.formData.price,
          "total_price": this.formData.total_price,
          "product_name": this.formData.product_name,
          "remarks": this.formData.remarks,
          "description": 'test data',
        };
        var action = "";
        var data = {};
        if (this.editQuote) {
          action = 'spplrInq/editInquiryBid_a';
          data = {
            formData: formData,
            inq_id: this.inquiry.id,
            bid_ref: this.bid.reference,
          }
        } else {
          action = 'spplrInq/addInquiryBid_a';
          data = {
            formData: formData,
            inq_id: this.inquiry.id,
          }
        }
        if (this.$v.$invalid) {
             this.$v.$touch()
        } else {
        	this.loading = true;
          this.$store.dispatch(action, data)
            .then((response) => {
                this.loading = false;
                this.$socket.emit('supplierNewQuoteCreated', {inq_id:this.inquiry.id});
                inqEvntBs.emitBidFormSubmitted();
                this.$emit('update:openQuoteDialog', false);
            }).catch((e) => {
                this.loading = false;
                console.log('Error: ' + e);
                alert("ERROR!!");
            }).finally(() => {
                this.loading = false;
            });
        }
        // alert("action = "+action);
        // alert("this.editQuote = "+this.editQuote);
        // alert("this.inquiry.id = "+this.inquiry.id);
        // alert("this.bid.reference = "+this.bid.reference);
    },
    
    resetForm() {
        this.formData = this.initBid;
    },

    keyPress(e) {
    if (e.target.querySelector("#QuoteDialog"))
        this.$emit('update:openQuoteDialog', false)
        // console.log(e.target);
    },


    triggerTestEvent() {
        this.$socket.emit('supplierNewQuoteCreated', {inq_id:this.inquiry.id});        
    },


},




mounted() {

},



watch: {
    editQuote(nVal, oVal) {
        if (nVal) {
            this.quoteAction = "Edit";
            this.formData = this.bid;
        } else {
            this.quoteAction = "Add";
            this.formData = this.initBid;
        }
    },
    // when openQuoteDialog set as false, editQuote will be set to false also
    openQuoteDialog(nVal, oVal) {
        if (!nVal)
        this.$emit('update:editQuote', false);
    },
},


}

</script>
<style lang="scss">
.border-textfield .v-input__slot {
  border: 1px solid black;
  margin-bottom: -17px;
}

</style>
<style scoped lang="scss">
.dropzone-custom-content {
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}

.subtitle {
  color: #314b5f;
}

.specifications {
  .v-chip {
    width: 210px;
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
