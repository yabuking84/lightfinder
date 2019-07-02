import { store } from '@/store'
import config from '@/config/index'
import helpers from '@/mixins/helpers'



export default  (to, from, next) => {

	// this.cnsl('auth/isLoggedIn_g xxxxxxxxx');
	// this.cnsl(store.getters['auth/isLoggedIn_g']);
	
	// this.cnsl('auth/role xxxxxxxxx');
	// this.cnsl(store.state.auth.auth_user.role);
	
	// this.cnsl('meta role xxxxxxxxx');
	// this.cnsl(to.matched[to.matched.length-1].meta.role);

	// this.cnsl('meta redirectToRole xxxxxxxxx');
	// this.cnsl(to.matched[to.matched.length-1].meta.redirectToRole);

	// this.cnsl('to.matched xxxxxxxxx');
	// this.cnsl(to.matched);

	// this.cnsl('zzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
	// this.cnsl('zzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
		// console.log('xxxxxxxxxxxxxxxxxxxxx');

	if (to.matched.some(record => record.meta.requiresAuth)) {

		// console.log('xxxxxxxxx');
		// if not logged in then logout user
		if (!store.getters['auth/isLoggedIn_g']) {
			// console.log('LOGOUT!!!!!!!!!!!!!!!!!!!!!! 1');
			next({name: 'Logout'});
		}		
		// when / is accessed it should redirect to homepage of logged in user
		else if(to.matched[to.matched.length-1].meta.redirectToRole){

			// console.log('store.state.auth.auth_user.role',store.state.auth.auth_user.role);
			// console.log('config.auth.role.buyer.id',config.auth.role.buyer.id);

			if(store.state.auth.auth_user.role==config.auth.role.admin.id){            	
				// console.log('AdminHome');
				next({name: 'AdminHome'})
			}
			else if(store.state.auth.auth_user.role==config.auth.role.buyer.id) {
				// console.log('BuyerHome');
				next({name: 'BuyerHome'});
			}
			else if(store.state.auth.auth_user.role==config.auth.role.supplier.id) {
				// console.log('SupplierHome');
				next({name: 'SupplierHome'})
			}
			else {
				// console.log('LOGOUT!!!!!!!!!!!!!!!!!!!!!!');
				next({name: 'Logout'})
			}
		}

		// if route is not for current user then logout user
		else if(to.matched[to.matched.length-1].meta.role != store.state.auth.auth_user.role){
			// console.log('LOGOUT!!!!!!!!!!!!!!!!!!!!!! 3');
			next({name: 'Logout'})
		}

		else {
			next()
		}

	} 

	else if(!to.matched.length) {
		next({name: 'Home'});
	} 

	else {
		next() // make sure to always call next()!
	}
}

