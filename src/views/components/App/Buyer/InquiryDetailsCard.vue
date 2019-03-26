<template>
    <div>

        <v-toolbar color="grey darken-4" class="white--text" height="50px">
            <!-- <router-link :to="{ name: 'BuyerHome' }" style="text-decoration: none;">
                <v-btn class="blue-grey" small style="min-width: 50px;">
                    <i class="fas fa-arrow-left white--text"></i>
                </v-btn>
            </router-link> -->

            <v-toolbar-title class="subheading font-weight-light">Inquiry Details</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="subheading font-weight-light"> Posted: <i class="body-2"> {{ getDateTime('mmm dd, yyyy hh:mm',inquiry.created_at) }}  </i> </v-toolbar-title>

        </v-toolbar>
        <v-card>

            <v-container>

				<v-alert 
				:value="(inquiry.stage_id==1005)?1:0"
				color="error" 
				style="width: auto; text-align:center; font-size:20px;"
				class="mb-2">
				Pending Payment!
				</v-alert>

				<v-alert
				:value="(inquiry.stage_id==1004)?1:0"
				type="success"
				color="light-blue"
				style="font-size:20px;"
				v-if="inquiry.awarded">
	                You have awarded a bid on this inquiry.
	            </v-alert>
	    

                <v-layout row wrap>
                    <v-flex xs12>
                        <v-layout row wrap>
                            <v-flex shrink>
                                <h5 class="font-weight-thin">Keywords </h5>
                                <h4 class="font-weight-bold">
									<p class="mb-0">{{ inquiry.keyword }}</p>
						      	</h4>
                            </v-flex>

                            <v-flex shrink>
                                <h5 class="font-weight-thin">Category</h5>
                                <h4 class="font-weight-bold">                     	
			                    	<span style="text-transform:uppercase;">{{ inquiry.categories.join(', ') }}</span>
			                    </h4>
                            </v-flex>

                            <v-flex shrink>
                                <h5 class="font-weight-thin">Quantity</h5>
                                <h4 class="font-weight-bold">                     	
			                    	<span>{{ inquiry.quantity }} pcs</span>
			                    </h4>
                            </v-flex>

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

                    <v-flex xs12>

                        <v-layout row wrap>
                            <v-flex xs12>
                                <h5 class="font-weight-thin">Specifications</h5>
                                <v-layout row wrap class="specifications">
                                    <v-chip label dark outline text-color="black" v-for="(specification, index) in inquiry.specifications" :key="specification+'_'+index">
                                        {{ specification.name }}: &nbsp;
                                        <span class="font-weight-bold">
			                            	{{ specification.value.split(',').join(', ') }}
		                            	</span>
                                    </v-chip>

                                    <v-alert :value="!inquiry.specifications.length" type="info" style="width: 100%;" class="ml-0 mt-4" outline>
                                        No specifications..
                                    </v-alert>

                                </v-layout>
                            </v-flex>
                        </v-layout>

                    </v-flex>

                </v-layout>

            </v-container>

        </v-card>

    </div>

</template>
<script>
    import InquiryAwardCard from "@/views/Components/App/Buyer/InquiryAwardCard"
    import helpers from "@/mixins/helpers";
    import inqEvntBs from "@/bus/inquiry";

    export default {

        components: {

            InquiryAwardCard,

        },

        mixins: [
            helpers,
        ],

        props: [
            'inquiry',
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
            width: 220px;
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