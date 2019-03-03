<template>
  <div>
    <v-container fluid grid-list-xl>
    	 <v-layout row>
    		<v-flex >
    			<h1 class="title">TRENDING</h1>

				<carousel>

				  	<img v-for="(item,i) in items"
						:key="i"
						:src="item.src">

				</carousel>

			</v-flex>
		</v-layout>
    </v-container>
  </div>	

</template>



<script>

export default {	
	data: () => ({
		items: [
			{ src: '/static/boats/boats-uploaded/boat1.jpg' },
			{ src: '/static/boats/boats-uploaded/boat2.jpg' },
			{ src: '/static/boats/boats-uploaded/boat3.jpg' },
			{ src: '/static/boats/boats-uploaded/boat4.jpg' },
		]
	})

}
	
</script>



<style scoped lang="scss">

	div#test {
		height:500px;
	}

	h1.title {
		margin-bottom: 20px;
	}

	img {
		width: 100%;
	}
</style>
