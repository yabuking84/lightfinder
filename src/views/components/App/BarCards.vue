<template>
<div>
    <v-card flat style="background-color: transparent;">
        <v-container fill-height fluid grid-list-lg pa-0>
            <v-layout row wrap>
                
               	<bar-card 
            	v-for="(status, index) in statuses"
            	:key="index"
            	:status="status">
	           	</bar-card>

            </v-layout>
        </v-container>
    </v-card>
</div>
</template>

<script>
import config from "@/config/main"

import BarCard from '@/views/components/App/BarCard'

export default {
components:{
	BarCard,
},


data: () => ({
}),


methods: {

},


computed:{

	statuses(){		
		return this.$route.meta.statuses;
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