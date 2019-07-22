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
	            	:status="walletAmount">
		           	</bar-card>
				</v-flex>

            </v-layout>
        </v-container>
    </v-card>
</div>
</template>

<script>
import config from "@/config/main"
import inqMixin from "@/mixins/inquiry";

import BarCard from '@/views/Components/App/BarCard'

export default {
components:{
	BarCard,
},

mixins: [
	// helpers
	inqMixin,
],

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

	walletAmount: {
		name: "Wallet Amount",
		iconColor: "purple",
		icon: "fas fa-wallet",
		count:'$0.00',
	},

}),

created(){

	this.setInquiryBarCard();
	this.setSampleOrdersBarCard();
	this.setConfirmedOrdersBarCard();
	this.setWalletBarCard();

},

methods: {

	// Inquiries
	///////////////////////////////////////////////////////////////////////////////
	setInquiryBarCard(){
		var statuses = this.$route.meta.statuses.map((sts)=>sts.id).join(',');
		this.getInquiryCount(statuses)
		.then((rspns)=>{
			this.allInquiries.count = rspns.length;
		})
		.catch((e)=>{
			this.allInquiries.count = 0;
		});
	},
	///////////////////////////////////////////////////////////////////////////////
	// Inquiries


	// Sample Orders
	///////////////////////////////////////////////////////////////////////////////
	setSampleOrdersBarCard(){
		var statuses = this.$route.meta.statuses.map((sts)=>sts.id).join(',');
		this.getInquiryCount(statuses)
		.then((rspns)=>{
			var inqs = this.setDataTableInquiry(rspns);
			var inqs = inqs.filter((inq)=>{
				return (inq.bid_stages.length)?true:false;
			});
			this.sampleOrders.count = inqs.length;
		})
		.catch((e)=>{
			this.sampleOrders.count = 0;
		});

	},
	///////////////////////////////////////////////////////////////////////////////
	// Sample Orders


	// Confirmed Orders
	///////////////////////////////////////////////////////////////////////////////
	setConfirmedOrdersBarCard(){
		this.getInquiryCount(2001)
		.then((rspns)=>{
			var inqs = rspns.filter((inq)=>{
				return (inq.awarded_to_me)?true:false;
			});
			this.confirmedOrders.count = inqs.length;
		})
		.catch((e)=>{
			this.confirmedOrders.count = 0;
		});

	},
	///////////////////////////////////////////////////////////////////////////////
	// Confirmed Orders


	// Wallet
	///////////////////////////////////////////////////////////////////////////////
	setWalletBarCard(){
		this.getInquiryCount('2001,2002,2003')
		.then((rspns)=>{
			this.cnsl(rspns);
			var inqs = rspns.filter((inq)=>{
				return (inq.awarded_to_me)?true:false;
			});
			// this.cnsl('setWalletBarCard',inqs);

			var walletTotal = 0;
			inqs.forEach((inq)=>{
				walletTotal+=inq.shipping_cost;
				inq.bids.forEach((bid)=>{
					walletTotal+=bid.total_price;
				});
			});

			this.walletAmount.count = '$'+this.currency(walletTotal);
		})
		.catch((e)=>{
			this.walletAmount.count = '$0.00';
		});

	},
	///////////////////////////////////////////////////////////////////////////////
	// Wallet


	getInquiryCount(statuses, data){
		return new Promise((resolve, reject) => {			
			// var storeType = this.$route.meta.storeType.inq;
			this.$store.dispatch(this.getStore()+'/getInquiries_a', {stage_id:statuses,with_bids:1})
			.then((response)=>{				
				resolve(response);
			})
			.catch((e) => {
				console.log('Error: ' + e);
				reject(null);
			});
		})
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