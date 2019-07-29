import Vue from 'vue';
export default new Vue({

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



// inqEvntBs.$emit('inquiry-form-submitted');
