// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
import router from '@/router'



const state = {
    api_url: {
        login: "http://192.168.1.205/liliwatersapi/public/api/v1/auth/login",
        logout: "http://192.168.1.205/liliwatersapi/public/api/v1/auth/logout",
    },
    token: localStorage.getItem('access_token') || null,
    axios: {
        config: {
            headers: {'Authorization': "bearer " + (localStorage.getItem('access_token') || null)},
        },
    },
    auth_user: {
        name:      localStorage.getItem('name') || null,
        firstname: localStorage.getItem('firstname') || null,
        lastname:  localStorage.getItem('lastname') || null,
        email:     localStorage.getItem('email') || null,
        avatar:    localStorage.getItem('avatar') || null,
        role:      localStorage.getItem('role') || null,
    },
}

const mutations = {

    SET_TOKEN_M(state, token){
        state.token = token;
    },

    DESTROY_TOKEN_M(state){
        state.token = null;
    },

    SET_AUTHUSER_M(state,user) {
        state.auth_user.name       = user.data.firstname+" "+user.data.lastname;
        state.auth_user.firstname  = user.data.firstname;
        state.auth_user.lastname   = user.data.lastname;
        state.auth_user.email      = user.data.email;
        state.auth_user.avatar     = user.avatar;
        state.auth_user.role       = user.role;
    },

    DESTROY_AUTHUSER_M(state) {
        state.auth_user.name       = null;
        state.auth_user.firstname  = null;
        state.auth_user.lastname   = null;
        state.auth_user.email      = null;
        state.auth_user.avatar     = null;
        state.auth_user.role       = null;
    },


    CHANGE_TEST_M(state,data){
        state.auth_user.name = data;
    },

}

    
const actions = {

    retrieveToken_a(context,data){
        // alert(data.username+" "+data.password);
        // alert(state.api_url.login);

        return new Promise((resolve, reject) => {
            // var url = "https://almani.ddns.net:2024/liliwatersapi/public/api/v1/auth/jwtlogin";
            var url = state.api_url.login;

            var payload = {
                email: data.username,
                password: data.password,
            };

            axios({
                method: 'post',
                url: url,
                data: payload,
            })
            .then(response => {

                const token = response.data.access_token.token;
                const user = response.data.user;
                
                // set token
                localStorage.setItem('access_token',token);
                context.commit('SET_TOKEN_M',token);

                // set user details
                localStorage.setItem('name'       ,user.data.firstname+" "+user.data.lastname);
                localStorage.setItem('firstname'  ,user.data.firstname);
                localStorage.setItem('lastname'   ,user.data.lastname);
                localStorage.setItem('email'      ,user.data.email);
                localStorage.setItem('avatar'     ,user.avatar);
                localStorage.setItem('role'       ,user.role);
                context.commit('SET_AUTHUSER_M',response.data.user);

                resolve(response);
            })
            .catch(error => {
                reject(error)
            })

        });
    },


    destroyToken_a(context){
        if(context.getters.isLoggedIn_g) {

            return new Promise((resolve, reject) => {
                var url = state.api_url.logout;
                var headers = state.axios.config.headers;

                axios({
                    method: 'post',
                    url: url,                      
                    headers: headers,
                })
                .then(response => {                        
                    // localStorage.removeItem('access_token');
                    localStorage.clear();
                    context.commit('DESTROY_TOKEN_M');
                    context.commit('DESTROY_AUTHUSER_M');
                    resolve(response);
                })
                .catch(error => {
                    localStorage.clear();
                    context.commit('DESTROY_TOKEN_M');
                    context.commit('DESTROY_AUTHUSER_M');
                    reject(error)
                })
            });
        }

    },

    loginSuccess_a(context,response){

        // console.log(response.data.user.role);
        
        if(response.data.user.role == 3) 
        router.push({name:'AdminHome'});
        else if(response.data.user.role == 1) 
        router.push({name:'OwnerHome'});
        else if(response.data.user.role == 2) 
        router.push({name:'BrokerHome'});
        else
        router.push({name:'Login'});

    },
}


const getters = {
	isLoggedIn_g(state){
	    return state.token !== null;
	}
}


export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions	
}