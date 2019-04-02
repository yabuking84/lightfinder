import Vue from 'vue';
const InquiryEventBus = new Vue({

	data:{
		inquiry : null,
	},

	methods: {


		emitFormSubmitted(){
			
			this.$emit('inquiry-form-submitted');
		},
		onFormSubmitted(func){
			this.$on('inquiry-form-submitted',()=>{
				func();
	        });
		},



		emitBidFormSubmitted(){
			this.$emit('inquiry-bid-form-submitted');
		},
		onBidFormSubmitted(func){
			this.$on('inquiry-bid-form-submitted',()=>{
				func();
	        });
		},



		/* on the buyer award */
		// emitAwardSubmitted(){
		// 	this.$emit('award-bid-form-submitted');
		// },
		// onAwardSubmitted(func) {
		// 	this.$on('award-bid-form-submitted', () => {
		// 		func();
		// 	});
		// },


		// on admin approved inquiry
		emitApproved() {
			this.$emit('approved-submitted');
		},
		OnApproved(func) {
			this.$on('approved-submitted', () => {
				func();
			});
		},


		// on dialog close both buyer and supplier
		EmitClosed() {
			this.$emit('closed-submitted');
		},
		onClosed(func) {
			this.$on('closed-submitted', () => {
				func();
			});
		}

	},

});

export default InquiryEventBus;



// inqEvntBs.$emit('inquiry-form-submitted');
