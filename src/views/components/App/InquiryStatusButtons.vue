<template>
<span>
	<div>


		<!-- <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active" :class="status.class">
		    <span class="ml-1 white--text font-weight-light ">{{ status.name }}</span>
		</v-btn> 
	    <v-chip label  dark outline :class="status.class" text-color="black" >
			<span class="font-weight-bold" :class="status.class+'--text'">
			{{ status.name }}                                
			</span>
	    </v-chip> -->




		<template v-if="false">
	    <!-- verifying -->
	    <div v-if="statusId==1001">
	        <small class="orange--text">Inquiry sent for BAL approval</small>
	    </div>
	    <!-- open -->
	    <div v-else-if="statusId==1002">
	        <small class="green--text">Approved inquiry, open for bidding</small>
	    </div>
	    <!-- rejected -->
	    <div v-else-if="statusId==1003">
	        <small class="red--text">Declined by BAL</small>
	    </div>
	    <!-- confirmation-->
	    <div v-else-if="statusId==1004">
	        <small class="teal--text">Waiting for supplier confirmation</small>
	    </div>
	    <!-- pending payment-->
	    <div v-else-if="statusId==1005">
	        <small class="deep-orange--text">Waiting for your payment</small>
	    </div>
	    <!-- Production -->
	    <div v-else-if="statusId==2001">
	        <small class="blue--text">Products are on the production line</small>
	    </div>
	    <!-- Shipment -->
	    <div v-else-if="statusId==2002">
	        <small class="light-green--text">Order is sent for shipment</small>
	    </div>
	    <!-- Receiving -->
	    <div v-else-if="statusId==2003">
	        <small class="orange--text">Order reached the destination, waiting for buyer confirmation</small>
	    </div>
	    <!-- Return -->
	    <div v-else-if="statusId==2004">
	        <small class="red--text">Order is returning to the supplier</small>
	    </div>
	    <!-- Success -->
	    <div v-else-if="statusId==3001">
	        <small class="light-blue--text">Order is successful</small>
	    </div>
	    <!-- Cancelled -->
	    <div v-else-if="statusId==3002">
	        <small class="red--text">Order is cancelled</small>
	    </div>
		</template>

		<h3 
		class="statuses px-0 mx-0 " 
		:class="status.class+'--text'">
			{{ status.name.trim() }}
		</h3>

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
	// border-bottom: 1px solid;
}
	
</style>