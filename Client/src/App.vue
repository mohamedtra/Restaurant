<template>
  <div class="container" id="app">
    <h1>Gestionnaire de restaurants</h1>
    <br>
     <div>
       
    <md-tabs class="md-primary" >
      
      <md-tab id="tab-home" md-label="Home" md-icon="home"><router-link to="/">Home</router-link></md-tab>
      <md-tab id="tab-pages" md-label="Restaurants" md-icon="restaurant"><router-link to="/restaurants">Restaurant</router-link></md-tab>
      
      
    </md-tabs>

    <router-view></router-view>
  </div>
  <br>
    
    <!-- <router-link to="/commande">[Commander]</router-link>
    <router-link to="/menu">[Menu Chef]</router-link> -->
    
     
  </div>
</template>

<script>


export default {
  name: "app",
  components: {
    
  },
  data: function() {
    return {
      nom: "TRAORE"
    };
  },
  mounted()  {
    console.log("avant affichage");
  }
};

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  border: 5px solid blue;
}
body {
  background-image: url("./img/bg1.jpg");
  font-family: comic sans ms;
  background-color: white;
}
</style>
