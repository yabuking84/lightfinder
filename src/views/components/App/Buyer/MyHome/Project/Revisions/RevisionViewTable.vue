<template>															
<v-data-table
:headers="tableSettings.headers"
:items="revision.items"
class="elevation-1 item-table">

<template #items="sp">
    <tr>
        <td>
        	<v-layout row wrap justify-start align-center>							        	    
				
				<image-view :src="sp.item.image"></image-view>

				<div>
					<h4>{{ sp.item.item_number }} - {{ sp.item.name }}</h4>
					<p class="mb-0">{{ sp.item.description }}</p>
				</div>


        	</v-layout>
        </td>
        <td>
            <h3>${{ sp.item.quantity }}</h3>
        </td>        
        <td>
            <h3>${{ currency(sp.item.price) }}</h3>
        </td>
        <td>
            <h3>${{ currency(sp.item.quantity*sp.item.price) }}</h3>
        </td>
    </tr>
</template>
</v-data-table>
</template>


<script>

</script>