import Vue from 'vue';
const InquiryEventBus = new Vue({

	data:{
		inquiry : null,
	},

	methods: {


		emitFormSubmitted(){
			this.$emit('buyer-form-submitted');
			// console.log('emitFormSubmitted');
		},
		onFormSubmitted(func){
			this.$on('buyer-form-submitted',()=>{
				func();
				// console.log('onFormSubmitted');
	        });
		},

	},

});

export default InquiryEventBus;



// inqEvntBs.$emit('inquiry-form-submitted');
