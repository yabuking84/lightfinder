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
                                  <span>{{ getCountryName(inquiry.shipping_country_id) }} </span>
                                  <span>{{ inquiry.shipping_address }} </span>
                                  <span>{{ inquiry.shipping_city }} </span>
                                  <span>{{ inquiry.shipping_postal }} </span>
                                </h4>
                            </v-flex>
                            <!-- shipping address -->

                       <!-- sample orders -->
                            <v-flex xs12 v-show="inquiry.sample_quantity">
                                <h5 class="font-weight-thin">Sample Orders Quantity</h5>
                                <h4 class="font-weight-bold">
                                <span>{{ inquiry.sample_quantity }} </span>
                               </h4>

                               <h5 class="font-weight-thin">Sample Order Shipping Address</h5>
                                <small></small>
                                <h4 class="font-weight-bold">
                                   <span>{{ getCountryName(inquiry.sample_shipping_country_id) }} </span>
                                   <span>{{ inquiry.sample_shipping_address }}</span>
                                </h4>
                                <h4>
                                   <span>{{ inquiry.sample_shipping_city }} </span>
                                   <span>{{ inquiry.sample_shipping_postal }} </span>
                                </h4>
                            </v-flex>

                       <!-- sample orders -->

                       <!-- oem -->

                           <v-flex xs12 v-show="inquiry.oem">

                                <h5 class="font-weight-thin">Original Equipment Manufacture</h5>
                                <h4 class="font-weight-bold">
                                   What kind of Original Equipment Manufacture
                                </h4>
                                <h5>{{ inquiry.oem_service }}</h5>
                                <h4 class="font-weight-bold">
                                   Description
                                </h4>
                                <h5>{{ inquiry.oem_description }}</h5>
                                
                                <h4>Attachments</h4>

                                  <v-layout row wrap v-if="inquiry.attachments.length" class="attachments">
                                                
                                            <!-- display only here the attachment and images from thre inquiry -->
                                            <v-flex xs4 lg4 v-for="(attachment, index) in inquiry.attachments" :key="attachment+'_'+index">

                                                <div v-if="attachment.filegroup == 'add-inquiry-oems' ">
                                                        
                                                    <div v-if="attachment.filetype === 'image/jpeg' || attachment.filetype === 'image/png' ">

                                                       <a :href="attachment.location">

                                                             <v-img
                                                               :src="attachment.location"
                                                               aspect-ratio="1"
                                                               class="grey lighten-2"
                                                               >
                                                             </v-img>

                                                       </a>

                                                   </div>
                                                  
                                                   <!-- other file pdf -->
                                                  
                                                   <div v-else-if="attachment.filetype">
                                                     <a :href="attachment.location">
                                                        <v-icon color="red" large>fas fa-file-pdf</v-icon>
                                                     </a>
                                                   </div>

                                                </div>

                                            </v-flex>
                                            
                                      </v-layout>

                            </v-flex>

                       <!-- oem -->

                            <v-flex xs12>
                                <h5 class="font-weight-thin">Message </h5>
                                <h4 class="font-weight-bold">
                                  <p class="mb-0">{{ inquiry.message }}</p>
                                </h4>
                            </v-flex>

                            <v-flex xs12 class="attachments">
                                
                             <!--        <pre>
                                    {{ inquiry.attachments }}
                                    </pre>
 -->
                                    <v-layout row wrap v-if="inquiry.attachments.length" class="attachments">

                                           <h5 class="font-weight-thin">Attachments </h5>
                                                
                                            <v-flex xs4 v-for="(attachment, index) in inquiry.attachments" :key="attachment+'_'+index">

                                                <div v-if="attachment.filegroup == 'add-inquiry-attachments' ">
                                                       
                                                       <v-flex xs12>
                                                             <a :href="attachment.location">
                                                                <v-icon color="red" large>fas fa-file-pdf</v-icon>
                                                             </a>    
                                                       </v-flex>

                                                </div>

                                            </v-flex>
                                            

                                            <!-- ------------------------------------- IMAGES ----------------------------------------------------- -->

                                             <h5 class="font-weight-thin">Images </h5>
                                            
                                            <div v-if="inquiryImage.length">
                                                
                                                <v-flex xs4 v-for="(images, index) in inquiryImages" :key="images+'_'+index">

                                                    <div v-if="images.filegroup == 'add-inquiry-images' ">
                                                        <v-flex xs12>
                                                               <v-img
                                                                   :src="images.location"
                                                                   aspect-ratio="1"
                                                                   class="grey lighten-2"
                                                                   >
                                                              </v-img>
                                                        </v-flex>
                                                    </div>

                                                </v-flex>

                                            </div>

                                            <div v-else>
                                                No Image Attach
                                            </div>
                                            
                                      </v-layout>


































                           <!--          <v-layout row wrap v-if="inquiry.attachments.length">
                                                
                                                <v-flex xs4 v-for="(attachment, index) in inquiry.attachments" :key="attachment+'_'+index">
                                                     <div v-if="inquiry.attachments.find( attachments => attachments.filegroup == 'add-inquiry-attachments')">
                                                            <a :href="attachment.location" class="fileIcon">
                                                                 <v-icon color="red" large>fas fa-file-pdf</v-icon>
                                                            </a>
                                                      </div>
                                                </v-flex>
                                        
                                    </v-layout>
 -->
                                    
                                          <!-- <v-layout row wrap v-if="inquiry.attachments.length"> -->

                                            <!--     <pre>
                                                    {{ inquiry.attachments }}
                                               </pre> -->

                                     <!--        <v-layout row wrap>
                                           
                                                   <v-container grid-list-md>
                                                       <v-flex xs12>
                                                           
                                                           <template>
                                                               <image-gallery-small no-thumbnails height="200px"></image-gallery-small>                                                              
                                                           </template>
                                                           
                                                       </v-flex>
                                                   </v-container>
                                           
                                           </v-layout> -->
                                        
                                            <!-- display only here the attachment and images from thre inquiry -->

                                            <!-- <v-flex xs4 lg v-for="(attachment, index) in inquiry.attachments" :key="attachment+'_'+index"> -->
                                            <!-- </v-flex> -->
                                            
                                          <!-- </v-layout> -->
