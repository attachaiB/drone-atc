<template lang="html">
  <div id="map"></div>
</template>

<script>
export default {
  methods: {
    initMap () {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
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
        height: 100%;
      }
#myMap {
  height:300px;
  width: 100%;
}
</style>
