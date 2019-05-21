<template>
<!-- v-if="statusCount>0" -->
<v-flex xs12 sm6 md2>

	<v-card 
	flat dark
	class="text-xs-center box pa-2 light-green">
		<v-card-text class="pa-0 mt-2 mb-2 pt-2">
			<h3 class="headline">
				$ {{ totalAmount }}
			</h3>
			<v-layout>
				<v-flex text-xs-right>
					<v-icon
					dark
					class="">
						{{ this.barcardData.icon }}
					</v-icon>
				</v-flex>

				<v-flex 
				text-xs-left pl-0
				class="v-centered">
					<p class="body-2 font-light-weight mb-0">{{ this.barcardData.title }}</p>
				</v-flex>
			</v-layout>
		</v-card-text>
	</v-card>


</v-flex>        
</template>

<script>
import config from "@/config/main"
import { floor } from 'lodash'
export default {



props:[
	'barcardData',
],

data() { return {	

}},

created(){
},

methods: {

},


computed:{

	totalAmount(){
		
		return floor(this.barcardData.amount,2).toFixed(2);
		// return amount.toFixed(2);
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