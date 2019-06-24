import Vue from 'vue';
export default new Vue({

	data:{

	},

	methods: {

		emitNewMessage(data){
			this.$emit('new-message',data);
		},
		onNewMessage(func){
			this.$on('new-message',(data)=>{
				func(data);
	        });
		},

	},

});




// inqEvntBs.$emit('inquiry-form-submitted');
