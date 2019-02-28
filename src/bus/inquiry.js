import Vue from 'vue';
const InquiryEventBus = new Vue({

	methods: {

		emitFormSubmitted(){
			this.$emit('inquiry-form-submitted');
			console.log('emitFormSubmitted');
		},
		onFormSubmitted(func){
			this.$on('inquiry-form-submitted',()=>{
				func();
				console.log('onFormSubmitted');
	        });
		},


	},

});

export default InquiryEventBus;



// inqEvntBs.$emit('inquiry-form-submitted');
