<template>
<!-- <span> -->
<!-- 
<div class="foloosi_wrapper" :class="{'foloosi_wrapper_open':isOpen}">	
	<div id="foloosi_bgWrapAdd" :class="{'foloosi_lightBackWrap':isOpen}"></div>
	<div id="foloosi_container" :class="{'foloosi_drishy':isOpen}">
		<div id="foloosi_backdrop"></div>
		<div id="foloosi_modal" class="foloosi_mchild">
			<div id="foloosi_modal-inner">
				<div id="foloosi_content">
					<button data-dismiss="modal" 
					@click="close()" 
					class="modalClose foloosi_close closemodalwrap" 
					data-close="" 
					type="button">&#215;</button>
					<iframe :src="iframeSrc" id="FoloosiPayPluginApiiframe" width="100%"></iframe>
				</div>
			</div>
		</div>
	</div>
</div> -->



<v-dialog persistent
:value="isOpen" 
max-width="600px"
lazy>

    <v-card>

    	
    	<v-card-text class="pa-0">

    		<v-container pa-0>	

				<iframe 
				:src="iframeSrc" 
				id="FoloosiPayPluginApiiframe" 
				style="height:620px; width:100%; border:none;"></iframe>

    		</v-container>
    		
    	</v-card-text>
    	<v-card-actions class="justify-end">
            <!-- <v-btn style="position: absolute; right: 0;" -->
            <v-btn class="black white--text"
             @click="close()">
            	close
            </v-btn>
    	</v-card-actions>
    </v-card>

</v-dialog>  


<!-- </span> -->
</template>

<script>
import config from '@/config/main'

export default {

props:{
	reference_token: {
		type: String,
		default: '',
	},

},

data(){return{
	iframeSrc: '',
	isOpen: false,
}},

created() {
	// this.open();
},

methods: {

	open(){

		if(this.reference_token) {			
			var options = {
				"reference_token" : this.reference_token,
				"merchant_key" : config.merchant_key, 
			}

			this.iframeSrc = 'https://widget.foloosi.com/?{"reference_token":"'+options.reference_token+'","secret_key":"'+options.merchant_key+'"}';
			this.isOpen = true;
		}

	},


	close(){
		this.isOpen = false;
		this.iframeSrc = '';
	},


	onMessage(msg){
		if(msg.data.status == 'success'){
			//responde success code
			console.log('onMessage success',msg);
			console.log(msg.data.status);
			console.log(msg.data.data.transaction_no);

			this.$emit('payment-success', {
				status: msg.data.status,
				...msg.data.data,
			});

			// setTimeout(()=>{
			// 	this.close();            	
			// },2000);
		}
		if(msg.data.status == 'error'){
			console.log('onMessage error',msg);
			//responde error code
			console.log(msg.data.status);
			console.log(msg.data.data.payment_status);

			this.$emit('payment-failed', {
				status: msg.data.status,
				...msg.data.data,
			});

			// setTimeout(()=>{
			// 	this.close();            	
			// },2000);
		}		
	},

},

watch: {
	reference_token:{
		handler(nVal,oVal){
			this.open();
		},
		deep: true,
	},
},

mounted(){
	
	if(window.addEventListener)
	window.addEventListener('message', this.onMessage, false);
	else
	window.attachEvent('onmessage', this.onMessage, false);	
},



}</script>

<style scoped lang="scss">

// html,
// body {
// 	height: 100%;
// 	background: none !important;
// 	margin: 0;
// }

// .foloosi_wrapper {
// 	height: 100%;
// 	position: fixed;
// 	width: 100%;
// 	top: 0;
// 	display: none;
// 	z-index: 100000;
// 	overflow-y: auto;
// }

// .foloosi_wrapper_open {
// 	display: block;	
// }

// iframe {
// 	border: 0;
// 	border-radius: 5px;
// }

// #FoloosiPayPluginApiiframe {
// 	height: 640px;
// 	background: #fff;
// 	border-radius: 5px;
// 	margin: 20px 0;
// }

// #foloosi_container {
// 	margin: 0 auto;
// 	height: 100%;
// 	text-align: center;
// 	-webkit-transition: .3s ease-out opacity;
// 	-o-transition: .3s ease-out opacity;
// 	transition: .3s ease-out opacity;
// 	z-index: 2;
// }

