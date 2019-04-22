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
                                :class="[authUser.uuid == message.uuid ? 'end' :'start']">
                                    <!-- <div class="user-avatar">
                                        <v-avatar size="40px" color="grey lighten-4">
                                            <img :src="[authUser.id === message.user_id ? authUser.avatar : 'http://i.pravatar.cc/32' ]" alt="avatar">
                                        </v-avatar>
                                    </div> -->
                                    <div class="chat-message pa-2 border-radius6">
                                        <div class="chat-message-name">{{ message.name }}</div>
                                        <div v-html="message.text" class="chat-message-text dont-break-out"></div>
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
                    :cmeBus="cmeBus" 
                    class="chat-message-editor" 
                    @update="chatMessageEditor = $event" 
                    type="innerHTML"                     
                    @onEnter="sendMessage2()" 
                    placeholder="Type you message .."></chat-editable>

                    <v-btn color="green" 
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


        },

        data: () => ({
        	messages:  [],
        	chatMessageEditor:  null,
        	cmeBus: new Vue(),
        }),

        created() {
		    // alert(this.authUser.uuid);
        },

        methods: {

            sendMessage() {

            	// send Message
				if (this.chatMessageEditor) {
		            this.$store.dispatch('msg/sendMessageToBid_a', {                    
	                   	user_id: this.authUser.id,
	                   	name: this.authUser.name,
	                   	text: this.chatMessageEditor,
		            }).then(response=>{
		            	this.updateChat();
		            });
				}


            },


            sendMessage2() {
				this.messages.push({			         
			         uuid: this.authUser.uuid,
			         name: this.authUser.name,
			         text: this.chatMessageEditor,					
				});

	            this.resetChat();
    			this.scrollChat();
            },


            updateChat(){
				// get bid messages
				if(this.bid!=null) {
		            this.$store.dispatch('msg/getBidMessages_a', {
	                    bid_id: this.bid.id,
		            }).then(response=>{		            	
						this.messages = response;
						
			            this.resetChat();
            			this.scrollChat();

		            });
				}            	

            },

            resetChat(){
				this.chatMessageEditor = null;
				// this.$eventBus.$emit('resetChatEditor');
				// this.$refs.cme.resetChatEditor();
				this.cmeBus.$emit('reset-chateditor');
            },
            scrollChat(){
				this.$nextTick(() => {
					const container = this.$el.querySelector('.chat-container');
					container.scrollTop = container.scrollHeight;
				})
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