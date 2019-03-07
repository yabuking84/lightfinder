<template>
</template>


<script>

export default {

	data: () => ({

	}),

	methods: {

	},

	created: function() {
        this.$store.dispatch('auth/destroyToken_a')
        .then(response=>{
            this.$router.push({name:'Login'});
        })
        .catch(error=>{
            this.$router.push({name:'Login'});
        });
	},
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
