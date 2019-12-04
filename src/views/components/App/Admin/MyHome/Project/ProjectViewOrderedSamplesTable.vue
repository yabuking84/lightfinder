<template>
<span>
	<!-- <pre>x{{ orderedSamples }}x</pre> -->

	<!-- <h1>{{ orderLength }}</h1> -->

	<v-list v-if="orderLength" class="smpl-ordrs">

		<template v-for="(ordrdSmplsGrp, index) in orderedSamples">
			<v-list-tile class="smpl-ordr-ttle">
				<v-list-tile-content>		            	
					<v-list-tile-sub-title @click="viewOrdrdSmpl(ordrdSmplsGrp,index)">
						<h4>Sample Order Ref No. {{ index }}</h4>
						<v-progress-circular 
						v-if="ordrdSmplsGrp.loading"
						size="15" class="ml-2"
						indeterminate 
						color="black"></v-progress-circular>
					</v-list-tile-sub-title>
				</v-list-tile-content>
			</v-list-tile>

			<template v-for="(item, index2) in ordrdSmplsGrp">
				<v-list-tile class="smpl-order-item" :key="'item_'+index+'_'+index2" avatar>
					<v-list-tile-avatar v-if="item.image">
						<image-view 
						v-if="item.image"
						:src="item.image" 
						width="35px" height="35px" 
						custom-class="my-2 mr-3"></image-view>
					</v-list-tile-avatar>

					<v-list-tile-content>		            	
						<v-list-tile-sub-title @click="viewOrdrdSmpl(ordrdSmplsGrp,index)">
							{{ item.name }} ({{ item.quantity }} pc/s)
						</v-list-tile-sub-title>
					</v-list-tile-content>
				</v-list-tile>
			</template>
		</template>

	</v-list>

	<v-list 
	v-else
	style="height: 255px; overflow-y: auto; border: 1px solid gainsboro;">
		<h4 class="font-weight-regular ma-4">No samples ordered...</h4>
	</v-list>


	<ordered-samples-dialog 	
	:proj_id="proj_id" 
	:group_id="group_id" 
	:dialog-open.sync="orderedSamplesDialog"
	@loading-success="resetLoading()"></ordered-samples-dialog>


</span>
</template>

<script>
import ImageView from "@/views/Components/App/MyHome/ImageView";
import OrderedSamplesDialog from '@/views/Components/App/Admin/MyHome/Project/OrderedSamplesDialog';

export default {
	components:{
		ImageView,
		OrderedSamplesDialog,
	},

	props:[
		'orderedSamples',
		'proj_id',
	],

	data(){ return {
		group_id: null,
		orderedSamplesDialog: false,
		clickedOSG: null,
	}},

	methods:{
		viewOrdrdSmpl(ordrdSmplsGrp,group_id){

			// reset loading
			if(this.clickedOSG)
			this.clickedOSG.loading = false;

			this.group_id = group_id;
			this.orderedSamplesDialog = true;
			this.clickedOSG = ordrdSmplsGrp;
			this.clickedOSG.loading = true;
		},

		resetLoading(){
			console.log('resetLoading');			
			console.log(this.clickedOSG);
			console.log(this.clickedOSG.loading);

			if(this.clickedOSG)
			this.clickedOSG.loading = false;

			console.log(this.clickedOSG.loading);

			
		}
	},

	computed:{
		orderLength(){
			return Object.keys(this.orderedSamples).length;
		},
	},

}	
</script>



<style scoped lang="scss">

.smpl-ordrs.v-list {
	height: 255px; 
	overflow-y: auto; 
	border: 1px solid gainsboro;

	.smpl-ordr-ttle /deep/ {
		margin-top: 30px;
		.v-list__tile {
			height: 25px;
			h4 {
				color: #000;
				display: inline-flex;
				border-bottom: 1px solid;		    	
			}
		}
	}

	.smpl-ordr-ttle:nth-child(1) /deep/ {
		margin-top: 0px;
	}

	.v-list__tile__sub-title {
		color: #000;
		cursor: pointer;
	}
}

.smpl-order-item.v-list {
	> div {
		padding-left: 20px;
	}
}

// .v-progress-circular {
// 	height: 15px;
//     width: 15px;	
// }

</style>