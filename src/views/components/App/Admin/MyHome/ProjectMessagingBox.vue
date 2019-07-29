<template>
<div>

	<div class="messaging-box" :id="'mb_'+proj_id" :ref="'mb_'+proj_id">
		<v-card color="transparent" style="" class="chat-container">
			<v-card-text class="" id="chatscroll-thread">  

				<v-layout row wrap class="pa-0">
					<v-flex xs12 pt-0 v-for="(message, key) in messages" :key="key">
						<v-card flat class="overflow-hidden transparent">
							<v-container fluid grid-list-xs class="pa-0">

								<div 
								class="chat-thread" 
								:class="[message.own?'end':'start']">
									<div class="user-avatar">
										<v-avatar 
										v-if="message.own"
										size="40px" 
										color="grey lighten-4">
											<img :src="[authUser.id === message.user_id ? authUser.avatar : 'http://i.pravatar.cc/32' ]" alt="User">
										</v-avatar>
										<v-avatar 
										v-else
										size="40px" 
										color="grey lighten-4">
											<img src="/static/logos/logo-white.png" alt="BAL">
										</v-avatar>
									</div>                                
									<div class="chat-message pa-2 border-radius6">
										<div v-html="message.content" class="chat-message-text dont-break-out"></div>
									</div>
								</div>

							</v-container>
						</v-card>
					</v-flex>
				</v-layout>

				<v-layout row wrap v-if="!messages.length">
					<v-flex xs12>
						<h2 class="font-weight-medium grey--text mt-1 mb-1 text-xs-center">&nbsp;</h2>
					</v-flex>
				</v-layout>

			</v-card-text>
		</v-card>

		<!-- Add message -->
		<v-layout row wrap class="no-mrpd">
			<v-flex xs12 class="no-mrpd">
				<div class="pos-relative vuse-chat-message-container">
					
					<chat-editable 
					ref="cme"
					:id="'ce_'+proj_id" 
					readonly
					disable
					disabled
					class="chat-message-editor" 
					@update="chatMessageEditor = $event" 
					type="innerHTML"
					@onEnter="sendMessage()" 
					placeholder="Type you message here..."></chat-editable>

					<v-btn color="green" 
					:loading="loading"
					@click="sendMessage()" 
					class="ma-0 send-message-btn pa-0" 
					:disabled="chatMessageEditor === null || chatMessageEditor === ''">
						<v-icon color="white">fa-paper-plane</v-icon>
					</v-btn>

				</div>
			</v-flex>
		</v-layout>
		<!-- Add message -->
		

	</div>
</div>
</template>

<script>
import ChatEditable from '@/views/Components/Editable/ChatEditable'
import Vue from 'vue'
import MsgBus from "@/bus/messaging";

import hlprs from "@/mixins/helpers";


	export default {

		mixins:[
			'hlprs',
		],

		components: {
			ChatEditable
		},

		props: {

		   proj_id: {
				type: [String, Number],
				default: null,
			},

		},

		data: () => ({
			messages:  [],
			chatMessageEditor:  null,
			loading: false,
		}),

		created() {
			this.updateChat();

			// console.log("bid",this.bid);
			// console.log("type",this.type);

			var ths = this;
			MsgBus.onNewProjectMessage(function(data){
					ths.updateChat();
			});
		},


		methods: {

			sendMessage() {

				this.loading = true;

				// send Message
				if (this.chatMessageEditor) {
				
					var payload = {};
					payload.content = this.chatMessageEditor;
					payload.type = this.getRole().name;
					payload.type_id = this.getRole().id;
					payload.id = "";

					


					console.log('payload',payload);

					this.$store.dispatch('msg/sendProjectMessage_a', payload)
					.then(response=>{
						this.updateChat();
					})
					.catch(error => {
						this.loading = false;
						console.log(error);
					});

				}
			},



			updateChat(){
				
				var payload = {};
				payload.type = "";
				payload.id = "";


				this.$store.dispatch('msg/getProjectMessages_a', payload)
				.then(response=>{
					this.messages = response;

					// console.table(response);
					
					this.resetChatEditor();
					this.scrollChat();

					this.loading = false;
				}).catch(error => {

					this.loading = false;
					// console.log('error xxx',error);

				});
			},

			resetChatEditor(){
				this.chatMessageEditor = null;
				this.$refs.cme.resetChatEditor();
			},

			scrollChat(position = 'bottom'){
				if(position == 'bottom') {
					this.$nextTick(() => {
						const container = this.$el.querySelector('.chat-container');
						container.scrollTop = container.scrollHeight;
					})
				}
			},


		},

		computed: {

			authUser () {        
				return this.$store.state.auth.auth_user;
			},



			avatarBgImage() {
			  
				if(!this.$store.state.auth.auth_user.avatar)
				// default image to be download later - https://image.flaticon.com/icons/svg/149/149071.svg
				this.$store.state.auth.auth_user.avatar = 'https://image.flaticon.com/icons/svg/149/149071.svg'

				return this.$store.state.auth.auth_user.avatar+')';
			},

			openInquiryView(){
				return 	this.$store.state.inq.openInquiryView;
			},
		},

		watch: {

			proj_id: {
				handler(nVal, oVal) {			    	
					this.updateChat();
				},
				deep: true,
			},

		},

		beforeDestroy () {
			// this.$eventBus.$off('resetChatEditor')
		},
	}
</script>

<style scoped lang="scss">

.messaging-box {
	// border: 1px solid gainsboro;

	.chat-container {

		// max-height: 300px; 
		height: 283px; 
		overflow-y: scroll;
		box-shadow: none;

		#chatscroll-thread {
			// max-height: 400px;
			// overflow: scroll;
			background-color:#fff;
			.chat-thread.end {
				// flex-direction: row;
				// .user-avatar {
				// 	text-align: left !important;
				// }
			}
			.chat-message {
				max-width: calc(90% - 50px);		
				.chat-message-name {
					font-size: 12px;
					font-weight: bold;
				}
				.chat-message-text {
					font-size: 14px;
				}
			}
		}
	}


	.vuse-chat-message-container {
		border: 0px;
		// border-top: 1px solid gainsboro;
		.chat-message-editor {
			background-color: #fff;	
		}
	}
}


</style>