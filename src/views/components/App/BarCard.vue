<template>
<!-- v-if="statusCount>0" -->
<div>
	<!-- <v-card 
	flat dark
	class="text-xs-center box pa-2"                        
	:class="[status.class]">
		<v-card-text class="pa-0 mt-2 mb-2 ">
			<h3 class="headline">
				{{ statusCount }}
			</h3>
			<v-layout>
				<v-flex text-xs-right>
					<v-icon
					dark 										
					class="">
						{{ status.icon }}
					</v-icon>
				</v-flex>

				<v-flex 
				text-xs-left pl-0
				class="v-centered">
					<p class="body-2 font-light-weight mb-0">{{ status.name }}</p>
				</v-flex>
			</v-layout>
		</v-card-text>
	</v-card> -->

	<vuse-card-mini-widget
	:icon="status.icon"
	:class-name="[status.class]"
	:headline="statusCount+''"
	:subheader="'<strong>'+status.name+'</strong>'"

	right-icon
	dark
	tile

	class="tiles"
	icon-color="white"
	height="110px"
	size="50px">
	
	<!-- :gradient=""
	:avatar=""
	:background="" -->

	</vuse-card-mini-widget>
 
 </div>
</template>

<script>
import config from "@/config/main"
export default {

props:[
	'status',
],

data: () => ({
	statusCount:0,
}),

created(){
	this.getStatusCount()
},

methods: {
	getStatusCount(){
		var status_id = this.status.id
		this.$store.dispatch('byrInq/getInquiries_a', {stage_id:status_id})
		.then((response)=>{
			// console.log('BarCards response '+status_id, response);	  		;
			this.statusCount = response.length;
		})
		.catch((e) => {
			console.log('Error: ' + e);
			this.loading = false;
		})
		.finally(() => {
			this.loading = false;
		});
	},
},


computed:{

},






}

</script>




<style scoped lang="scss">
.v-centered {
	align-items: center;
	display: inline-flex;
}


.box {
	-webkit-box-shadow: 0 5px 20px 0 rgba(0,0,0,0.2), 0 13px 24px -11px rgba(255,255,255,0.6);
	box-shadow: 0 5px 20px 0 rgba(0,0,0,0.2), 0 13px 24px -11px rgba(255,255,255,0.6);
	
	.headline {
		font-size: 35px !important;
		margin-left: -10px;
	}
}

.tiles /deep/ {
	color: #fff;
}
	
</style>