// #foloosi_backdrop {
// 	position: absolute;
// 	top: 0px;
// 	left: 0;
// 	width: 100%;
// 	height: 100%;
// }

// #foloosi_container.foloosi_drishy {
// 	opacity: 1;
// 	white-space: nowrap;
// }

// #foloosi_modal {
// 	opacity: 1;
// 	-webkit-transform: none;
// 	-ms-transform: none;
// 	transform: none;
// 	-webkit-transition: .2s, .3s cubic-bezier(.3, 1.5, .7, 1) transform;
// 	-o-transition: .2s, .3s cubic-bezier(.3, 1.5, .7, 1) transform;
// 	transition: .2s, .3s cubic-bezier(.3, 1.5, .7, 1) transform;
// }

// #foloosi_modal-inner {
// 	-webkit-border-radius: 3px;
// 	border-radius: 3px;
// 	height: 100%;
// }

// .foloosi_close {
// 	position: absolute;
// 	right: 5px;
// 	top: 20px;
// 	cursor: pointer;
// 	background: none;
// 	border: none;
// 	color: #fff;
// 	line-height: 25px;
// 	font-size: 25px;
// 	z-index: 1;
// 	padding: 0;
// 	opacity: 0.7;
// 	-webkit-transform: none;
// 	-ms-transform: none;
// 	transform: none;
// 	-webkit-transition: .2s, .3s cubic-bezier(.3, 1.5, .7, 1) transform;
// 	-o-transition: .2s, .3s cubic-bezier(.3, 1.5, .7, 1) transform;
// 	transition: .2s, .3s cubic-bezier(.3, 1.5, .7, 1) transform;
// }

// .foloosi_close:hover {
// 	opacity: 1;
// }

// #foloosi_options-wrap {
// 	position: absolute;
// 	top: 50%;
// 	-webkit-transform: translateY(-50%);
// 	-ms-transform: translateY(-50%);
// 	transform: translateY(-50%);
// 	left: 12px;
// 	right: 12px;
// 	z-index: 100;
// }

// #foloosi_container.foloosi_drishy #foloosi_modal {
// 	opacity: 1;
// 	-webkit-transform: none;
// 	-ms-transform: none;
// 	transform: none;
// 	-webkit-transition: .2s, .3s cubic-bezier(.3, 1.5, .7, 1) transform;
// 	-o-transition: .2s, .3s cubic-bezier(.3, 1.5, .7, 1) transform;
// 	transition: .2s, .3s cubic-bezier(.3, 1.5, .7, 1) transform;
// }

// #foloosi_modal {
// 	-webkit-border-radius: 3px;
// 	border-radius: 3px;
// 	-webkit-box-sizing: border-box;
// 	box-sizing: border-box;
// 	display: inline-block;
// 	-webkit-transition: .3s ease-in;
// 	-o-transition: .3s ease-in;
// 	transition: .3s ease-in;
// 	z-index: 1;
// 	-webkit-perspective: 300;
// 	perspective: 300;
// 	position: relative;
// 	opacity: 0;
// 	-webkit-transform: scale(.9);
// 	-ms-transform: scale(.9);
// 	transform: scale(.9);
// 	color: #333;
// 	font-size: 14px;
// 	width: 544px;
// 	font-family: ubuntu, helvetica, sans-serif;
// }

// .foloosi_mchild {
// 	vertical-align: middle;
// 	display: inline-block;
// 	white-space: normal;
// }

// .foloosi_lightBackWrap {
// 	min-height: 100%;
// 	transition: all 0.3s ease-out 0s;
// 	position: fixed;
// 	top: 0px;
// 	left: 0px;
// 	width: 100%;
// 	height: 100%;
// 	background: rgba(0, 0, 0, 0.6) none repeat scroll 0% 0%;
// 	pointer-events: none;
// }

// #foloosi_content {
// 	text-align: left;
// 	white-space: normal;
// }

// .foloosi_drishy:after {
// 	content: "";
// 	height: 96%;
// 	display: inline-block;
// 	width: 0;
// 	vertical-align: middle
// }	
</style>