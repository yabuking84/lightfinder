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

            // this.cnsl("logout_a = "+config.auth.roleIndex[this.$store.state.auth.auth_user.role]);
            // alert("logout_a = "+config.auth.roleIndex[this.$store.state.auth.auth_user.role]);
                        
            // this.$router.push("/login");
            window.location.href = "/login";

        })
        .catch(error=>{
            this.cnsl(error);           
            // this.$router.push("/login");
            window.location.href = "/login";
        });
        
	},
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
