import Vue from "vue";
import App from "./App.vue";
import "vuesax/dist/vuesax.css";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import * as VueGoogleMaps from 'vue2-google-maps'
import ListeRestaurants from "./components/ListeRestaurants.vue";
import RestauDetail from "./components/app-details-restaurant.vue";
import RestauMenu from "./components/app-menu-restaurant.vue";
import Home from "./components/Home.vue"




import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Import de FontAwesome
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faFastForward } from "@fortawesome/free-solid-svg-icons";
import { faFastBackward } from "@fortawesome/free-solid-svg-icons";


library.add(faForward);
library.add(faFastForward);
library.add(faBackward);
library.add(faFastBackward);

Vue.use(BootstrapVue);

Vue.component("font-awesome-icon", FontAwesomeIcon);

// config
Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use( VueGoogleMaps,
  {
     
    load : { key: "AIzaSyAso1BByLukLjxH4EOIvy6Ico99qO4ddRU" }
  })

// config du router :
const router = new VueRouter({
  routes:[
    { 
      path: '/', 
      component: Home, 
      props:{
        msg: "Bienvenue sur le site permettant de parcourir des restaurants",
      } 
    },
    { 
      path: '/restaurants', 
      component: ListeRestaurants  
    },
    { 
      path: '/detail/:id', 
      component: RestauDetail 
    },
    { 
      path: '/menu/:id', 
      component: RestauMenu 
    },
    /* { 
      path: '/commande/:id', 
      component: CommandeRestau 
    } */
  ],
  mode:'history'
});

//////////////////////////////////////////////////

/* Vue.component("app-grades", {
  props: ["date", "grade", "score"],
  data: function() {
    return {};
  },
  template: `
    <tr>
      <td>{{date}}</td>
      <td>{{grade}}</td>
      <td>{{score}}</td>
    </tr>
		`
}); */

/* Vue.component("app-restau-detail", {
  props: ["cuisine", "building", "street", "zipcode", "borough"],
  template: `
  <div>
    <p>
      Cuisine : {{cuisine}}
    </p>

    <p>
      Adresse : {{building}}, {{street}} {{zipcode}} {{borough}}
    </p>
  </div>
	`
}); */


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
