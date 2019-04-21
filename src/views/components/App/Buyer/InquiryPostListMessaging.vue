<template>
<div>

<div class="messages">
    <div class="messages_wrapper_classes">
        

        <div 
        class="message"
        v-for="message in messages">

            <div class="avatar">
                <img :src="message.avatar" alt="">
            </div>
            <div class="text">
                <a class="username" href="#">
                    @[[ message.name ]]
                </a> 
                <span>[[ message.text ]]</span>
            </div>

        </div>

    </div>
    <hr>
    <div class="reply">
        <div class="avatar">
            <img :src="avatarBgImage" alt="">
        </div>
        <input 
            type="text" 
            v-model.trim="reply" 
            class="reply--text" 
            placeholder="Leave a message..."
            maxlength="250"
            required
            @keyup.enter="sendMessage()"
        />
        <button 
            class="reply--button" 
            @click.prevent="sendMessage()">
            <i class="fa fa-paper-plane"></i> Send
        </button>
    </div>
</div>

</div>
</template>

<script>


    export default {


        props: {

            inquiry: {
                type: Object
            },

            bid: {
                type: Object
            },


        },

        data: () => ({
        	reply: '',
        	messages:  [],
        }),

        beforeDestroy() {


        },

        methods: {

            sendMessage() {

                if (this.chatMessageEditor) {
                    this.messages.push({

                       user_id: this.authUser.id,
                       name: this.authUser.name,
                       avatar: "",
                       text: this.reply,

                    });
                }

                this.chatMessageEditor = null;

                this.$nextTick(() => {
                	const container = this.$el.querySelector('.messages');
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

    }
</script>

<style scoped lang="scss">
#chatscroll-thread {
    // max-height: 400px;
    // overflow: scroll;
}

.chat-container {
	max-height: 300px; 
  	overflow-y: scroll;
}

.messages {
	.avatar {
		display: inline-block;
		img {
			width: 40px;
		}
	}
}


</style>