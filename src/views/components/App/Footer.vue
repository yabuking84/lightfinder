<template>
  	<v-footer
    :fixed="fixedFooter"
    :inset="!fixedFooter"
    :class="[!footer ? 'hide' : '', navFooterScheme]"
    style="border-top: 1px solid #e8e8e8;"
    app>
    	<div class="pa-3">&copy; {{ new Date().getFullYear() }} BuyAnyLight.com, All rights reserved.</div>
    	<v-spacer></v-spacer>
    	<!-- <div class="pa-3">Handcrafted with <v-icon right color="pink" small>favorite</v-icon></div> -->
  	</v-footer>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        fixedFooter: 'fixedFooter',
        footer: 'showFooter',
        navFooterScheme: 'navFooterScheme'
      })
    }
  }
</script>
