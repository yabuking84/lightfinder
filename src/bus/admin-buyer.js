import Vue from 'vue';
export default new Vue({

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




// inqEvntBs.$emit('inquiry-form-submitted');
