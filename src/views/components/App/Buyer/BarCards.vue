<template>
<div>
    <v-card flat style="background-color: transparent;">
        <v-container fill-height fluid grid-list-lg pa-0>
            <v-layout row wrap>
				<v-flex xs12 sm6 md3>
	               	<bar-card 
	            	:status="allInquiries">
		           	</bar-card>
				</v-flex>

				<v-flex xs12 sm6 md3>
	               	<bar-card 
	            	:status="sampleOrders">
		           	</bar-card>
				</v-flex>

				<v-flex xs12 sm6 md3>
	               	<bar-card 
	            	:status="confirmedOrders">
		           	</bar-card>
				</v-flex>

				<v-flex xs12 sm6 md3>
	               	<bar-card 
	            	:status="pendingPayments">
		           	</bar-card>
				</v-flex>

            </v-layout>
        </v-container>
    </v-card>
</div>
</template>

<script>
import config from "@/config/main"

import BarCard from '@/views/Components/App/BarCard'

export default {
components:{
	BarCard,
},


data: () => ({

	status: {
		name: "Status",
		iconColor: "green",
		icon: "far fa-envelope-open",
		count:0,
	},

	allInquiries:{
		name: "Inquiries",
		iconColor: "red",
		icon: "fas fa-clipboard",
		count:0,
	},

	sampleOrders: {
		name: "Sample Orders",
		iconColor: "blue",
		icon: "fas fa-box",
		count:0,
	},

	confirmedOrders: {
		name: "Confirmed Orders",
		iconColor: "green",
		icon: "fas fa-truck-loading",
		count:0,
	},

	pendingPayments: {
		name: "Pending Payments",
		iconColor: "orange",
		icon: "fas fa-money-check-alt",
		count:0,
	},

}),

created(){

	var statuses = this.$route.meta.statuses.map((sts)=>sts.id).join(',');
	this.getInquiryCount(statuses,this.allInquiries);

	this.getInquiryCount('2001',this.confirmedOrders);
	this.getInquiryCount('1005',this.pendingPayments);
},

methods: {

	getInquiryCount(statuses, data){
		var storeType = this.$route.meta.storeType.inq;
		this.$store.dispatch(storeType+'/getInquiries_a', {stage_id:statuses})
		.then((response)=>{
			data.count = response.length;
		})
		.catch((e) => {
			console.log('Error: ' + e);
			data.count = 0;
		});
	},
},


computed:{

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