<template>
  <div class="text-xs-center">
    <v-dialog
	@input="closeDialog()" 
	:value="openDialog"
	@keydown.escape="closeDialog()"
    width="500">

      <v-card>

        <v-card-text style="text-align: center;">
        	
        	<template v-if="message">        		
	        	<h3 class="ma-3 font-weight-regular">	        		
        			{{ message }}
	        	</h3>
        	</template>
        	<template v-else>
	        	<h2 class="ma-3 font-weight-regular">Update Success!</h2>
	        	<h3 class="ma-3 font-weight-regular">Please <strong>LOGOUT</strong> then <strong>LOGIN</strong> to see changes..</h3>
        	</template>


        </v-card-text>


        <v-card-actions>
			<v-spacer></v-spacer>
			<v-btn
			color="primary"
			flat
			@click="closeDialog()">
				close
          	</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
  	
  	props:['openDialog','message'],
    
    data () { return {
        
    }},

    methods:{
    	closeDialog(){
    		this.$emit('update:openDialog',false);
    	},
    },

  }
</script>