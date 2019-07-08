<template>
	<div>
		<v-toolbar color="white darken-4" class="black--text" >
			<!-- <router-link :to="{ name: 'SupplierHome' }" style="text-decoration: none;">
				<v-btn class="blue-grey" small style="min-width: 50px;">
					<i class="fas fa-arrow-left white--text"></i>
				</v-btn>
			</router-link> -->
			<v-toolbar-title class="subheading font-weight-light">Inquiry </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-title class="body-2 font-weight-light"> Posted: <i> {{ getDateTime('mmm dd, yyyy hh:mm',inquiry.created_at) }} </i> </v-toolbar-title>
		</v-toolbar>

		<v-card>	        
			<v-divider></v-divider>
			
			<v-card-title>
				<!-- pending payment -->
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<template v-if="(inquiry.stage_id==1005)">
					<v-layout 
					row wrap pa-0 mb-4
					v-if="inquiry.awarded_to_me">
						<v-flex xs12>
							<v-alert 
							:value="1" 
							color="success" 
							style="width: auto; text-align:center; font-size:20px;" 
							class="mb-2">
								Pending Payment!
							</v-alert>
						</v-flex>
						<v-flex xs4>
							<h5 class="font-weight-thin">Expected Shipment Date</h5>
							<h4 class="font-weight-bold">
								<h2 class="mb-0">
								  {{ getDateTime('mmm dd, yyyy',inquiry.desired_shipping_date) }}
								</h2>
							 </h4>
						</v-flex>
					</v-layout>
					<v-layout 
					row wrap pa-0
					v-else>
						<v-flex xs12>
							<v-alert 
							:value="1" 
							color="error" 
							style="width: auto; text-align:left; font-size:18px;" 
							class="mb-2">
								The inquiry has been awarded to another supplier.
							</v-alert>
						</v-flex>
					</v-layout>
				</template>
				<!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
				<!-- pending payment -->				
			</v-card-title>
			

			<v-card-text>
				<v-container fluid>




					<v-layout row wrap>

						<v-flex xs12>
							<v-layout row wrap>

									   <v-flex xs12 v-if="inquiryImages.length > 0">
										<!-- <h4 class="font-weight-medium">Image</h4> -->
										<!-- <v-flex xs10 offset-xs1> -->
											 <image-gallery-small :images="inquiryImages" noThumbnails height="250px"></image-gallery-small> 
										<!-- </v-flex> -->
									</v-flex>

									<v-flex xs6 pb-0>
										<!-- <small class="blue-grey--text">Details</small> -->
										<h4 class="font-weight-medium">Keywords </h4>
										<h4 class="font-weight-light">
										  <p class="mb-0">{{ inquiry.keyword }}</p>
										</h4>
									</v-flex>

									<v-flex xs6 pb-0>
										<h4 class="font-weight-medium">Category</h4>
										<h4 class="font-weight-light">
										  <span style="text-transform:uppercase;">{{ inquiry.categories.join(', ') }}</span>
										</h4>
									</v-flex>

							   
							   
									<v-flex xs6 pb-0>
										<h4 class="font-weight-medium">Quantity</h4>
										<h4 class="font-weight-light">
										<span>{{ inquiry.quantity }} pcs</span>
									  </h4>
									</v-flex>

									<v-flex xs6 pb-0>
										<h4 class="font-weight-medium">Sample Quantity</h4>
										<h4 class="font-weight-light">
										<span>{{ inquiry.sample_quantity }} pc/s</span>
									  	</h4>
									</v-flex>



							   
									<v-flex xs6 pb-0>
										<h4 class="font-weight-medium">Desired Unit Price</h4>
										<h4 class="font-weight-light">
										<span>${{ currency(inquiry.desired_unit_price) }}</span>
									  	</h4>
									</v-flex>						   
									<v-flex xs6 pb-0>
										<h4 class="font-weight-medium">Desired Total Price</h4>
										<h4 class="font-weight-light">
										<span>${{ currency(inquiry.desired_price) }}</span>
									  	</h4>
									</v-flex>



									<v-flex xs12>
										<h4 class="font-weight-medium">Message </h4>
										<h4 class="font-weight-light">
										  <p class="mb-0">{{ inquiry.message }}</p>
										</h4>
									</v-flex>


									<v-flex xs12>
											<v-layout row wrap>
												<!-- specification -->
												<v-flex xs12>
													<h4 class="font-weight-medium">Specifications</h4>
													<v-layout row wrap class="specifications">
													   
														 <span v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index"> 
															<v-chip label dark outline text-color="black" v-if="specification.value" >
																   {{ specification.name }}: &nbsp;
															   <span class="font-weight-light">
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

									<v-flex xs12 class="attachments">


												<h4 class="font-weight-medium">Attachments </h4>
												<div v-if="inquiryAttachments.length">

												<v-layout row wrap>
													 <v-flex xs4 v-for="(attachment, index) in inquiryAttachments" :key="attachment+'_'+index">
															 <a target="_blank" :href="attachment.location">
																<v-icon style="font-size: 80px !important;padding: 10px;" color="red" large>fas fa-file-pdf</v-icon>
															 </a>   
													  </v-flex> 
												</v-layout>
												  
												</div>
												
												<div v-else>
													<h4 class="red--text">No Attachment</h4>
												</div>
										</v-flex>

										
									<v-flex xs12 class="mb-10">
									  <v-divider></v-divider>
									</v-flex>
														










								<!-- shipping details -->
								<!-- /////////////////////////////////////////////////////////////////////////////////////////////// -->
									<!-- 	<v-flex xs12 v-show="inquiry.shipping_country_id">
											<small class="blue-grey--text">Mass Shipping Address</small>
											<h4 class="font-weight-medium">Shipping Address</h4>
											<h4 class="font-weight-light">
											  <span>{{ getCountryName(inquiry.shipping_country_id) }} </span>
											  <span>{{ inquiry.shipping_address }} </span>
											  <span>{{ inquiry.shipping_city }} </span>
											  <span>{{ inquiry.shipping_postal }} </span>
											</h4>
										</v-flex>

				   
									<v-flex xs12 class="mb-10">
									  <v-divider></v-divider>
									</v-flex>
											   


										<v-flex xs12 v-show="inquiry.sample_quantity">
											<small class="blue-grey--text">Sample Order Information</small>
											<h4 class="font-weight-medium">Sample Orders Quantity </h4>
											<h4 class="font-weight-light">
											<span>{{ inquiry.sample_quantity }} </span>
										   </h4>

										   <h4 class="font-weight-medium mt-2"> Shipping Address</h4>
											<h4 class="font-weight-light">
											   <span>{{ getCountryName(inquiry.sample_shipping_country_id) }} </span>
											   <span>{{ inquiry.sample_shipping_address }}</span>
											   <span>{{ inquiry.sample_shipping_city }} </span>
											   <span>{{ inquiry.sample_shipping_postal }} </span>
											</h4>
										</v-flex> -->


								<template>
									<v-flex xs12 pb-0>
									<h4 class="font-weight-medium ">Shipping Addresses</h4>
									</v-flex>

									<v-flex xs12 >
										<small class="blue-grey--text">Mass Shipping Address</small>
										<!-- <h4 class="font-weight-medium">Shipping Address</h4> -->
										<h4 class="font-weight-light">
										  <span>{{ getCountryName(inquiry.shipping_country_id) }} </span>
										  <span>{{ inquiry.shipping_address }} </span>
										  <span>{{ inquiry.shipping_city }} </span>
										  <span>{{ inquiry.shipping_postal }} </span>
										</h4>
									</v-flex>

			   
								<!-- <v-flex xs12 class="mb-10">
								  <v-divider></v-divider>
								</v-flex> -->
										   


									<v-flex xs12 v-show="inquiry.sample_quantity">
										<!-- <small class="blue-grey--text">Sample Order Information</small>
										<h4 class="font-weight-medium">Sample Orders Quantity </h4>
										<h4 class="font-weight-light">
										<span>{{ inquiry.sample_quantity }} </span>
									   </h4> -->

										<small class="blue-grey--text">Sample Shipping Address</small>
									   	<!-- <h4 class="font-weight-medium ">Shipping Address</h4> -->
										<h4 class="font-weight-light">
										   <span>{{ getCountryName(inquiry.sample_shipping_country_id) }} </span>
										   <span>{{ inquiry.sample_shipping_address }}</span>
										   <span>{{ inquiry.sample_shipping_city }} </span>
										   <span>{{ inquiry.sample_shipping_postal }} </span>
										</h4>
									</v-flex>


			   
									<v-flex xs12 class="mb-10">
										<v-divider></v-divider>
									</v-flex>
								</template>	   
								<!-- /////////////////////////////////////////////////////////////////////////////////////////////// -->
								<!-- shipping details -->





									   <v-flex xs12 v-show="inquiry.oem">

											<small class="blue-grey--text">Original Equipment Manufacture</small>
											<h4 class="font-weight-medium">
											   What kind of Original Equipment Manufacture ?
											</h4>
											<h4 class="font-weight-light">{{ inquiry.oem_service }}</h4>

											<h4 class="font-weight-medium mt-2">
											   Description
											</h4>
											<h4 class="font-weight-light">{{ inquiry.oem_description }}</h4>
											
											<h4 class="mt-2">Files</h4>

											  <v-layout row wrap v-if="inquiry.attachments.length" class="attachments">
															
														<!-- display only here the attachment and images from thre inquiry -->
														<v-flex xs4 lg4 v-for="(attachment, index) in inquiryOEM" :key="attachment+'_'+index">

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
																	 <v-icon style="font-size: 80px !important;padding: 10px;" color="red" large>fas fa-file-pdf</v-icon>
																 </a>
															   </div>


														</v-flex>
														
												  </v-layout>

												  <v-layout v-else row wrap>
													<v-flex xs12>
														  <h4 class="red--text">No Files</h4>
													</v-flex>
												  </v-layout>
									   </v-flex>

				   
									<v-flex xs12 class="mb-10" v-show="inquiry.oem">
									  <v-divider></v-divider>
									</v-flex>
							</v-layout>

						</v-flex>
					</v-layout>
				 
				</v-container>
		  
				<v-flex xs12 mt-2>
					<inquiry-post-list v-if="inquiry" :openInquiry="openInquiry" :inquiry="inquiry"> </inquiry-post-list>
				</v-flex>

			</v-card-text>

		</v-card>
		
	</div>
