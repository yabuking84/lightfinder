import { store } from '@/store'
import config from '@/config/index'



export default  (to, from, next) => {

    // console.log('auth/isLoggedIn_g xxxxxxxxx');
    // console.log(store.getters['auth/isLoggedIn_g']);
    
    // console.log('auth/role xxxxxxxxx');
    // console.log(store.state.auth.auth_user.role);
    
    // console.log('meta role xxxxxxxxx');
    // console.log(to.matched[to.matched.length-1].meta.role);

    // console.log('meta redirectToRole xxxxxxxxx');
    // console.log(to.matched[to.matched.length-1].meta.redirectToRole);

    // console.log('to.matched xxxxxxxxx');
    // console.log(to.matched);

    // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
    // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzz');

    if (to.matched.some(record => record.meta.requiresAuth)) {

        // if not logged in then logout user
        if (!store.getters['auth/isLoggedIn_g']) {
            next({name: 'Logout'})
        } 
        
        // when / is accessed it should redirect to homepage of logged in user
        else if(to.matched[to.matched.length-1].meta.redirectToRole){
            if(store.state.auth.auth_user.role==config.auth.role.admin.id)
            next({name: 'AdminHome'})
            if(store.state.auth.auth_user.role==config.auth.role.buyer.id)
            next({name: 'BuyerHome'})
            else
            next({name: 'Logout'})
        }

        // if route is not for current user then logout user
        else if(to.matched[to.matched.length-1].meta.role != store.state.auth.auth_user.role){
            next({name: 'Logout'})
        }

        else {
            next()
        }

    } 

    else if(!to.matched.length) {
        // console.log("Rote does not exist!");
        next({name: 'Home'});
    } 

    else {
        next() // make sure to always call next()!
    }
}

