<template>
	<div>
		<v-container fluid grid-list-xl>
			<v-layout row wrap>
				<v-flex>
					<h3 class="white--text">My Home</h3>
				</v-flex>
				<v-flex xs12>
					<project-table>
						<template #project-link="sp">
							<router-link :to="{name:'AdminMyHomeProject', params:{proj_id:sp.item.id}}">
								<v-btn color="black" class="white--text" style="min-width:50px;">
									<v-icon style="font-size: 1em;">fas fa-search</v-icon>
								</v-btn>
							</router-link>
						</template>						
					</project-table>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>



<script>


import ProjectTable from '@/views/Components/App/MyHome/ProjectTable'


export default {
	components: {
		ProjectTable,
	},

	data: () => ({
		
	}),

}

</script>



