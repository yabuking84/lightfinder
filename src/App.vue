<template>
    <v-app 
    :dark="colorScheme.dark" 
    :class="colorScheme.scheme">

        <router-view name="header"/>
        <router-view name="sidebar"/>

        <v-content :style="style">

            <router-view/>
        </v-content>


        <router-view name="footer"/>

        
        <router-view name="dialog"/>

    </v-app>
</template>
<script>
import { mapGetters } from 'vuex'

export default {

components: {

},

data () { return {
	subDrawer: false
}},

computed: {
	...mapGetters({
		colorScheme: 'colorScheme'
	}),

	style(){
		
		if(this.$route.meta.style) {			
			return this.$route.meta.style;
		} 
		else {			
			return {};
		}
	},

},


methods: {

}

}
</script>
