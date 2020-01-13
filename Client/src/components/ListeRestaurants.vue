<template>
  <div>
    <div class="row">
      <div class="col-8">
        <br />
        <br />
        <form class="md-layout" id="form" v-on:submit="methodForm">
          <md-card class="md-layout-item md-size-100 md-small-size-100">
            <md-card-content>
              <div class="form-group">
                <label>Nom :</label>
                <input required class="form-control" name="nom" id="nom" type="text" v-model="name" />
              </div>

              <div class="form-group">
                <label>Cuisine :</label>
                <input
                  required
                  class="form-control"
                  name="cuisine"
                  id="cuisine"
                  type="text"
                  v-model="cuisine"
                />
              </div>
            </md-card-content>

            <md-card-actions>
              <div class="form-group">
                <md-button type="submit" href class="md-raised md-primary">
                  <md-icon>add</md-icon>
                </md-button>
              </div>
            </md-card-actions>
          </md-card>
          <!-- <md-snackbar :md-active.sync="ajouterRestaurant">The name {{ cuisine }} was saved with success!</md-snackbar> -->
        </form>

        <br />
        <br />
        <p>
          <input
            class="form-control"
            placeholder="Search by restaurant name... "
            type="text"
            v-model="nameSearch"
            v-on:input="getDataFromServer()"
          />
        </p>
        <br />
        <h1>nombre de restaurants : {{ nbreResto }}</h1>
      </div>
      <div class="col-4"></div>
    </div>

    <br />
    <br />

    <div class="row">
      <div class="col-8">
        <div class="form-group">
          <label for="pagesize">
            <h6>
              Nombre de restaurants par page :
              <span class="badge badge-pill badge-primary">
                {{
                pagesize
                }}
              </span>
            </h6>
          </label>
          <div>
            <input
              type="range"
              v-model.number="pagesize"
              v-on:input="getRestaurantsFromServer()"
              class="custom-range form-control"
              min="2"
              max="100"
              step="5"
              value="10"
              id="pagesize"
            />
            {{ pagesize }}%
          </div>
        </div>
      </div>
      <div class="col-4"></div>
    </div>

    <br />
    <br />

    <H1>TABLE DE LISTE DE RESTAURANT</H1>
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Nom restaurant</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input
            placeholder="Search by name..."
            v-model="nameSearch"
            @input="getRestaurantsFromServer()"
          />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No users found"
        :md-description="`No restaurant found for this '${nameSearch}' query. Try a different search term or create a new user.`"
      >
        <md-button class="md-primary md-raised" @click="newRestau">Ajouter un restaurant</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell
          title="Afficher les détails"
          style="cursor: pointer"
          md-label="Name"
          md-sort-by="name"
        >{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Cuisine" md-sort-by="cuisine">{{ item.cuisine }}</md-table-cell>
        <md-table-cell md-label="Details">
          <router-link :to="'detail/'+item._id">Details</router-link>
        </md-table-cell>
        <md-table-cell title="Modifier" href md-label="Modifier">
          <md-button @click="getRestaurantById(item._id)" href class="md-primary">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>

        <md-table-cell title="Suprimer" href md-label="Suprimer">
          <md-button
            title="Supprimer"
            @click="supprimerRestaurant(item._id)"
            href
            class="md-primary"
          >
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <br />
    <md-button title="Première page" v-on:click="firstPage()" class="md-raised md-primary">
      <font-awesome-icon icon="fast-backward" />
    </md-button>

    <md-button
      title="Précédent"
      v-on:click="precedentDisable()"
      v-bind:disabled="precedentDisable()"
      class="md-raised md-primary"
    >
      <font-awesome-icon icon="backward" />
    </md-button>

    <md-button
      title="Suivant"
      class="md-raised md-primary"
      v-bind:disabled="suivantDisable(nbreResto)"
      v-on:click="suivant(nbreResto)"
    >
      <font-awesome-icon icon="forward" />
    </md-button>

    <md-button title="Dernière page" class="md-raised md-primary" v-on:click="lastPage()">
      <font-awesome-icon icon="fast-forward" />
    </md-button>
  </div>
</template>

<script>
import _ from "lodash";

const toLower = text => {
  return text.toString().toLowerCase();
};
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }

  return items;
  this.getRestaurantsFromServer();
};

