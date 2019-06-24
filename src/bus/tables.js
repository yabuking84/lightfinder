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

	},

});





// inqEvntBs.$emit('inquiry-form-submitted');
