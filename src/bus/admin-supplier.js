import Vue from 'vue';
export default new Vue({

	data:{
		inquiry : null,
	},

	methods: {


		emitFormSubmitted(){
			this.$emit('supplier-form-submitted');
			// this.cnsl('emitFormSubmitted');
		},
		onFormSubmitted(func){
			this.$on('supplier-form-submitted',()=>{
				func();
				// this.cnsl('onFormSubmitted');
	        });
		},

	},

});



// inqEvntBs.$emit('inquiry-form-submitted');
