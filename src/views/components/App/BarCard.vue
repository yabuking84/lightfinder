<template>
<div>
    <v-card flat style="background-color: transparent;">
        <v-container fill-height fluid grid-list-lg pa-0>
            <v-layout row wrap>
                
                <template v-for="(status, index) in statuses">
                    <v-flex xs12 sm6 md2 :key="index">
                        
                        <v-card 
                        flat dark
                        class="text-xs-center box-glow pa-2"                        
						:class="[status.class]">
                            <v-card-text class="pa-0 mt-2 mb-3 ">
                                <h3 class="headline">2</h3>
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


computed:{

	statuses(){

		

		var statuses = [
			...config.inquiry_statuses.default,
			...config.inquiry_statuses.buyers,
		];

		console.log(statuses);
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
	
</style>