import Vue from 'vue';
export default new Vue({

	data:{

	},

	methods: {

		emitRefreshPendingPaymentsTable(data){
			this.$emit('refresh-pending-payments-table',data);
		},
		onRefreshPendingPaymentsTable(func){
			this.$on('refresh-pending-payments-table',(data)=>{
				func(data);
	        });
		},

		emitRefreshTablePolling(data){
			this.$emit('refresh-table-polling',data);
			// console.log('EMIT RefreshTablePolling');
		},
		onRefreshTablePolling(func){
			this.$on('refresh-table-polling',(data)=>{
				// console.log('ON RefreshTablePolling');
				func(data);
	        });
		},
		


	},

});





// inqEvntBs.$emit('inquiry-form-submitted');
