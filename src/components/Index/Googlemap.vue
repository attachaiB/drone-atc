<template lang="html">
  <div id="map"></div>
</template>

<script>
export default {
  data () {
    return {
      area: {
      },
      drones: [
        ['Drone_1', 13.7479166, 100.5674581, 1],
        ['Drone_2', 13.7476128, 100.5674581, 2]
      ],
      temp: '',
      temp2: ''
    }
  },
  methods: {
    initMap () {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 13.748008, lng: 100.567423},
        zoom: 15
      })
      for (var area in this.area) {
        var areaCircle = new google.maps.Circle({
          strokeColor: '#366040',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#00ff3b',
          fillOpacity: 0.35,
          map: map,
          center: this.area[area].center,
          radius: this.area[area].radius
        })
        this.temp2 = areaCircle
      }
    }
  },
  mounted () {
    var result
    this.axios.post('http://127.0.0.1:5000' + '/getArea').then((response) => {
      result = response.data
      this.area = result
      this.initMap()
    })
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
