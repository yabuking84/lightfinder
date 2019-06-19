<template>
<span>


		<!-- <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active" :class="status.class">
		    <span class="ml-1 white--text font-weight-light ">{{ status.name }}</span>
		</v-btn> 
	    <v-chip label  dark outline :class="status.class" text-color="black" >
			<span class="font-weight-bold" :class="status.class+'--text'">
			{{ status.name }}                                
			</span>
	    </v-chip> -->



		<template v-if="statusId">
			<slot name="statusText" :status="status">
				<h5 
				class="statuses px-0 mx-0 " 
				:class="status.class+'--text'">
					{{ status.name.trim() }}
				</h5>
			</slot>
		</template>
		<template v-else>	
			<h5 
			:color="color"
			class="statuses px-0 mx-0 ">
				<slot></slot> &nbsp;
			</h5>
		</template>


</span>
</template>

<script>

import main from "@/config/main"

export default {
	props: {
		statusId: {
			type: Number,
			default: null,
		},
		statuses: {
			type: Array,				
		},
		color:{
			type: String,
		},
	},
	data: function () {
		return {
			dialog: false
		}
	},

	computed: {

		status: function(){
			// var inquiry_statuses = JSON.parse(localStorage.getItem('inquiry_statuses'));

			var inquiry_statuses = this.$route.meta.statuses;

			// console.log('inquiry_statuses',inquiry_statuses);

			var status = inquiry_statuses.find(valObj => valObj.id+"" == this.statusId+"");

			if(typeof status === "undefined" || status === "undefined") {
				// if status does not exist from database
				status = {};
				status.name = "";
				status.class = "";

			} else {

				var statusClass = this.statuses.find(valObj => valObj.id+"" == this.statusId+"");
				// if status not listed in main config inquiry_statuses.default
				if(typeof statusClass === "undefined" || statusClass === "undefined") {
					status.class = "";
				} else {
					status.class = statusClass.class;
				}
			}


			return status;
		},
	}
}
</script> 


<style scoped lang="scss">

.statuses {
	white-space: nowrap;
	font-size:17px;
	// text-decoration:underline;	
	// border-bottom: 1px solid;
}
	
</style>