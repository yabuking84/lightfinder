<template>

 <v-tour name="myTour" :steps="steps"></v-tour>
  
</template>

<script>

export default {

	data(){return{
		steps:[
			{
				target: '#vt-step-0',
				content: `<div style="margin-top:100px;">Oh LALA!</div>`,
				params: {
					placement: 'left',
				}            
			},
			{
				target: '#vt-step-1',
				content: `<div style="margin-top:100px;">Oh LALA!</div>`,
				params: {
					placement: 'right',
				}       			
			},
		],
	}},

    mounted() {
    	// this.$tours['myTour'].start();
    }	

}</script>