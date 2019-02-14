<template>

	<div v-if="status == 'Open' ">
		 <v-btn small flat @click="dialog = true" value="left" class="v-btn--active pink lighten-1 font-weight-light">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
		</v-btn>
	</div>   
	
	<div v-else-if="status === 'Confirmation' ">
		 <v-btn small flat @click="dialog = true" value="left" class="v-btn--active blue darken-4">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
		</v-btn>
	</div>   

	<div v-else-if="status === 'Verifying' ">
		 <v-btn small flat @click="dialog = true" value="left" class="v-btn--active orange darken-3">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
		</v-btn>
	</div>   

	<div v-else-if="status === 'Rejected' ">
		 <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active red darken-3">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
		</v-btn>
	</div>   

	<div v-else-if="status === 'Production' ">
		 <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active blue darken-3">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
		</v-btn>
	</div>  

	<div v-else-if="status === 'Shipment' ">
		 <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active green darken-3">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
		</v-btn>
	</div>  

	<div v-else-if="status === 'Receiving' ">
		 <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active orange darken-3">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
		</v-btn>
	</div>  

	<div v-else-if="status === 'Return' ">
		 <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active red darken-3">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
		</v-btn>
	</div>  

	<div v-else-if="status === 'Cancelled' ">
		 <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active red accent-3">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
		</v-btn>
	</div>  

	<div v-else-if="status === 'Success' ">
		 <v-btn  small flat @click="dialog = true" value="left" class="v-btn--active teal accent-3">                    
		    <span class="ml-1 white--text font-weight-light ">{{ status }}</span>
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
