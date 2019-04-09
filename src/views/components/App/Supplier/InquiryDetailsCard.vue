<template>
    <div>
        <v-toolbar color="white darken-4" class="black--text" >
            <!-- <router-link :to="{ name: 'SupplierHome' }" style="text-decoration: none;">
                <v-btn class="blue-grey" small style="min-width: 50px;">
                    <i class="fas fa-arrow-left white--text"></i>
                </v-btn>
            </router-link> -->
            <v-toolbar-title class="subheading font-weight-light">Inquiry Details</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="body-2 font-weight-light"> Posted: <i> {{ getDateTime('mmm dd, yyyy hh:mm',inquiry.created_at) }} </i> </v-toolbar-title>
        </v-toolbar>

        <v-card>

            <v-divider></v-divider>

            <v-container fluid>
                <v-layout row wrap>
                    <v-flex xs12>
                      
                 <!--      <pre>
                      <h4>{{ inquiry }}</h4>
                      </pre>
 -->
                        <v-layout row wrap>

                            <v-flex xs4>
                                <h5 class="font-weight-thin">Keywords </h5>
                                <h4 class="font-weight-bold">
                                  <p class="mb-0">{{ inquiry.keyword }}</p>
                                </h4>
                            </v-flex>
                            <v-flex xs4>
                                <h5 class="font-weight-thin">Category</h5>
                                <h4 class="font-weight-bold">
                                  <span style="text-transform:uppercase;">{{ inquiry.categories.join(', ') }}</span>
                                </h4>
                            </v-flex>
                           
                            <v-flex xs4>
                                <h5 class="font-weight-thin">Quantity</h5>
                                <h4 class="font-weight-bold">
                                <span>{{ inquiry.quantity }} pcs</span>
                              </h4>
                            </v-flex>
                            

                            <!-- shipping address -->
                            
                            <v-flex xs12 v-show="inquiry.shipping_country_id">
                                <h5 class="font-weight-thin">Shipping Address</h5>
                                <h4 class="font-weight-bold">
                                  <span>{{ inquiry.shipping_country_id }} </span>
                                  <span>{{ inquiry.shipping_address }} </span>
                                  <span>{{ inquiry.shipping_city }} </span>
                                  <span>{{ inquiry.shipping_postal }} </span>
                                </h4>
                            </v-flex>

                            <!-- shipping address -->

        

                       <!-- sample orders -->
                            <v-flex xs6 v-show="inquiry.sample_quantity">
                                <h5 class="font-weight-thin">Sample Orders Quantity</h5>
                                <h4 class="font-weight-bold">
                                <span>{{ inquiry.sample_quantity }} </span>
                               </h4>

                               <h5 class="font-weight-thin">Sample Shipping Address</h5>
                                <small></small>
                                <h4 class="font-weight-bold">
                                   <span>{{ inquiry.sample_shipping_country_id }} </span>
                                   <span>{{ inquiry.sample_shipping_address }}</span>
                                </h4>
                                <h4>
                                   <span>{{ inquiry.sample_shipping_city }} </span>
                                   <span>{{ inquiry.sample_shipping_postal }} </span>
                                </h4>
                            </v-flex>

                       <!-- sample orders -->

                       <!-- oem -->

                           <v-flex xs6 v-show="inquiry.oem">
                                <h5 class="font-weight-thin">Original Equipment Manufacture</h5>
                                <h4 class="font-weight-bold">
                                   What kind of Original Equipment Manufacture
                                </h4>
                                <h5>{{ inquiry.oem_service }}</h5>
                                <h4 class="font-weight-bold">
                                   Description
                                </h4>
                                <h5>{{ inquiry.oem_description }}</h5>
                            </v-flex>

                       <!-- oem -->

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
                </v-layout>
                <v-flex xs12>
                    <v-layout row wrap>
                        <!-- specification -->
                        <v-flex xs12>
                            <h5 class="font-weight-thin">Specifications</h5>
                            <v-layout row wrap class="specifications">
                               
                                 <span v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index"> 
                                    <v-chip label dark outline text-color="black" v-if="specification.value" >
                                           {{ specification.name }}: &nbsp;
                                       <span class="font-weight-bold">
                                          {{ specification.value.split(',').join(', ') }}
                                       </span>
                                      </v-chip>
                                  </span>
                                <v-alert :value="!inquiry.specifications.length" type="info" style="width: 100%;" class="ma-4" outline>
                                    No specifications..
                                </v-alert>
                            </v-layout>
                        </v-flex>
                        
                    </v-layout>
                </v-flex>
            </v-container>
      
            <v-flex xs12 mt-2>
                <inquiry-post-list v-if="inquiry" :openInquiry="openInquiry" :inquiry="inquiry"> </inquiry-post-list>
            </v-flex>
        </v-card>
    </div>
</template>
<script>

    import helpers from "@/mixins/helpers";
    import inqEvntBs from "@/bus/inquiry";
    import InquiryPostList from "@/views/Components/App/Supplier/InquiryPostList"

    export default {
        mixins: [
            helpers,
        ],

        components: {
            InquiryPostList
        },

        props: [
            'inquiry',
            'openInquiry'
        ],

        data: () => ({}),

        methods: {

        },

        watch: {

        },

        created() {
            // console.log(this.inquiry);
        },

    }
</script>
<style scoped lang="scss">
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