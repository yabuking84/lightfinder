import axios from 'axios'
import router from '@/router'

import config from '@/config/index'


const base_url = config.main.appUrl;

const state = {

  api: {

    get: {


      method: 'get',

      /*
        get all supplier
      */
      getAllSupplier: {

        url: base_url + '/v1/admin/suppliers'

      },



      /*
        get single supplier
      */
      getSupplier: {

        url: base_url + '/v1/admin/suppliers'

      },


      /*get supplier categories*/

      getSupplierCategories: {

        url: base_url + '/v1/admin/suppliers'

      }



    },

    /*
      post single supplier
    */

    post: {

      method: 'post',

      addSupplier: {
        url: base_url + '/v1/admin/suppliers',
      },

      addSupplierCategories: {
        url: base_url + '/v1/admin/suppliers'

      }

    },


    /*

      update single supplier

    */


    patch: {

      method: 'patch',

      editSupplier: {

        url: base_url + '/v1/admin/suppliers'

      }
    },




    /*
      delete an id
    */

    delete: {


      method: 'delete',
      deleteCategories: {

        url: base_url + '/v1/admin/suppliers'

      }

    },









  },

  token: localStorage.getItem('access_token') || null,

  axios: {

    config: {
      headers: { 'Authorization': "bearer" + (localStorage.getItem('access_token') || null) }
    }
  },


}





const mutations = {

}



const getters = {

}




const actions = {











  /* GET */


  getSupplier_a(context, data) {

    return new Promise((resolve, reject) => {

      var headers = { token: localStorage.access_token }


      axios({

          method: state.api.get.method,
          url: state.api.get.getSupplier.url + '/' + data.data.id,
          headers: headers

        })
        .then(response => {

          resolve(response.data);

        })
        .catch(error => {

          if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {

            console.log("EXPIRED");
            router.push({ 'name': 'Logout' })

          } else {

            reject(error);

          }

        })

    });

  },














  getSupplierCat_a(context, data) {


    return new Promise((resolve, reject) => {

      var headers = { token: localStorage.access_token }

      axios({

          method: state.api.get.method,
          url: state.api.get.getSupplierCategories.url + '/' + data.data.id + '/categories',
          headers: headers

        })
        .then(response => {

          resolve(response.data);

        })
        .catch(error => {

          if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {

            console.log("EXPIRED");
            router.push({ 'name': 'Logout' })

          } else {

            reject(error);

          }

        })


    });

  },



















  getAllSupplier_a() {



    return new Promise((resolve, reject) => {

      var headers = { token: localStorage.access_token }

      axios({

          method: state.api.get.method,
          url: state.api.get.getAllSupplier.url,
          headers: headers

        })
        .then(response => {

          resolve(response.data);

        })
        .catch(error => {

          if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {

            console.log("EXPIRED");
            router.push({ 'name': 'Logout' })

          } else {

            reject(error);

          }

        })


    });


  },
































  /* POST */

  addSupplier_a(context, data) {


    return new Promise((resolve, reject) => {

      var headers = {
        token: localStorage.access_token,
        "content-type": "application/json",
      };

      axios({

          method: state.api.post.method,
          url: state.api.post.addSupplier.url,
          headers: headers,
          data: JSON.stringify(data.data)

        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {

          if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
            console.log("EXPIRED")
            router.push({ 'name': 'Logout' })
          } else {
            console.log("normal error!")
            reject(error)
          }

        });

    });

  },



  addSupplierCat_a(context, data) {

    return new Promise((resolve, reject) => {

      var headers = {

        token: localStorage.access_token,
        "content-type": "application/json",
      }

      axios({

          method: state.api.post.method,
          url: state.api.post.addSupplierCategories.url + '/' + data.data.id + '/categories',
          headers: headers,
          data: JSON.stringify(data.data)

        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {

          if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
            console.log("EXPIRED")
            router.push({ 'name': 'Logout' })
          } else {
            console.log("normal error!")
            reject(error)
          }

        });

    });


  },




  /* PATCH */

  updateSUpplier_a(context, data) {


    return new Promise((resolve, reject) => {

      var headers = {
        token: localStorage.access_token,
        "content-type": "application/json",
      };

      axios({

          method: state.api.patch.method,
          url: state.api.patch.editSupplier.url + "/" + data.data.id,
          headers: headers,
          data: JSON.stringify(data.data)
        })

        .then(response => {
          resolve(response.data);
        })
        .catch(error => {

          if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
            console.log("EXPIRED")
            router.push({ 'name': 'Logout' })
          } else {
            console.log("normal error!")
            reject(error)
          }

        });

    })

  },















  /* DELETE */


  deleteCat_a(context, data) {

    return new Promise((resolve, reject) => {

      var headers = {
        token: localStorage.access_token,
        "content-type": "application/json",
      };

      axios({

          method: state.api.delete.method,
          url: state.api.delete.addSupplierCategories.url + '/' + data.data.id + '/categories',
          headers: headers,
          data: JSON.stringify(data.data)

        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {

          if (typeof error.response !== "undefined" && error.response.data.error == "Provided token is expired.") {
            console.log("EXPIRED")
            router.push({ 'name': 'Logout' })
          } else {
            console.log("normal error!")
            reject(error)
          }

        });

    })

  }



}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
