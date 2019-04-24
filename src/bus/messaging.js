import Vue from 'vue';
const MessagingEventBus = new Vue({

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

export default MessagingEventBus;



// inqEvntBs.$emit('inquiry-form-submitted');