export default {
  name: "app-liste-restaurants",
  props: {},
  data: function() {
    return {
      msg: "Bienvenue sur le site permettant de parcourir des restaurants",
      nameSearch: "",
      restaurants: [],
      name: "",
      cuisine: "",

      ids: null,
      nbreResto: 0,
      page: 1,
      pagesize: 10,
      showModal: false,
      restauSelected: null,
      apiURL: "http://localhost:8080/api/restaurants"
    };
  },
  mounted() {
    console.log("AVANT AFFICHAGE");
    this.getRestaurantsFromServer();
    console.log(this.restaurants);
  },
  methods: {
    newRestau() {
      window.location.href = "#form";
    },
    searchOnTable: _.debounce(function() {
      this.restaurants = searchByName(this.restaurants, this.search);
    }, 300),

    afficherDetailsRestau: function(restau) {
      this.restauSelected = restau;
      this.showModal = true;
    },
    getRestaurantsFromServer: function() {
      let url =
        "http://localhost:8080/api/restaurants?page=" +
        this.page +
        "&pagesize=" +
        this.pagesize +
        "&name=" +
        this.nameSearch;

      fetch(url)
        .then(reponseJSON => {
          // une reponse en Json
          reponseJSON.json().then(reponseJSON => {
            this.restaurants = reponseJSON.data;
            this.nbreResto = reponseJSON.count;
          });
        })
        .catch(err => {
          console.log("Une erreur est intervenue" + err);
        });
    },

    methodForm: function(event) {
      if (this.ids) this.modifierRestaurant(event);
      else this.ajouterRestaurant(event);
    },

    getRestaurantById: function(id) {
      console.log(id);
      let url = "http://localhost:8080/api/restaurants/" + id;

      fetch(url)
        .then(responseJSON => {
          responseJSON.json().then(res => {
            // Maintenant res est un vrai objet JavaScript

            this.name = res.restaurant.name;
            this.cuisine = res.restaurant.cuisine;
            this.ids = res.restaurant._id;
            window.location.href = "#form";
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    supprimerRestaurant: function(id) {
      let url = "http://localhost:8080/api/restaurants/" + id;

      fetch(url, {
        method: "DELETE"
      })
        .then(responseJSON => {
          responseJSON.json().then(res => {
            // Maintenant res est un vrai objet JavaScript

            this.getRestaurantsFromServer();
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    modifierRestaurant: function(event) {
      // Pour éviter que la page ne se ré-affiche
      event.preventDefault();

      let form = event.target;
      let donneesFormulaire = new FormData(form);
      let id = this.ids;

      let url = "http://localhost:8080/api/restaurants/" + id;
      fetch(url, {
        method: "PUT",
        body: donneesFormulaire
      })
        .then(responseJSON => {
          responseJSON.json().then(res => {
            // Maintenant res est un vrai objet JavaScript

            console.log(res);
            this.name = "";
            this.cuisine = "";
            this.ids = null;
            this.getRestaurantsFromServer();
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    ajouterRestaurant: function(event) {
      event.preventDefault();

      let form = event.target;

      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire
      })
        .then(responseJSON => {
          responseJSON.json().then(res => {
            // Maintenant res est un vrai objet JavaScript
            console.log(res);
            this.name = "";
            this.cuisine = "";
            this.getRestaurantsFromServer();
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    firstPage: function() {
      this.page = 1;
      this.getRestaurantsFromServer();
    },

    lastPage: function() {
      this.page =
        this.nbreResto % this.pagesize > 0
          ? parseInt(this.nbreResto / this.pagesize, 10) + 1
          : parseInt(this.nbreResto / this.pagesize, 10);
      this.getRestaurantsFromServer();
    },

    precedent: function() {
      if (this.page > 1) {
        this.page--;
        this.getRestaurantsFromServer();
      }
    },

    precedentDisable: function() {
      if (this.page > 1) return false;
      else return true;
    },

    suivant: function(count) {
      if (count - this.page * this.pagesize > 0) {
        this.page++;
        this.getRestaurantsFromServer();
      }
    },

    suivantDisable: function(count) {
      if (count - this.page * this.pagesize > 0) return false;
      else return true;
    },

    reload: function() {
      this.getRestaurantsFromServer();
      return _.debounce(this.getRestaurantsFromServer(), 1500);
    },

    getColor(index) {
      return index % 2 == 0 ? "color: yellow" : "color: green";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}

.md-field {
  max-width: 300px;
}
</style>
