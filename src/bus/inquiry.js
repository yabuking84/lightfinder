import Vue from 'vue';
const InquiryEventBus = new Vue({

	data:{
		inquiry : null,
	},

	methods: {


		emitFormSubmitted(){
			this.$emit('inquiry-form-submitted');
			// console.log('emitFormSubmitted');
		},
		onFormSubmitted(func){
			this.$on('inquiry-form-submitted',()=>{
				func();
				// console.log('onFormSubmitted');
	        });
		},



		emitBidFormSubmitted(){
			this.$emit('inquiry-bid-form-submitted');
			// console.log('emitFormSubmitted');
		},
		onBidFormSubmitted(func){
			this.$on('inquiry-bid-form-submitted',()=>{
				func();
				// console.log('onFormSubmitted');
	        });
		},



		/* on the buyer award */
		emitAwardSubmitted(){
			this.$emit('award-bid-form-submitted');
		},
		onAwardSubmitted(func) {
			this.$on('award-bid-form-submitted', () => {
				func();
			});
		},


		// on admin approved inquiry
		emitApproved() {
			this.$emit('approved-submitted');
		},
		OnApproved(func, isOpen) {
			this.$on('approved-submitted', () => {
				func();
			});
		}

	},

});

export default InquiryEventBus;



// inqEvntBs.$emit('inquiry-form-submitted');
