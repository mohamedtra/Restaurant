<template>
  <div>
   <h1>{{msg}}</h1>
   <b-carousel :data="data"></b-carousel>
  </div>
  

</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  data() {
    return {
      data: [
          '<div class="example-slide">Slide 1</div>',
          '<div class="example-slide">Slide 2</div>',
          '<div class="example-slide">Slide 3</div>',
        ],
    };
  },
  
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .example-slide {
    align-items: center;
    background-color: #666;
    color: #999;
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    min-height: 10rem;
  }
</style>
