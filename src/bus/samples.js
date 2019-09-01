import Vue from 'vue';
export default new Vue({

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





// inqEvntBs.$emit('inquiry-form-submitted');
