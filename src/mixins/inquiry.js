import helpers from "@/mixins/helpers";
export default {
	mixins:[
		helpers,
	],
	
	methods:{

		showInquiry(inq_id) {
			return new Promise((resolve, reject) => {
				this.$store.dispatch(this.getStore()+'/getInquiry_a', {
					inq_id: inq_id
				})
				.then((data) => {
					// console.log('data',data);
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