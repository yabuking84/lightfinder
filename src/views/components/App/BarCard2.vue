<template>

  	<vuse-card-mini-widget
    :gradient="widget.gradient"
    :height="widget.height"
    :headline="widget.headline"
    :subheader="widget.subheader"
    :icon="widget.icon"
    :icon-color="widget.iconcolor"
    :size="widget.size"
    :background="widget.background"
    :class-name="widget.className"
    :dark="widget.dark"
    :right-icon="widget.rightIcon"
    :avatar="widget.avatar"
    :tile="widget.tile"
    @click="onClick(widget)"></vuse-card-mini-widget>

</template>

<script>
import config from "@/config/main"
export default {

props:[
	'status',
],

data: () => ({
	statusCount:0,
	widget:{
		
	},
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
	
</style>