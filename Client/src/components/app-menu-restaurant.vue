<template>
  <div>
    <h3>Menu du  Restaurant: {{restaurant.name}}</h3>

    <div id="menuPicker">
      <div>
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title">Nos entrees</h1>
          </md-table-toolbar>

          <md-table-row>
            <md-table-head>Entrees</md-table-head>
            <md-table-head>Prix</md-table-head>
            <md-table-head>Qantite</md-table-head>
          </md-table-row>

          <md-table-row v-for="(e,index) in tab_entrees" :key="index">
            <md-table-cell md-label="Entrees">{{e.entree}}</md-table-cell>
            <md-table-cell md-label="Prix">{{e.prix}} €</md-table-cell>
            <md-table-cell md-label="Quantite">
              <md-button v-on:click="increase_quantity(index, tab_entrees)">
                <md-icon>add</md-icon>
              </md-button>
              <input
                readonly
                type="number"
                name="value_quantity"
                min="0"
                max="100"
                v-bind:value="e.qu"
              />
              <md-button v-on:click="decrese_quantity(index, tab_entrees)">
                <md-icon>remove</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>

      <br />

      <div>
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title">Nos plats</h1>
          </md-table-toolbar>

          <md-table-row>
            <md-table-head>Plats</md-table-head>
            <md-table-head>Prix</md-table-head>
            <md-table-head>Qantite</md-table-head>
          </md-table-row>

          <md-table-row v-for="(p, index) in tab_plats" :key="index">
            <md-table-cell md-label="Plats">{{p.plat}}</md-table-cell>
            <md-table-cell md-label="Prix">{{p.prix}} €</md-table-cell>
            <md-table-cell md-label="Quantite">
              <md-button v-on:click="increase_quantity(index, tab_plats)">
                <md-icon>add</md-icon>
              </md-button>
              <input
                readonly
                type="number"
                name="value_quantity"
                min="0"
                max="100"
                v-bind:value="p.qu"
              />
              <md-button v-on:click="decrese_quantity(index, tab_plats)">
                <md-icon>remove</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>

      <br />

      <div>
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title">Nos Desserts</h1>
          </md-table-toolbar>

          <md-table-row>
            <md-table-head>Desserts</md-table-head>
            <md-table-head>Prix</md-table-head>
            <md-table-head>Qantite</md-table-head>
          </md-table-row>

          <md-table-row v-for="(d, index) in tab_desserts" :key="index">
            <md-table-cell md-label="Plats">{{d.dessert}}</md-table-cell>
            <md-table-cell md-label="Prix">{{d.prix}} €</md-table-cell>
            <md-table-cell md-label="Quantite">
              <md-button v-on:click="increase_quantity(index, tab_desserts)">
                <md-icon>add</md-icon>
              </md-button>
              <input
                readonly
                type="number"
                name="value_quantity"
                min="0"
                max="100"
                v-bind:value="d.qu"
              />
              <md-button v-on:click="decrese_quantity(index, tab_desserts)">
                <md-icon>remove</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
    <br />
    <div id="commande" style="display : none">
      <app-commande-restaurant :products="shoppingCart" @commandSent="shoppingCart = []; total = 0"></app-commande-restaurant>
    </div>

    <div>
      <h3 v-if="total != 0">TOTAL A PAYER (TTC)  {{ total }} € </h3>
      <h3 v-else>Votre panier est vide</h3>
    </div>
    <md-button
      class="md-raised md-primary"
      v-on:click="RedirectUrl()"
    >Retour a la fiche detail du restaurant</md-button>
    <md-button class="md-raised md-primary" v-on:click="passezCommande()">Passez commande</md-button>
  </div>
</template>

