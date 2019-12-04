<template>
<span>


		<v-list class="revision-list">
		    <template v-for="(revision,i) in revisions">

			        <v-list-tile :key="'rev_'+i" avatar @click="">

			            <v-list-tile-avatar>
							<v-icon>far fa-file-pdf</v-icon>
			            </v-list-tile-avatar>
						
			            <v-list-tile-content>
			                <v-list-tile-title>			    				
			                	<span class="mr-3">{{ revision.revision }}</span>
			                </v-list-tile-title>
			            </v-list-tile-content>


						<v-list-tile-action>
							<v-layout row wrap>
							  
		                    <router-link :to="{name:package.routeName.orderSamples, params:{proj_id:proj_id,rev_id:revision.id}}">
		        			<v-tooltip bottom dark>
			        		<template #activator="{ on }">
								<v-btn v-on="on" class="black white--text" small style="min-width: 35px;">
									<v-icon style="font-size: 16px;">fas fa-box-open</v-icon>
								</v-btn>                                    
                            </template>
				    		<span>Samples Ordered</span>
                        	</v-tooltip>
		                    </router-link>


							<router-link :to="{name:package.routeName.revisionEdit,params:{proj_id:proj_id,rev_id:revision.id}}">
		        			<v-tooltip bottom dark>
			        		<template #activator="{ on }">
								<v-btn v-on="on" class="black white--text ml-2" small style="min-width: 35px;">
									<v-icon style="font-size: 16px;">fas fa-edit</v-icon>
								</v-btn>                                    
                            </template>
				    		<span>Edit Revision</span>
                        	</v-tooltip>
	                        </router-link>


							<router-link :to="{name:package.routeName.revisionCopy,params:{proj_id:proj_id,rev_id:revision.id}}">
		        			<v-tooltip bottom dark>
			        		<template #activator="{ on }">
								<v-btn v-on="on" class="black white--text ml-2" small style="min-width: 35px;">
									<v-icon style="font-size: 16px;">fas fa-clone</v-icon>
								</v-btn>                                    
                            </template>
				    		<span>Copy Revision</span>
                        	</v-tooltip>
	                        </router-link>

							<router-link :to="{name:package.routeName.revisionView,params:{proj_id:proj_id,rev_id:revision.id}}">
		        			<v-tooltip bottom dark>
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


		    </template>
		</v-list>

	
</span>
</template>


<script>
import prjctEvntBs from '@/bus/project'
import PackageMixin from '@/mixins/Package'


export default {
props:[
	'proj_id',
],
mixins: [PackageMixin],

data(){return{
	revisions: [],
}},

created(){
	this.getRevisions();
	prjctEvntBs.onRefreshRevisionTable(()=>{
		this.getRevisions();		
	});

},

methods: {

	getRevisions(){
		// console.log('getRevisions');
		this.$store.dispatch(this.getStore('myHm')+'/getQuotations_a',{
			proj_id: this.proj_id,
		})
		.then((rspns)=>{
			// console.log(rspns);
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
	    cursor: default;
	}

	.v-list__tile__avatar {
		min-width: 40px;
	}
}
</style>