import Vue from 'vue';
export default new Vue({

	data:{

	},

	methods: {

		emiRefreshProjectTable(data){
			this.$emit('refresh-project-table',data);
		},
		onRefreshProjectTable(func){
			this.$on('refresh-project-table',(data)=>{
				func(data);
	        });
		},


		emiRefreshRevisionTable(data){
			this.$emit('refresh-revision-table',data);
		},
		onRefreshRevisionTable(func){
			this.$on('refresh-revision-table',(data)=>{
				func(data);
	        });
		},


	},

});





// inqEvntBs.$emit('inquiry-form-submitted');
