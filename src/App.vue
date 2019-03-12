<template>
    <v-app :dark="colorScheme.dark" :class="colorScheme.scheme">

        <router-view name="header"/>
        <router-view name="sidebar"/>

        <v-content>
            <router-view/>
        </v-content>


        <router-view name="footer"/>
    </v-app>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      subDrawer: false
    }
  },
  computed: {
    ...mapGetters({
      colorScheme: 'colorScheme'
    })
  },
  components: {

  },
  methods: {
    
  }
}
</script>




