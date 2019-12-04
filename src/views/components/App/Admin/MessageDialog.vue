<template>
	<div>

	    <v-dialog :value="openMessageDialog" @input="$emit('update:openMessageDialog',false)" width="35%"
>	       
	        <v-toolbar dark color="red" height="40px">
	            <v-toolbar-title class="font-weight-light subheading">
	                Conversation Box
	            </v-toolbar-title>
	            <v-spacer></v-spacer>
	            <v-btn icon @click="closeDialog()">
	                <v-icon>close</v-icon>
	            </v-btn>
	        </v-toolbar>

	        <v-layout row wrap>

	        	<v-flex xs12>
		        	   <v-card class="chat-container chatscroll-statesetter" id="chatscrollstatesetter" ref="chatscrollstatesetter">
		                <v-card-text class="transparent" id="chatscroll-thread">
		                    <v-layout row wrap>
		                        <v-flex xs12>
		                            <h3 class="font-weight-medium grey--text mt-4 mb-4 text-xs-center">Please tell us why you reject the Inquiry ?</h3>
		                        </v-flex>
		                    </v-layout>
		                </v-card-text>
		            </v-card>
	        	</v-flex>
					

				<v-flex xs12>
					<v-card>
						<v-layout row wrap class="no-mrpd">
			                <v-flex xs12 class="no-mrpd white">
			                    <div class="pos-relative vuse-chat-message-container">
			                        <chat-editable @update="chatMessageEditor = $event" class="chat-message-editor" type="innerHTML" @onEnter="sendMessage()" placeholder="Type your message .."></chat-editable>
			                        <v-btn color="green" @click="sendMessage()" class="ma-0 send-message-btn pa-0" :disabled="chatMessageEditor === null || chatMessageEditor === ''">
			                            <v-icon color="white">fa-paper-plane</v-icon>
			                        </v-btn>
			                    </div>
			                </v-flex>
			            </v-layout>  
					</v-card>
					
				</v-flex>	
	            <!-- Add Comment -->
	            
	            <!-- Add Comment -->
	        </v-layout>

	    </v-dialog>

	</div>
</template>

<script>

import ChatEditable from '@/views/Components/Editable/ChatEditable'
import inqMixin from "@/mixins/inquiry";

export default {

    mixins: [
		inqMixin,
    ],

	data() {

		return {

			chatMessageEditor: null,

		}

	},

	props: {

		openMessageDialog: {
			type: Boolean
		},

		CommentData: {
			type: Array
		},


	},

	components: {

		ChatEditable

	},
	

	beforeDestroy() {

        this.$eventBus.$off('resetChatEditor')

    },

    methods: {

    	sendMessage() {

    		if(this.chatMessageEditor)
    			console.log(this.chatMessageEditor);
    		    this.hideInquiry();


    		this.chatMessageEditor = null
    		this.$eventBus.$emit('resetChatEditor')

    	},

    	closeDialog() {

    	}


    }

}
	
</script>

<style scoped lang="">
.v-messages {
  -webkit-box-flex: 1 !important;
  -ms-flex: 1 1 auto !important;
  flex: 1 1 auto !important;
  font-size: 12px !important;
  min-height: 0px !important;
  min-width: 1px !important;
  position: relative !important;
}

</style>