</template>
<script>


	import ImageGallerySmall from "@/views/Components/App/ImageGallery"

	// import helpers from "@/mixins/helpers";
	import inqEvntBs from "@/bus/inquiry";
	import InquiryPostList from "@/views/Components/App/Supplier/InquiryPostList"

	import config from '@/config/index'

	export default {
		mixins: [
			// helpers,
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
			

			SortAttachments() {

				var attachmentHolder = this.inquiry.attachments

				this.inquiryImages = []
				this.inquiryAttachments = []
				this.inquiryOEM = []

					for (var i = attachmentHolder.length - 1; i >= 0; i--) {

						switch (attachmentHolder[i].filegroup) {

							  case 'add-inquiry-oems':

									this.inquiryOEM.push(attachmentHolder[i])

							  break;

							  case 'add-inquiry-attachments':

									this.inquiryAttachments.push(attachmentHolder[i])

							  break;

							  case 'add-inquiry-images':

									this.inquiryImages.push(attachmentHolder[i])
								  
							  break;
				
						}
				  }


			}            

		},

		watch: {


			inquiry: {

				handler(nVal, oVal) {

				if(nVal) {
				  this.SortAttachments();    
				}
					
				},

				deep: true,
			},


		},

		computed: {

			countries(){
				
				return config.countries;
			},

		},

		created() {

			// this.cnsl(this.inquiry);
			   this.SortAttachments();    


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


