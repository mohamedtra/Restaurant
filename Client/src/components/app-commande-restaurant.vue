<template>
  <div>
    <div>
      <md-table md-card>
        <md-table-toolbar>
          <h1 class="md-title">VOTRE COMMANDE</h1>
        </md-table-toolbar>

        <md-table-row>
          <md-table-head>MENU</md-table-head>
          <md-table-head>PRIX</md-table-head>
          <md-table-head>QANTITE</md-table-head>
        </md-table-row>

        <md-table-row v-for="aProduct in products" :key="aProduct.plat">
          <md-table-cell md-label="Plats">{{ aProduct.type }}</md-table-cell>
          <md-table-cell md-label="Prix">{{ aProduct.prix }}</md-table-cell>
          <md-table-cell md-label="Qantite">{{ aProduct.qu }}</md-table-cell>
        </md-table-row>
      </md-table>
    </div>

    <div
      v-if="products.length == 0"
      style="margin:auto;width:50%;text-align:center;"
    >Votre panier est vide</div>

    <div>
      <md-button @click="validateCommand()">Valider</md-button>

      <div id="message"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-commande-restaurant",
  props: ["products"],

  methods: {
    validateCommand() {
      
      this.$el.querySelector("#message").innerText =
        "Votre commande a été envoyé.";
      this.$emit("commandSent");
    }
  }
};
</script>

<style>
table {
  border-spacing: 20px;
}


button {
  background: #cdb1b2;
  color: #7e3d4e;
  padding: 15px;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  border: 0;
  border-radius: 50px;
}

#message {
  color: lightcoral;
}
</style>
