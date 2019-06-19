import Vue from 'vue';
const TableEventBus = new Vue({

	data:{

	},

	methods: {

		emitRefreshTable(data){
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
