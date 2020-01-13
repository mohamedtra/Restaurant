<template>
  <div>
    <h3>Detail du restaurant : {{restaurant.name}}</h3>

    <div class="rowContainer">
      <img class="img" v-bind:src="url" />

      <GmapMap :center="coordinates" :zoom="7" map-type-id="terrain" class="map">
        <GmapMarker :position="coordinates" :clickable="true" :draggable="true" />
      </GmapMap>

      <div>
        <p>Cuisine : {{restaurant.cuisine}}</p>

        <p>Adresse : {{restaurant.address.building}}, {{restaurant.address.street}} {{restaurant.address.zipcode}} {{restaurant.borough}}</p>
      </div>
      <div>
        
        <div>
          <md-table md-card>
            <md-table-toolbar>
              <h1 class="md-title">Note(s)</h1>
            </md-table-toolbar>

            <md-table-row>
              <md-table-head>Date</md-table-head>
              <md-table-head>Grade</md-table-head>
              <md-table-head>Score</md-table-head>
            </md-table-row>

            <md-table-row v-for="(g,index) in grades" :key="index">
              <md-table-cell md-label="Date">{{g.date}}</md-table-cell>
              <md-table-cell md-label="Grade">{{g.grade}}</md-table-cell>
              <md-table-cell md-label="Score">{{g.score}}</md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>

    <div class="menuDiv">
      <router-link class="button" :to="`/menu/${restaurant._id}`">Voir le menu</router-link>
    </div>
  </div>
</template>


<script>
export default {
  name: "app-details-restaurant",

  data() {
    return {
      restaurant: {},
      url: "",
      id: this.$route.params.id,
      grades: [],
      coordinates: {
        lat: "",
        lng: ""
      }
    };
  },
  components: {},
  mounted() {
    this.genererURL();
    this.getRestaurantById();
  },

  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    genererURL() {
      var rd = this.getRandomInt(10);
      this.url = require("../img/r" + rd + ".jpg");
    },
    getRestaurantById: function() {
      console.log(this.id);
      let url = "http://localhost:8080/api/restaurants/" + this.id;

      fetch(url)
        .then(responseJSON => {
          responseJSON.json().then(res => {
            // Maintenant res est un vrai objet JavaScript
            console.log(res);
            this.restaurant = res.restaurant;

            res.restaurant.grades.forEach(grade => {
              let date = new Date(grade.date);
              let noMonth = date.getMonth();
              let noDay = date.getDay();
              let noYear = date.getFullYear();

              grade.date = `${noDay} - ${noMonth} - ${noYear}`;
              this.grades.push(grade);
            });
            this.coordinates.lat = this.restaurant.address.coord[0];
            this.coordinates.lng = this.restaurant.address.coord[1];
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
