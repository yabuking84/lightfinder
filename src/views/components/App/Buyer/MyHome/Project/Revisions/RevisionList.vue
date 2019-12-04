<template>
<span>


		<v-list class="revision-list">
		    <template v-for="(revision,i) in revisions">
				<router-link :to="{name:package.routeName.revisionView,params:{proj_id:project.id,rev_id:revision.id}}">

			        <v-list-tile :key="'rev_'+i" avatar>

			            <v-list-tile-avatar>
							<v-icon 
							v-if="project.selected_quotation_id==revision.id"
							class="green--text mr-2">fas fa-check-circle</v-icon>
							
							<v-icon v-else 
							style="color:transparent;"
							class="mr-2">fas fa-times-circle</v-icon>

							<v-icon>far fa-file-pdf</v-icon>
			            </v-list-tile-avatar>
						
			            <v-list-tile-content>
			                <v-list-tile-title>			    				
			                	<span class="mr-3">{{ revision.revision }}</span>
			                </v-list-tile-title>
			            </v-list-tile-content>


						<v-list-tile-action>
						<v-layout row wrap>


		                    <router-link :to="{name:package.routeName.orderSamples, params:{proj_id:project.id,rev_id:revision.id}}">
		        			<v-tooltip bottom>
			        		<template #activator="{ on }">
								<v-btn v-on="on" class="black white--text" small style="min-width: 35px;">
									<v-icon style="font-size: 16px;">fas fa-box-open</v-icon>
								</v-btn>                                    
                            </template>
				    		<span>Order Samples</span>
                        	</v-tooltip>
		                    </router-link>


							<router-link :to="{name:package.routeName.revisionView,params:{proj_id:project.id,rev_id:revision.id}}">
		        			<v-tooltip bottom dark style="background-color: red;">
			        		<template #activator="{ on }">
								<v-btn v-on="on" class="black white--text ml-2" small style="min-width: 35px;">
									<v-icon style="font-size: 16px;">fas fa-search</v-icon>
								</v-btn>                                    
                            </template>
				    		<span>View Revision</span>
                        	</v-tooltip>
							</router-link>


						</v-layout>
						</v-list-tile-action>

			        </v-list-tile>

				</router-link>

		    </template>
		    <template v-if="!revisions.length">
				<h3 class="mt-5 text-xs-center">No quotations...</h3>
		    </template>

		</v-list>

	
</span>
</template>


<script>
import PackageMixin from '@/mixins/Package'


export default {
props:[
	'project',
],

mixins: [
	PackageMixin,
],

data(){return{
	revisions: [],
}},

created(){

	console.log('this.project',this.project);
	this.getRevisions();
},

methods: {

	getRevisions(){

		// console.log('this.proj_id',this.proj_id);
		this.$store.dispatch(this.getStore('myHm')+'/getQuotations_a',{
			proj_id: this.project.id,
		})
		.then((rspns)=>{
			console.log(rspns);
			this.revisions = rspns;
		})
		.catch((e)=>{
			console.log(e);
		});
	},

},


}
</script>

<style scoped lang="scss">
.revision-list	/deep/ {
	a {
		text-decoration: none;
	}
}

</style>