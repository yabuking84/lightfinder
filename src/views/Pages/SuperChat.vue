<template>
	<div>
		<v-container fluid>
			<v-layout row wrap ma-5>
 		   		<v-flex xs12 pa-4 >
			  		<v-card class="pa-4">
			  	  	   <v-flex xs4>
			  	  	   <v-text-field  label="Chat Name" v-model="name"></v-text-field>
			  	  	   </v-flex>
			  	  	   <br><br><br>
			  	  	   <div id="messages" v-html="messages"  class="pl-3 pr-3 ma-3" style="height:35vh;overflow-y: auto;"></div>
			  	  	   <br><br><br>
			  	  	   <v-textarea flat outline v-model="message" @keypress.enter="sendNotification()"></v-textarea>
			  	  	   <br><br><br>
			  	  	   <v-btn @click="sendNotification()">send</v-btn>
			  	  	</v-card> 
		  		</v-flex>
		  	</v-layout>
		</v-container>
	</div>
</template>

<script>




// import OpenInquiry from '@/views/'
export default {

	components: {

	},

	data: () => ({
		isConnected: false,
		
		messages: "",
		message: "",
		name: "CHOTISILOLI",
	}),

	created() {

	},

	methods: {

		sendNotification() {

			this.$socket.emit('sendMessageSuperChat', {message:this.message, name:this.name});

	    	this.messages = this.messages+"<h3 style='text-align:right;'>"+this.message+"</h3>";
			this.message = "";

			var container = this.$el.querySelector("#messages");
            let options = {
                container: '#messages',
                easing: 'ease-in',
                offset: container.scrollHeight,
                force: true,
                cancelable: true,
                onStart: function(element) {
                  // scrolling started
                },
                onDone: function(element) {
                  // scrolling is done
                },
                onCancel: function() {
                  // scrolling has been interrupted
                },
                x: false,
                y: true
            }
            this.$scrollTo('#messages',1, options);
	    	

		}		
	},

	sockets: {
	    connect() {
            // Fired when the socket connects.
            this.isConnected = true;
        },

        disconnect() {
            this.isConnected = false;
        },

	    // Fired when the server sends something on the "messageChannel" channel.
	    sendMessageSuperChat(data) {
	    	// var dataName = (data.name)?data.name:"CHOTISILOLI";
	    	this.messages = this.messages+"<h3 style='text-align:left;'>"+data.name+": "+data.message+"</h3>";
			var container = this.$el.querySelector("#messages");
            let options = {
                container: '#messages',
                easing: 'ease-in',
                offset: container.scrollHeight,
                force: true,
                cancelable: true,
                onStart: function(element) {
                  // scrolling started
                },
                onDone: function(element) {
                  // scrolling is done
                },
                onCancel: function() {
                  // scrolling has been interrupted
                },
                x: false,
                y: true
            }
            this.$scrollTo('#messages',1, options);
	    	
	    },

	},

	watch: {
		isConnected(nVal){
			this.cnsl("socket connection = "+nVal);
		},
	},


}

</script>