<template>
  <v-navigation-drawer
    class="pb-0 vuse-sidebar google-material"
    :class="[navDrawerAlphaMod ? 'alpha' : '', navDrawerScheme, navDrawerVariant ? 'google-material-effect' : '']"
    persistent
    fixed
    width="260"
    :mini-variant="navMiniVarient"
    :clipped="clipped"
    v-model="drawer"
    :left="navDrawerPosition === 'left'"
    :right="navDrawerPosition === 'right'"
    enable-resize-watcher
    floating
    id="app-drawer"
    app>



    <!-- Drawer Toolbar -->
    <v-toolbar flat class="text-xs-center z-index-2">
        <v-list>
            <v-list-tile>

            	<v-list-tile-avatar >
            		<img src="/static/logos/logo-white.png" id="nav_logo_square" :title="title">
            	</v-list-tile-avatar>
            	
            	<v-list-tile-content>
            		<!-- <img src="/static/logos/logo-white.png" id="nav_logo" :title="title"> -->
            		<v-list-tile-title class="headline">BuyAnyLight.com</v-list-tile-title>
            	</v-list-tile-content>

            	<!-- <v-list-tile-content>
            		<img src="/static/logos/liliwaters-logo-white.png" id="nav_logo">
            	</v-list-tile-content> -->

            </v-list-tile>
        </v-list>
    </v-toolbar>















    <!-- Drawer Items -->
    <v-list
      dense="dense"
      expand="expand"
      class="nav-drawer"
      id="app-sidebar"
    >



    <template v-for="(item, i) in items">

        <!-- single items -->
        <v-list-tile
        :to="!item.href ? { name: item.name } : null"
        :href="item.href"
        :disabled="item.disabled"
        :target="item.target"
        :key="`${i}-item`"
        ripple
        rel="noopener"
        class="list__tile-solo">

            <v-list-tile-action>
                <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                <v-avatar size="28" v-else>
                    <span>{{ item.title | first2Char }}</span>                    
                </v-avatar>
            </v-list-tile-action>

            <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>

        </v-list-tile>


    </template>










      <v-spacer class="mb-5"></v-spacer>




        <v-list-tile>
        <v-layout align-end justify-end fill-height/>
            <v-btn icon light class="hidden-md-and-down" @click.stop="toggleMiniVariantMode">
                <v-tooltip bottom v-if="navMiniVarient" color="sidebar">
                    <v-icon slot="activator">fas fa-arrow-circle-right</v-icon>
                    <span>Expand</span>
                </v-tooltip>
                <v-tooltip bottom v-else color="sidebar">
                    <v-icon slot="activator">fas fa-arrow-circle-left</v-icon>
                    <span>Collapse</span>
                </v-tooltip>
            </v-btn>
        </v-layout>
        </v-list-tile>


        <!-- <v-list-tile>
        <v-layout align-end justify-end fill-height/>
            <v-btn icon light class="hidden-md-and-down" @click="logout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-layout>
        </v-list-tile> -->

    </v-list>




  </v-navigation-drawer>
</template>






























<script>
    import {mapGetters} from 'vuex';
    import {camel} from '@/utils/helpers';

    export default {
        data() { return {
                items: this.$route.meta.items,
                dark: false,
                // navMiniVarientData: this.navMiniVarient,
                title: "BuyAnyLight.com",
		}},
        mounted() {
            // const ps = document.getElementById('app-drawer')
            // ps.addEventListener('mouseenter', this.miniEnterVariantHandler)
            // ps.addEventListener('mouseleave', this.miniLeaveVariantHandler)
        },
        beforeDestroy() {

            // disable mouseover expand
            // const ps = document.getElementById('app-drawer')
            // if (ps) {
            //     ps.removeEventListener('mouseenter', this.miniEnterVariantHandler)
            //     ps.removeEventListener('mouseleave', this.miniVariantHandler)
            // }
        },
        computed: {
            ...mapGetters({
                clipped: 'navClipped',
                navDrawer: 'navDrawer',
                navMiniVarient: 'navMiniVarient',
                navDrawerPosition: 'navDrawerPosition',
                navDrawerScheme: 'navDrawerScheme',
                navDrawerAlphaMod: 'navDrawerAlphaMod',
                navDrawerAlphaImg: 'navDrawerAlphaImg',
                navDrawerVariant: 'navDrawerVariant',
                fixedFooter: 'fixedFooter',
                showFooter: 'showFooter',
                miniview: 'miniview'
            }),

            // navMiniVarient:{
            //     get() {
            //         return this.$store.getters['navMiniVarient'];
            //     },
            //     set(val) {
            //         this.$store.dispatch('toggleMiniVarient');                    
            //     }
            // },

            // activemenu() {
            //     return this.$vuetify.theme.activemenu
            // },
            drawer: {
                get() {
                    return this.navDrawer
                },
                set(value) {
                    this.$store.dispatch('toggleDrawer', value)
                }
            }
        },
        methods: {

            toggleMiniVariantMode () {
                this.$store.dispatch('toggleMiniVariantMode')
                this.$store.dispatch('toggleMiniVarient')

                this.cnsl(this.navMiniVarient);
            },

            // miniEnterVariantHandler() {
            //     // if it's tab or small devive then it won't listen this event
            //     if (this.miniview && this.navMiniVarient === true && this.$vuetify.breakpoint.mdAndDown === false) {
            //         this.$store.dispatch('toggleMiniVarient', false)
            //         // const container = document.querySelector('#app-sidebar')
            //         // container.scrollTop = 0
            //     }
            // },
            // miniLeaveVariantHandler() {
            //     // if it's tab or small devive then it won't listen this event
            //     if (this.miniview && this.navMiniVarient === false && this.$vuetify.breakpoint.mdAndDown === false) {
            //         this.$store.dispatch('toggleMiniVarient', true)
            //         // const container = document.querySelector('#app-sidebar')
            //         // container.scrollTop = 0
            //     }
            // },
            // genChildTarget(item, subItem) {
            //     if (subItem.href) return
            //     if (item.component) {
            //         return {
            //             name: item.component,
            //             params: {
            //                 section: item.group,
            //                 component: subItem.name
            //             }
            //         }
            //     }
            //     return {
            //         name: `${item.group}/${camel(subItem.name)}`
            //     }
            // },

            logout() {
                this.$router.push({name:'Logout'});                
            },

        }
    }
</script>








<style scoped lang="scss">

.v-avatar {
    border-radius: 0px;
    img {
        border-radius: 0px;
        height: auto;
        width: 100%;        
    }
}

.headline {
    font-size: 20px !important;
    font-weight: 400;
    line-height: 20px !important;    
}

    
</style>


