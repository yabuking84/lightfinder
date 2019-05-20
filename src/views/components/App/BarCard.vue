<template>
<div>
    <v-card flat style="background-color: transparent;">
        <v-container fill-height fluid grid-list-lg pa-0>
            <v-layout row wrap>
                
                <template v-for="(status, index) in statuses">
                    <v-flex xs12 sm6 md2 :key="index">
                        
                        <v-card 
                        flat dark
                        class="text-xs-center box pa-2"                        
						:class="[status.class]">
                            <v-card-text class="pa-0 mt-2 mb-2 ">
                                <h3 class="headline">
                                	{{ getStatusCount(status.id) }}
                                </h3>
								<v-layout>
									<v-flex text-xs-right>
										<v-icon
										dark 										
										class="">
											{{ status.icon }}
										</v-icon>
									</v-flex>

									<v-flex 
									text-xs-left pl-0
									class="v-centered">
			                            <p class="body-2 font-light-weight mb-0">{{ status.name }}</p>
									</v-flex>
								</v-layout>
                            </v-card-text>
                        </v-card>

                    </v-flex>
                </template>

            </v-layout>
        </v-container>
    </v-card>
</div>
</template>

<script>
import config from "@/config/main"
export default {

props:[
	'userType'
],

data: () => ({
}),


methods: {
	getStatusCount(status_id){


		return status_id;
	},
},


computed:{

	statuses(){		

		var statuses = [
			...config.inquiry_statuses.default,
			...config.inquiry_statuses.buyers,
		];

		// console.log(statuses);
		return statuses;
	},

},






}

</script>




<style scoped lang="scss">
.v-centered {
    align-items: center;
    display: inline-flex;
}


.box {
	-webkit-box-shadow: 0 5px 20px 0 rgba(0,0,0,0.2), 0 13px 24px -11px rgba(255,255,255,0.6);
	box-shadow: 0 5px 20px 0 rgba(0,0,0,0.2), 0 13px 24px -11px rgba(255,255,255,0.6);
	
	.headline {
	    font-size: 35px !important;
	    margin-left: -10px;
	}
}
	
</style>