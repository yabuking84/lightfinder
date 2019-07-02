import Vue from 'vue';
export default new Vue({

	data:{
		inquiry : null,
	},

	methods: {


		emitFormSubmitted(){
			this.$emit('buyer-form-submitted');
			// this.cnsl('emitFormSubmitted');
		},
		onFormSubmitted(func){
			this.$on('buyer-form-submitted',()=>{
				func();
				// this.cnsl('onFormSubmitted');
	        });
		},

	},

});




// inqEvntBs.$emit('inquiry-form-submitted');
