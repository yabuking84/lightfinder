import Vue from 'vue';
// const InquiryEventBus = new Vue({
export default new Vue({

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
		emitBidAwarded(){
			this.$emit('bid-awarded');
		},
		onBidAwarded(func) {
			this.$on('bid-awarded', () => {
				func();
			});
		},





		emitBidConfirmed(){
			this.$emit('bid-confirmed');
		},
		onBidConfirmed(func) {
			this.$on('bid-confirmed', () => {
				func();
			});
		},






		emitPaymentMade(){
			this.$emit('payment-made');
		},
		onPaymentMade(func) {
			this.$on('payment-made', () => {
				func();
			});
		},










		// on admin approved inquiry
		emitApproved() {
			this.$emit('approved-submitted');
		},
		onApproved(func) {
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
		},


		// use for updating inquiry 
		emitEditedInquiry() {
			this.$emit('edited-inquiry');
		},
		onEditedInquiry(func) {
			this.$on('edited-inquiry', () => {
				func();
			});
		},

	},

});

// export default InquiryEventBus;



// inqEvntBs.$emit('inquiry-form-submitted');
