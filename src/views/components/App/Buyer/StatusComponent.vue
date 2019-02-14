<template>

	<div v-if="status == 'open' ">
		 <v-btn flat @click="dialog = true" value="left" class="v-btn--active">                    
		    <span class="ml-1 white--text font-weight-light subheading">{{ props.status }}</span>
		</v-btn>
	</div>   
	
	<div v-else-if="status === 'verifying' ">
		 <v-btn flat @click="dialog = true" value="left" class="v-btn--active">                    
		    <span class="ml-1 white--text font-weight-light subheading">{{ status }}</span>
		</v-btn>
	</div>   

	<div v-else-if="status === 'verifying' ">
		 <v-btn flat @click="dialog = true" value="left" class="v-btn--active">                    
		    <span class="ml-1 white--text font-weight-light subheading">{{ status }}</span>
		</v-btn>
	</div>   

	<div v-else>
		 <v-btn flat @click="dialog = true" value="left" class="v-btn--active">                    
		    <span class="ml-1 white--text font-weight-light subheading">{{ status }}</span>
		</v-btn>
	</div>   

</template>

<script>
	export default {
		props: [`status`],
		data: function () {
			return {
				dialog: false
			}
		},

		methods: {

		}
	}
</script> 
