<template>
</template>


<script>
import config from '@/config/index'

export default {

	data: () => ({

	}),

	methods: {

	},

	created: function() {
        this.$store.dispatch('auth/logout_a')
        .then(response=>{

            // console.log("logout_a = "+config.auth.roleIndex[this.$store.state.auth.auth_user.role]);
            // alert("logout_a = "+config.auth.roleIndex[this.$store.state.auth.auth_user.role]);
                        
            this.$router.push({name:'Login'});
        })
        .catch(error=>{
            console.log(error);           
            this.$router.push({name:'Login'});
            // this.$router.push({name:'Login'});
        });
        
	},
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
