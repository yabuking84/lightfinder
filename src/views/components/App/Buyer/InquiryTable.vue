<template>
<div>

  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
    </template>
  </v-data-table>
	
</div>	
</template>


<script>


export default {
	data(){return{
        headers: [
	        { text: 'Calories', value: 'calories' },
	        { text: 'Fat (g)', value: 'fat' },
	        { text: 'Carbs (g)', value: 'carbs' },
	        { text: 'Protein (g)', value: 'protein' },
        ],

        desserts: [
			{
	            name: 'Frozen Yogurt',
	            calories: 159,
	            fat: 6.0,
	            carbs: 24,
	            protein: 4.0,
	        },
	        {
	            name: 'Ice cream sandwich',
	            calories: 237,
	            fat: 9.0,
	            carbs: 37,
	            protein: 4.3,
	        },
        ],

	}},
}	

</script>