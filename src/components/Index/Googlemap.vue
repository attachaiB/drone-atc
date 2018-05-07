<template lang="html">
  <div id="map"></div>
</template>

<script>
export default {
  methods: {
    initMap () {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 13.748335, lng: 100.567150},
        zoom: 6
      })
    }
  },
  mounted () {
    this.initMap()
    // var map
    // function initMap () {
    //   map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: -34.397, lng: 150.644},
    //     zoom: 8
    //   })
    // }
  }
}
</script>

<style lang="css" scoped>
#map {
  margin-top: 20px;
  height:500px;
  width: 100%;
}
</style>
