import { store } from '@/store'



export default  (to, from, next) => {

    // console.log('auth/isLoggedIn_g xxxxxxxxx');
    // console.log(store.getters['auth/isLoggedIn_g']);
    
    // console.log('auth/role xxxxxxxxx');
    // console.log(store.state.auth.auth_user.role);
    
    // console.log('meta role xxxxxxxxx');
    // console.log(to.matched[to.matched.length-1].meta.role);

    // console.log('to.match xxxxxxxxx');
    // console.log(to.matched);


    if (to.matched.some(record => record.meta.requiresAuth)) {

        // if not logged in then logout user
        if (!store.getters['auth/isLoggedIn_g']) {
            next({name: 'Logout'})
        } 
        // if route is not for current user then logout user
        else if(to.matched[to.matched.length-1].meta.role != store.state.auth.auth_user.role){
            next({name: 'Logout'})
        }
        else {
            next()
        }

    } else {
        next() // make sure to always call next()!
    }
}