<!-- 

                                          <v-layout v-else row wrap>
                                                <v-flex xs12 >
                                                  <h4 class="red--text">No Attachments</h4>
                                                </v-flex>
                                          </v-layout> -->



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


    import ImageGallerySmall from "@/views/Components/App/ImageGallery"

    import helpers from "@/mixins/helpers";
    import inqEvntBs from "@/bus/inquiry";
    import InquiryPostList from "@/views/Components/App/Supplier/InquiryPostList"

    import config from '@/config/index'

    export default {
        mixins: [
            helpers,
        ],

        components: {
            InquiryPostList,
            ImageGallerySmall
        },

        props: [
            'inquiry',
            'openInquiry'
        ],

        data: () => ({

            inquiryImages:[],
            inquiryAttachments:[],
            inquiryOEM:[],

        }),

        methods: {

            getCountryName(country_id) {

                  var countryselect = this.countries.filter(country => {
                      return country.id == country_id;
                  });
                  return (countryselect.length)?countryselect[0].name:null;

            },


            // for attactments data

            getImagesfromInquiry() {


            },


            getAttachmentfromInquiry() {


            },

            getOEMfromInquiry() {


            },
            

        },

        watch: {

        },

        computed: {

            countries(){
                
                return config.countries;
            },

        },

        created() {
            // console.log(this.inquiry);
            // this.getAttachments();
        },

    }
</script>
<style scoped lang="scss">

    .specifications {
        .v-chip {
            width: 210px;
        }
    }
    
    .attachments /deep/ { 

        .fileIcon {
            width: 50px;
            margin-right: 15px;
            margin-top: 15px;
            font-size: 100px !important;
            cursor: pointer;
        }

    }


</style>


