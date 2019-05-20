<template>
<div>
    <v-card flat style="background-color: transparent;">
        <v-container fill-height fluid grid-list-lg pa-0>
            <v-layout row wrap>
                
                <template v-for="(status, index) in statuses">
                    <v-flex xs12 sm6 md2 :key="index">
                        <v-card flat class="transparent text-xs-center box-glow pa-2" dark>

                            <v-card-text class="pa-0 mt-2">
                                <h3 class="headline">{{ status.count }}</h3>
                                <p class="subheading font-light-weight">{{ status.title }}</p>
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
