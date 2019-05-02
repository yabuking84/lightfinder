<template>
<div>

	<div class="messaging-box">
        <v-card color="transparent" style="" class="chat-container">
            <v-card-text class="" id="chatscroll-thread">  

                <v-layout row wrap class="pa-0">
                    <v-flex xs12 pt-0 v-for="(message, key) in messages" :key="key">
                        <v-card flat class="overflow-hidden transparent">
                            <v-container fluid grid-list-xs class="pa-0">

                                <div 
                                class="chat-thread" 
                                :class="[message.own?'end':'start']">
                                    <!-- <div class="user-avatar">
                                        <v-avatar size="40px" color="grey lighten-4">
                                            <img :src="[authUser.id === message.user_id ? authUser.avatar : 'http://i.pravatar.cc/32' ]" alt="avatar">
                                        </v-avatar>
                                    </div> -->
                                    <div class="chat-message pa-2 border-radius6">
                                        <!-- <div class="chat-message-name">{{ message.name }}</div> -->
                                        <div v-html="message.content" class="chat-message-text dont-break-out"></div>
                                    </div>
                                </div>

                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>

                <v-layout row wrap v-if="!messages.length">
                    <v-flex xs12>
                        <h2 class="font-weight-medium grey--text mt-1 mb-1 text-xs-center">Start A Conversation Now</h2>
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
                    readonly
                    disable
                    disabled
                    class="chat-message-editor" 
                    @update="chatMessageEditor = $event" 
                    type="innerHTML"
                    @onEnter="sendMessage()" 
                    :isFocused="isFocused"
                    placeholder="Type you message .."></chat-editable>

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


    export default {

    	components: {
            ChatEditable
    	},

        props: {

            inquiry: {
                type: Object,
                default: null,
            },

            bid: {
                type: Object,
                default: null,
            },

            isFocused: {
                type: Boolean,
                default: false,
            },


        },

        data: () => ({
        	messages:  [],
        	chatMessageEditor:  null,
        	loading: false,
        }),

        created() {
		    this.updateChat();

	    	console.log("created "+this.bid.id+" isFocused",this.isFocused);

		    var self = this;
		    MsgBus.onNewMessage(function(data){

				// if message box is bid
				if(self.bid!=null && self.bid.id == data.id) {
		    		console.log("BID onNewMessage = ",data);
					self.updateChat();
				}				
				else if(self.inquiry!=null && self.inquiry.id == data.id) {
		    		console.log("INQUIRY onNewMessage = ",data);
					self.updateChat();
				}

		    });
        },

        methods: {

            sendMessage() {

            	this.loading = true;

            	// send Message
				if (this.chatMessageEditor) {
            	
	            	var payload = {};
	            	payload.content = this.chatMessageEditor;
	            	payload.type = "";
	            	payload.id = "";

					if(this.bid!=null) {					
						payload.type = 'bid.buyer.admin';
						payload.id = this.bid.id;
					}
					else if(this.inquiry!=null) {					
						payload.type = 'inquiry.buyer.admin';
						payload.id = this.inquiry.id;					
					}

		            this.$store.dispatch('msg/sendMessage_a', payload)
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

				if(this.bid!=null) {					
					payload.type = 'bid.buyer.admin';
					payload.id = this.bid.id;
				}
				else if(this.inquiry!=null) {					
					payload.type = 'inquiry.buyer.admin';
					payload.id = this.inquiry.id;					
				}

				this.$store.dispatch('msg/getMessages_a', payload).then(response=>{
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
				// this.$eventBus.$emit('resetChatEditor');
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

        },

        watch: {

        	bid: {
			    handler(nVal, oVal) {			    	
		    		this.updateChat();
			    },
		    	deep: true,
        	},

        	inquiry: {
			    handler(nVal, oVal) {			    	
		    		this.updateChat();
			    },
		    	deep: true,
        	},

			isFocused(nVal, oVal){
		    	console.log("watch "+this.bid.id+" isFocused",nVal);			
			},

        },

	    beforeDestroy () {
	    	// this.$eventBus.$off('resetChatEditor')
	    },
    }
</script>

<style scoped lang="scss">

.messaging-box {
	border: 1px solid gainsboro;

	.chat-container {

		max-height: 300px; 
	  	overflow-y: scroll;
	  	box-shadow: none;

		#chatscroll-thread {
		    // max-height: 400px;
		    // overflow: scroll;
		    background-color:#fff;
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