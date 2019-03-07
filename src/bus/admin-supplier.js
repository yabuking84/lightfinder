import Vue from 'vue';
const InquiryEventBus = new Vue({

	data:{
		inquiry : null,
	},

	methods: {


		emitFormSubmitted(){
			this.$emit('supplier-form-submitted');
			// console.log('emitFormSubmitted');
		},
		onFormSubmitted(func){
			this.$on('supplier-form-submitted',()=>{
				func();
				// console.log('onFormSubmitted');
	        });
		},

	},

});

export default InquiryEventBus;



// inqEvntBs.$emit('inquiry-form-submitted');
