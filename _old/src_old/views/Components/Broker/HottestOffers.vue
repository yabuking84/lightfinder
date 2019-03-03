<template>
  <div>
    <v-container fluid grid-list-xl>
    	 <v-layout row>
    		<v-flex >
    			<h1 class="title">HOTTEST OFFERS</h1>
    			<v-carousel>
					<v-carousel-item multiple
						v-for="(item,i) in items"
						:key="i"
						:src="item.src">
						
							
					</v-carousel-item>
				</v-carousel>				
			</v-flex>
		</v-layout>
    </v-container>
  </div>	

</template>



<script>

export default {
	data: () => ({
		items: [
			{ src: '/static/bats/boats-uploaded/boat1.jpg' },
			{ src: '/static/boats/boats-uploaded/boat2.jpg' },
			{ src: '/static/boats/boats-uploaded/boat3.jpg' },
			{ src: '/static/boats/boats-uploaded/boat4.jpg' },
		]
	})

}
	
</script>



<style scoped lang="">

	div#test {
		height:500px;
	}

	h1.title {
		margin-bottom: 20px;
	    font-weight: bold;
	}
</style>
