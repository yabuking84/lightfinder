<template>
<span>
	
		<v-list 
		v-if="orderedSamples.length"
		style="height: 255px; overflow-y: auto; border: 1px solid gainsboro;">
		    <template v-for="(item, index) in orderedSamples">

		        <v-list-tile :key="'item_'+index" avatar @click="">
		            <v-list-tile-avatar>
						<!-- <img :src="item.image"> -->
						<image-view 
						v-if="item.image"
						:src="item.image" 
						width="35px" height="35px" 
						custom-class="my-2 mr-3"></image-view>
		            </v-list-tile-avatar>

		            <v-list-tile-content>		            	
		                <v-list-tile-sub-title>
		                	{{ item.name }} ({{ item.quantity }} pc/s)
		                </v-list-tile-sub-title>
		            </v-list-tile-content>
		        </v-list-tile>


		    </template>
		</v-list>

		<v-list 
		v-else
		style="height: 255px; overflow-y: auto; border: 1px solid gainsboro;">
			<h4 class="font-weight-regular ma-4">No samples ordered...</h4>
		</v-list>


</span>
</template>

<script>
import ImageView from "@/views/Components/App/Buyer/MyHome/ImageView";
export default {
	components:{
		ImageView,
	},

	props:[
		'orderedSamples'
	],

}	
</script>