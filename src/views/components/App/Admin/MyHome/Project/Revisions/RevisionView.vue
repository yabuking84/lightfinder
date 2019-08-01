<template>
<span>
	<v-container fluid grid-list-xl>
		<v-layout row wrap>
			
			<v-flex xs12 class="white--text">
				<router-link :to="{name:'AdminMyHome'}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						My Home
					</h3>
				</router-link> 
				/
				<router-link :to="{name:'AdminMyHomeProject', params:{proj_id:proj_id}}">
					<h3 
					class="white--text d-inline-block mr-2"
					style="border-bottom: 1px solid;">
						Project {{ proj_id }}
					</h3>
				</router-link> 
				/
				<h3 class="d-inline-block ml-2">Revision {{ rev_id }} </h3>
			</v-flex>

			<v-flex xs12>

				<v-card>
					<v-card-text class="item-box">
					<v-layout row wrap>						  

						<v-flex xs12>
							<v-layout row wrap justify-space-between align-center py-3 px-3>
								<h1 class="d-inline-block">
									{{ revision.revision }} <span class="font-weight-regular title">({{ rev_id }})</span>
								</h1>

								<div>
									<router-link :to="{name:'AdminMyHomeOrderSamples', params:{proj_id:proj_id,rev_id:rev_id}}">
										<v-btn class="black white--text">
											Samples Ordered
										</v-btn>
				                    </router-link>

									<router-link :to="{name:'AdminMyHomeEditRevision',params:{proj_id:proj_id,rev_id:rev_id}}">
										<v-btn class="black white--text">
											<v-icon class="mr-1" style="font-size: 16px;">fas fa-edit</v-icon>
											Edit Revision
										</v-btn>
			                        </router-link>
								</div>

		                	</v-layout>
						</v-flex>

						<v-flex xs4>
							<revision-view-summary :revision="revision"></revision-view-summary>
						</v-flex>

						<v-flex xs8>
							<revision-view-table :revision="revision"></revision-view-table>
						</v-flex>

						<v-flex xs12>
							<v-card>
								<v-card-text>
									<messaging :proj_id="proj_id"></messaging>
								</v-card-text>
							</v-card>					
						</v-flex>

					</v-layout>

					</v-card-text>
				</v-card>

			</v-flex>
		</v-layout>
	</v-container>





</span>	
</template>

<script>
import RevisionViewTable from "@/views/Components/App/Admin/MyHome/Project/Revisions/RevisionViewTable";
import RevisionViewSummary from "@/views/Components/App/Admin/MyHome/Project/Revisions/RevisionViewSummary";
import Messaging from "@/views/Components/App/Admin/MyHome/Project/ProjectViewMessagingBox"

export default {

	components:{
		Messaging,
		RevisionViewTable,
		RevisionViewSummary,
	},

	data() { return {

		revision: {},
	}},

	computed:{
		proj_id(){
			return this.$route.params.proj_id;
		},
		rev_id(){
			return this.$route.params.rev_id;
		},
	},

	created(){
		this.getRevision();	
	},

	methods: {

	    getRevision(){
	    	this.$store.dispatch(this.getStore('myHm')+'/getQuotation_a',{
	    		proj_id: this.proj_id,
	    		rev_id: this.rev_id,
	    	})
	    	.then((rspns)=>{
	    		this.revision = rspns;
	    	})
	    	.catch((e)=>{
	    		console.log(e);
	    	});
	    },

	},


}	
</script>


<style scoped lang="scss">

.item-table /deep/ {
	width: 100%;
	table {
		thead {
			th {
				.v-icon {
					margin-left: 10px;
				}
			}
		}
		tbody {
			tr {
				td {
					img {
						// width: 150px;
						// margin-left: 0px;
						// margin-right: 20px;
						// margin-top: 20px;
						// margin-bottom: 20px;
					}
				}
			}
		}
	}
}	
</style>