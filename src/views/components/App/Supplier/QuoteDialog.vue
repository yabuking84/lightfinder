<template>

  <div class="text-xs-center">

    <v-dialog :value="openQuoteDialog" @input="$emit('update:openQuoteDialog', false)" width="80%" scrollable>
    	
      <v-card>

      	<v-card-title class="black white--text">
			<h2 class="font-weight-light">Add Quote</h2>
      	</v-card-title>
		

		<v-card-text style="max-height: 80%;">
		<v-layout row wrap>

			<v-flex xs7>
		  	  	<v-container class="pt-2">
				<v-layout row wrap>
				  	<v-flex xs12>
			            <h2 class="font-weight-thin mb-5">Inquiry # <span class="font-weight-medium">{{ inquiry.id }}</span> </h2>
				  	</v-flex>
				  	<v-flex xs7>
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
		                </v-layout>
	            	</v-flex>

	            	<v-flex xs5>
		                <v-layout row wrap>

		                    <!-- specification -->
		                    <v-flex xs12>
			                    <h5 class="font-weight-thin">Specifications</h5>
		                        <v-layout row wrap class="specifications">
		                            <v-chip 
		                            	label 
		                            	dark 
		                            	outline 
		                            	text-color="black" 
		                            	v-for="(specification, index) in inquiry.specifications" 
		                            	:key="specification+'_'+index">
		                            	{{ specification.name }}: &nbsp;
		                            	<span class="font-weight-bold">
			                            	{{ specification.value.split(',').join(', ') }}
		                            	</span>		                            	
		                            </v-chip>

									<v-alert 
										:value="!inquiry.specifications.length" 
										type="warning" 
										style="width: 100%;"
										class="ma-4"
										outline>
										No specifications..
									</v-alert>									

		                        </v-layout>
		                    </v-flex>
		                </v-layout>
	                </v-flex>

				</v-layout>			
		  	  	</v-container>
			</v-flex>



			<v-flex xs5>
		  	  	<v-container>
				<v-layout row wrap>

			  	  		<v-flex xs12>
				          <v-text-field
				            label="Product Name"
				            v-model="formData.product_name"
				            placeholder="Enter Product Name "></v-text-field>
				        </v-flex>

				        <v-flex xs12>
				          <v-textarea
				            label="Product Details"
				            v-model="formData.description"
				            placeholder="Enter Product Details "></v-textarea>
				        </v-flex>

				        <v-layout row wrap >

				           <v-flex xs4 pa-2>

					          <v-text-field
					            label="Quantity"
					            placeholder="0"
					            readonly					            
					            :value="inquiry.quantity"
					            style="color: #000;"
					            suffix="pcs"></v-text-field>
					        </v-flex>
					        
					        <v-flex xs4 pa-2>
					          <v-text-field
					            label="Unit Price"
					            v-model="formData.price"
					            placeholder="0.00"
					             prefix="$"></v-text-field>
					        </v-flex>
				        
				      		 <v-flex xs4 pa-2>
						          <v-text-field
						            label="Total Price"
						            v-model="formData.total_price"
						            placeholder="0.00"
						             prefix="$"></v-text-field>
					         </v-flex>
				        </v-layout>

				         <v-flex xs12>
					          <v-textarea
					            label="Message"
					            placeholder="Enter Remarks Here"
					            v-model="formData.remarks"></v-textarea>
				      	 </v-flex>

				         <v-flex xs12>
			                <h5 class="font-weight-thin mt-3">Attachments </h5>
							<upload-file></upload-file>
				      	 </v-flex>
				</v-layout>
		  	  	</v-container>
			</v-flex>
		</v-layout>
  		</v-card-text>

		<v-divider></v-divider>

	 	<v-card-actions class="pa-3">
	       <v-spacer></v-spacer>
	        <v-btn color="primary" :loading="loading" @click="submitForm()"> Submit </v-btn>
	    </v-card-actions>



      </v-card>
    </v-dialog>
  </div>

</template>

<script>

import helpers from "@/mixins/helpers";
import UploadFile from "@/views/Components/App/UploadFile";
import inqEvntBs from "@/bus/inquiry";

export default {
    mixins: [
        helpers,
    ],

    components: {
    	UploadFile,
    },

  	props: {
  		openQuoteDialog: {
  			type:Boolean,
  			default:false,
  		},
  		inquiry: {
  			type:Object,
  		},

  	},

    data: ()=>({

    	loading: false,
    	formData: {
			price: 11.11,
			total_price: 7777.56,
			product_name: "Super LED Industrial",
			remarks: "Nice light",
			description: "Last multiple years!",
    	},

    }),

    methods: {
    	submitForm() {

            this.loading = true;

            var formData = {
                "price": this.formData.price,
                "total_price": this.formData.total_price,
                "product_name": this.formData.product_name,
                "remarks": this.formData.remarks,
                "description": this.formData.description,
            };


            this.$store.dispatch('spplrInq/addInquiryBid_a',{
                formData: formData,
                inq_id: this.inquiry.id,
            })
            .then((response) => {
                this.loading = false;
                inqEvntBs.emitBidFormSubmitted();
                this.$emit('update:openQuoteDialog', false);

            }).catch((e) => {
                this.loading = false;
                console.log('Error: '+e);
            }).finally(()=>{
                this.loading = false;
            });



    	},
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


