<template>
<v-container pt-0 fluid grid-list-xl>
<!-- <div> -->

<v-layout mb-3 mt-2 row wrap justify-space-between align-center>
	<h4 class="white--text">Project Inquiries</h4>
	<create-project-inquiry></create-project-inquiry>
</v-layout>


<v-layout row wrap justify-space-between align-center>
<v-data-iterator 
:items="items" 
:rows-per-page-items="rowsPerPageItems" 
:pagination.sync="pagination" 
content-tag="v-layout" 
row wrap>
    <template v-slot:item="sp">
        <v-flex xs6 >
            <v-card>
                <v-card-title>
                	<v-layout row wrap justify-space-between align-center>
	                    <h2 class="ma-2" style="line-height: normal;">
	                    	{{ sp.item.project_name }} <br>
	                    	<span style="font-size: 0.8em; font-weight: normal;">
	                    		{{ sp.item.project_no }}
	                    	</span>
	                    </h2>

	                    <router-link :to="{name:'BuyerMyHomeProject', params:{proj_ref:sp.item.project_no}}">
		                    <v-btn color="black" class="white--text" style="min-width:50px;">
		                    	<v-icon style="font-size: 1em;">fas fa-search</v-icon>
		                    </v-btn>
	                    </router-link >
                	</v-layout>
                </v-card-title>
                
                <v-divider></v-divider>

                <v-card-text>
                	<v-layout row wrap>
                		<v-flex xs6>                			
                			<span class="body-1 mr-2">Project Type: </span>
                			<span class="subheading font-weight-bold">{{ sp.item.project_type }}</span>
                		</v-flex>
                		<v-flex xs6>                			
                			<span class="body-1 mr-2">Target Budget: </span>
                			<span class="subheading font-weight-bold">${{ currency(sp.item.target_budget) }}</span>
                		</v-flex>
                	</v-layout>
					<p class="mt-2" style="min-height: 150px;">{{ sp.item.description }}</p>
                </v-card-text>                
            </v-card>
        </v-flex>
    </template>
</v-data-iterator>
</v-layout>

<!-- </div> -->
</v-container>
</template>



<script>
import CreateProjectInquiry from '@/views/Components/App/Buyer/MyHome/CreateProjectInquiry'



export default {

components:{
	CreateProjectInquiry,
},

data:() => ({  
    rowsPerPageItems:[  
        4,
        8,
        12
    ],
    pagination:{  
        rowsPerPage:4
    },
    items:[],

}),

created(){
	// this.cnsl('PIT');
	this.getItems();
},

methods:{

	getItems(){
		this.$store.dispatch(this.getStore('myHm')+'/getProjectInquiries_a')
		.then((rspns)=>{
			this.items = rspns;
		})
		.catch((e)=>{
			this.cnsl(e);
		});

	}

},



}
</script>



