import Vue from 'vue';
const NotificationEventBus = new Vue({

	data:{

	},

	methods: {

		emitNewNotification(data){
			this.$emit('new-notification',data);
		},
		onNewNotification(func){
			this.$on('new-notification',(data)=>{
				func(data);
	        });
		},

	},

});

export default NotificationEventBus;



// inqEvntBs.$emit('inquiry-form-submitted');
