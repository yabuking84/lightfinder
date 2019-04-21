<template>
<div>

        <v-card color="transparent" style="" class="chat-container">
            <v-card-text class="transparent" id="chatscroll-thread">  

                <v-layout row wrap class="pa-0">
                    <v-flex xs12 v-for="(comment, key) in commentData" :key="key">
                        <v-card flat class="overflow-hidden transparent">
                            <v-container fluid grid-list-xs class="pa-0">
                                <div class="chat-thread" :class="[authUser.id === comment.user_id ? 'end' :'start']">
                                    <div class="user-avatar">
                                        <v-avatar size="40px" color="grey lighten-4">
                                            <img :src="[authUser.id === comment.user_id ? authUser.avatar : 'http://i.pravatar.cc/32' ]" alt="avatar">
                                        </v-avatar>
                                    </div>
                                    <div class="chat-message pa-2 border-radius6">
                                        <div class="body-2">{{ comment.name }}</div>
                                             <div v-html="comment.message" class="chat-thread-message dont-break-out"></div>
                                    </div>
                                </div>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>

                <v-layout row wrap v-if="!commentData.length">
                    <v-flex xs12>
                        <h2 class="font-weight-medium grey--text mt-1 mb-1 text-xs-center">Start A Conversation Now</h2>
                    </v-flex>
                </v-layout>

            </v-card-text>
        </v-card>

        <!-- Add Comment -->
        <v-layout row wrap class="no-mrpd">
            <v-flex xs12 class="no-mrpd">
                <div class="pos-relative vuse-chat-message-container">
                    <chat-editable v-model="chatMessageEditor" class="chat-message-editor" type="innerHTML" @onEnter="sendMessage()" placeholder="Type you message .."></chat-editable>
                    <v-btn color="green" @click="sendMessage()" class="ma-0 send-message-btn pa-0" :disabled="chatMessageEditor === null || chatMessageEditor === ''">
                        <v-icon color="white">fa-paper-plane</v-icon>
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
        <!-- Add Comment -->

</div>
</template>

<script>

    import ChatEditable from '@/views/Components/Editable/ChatEditable'

    export default {

        components: {

            ChatEditable,          

        },

        props: {

            inquiry: {
                type: Object
            },

            bid: {
                type: Object
            },


        },

        data: () => ({

            chatMessageEditor: null,
            commentData: [],
        }),

        beforeDestroy() {


        },

        methods: {

            sendMessage() {

                if (this.chatMessageEditor) {
                    this.commentData.push({

                       user_id: this.authUser.id,
                       name: this.authUser.name,
                       message: this.chatMessageEditor

                    });
                }

                this.chatMessageEditor = null;

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
</style>