<script>
import CommandeRestau from "./app-commande-restaurant.vue";
export default {
  name: "app-menu-restaurant",
  components: {
    "app-commande-restaurant": CommandeRestau
  },
  data() {
    return {
      restaurant: {},
      cuisine: "",
      name: "",
      nameRecherche: "",
      id: this.$route.params.id,
      grades: [],
      building: "",
      street: "",
      zipcode: "",
      borough: "",
      r: {
        name: "",
        cuisine: "",
        borough: ""
      },
      a: {
        building: "",
        street: "",
        zipcode: ""
      },
      tab_entrees: [],
      tab_plats: [],
      tab_desserts: [],
      entrees: {
        entree: [
          "salade chevre chaud",
          "poivrons grillee",
          "salade nicoise",
          "feuillete chevre",
          "salade tomates mozarella",
          "escargot",
          "farcie nicois",
          "bruchceta",
          "charcuterie",
          "quiche lorraine"
        ],
        prix: [10, 12, 9, 5, 8, 12, 10, 10, 14, 10]
      },
      plats: {
        plat: [
          "pizza fromage",
          "pizza reine",
          "bouchee a la reine",
          "veloute de carotte",
          "escalope de veau sauce forestiere",
          "faux filet",
          "tomate farcie",
          "moule frites",
          "pene a la norvegienne",
          "escalope milanaise"
        ],
        prix: [10, 9, 15, 12, 19, 20, 14, 15, 10, 17]
      },
      desserts: {
        dessert: [
          "banana split",
          "glace vanille",
          "tiramisu",
          "boule coco",
          "creme brulee",
          "moelleux chocolat",
          "fraise melba",
          "faisselle",
          "fromage",
          "tarte tatin"
        ],
        prix: [8, 6, 9, 5, 7, 6, 9, 4, 6, 8]
      },
      value_quantity: 0,
      total: 0,
      shoppingCart: []
    };
  },
  mounted() {
    this.genererURL();
    this.getRestaurantById();
    this.genererMenu();
  },
  methods: {
    genererURL() {
      var rd = this.getRandomInt(10);
      this.url = require("../img/r" + rd + ".jpg");
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
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
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    genererMenu() {
      /*

            creer un tableau avec les valeurs prerentrer
            trois tableaux en tout : entree plat dessert (10 choix different dans chaque)
            un algo qui tire un nombre aleatoire entre 0 et 9, cinq fois pour chaque tableau
                        (5 choix different pour les trois tableau : 5 entrees, 5 plats, 5 desserts)
            creer trois nouveaux tableaux avec chacun leur 5 choix
            Afficher ces trois nouveaux tableaux

        */

      var rd;
      var obj = {};
      var ent = "";
      var pr = 0;
      for (var i = 0; i < 5; i++) {
        rd = this.getRandomInt(10);
        ent = this.entrees.entree[rd];
        pr = this.entrees.prix[rd];
        obj = { entree: ent, prix: pr, qu: 0 };
        this.tab_entrees.push(obj);
        ent = this.plats.plat[rd];
        pr = this.plats.prix[rd];
        obj = { plat: ent, prix: pr, qu: 0 };
        this.tab_plats.push(obj);
        ent = this.desserts.dessert[rd];
        pr = this.desserts.prix[rd];
        obj = { dessert: ent, prix: pr, qu: 0 };
        this.tab_desserts.push(obj);
      }
    },

    RedirectUrl() {
      var CheminComplet = document.location.href;
      var tab = CheminComplet.split("/");
      var url = tab[0] + "/detail/" + tab[4];
      window.location.replace(url);
    },
    increase_quantity(index, tab) {
      tab[index]["qu"]++;
      this.total = this.total + tab[index]["prix"];
    },
    decrese_quantity(index, tab) {
      if (tab[index].qu > 0) {
        tab[index].qu--;
        this.total = this.total - tab[index]["prix"];
      }
    },
    passezCommande() {
      this.shoppingCart = [];
      addOrederedElementsToShoppingCart.bind(this)();

      let menuPicker = this.$el.querySelector("#menuPicker");
      let commande = this.$el.querySelector("#commande");

      this.toggleVisibility(menuPicker);
      this.toggleVisibility(commande);

      ///////////////////////////////////////////////////////

      function addOrederedElementsToShoppingCart() {
       

        pushOrderedElements.bind(this)(this.tab_entrees);
        pushOrderedElements.bind(this)(this.tab_plats);
        pushOrderedElements.bind(this)(this.tab_desserts);

        //////////////////////////////////////////////////////

        function pushOrderedElements(array) {
          if (array) {
            array.forEach(dish => {
              if (dish.qu > 0) {
                let type = dish.entree || dish.plat || dish.dessert;

                let dishCopy = { ...dish };
                delete dishCopy.entree;
                delete dishCopy.plat;
                delete dishCopy.dessert;

                this.shoppingCart.push({ ...dishCopy, type });
              }
            });
          }
        }
      }
    },
    toggleVisibility(htmlElement) {
      console.log("css avant", htmlElement.style.display);
      htmlElement.style.display === "none"
        ? (htmlElement.style.display = "block")
        : (htmlElement.style.display = "none");
      console.log("css après", htmlElement.style.display);
    }
  }
};
</script>

<style>
table {
  border-radius: 10px;
  border: none;
  border-collapse: none;
  margin: auto;
}

.content {
  border: 1px solid 878177;
  border-radius: 10px;
  color: #665e52;
  font-size: 15px;
}

.title {
  border: 1px solid 878177;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  font-size: 25px;
  color: #595157;
}

td {
  text-align: center;
  padding: 5px;
  border-radius: 10px;
}

</style>
