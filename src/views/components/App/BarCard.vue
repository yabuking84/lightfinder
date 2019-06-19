<template>
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

	<!-- <vuse-card-mini-widget
	:icon="icon"
	:class-name="[className]"
	:headline="count"
	:subheader="'<strong>'+name+'</strong>'"
	:icon-color="iconColor"

	right-icon
	dark
	tile

	class="tiles"
	height="110px"
	size="50px">
	</vuse-card-mini-widget> -->

	<vuse-card-mini-widget
	:icon="status.icon"
	:headline="status.count+''"
	:subheader="'<strong>'+status.name+'</strong>'"
	:icon-color="status.iconColor"
	right-icon
	tile
	height="110px"
	size="50px">
	</vuse-card-mini-widget>

 </div>
</template>

<script>
import config from "@/config/main"
export default {

props:[
	'status','count',
],

data() { return {

}},

created(){
},

methods: {

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