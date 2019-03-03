<template>
  <v-layout row wrap class="add-comment">
    <v-flex xs12 class="pos-relative pl-5">
      <v-avatar size="36px" class="pos-absolute">
        <img :src="authUser.avatar" :alt="authUser.name">
      </v-avatar>
      <v-textarea
        flat
        solo
        auto-grow
        v-model="comment"
        class="clean-textarea no-details white py-0 pl-5"
        placeholder="Your comment ..."
      ></v-textarea>
      <v-btn color="blue" dark class="ml-0" @click.stop="submit">Add Comment</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import {authUser} from '@/data/dummyData'
  export default {
    data () {
      return {
        authUser,
        comment: null
      }
    },
    methods: {
      submit () {

      }
    }
  }
</script>
