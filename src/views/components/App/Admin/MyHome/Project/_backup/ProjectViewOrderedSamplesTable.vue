<template>
		<v-list style="height: 255px; overflow-y: auto; border: 1px solid gainsboro;">
		    <template v-for="(item, index) in orderedSamples">

		        <v-list-tile :key="'item_'+index" avatar @click="">
		            <v-list-tile-avatar>
						<img :src="item.image_url">
		            </v-list-tile-avatar>

		            <v-list-tile-content>		            	
		                <v-list-tile-sub-title>
		                	{{ item.item_name }}
		                </v-list-tile-sub-title>
		            </v-list-tile-content>
		        </v-list-tile>


		    </template>
		</v-list>
	
</template>

<script>
export default {

	props:[
		'orderedSamples'
	],

}	
</script>