<template>
<span>
	<div>
		<!-- <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active" :class="status.class">
		    <span class="ml-1 white--text font-weight-light ">{{ status.name }}</span>
		</v-btn> 
		:class="status.class"
		-->
		<h3 
		class="statuses py-1 px-0 mx-0 my-2" 
		:class="status.class+'--text'">{{ status.name.trim() }}</h3>

	</div>  
</span>
</template>

<script>

	import main from "@/config/main"

	export default {
		props: {
			statusId: {
				type: Number,
				required:true
			},
			statuses: {
				type: Array,				
			}
		},
		data: function () {
			return {
				dialog: false
			}
		},

		computed: {

			status: function(){
				var inquiry_statuses = JSON.parse(localStorage.getItem('inquiry_statuses'));

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
	border-bottom: 1px solid;
}
	
</style>