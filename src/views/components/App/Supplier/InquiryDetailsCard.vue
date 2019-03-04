<template>
    <div>
        <v-toolbar color="grey darken-4" class="white--text" height="40px">
            <router-link :to="{ name: 'SupplierHome' }" style="text-decoration: none;">
                <v-btn class="blue-grey" small style="min-width: 50px;">
                    <i class="fas fa-arrow-left white--text"></i>
                </v-btn>
            </router-link>
            <v-toolbar-title class="body-2 font-weight-light">Inquiry# {{ inquiry.id }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="body-2 font-weight-light"> Posted: {{ getDateTime('mmm dd, yyyy hh:mm',inquiry.created_at) }}</v-toolbar-title>
        </v-toolbar>
        <v-card>

            <v-container>

                <v-layout row wrap>                	
				  	<v-flex xs8>
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

		                    <v-flex xs12>
			                    <h5 class="font-weight-thin">Attachments </h5>
		                        <img width="100px;" src="/static/examples/led-strip-lights-daaden-al-sl-1017-7777.jpg">
		                        <img width="100px;" src="/static/examples/led-strip-lights-dieburg-al-sl-1018-7778.jpg">
		                    </v-flex>
		                </v-layout>
	            	</v-flex>

	            	<v-flex xs4>
		                <v-layout row wrap>

		                    <!-- specification -->
		                    <v-flex xs12>
			                    <h5 class="font-weight-thin">Specifications</h5>
		                        <v-layout row wrap >
		                            <v-chip label dark outline text-color="black">Category: LED STRIP LIGHTS</v-chip>
		                            <v-chip label dark outline text-color="black">Warranty: 1 Years</v-chip>
		                            <v-chip label dark outline text-color="black">Power 180 </v-chip>
		                            <v-chip label dark outline text-color="black">Lumens: 190 </v-chip>
		                            <v-chip label dark outline text-color="black">Efficiency: 190</v-chip>
		                            <v-chip label dark outline text-color="black">Bean Angle: 190</v-chip>
		                            <v-chip label dark outline text-color="black">CCT: 190</v-chip>
		                            <v-chip label dark outline text-color="black">IP Rating: 190</v-chip>
		                            <v-chip label dark outline text-color="black">IP Rating: 190</v-chip>
		                            <v-chip label dark outline text-color="black">Finish: 190</v-chip>
		                            <v-chip label dark outline text-color="black">Size: 109</v-chip>
		                            <v-chip label dark outline text-color="black">Size: 109</v-chip>
		                            <v-chip label dark outline text-color="black">Size: 109</v-chip>
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

import helpers from "@/mixins/helpers";
import inqEvntBs from "@/bus/inquiry";

export default {
    mixins: [
        helpers,
    ],

    props: [
    	'inquiry',
    ],

	data: ()=>({		
	}),

	methods: {

	},

	created(){

		console.log(inqEvntBs.inquiry);
	},

}

</script>

<style scoped lang="">

</style>