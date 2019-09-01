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

		emitNewProjectMessage(data){
			this.$emit('new-project-message',data);
		},
		onNewProjectMessage(func){
			this.$on('new-project-message',(data)=>{
				func(data);
	        });
		},

	},

});




// inqEvntBs.$emit('inquiry-form-submitted');
