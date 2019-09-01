<template>															
<v-data-table
:headers="tableSettings.headers"
:items="revision.items"
class="elevation-1 item-table">

<template #items="sp">
    <tr>
        <td>
        	<v-layout row wrap justify-start align-center>							        	    
				
				<image-view
				v-if="sp.item.image"
				width="70px" height="70px" 
				:src="sp.item.image"></image-view>

				<div>
					<h4>{{ sp.item.item_number }} - {{ sp.item.name }}</h4>
					<p class="mb-0">{{ sp.item.description }}</p>
				</div>


        	</v-layout>
        </td>
        <td>
            <h4>{{ sp.item.quantity }} pcs</h4>
        </td>        
        <td>
            <h4>${{ currency(sp.item.price) }}</h4>
        </td>
        <td>
            <h4>${{ currency(sp.item.quantity*sp.item.price) }}</h4>
        </td>
    </tr>
</template>
</v-data-table>
</template>


<script>
import ImageView from "@/views/Components/App/Buyer/MyHome/ImageView";

export default {
	components:{
		ImageView,		
	},

	props: {
		'revision': {
			type: Object,
			default: ()=>{},
		}
	},

	data(){return{

		tableSettings: {
	        headers: [
	        	{
	        	  text: 'Details',
	        	  align: 'left',
	        	  value: 'item_number',
	        	  sortable: true,
	        	},
	        	{
	        	  text: 'Unit Price',
	        	  align: 'left',
	        	  value: 'price',
	        	  sortable: true,
	        	  width: '50px',
	        	},
	        	{
	        	  text: 'Quantity',
	        	  align: 'left',
	        	  value: 'quantity',
	        	  sortable: true,
	        	  width: '50px',
	        	},
	        	{
	        	  text: 'Total Price',
	        	  align: 'left',
	        	  value: 'price',
	        	  sortable: true,
	        	  width: '50px',
	        	},
	        ],
		},	

	}},

}
</script>