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


	},

});

export default InquiryEventBus;



// inqEvntBs.$emit('inquiry-form-submitted');
