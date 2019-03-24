<template>
  <v-toolbar
    :fixed="fixedToolbar"
    v-if="toolbar"
    :class="navToolbarScheme"
    :clipped-left="toolbarClippedLeft"
    app
    flat>

    
    <!-- <v-toolbar-side-icon
      class="hidden-lg-and-up"
      @click.stop="$store.dispatch('toggleDrawer', ! navDrawer)"></v-toolbar-side-icon>
    <v-toolbar-title v-text="title" class="ml-0 hidden-lg-and-up"></v-toolbar-title>
    <v-btn
      icon
      light
      class="hidden-md-and-down"
      @click.stop="toggleMiniVariantMode"
    >
      <v-tooltip bottom v-if="navMiniVarient" color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-right</v-icon>
        <span>Expand</span>
      </v-tooltip>
      <v-tooltip bottom v-else color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-left</v-icon>
        <span>Collapse</span>
      </v-tooltip>
    </v-btn> -->


    <!-- <v-btn icon :to="{name: 'Contacts'}" flat>
      <v-icon>contacts</v-icon>
    </v-btn>
    
    <v-btn icon :to="{name: 'Chat'}" flat>
      <v-icon>chat</v-icon>
    </v-btn>  -->


                <!-- <v-icon>far fa-bell</v-icon> -->

    <v-menu offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
            <v-btn flat v-on="on">
                <v-badge color="red">
                    <template v-slot:badge>
                        <span>{{ notifications.length }}</span>
                    </template>
                    <v-icon>far fa-bell</v-icon>
                </v-badge>
            </v-btn>

        </template>
        <v-list v-if="notifications && notifications.length">
            <v-list-tile v-for="(notification, i) in notifications" :key="i" @click="">
                <v-list-tile-title>{{ notification.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>







    <v-spacer></v-spacer>
    
    <v-menu offset-x>
      <v-avatar slot="activator" size="40">
        <div :style="avatarBgImage">
            <!-- <img :src="authUser.avatar" :alt="authUser.name"> -->
        </div>
      </v-avatar>
      
      <v-list dense>

        <v-list-tile avatar>
          <v-list-tile-avatar>
                <div :style="avatarBgImage">
                </div>
                <!-- <img :src="authUser.avatar" :alt="authUser.name"> -->
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-text="authUser.name"></v-list-tile-title>
            <v-list-tile-sub-title v-if="authUser.role==roles.admin.id">Administrator</v-list-tile-sub-title>
            <v-list-tile-sub-title v-else-if="authUser.role==roles.buyer.id">Buyer</v-list-tile-sub-title>

            <v-list-tile-sub-title v-else-if="authUser.role==roles.supplier.id">Supplier</v-list-tile-sub-title>

            <v-list-tile-sub-title v-else>Unknown</v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>

        <br>
        
        <v-divider></v-divider>

        <v-list-tile @click="() => {}">
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Edit Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-avatar>
            <v-icon>settings_applications</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-avatar>
            <v-icon>mail</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Inbox</v-list-tile-title>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile @click="logout()">
          <v-list-tile-avatar>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>

    </v-menu>
  </v-toolbar>
</template>














<script>

import { mapGetters } from 'vuex'
import config from '@/config/index'

// console.log(config);

export default {
data: () => ({
    title: 'BuyAnyLight.com',
    roles: config.auth.role,
}),


computed: {
    ...mapGetters({
        navDrawer: 'navDrawer',
        toolbarClippedLeft: 'toolbarClippedLeft',
        fixedToolbar: 'fixedToolbar',
        toolbar: 'toolbarVisibility',
        navToolbarScheme: 'navToolbarScheme',
        navMiniVarient: 'navMiniVarient'
    }),
    authUser () {        
        return this.$store.state.auth.auth_user;
    },

    testVuex () {        
        return this.$store.state.auth.test_vuex;
    },

    avatarBgImage() {
      
      if(!this.$store.state.auth.auth_user.avatar)
      // default image to be download later - https://image.flaticon.com/icons/svg/149/149071.svg
      this.$store.state.auth.auth_user.avatar = 'https://image.flaticon.com/icons/svg/149/149071.svg'

        return {
            backgroundImage:'url('+this.$store.state.auth.auth_user.avatar+')',
        };
    },

    notifications(){
        var retVal = null;
        var auth_user_role = this.$store.state.auth.auth_user.role;

        if(auth_user_role==config.auth.role.buyer.id) {
            retVal = this.$store.state.byrInq.notifications;
        }
        else if(auth_user_role==config.auth.role.supplier.id) {
            retVal = this.$store.state.spplrInq.notifications;
        }
        else {
            retVal = [];
        }

        return retVal;

    },
},


methods: {
    toggleMiniVariantMode () {
      this.$store.dispatch('toggleMiniVariantMode')
      this.$store.dispatch('toggleMiniVarient')
    },
    logout() {
        this.$router.push({name:'Logout'});                
    },

},



}
</script>



<style lang="scss" scoped>

.v-avatar {
    div {
        overflow: hidden;
        height: 100%;
        width: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-size: cover;
        background-position: center;
        border-radius: 50%;
        img {
            height: auto;
            border-radius: 0;
        }
    }
}
</style>
