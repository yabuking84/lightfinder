import helpers from "@/mixins/helpers";
export default {
	mixins:[
		helpers,
	],
	
	methods:{

		showInquiry(inq_id) {
			return new Promise((resolve, reject) => {
				var storeType = this.$route.meta.storeType.inq;            
				this.$store.dispatch(storeType+'/getInquiry_a', {
					inq_id: inq_id
				})
				.then((data) => {
					// console.log('data',data);

					if(data.bids){
						var awarded_bid_id = data.id+'-'+data.awarded_bid_id
						var bid = data.bids.filter(function(item) {
							return (item.id==awarded_bid_id)?true:false;
						});
						data.amount = (bid.length)?bid[0].total_price:0.0;
					} else 
					data.amount = 0.0;


					this.stateInquiry = data;
					this.openInquiry = true;
		  			resolve(data);
				})
				.catch((error) => { 
					console.log(error);
		  			reject(error);
				});
			});
		},				
	},

	computed:{

		openInquiry: {  
			get() {
				return this.$store.state.inq.openInquiryView;
			},
			set(nVal){
				if(nVal)
				this.$store.commit('inq/SHOW_OPENINQUIRYVIEW_M');
				else
				this.$store.commit('inq/HIDE_OPENINQUIRYVIEW_M');
			},
		},

		storeType(){
			return  this.$route.meta.storeType.inq;
		},


		stateInquiry: {
			get() {
				return this.$store.state.inq.inquiry;
			},
			set(nVal) {
				this.$store.commit('inq/UPDATE_INQUIRY_M',{inquiry:nVal});
			},
		},			
	},

}



					// var bid = response[i].bids.filter(function(item) {
					// 	return item.awarded;
					// });
					// var amount = (bid.length)?bid[0].total_price:0.0;
