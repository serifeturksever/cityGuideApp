<template>
    <div id="container">
    <div id="filter-result">
      <div id="filter-attraction">
        <form>
          <div>
            <div>
              <div class="ui action input fluid">
                <input
                  type="text"
                  placeholder="Enter your address"
                  v-model="coordinates"
                />
                <div
                  @click="locatorButtonPressed"
                  class="ui right-floated medium animated fade teal button"
                >
                  <div class="visible content">
                    <h4>Find Me!</h4>
                  </div>
                  <div class="hidden content">
                    <i class="location arrow icon"></i>
                  </div>
                </div>
              </div>
            </div>
            <div class="filter-container ui">
              <div class="sub-filter-container">
                <div class="attraction-type">
                  <select v-model="type">
                    <option disabled value="">Attraction Type</option>
                    <option
                      v-for="attraction in attractions"
                      :value="attraction.value"
                      >{{ attraction.name }}</option
                    >
                  </select>
                </div>
                <div class="radius">
                  <select v-model="radius">
                    <option disabled value="">Radius</option>
                    <option
                      v-for="distance in distances"
                      :value="distance.value"
                      >{{ distance.value }}</option
                    >
                  </select>
                </div>
              </div>
            </div>
            <div
            @click="findCloseBuyButtonPressed"
                  class="ui right-floated medium animated fade secondary button"
                >
                  <div class="visible content">
                    <h3>Find Nearby Attractions</h3>
                  </div>
                  <div class="hidden content">
                    <i class="map marker alternate icon large"></i>
                  </div>
                </div>
          </div>
        </form>
      </div>
      <div
        id="close-places-list"
        style="height:200px;
                overflow:scroll;
                padding: 1rem;
                margin-top:32px;
                border: 1px solid transparent;
                border-radius: 4px;
                box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                display:none">
                <div
                v-for="place in places"
                :key="place.id"
                @click="showOnMap()"
                >
                    <div class="list-el">
                        <div class="left">
                            <h4 style="margin-left:8px;width:50%">{{ place.name }}</h4>
                            <div style="font-size:16px;margin-left:8px;width:50%;">{{ place.vicinity }}</div>
                        </div>
                        <div class="star" v-html="getStars(place.rating)"></div>
                    </div>
                    <hr>
                </div>
      </div>
          </div>
          <div id="map" ref="map" style="display:none"></div>
    <div
      id="map-preinformation"
      style="display:flex;align-items:center;justify-content:center;font-size:24px"
    >
      <span class="span-info"
        >Please locate yourself, choose attraction type and radius 🥳🎉</span
      >
    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      lat: 38.4237, // 0,
      lng: 27.1428, // 0,
      type: '',
      radius: '',
      places: [],
      attractions: [
        {value: 'all', name: 'See All Attractions'},
        {value: 'restaurant', name: 'Restaurant'},
        {value: 'travel_agency', name: 'Travel Agency'},
        {value: 'hospital', name: 'Hospital'},
        {value: 'hair_care', name: 'Hair Care'},
        {value: 'stadium', name: 'Stadium'},
        {value: 'police', name: 'Police'},
        {value: 'pharmacy', name: 'Pharmacy'},
        {value: 'night_club', name: 'Night Club'},
        {value: 'museum', name: 'Museum'},
        {value: 'mosque', name: 'Mosque'},
        {value: 'amusement_park', name: 'Amusement Park'},
        {value: 'art_gallery', name: 'Art Gallery'}
      ],
      distances: [
        {value: 1},
        {value: 5},
        {value: 10},
        {value: 15},
        {value: 20},
        {value: 25},
        {value: 50}
      ]
    }
  },
  computed: {
    coordinates () {
      return `${this.lat}, ${this.lng}`
    }
  },
  methods: {
    locatorButtonPressed () {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude
          this.lng = position.coords.longitude
        },
        error => {
          console.log('Error getting location')
        }
      )
    },
    findCloseBuyButtonPressed () {
      let type_str = this.type == 'all' ? '' : `&type=${this.type}`
      const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.lat
      },${this.lng}${type_str}&radius=${this.radius *
                1000}&key=AIzaSyAN4mAPIR6NfoaZsKvVz4FF0x8X01acxaw`
      axios.get(URL).then(response => {
        this.places = response.data.results
        this.addLocationsToGoogleMaps()
        document.querySelector('#close-places-list').style.display = 'block'
        document.querySelector('#map-preinformation').style.display = 'none'
        document.querySelector('#map').style.display = 'block'
      }).catch(error => {
        console.log(error.message)
      })
    },
    addLocationsToGoogleMaps () {
      var infowindow = new google.maps.InfoWindow()
      var map = new google.maps.Map(this.$refs['map'], {
        zoom: 15,
        center: new google.maps.LatLng(this.lat, this.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      })
      this.places.forEach((place) => {
        const lat = place.geometry.location.lat
        const lng = place.geometry.location.lng
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map
        })

        google.maps.event.addListener(marker, 'click', () => {
          infowindow.setContent(`
                    <div class="ui header">${place.name}</div>
                    <p>${place.vicinity}</p>
                    <p><i class="fa fa-star fa-lg" aria-hidden="true" style="color: gold;"></i>&nbsp; ${place.rating}</p>`
          )
          infowindow.open(map, marker)
        })
      })
    },
    getStars: function (rating) {
      if (!rating) {
        return 'No info :('
      } else {
        // Round to nearest half
        rating = Math.round(rating * 2) / 2
        let output = []

        // Append all the filled whole stars
        for (var i = rating; i >= 1; i--) { output.push('<i class="fa fa-star fa-lg" aria-hidden="true" style="color: gold;"></i>&nbsp;') }

        // If there is a half a star, append it
        if (i == 0.5) output.push('<i class="fa fa-star-half-o fa-lg" aria-hidden="true" style="color: gold;"></i>&nbsp;')

        // Fill the empty stars
        for (let i = (5 - rating); i >= 1; i--) { output.push('<i class="fa fa-star-o fa-lg" aria-hidden="true" style="color: gold;"></i>&nbsp;') }

        return output.join('')
      }
    },
    showOnMap: function () {
      console.log('clicked')
    }
  },
  findCloseBuyButtonPressed () {
    let type_str = this.type == 'all' ? '' : `&type=${this.type}`
    const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      this.lat
    },${this.lng}${type_str}&radius=${this.radius *
        1000}&key=AIzaSyA6VsFQVixA00O1Qg4_wKy_WuaVa77zc5I`
    axios
      .get(URL)
      .then(response => {
        this.places = response.data.results
        this.addLocationsToGoogleMaps()
        document.querySelector('#close-places-list').style.display = 'block'
        document.querySelector('#map-preinformation').style.display = 'none'
        document.querySelector('#map').style.display = 'block'
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  addLocationsToGoogleMaps () {
    var infowindow = new google.maps.InfoWindow()
    var map = new google.maps.Map(this.$refs['map'], {
      zoom: 15,
      center: new google.maps.LatLng(this.lat, this.lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    })
    this.places.forEach(place => {
      const lat = place.geometry.location.lat
      const lng = place.geometry.location.lng
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map
      })

      google.maps.event.addListener(marker, 'click', () => {
        infowindow.setContent(
          `<div class="ui header">${place.name}</div><p>${place.vicinity}</p>`
        )
        infowindow.open(map, marker)
      })
    })
  }
}
</script>
<style>
#container {
  /* display: flex;
  justify-content: space-around;
  align-items: center; */

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr;
  column-gap: 5rem;
  place-items: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

#filter-result {
  min-width: 300px;
  height: 700px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

#filter-attraction {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 400px;
  max-height: 400px;
  background-color: #f5f0f0f1;
  border: 1px solid transparent;
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 2px;
}

#map,
#map-preinformation {
  border: 1px solid transparent;
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 8px;
  width: 60%;
  min-width: 580px;
}

#map {
  height: 700px;
  min-height: 400px;
}

form {
  width: 80%;
  height: 60%;
}

form > div:nth-child(1) {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

@media only screen and (max-width: 1180px) {
  /* 980px idi */
  #container {
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  }

  #filter-result,
  #map,
  #map-preinformation {
    width: 90%;
  }

  #filter-result {
    margin-top: 64px;
    height: 30%;
  }

  #map-preinformation {
    height: 400px;
    margin-top: 64px;
    margin-bottom: 32px;
    min-width: 200px;
  }

  #map {
    margin-top: 64px;
    height: 800px;
    min-width: 200px;
    margin-bottom: 32px;
  }

  .span-info {
    width: 80%;
  }

  form {
    width: 90%;
    height: 90%;
  }

  #filter-attraction {
    display: flex;
    height: 400px;
    justify-content: center;
    align-items: center;
  }
}

.span-info {
  border: 1px solid transparent;
  border-radius: 24px;
  background-color: #d9e0e1;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 1rem;
}

.sub-filter-container {
  display: flex;
  justify-content: space-between;
}

.attraction-type {
  width: 60%;
  height: 48px;
}

.attraction-type > select,
.radius > select {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  text-align: center;
}

.radius {
  width: 36%;
  height: 48px;
}

#find-nearby-attractions-btn {
  height: 48px;
  border-radius: 8px;
}

input {
  border: 1px solid black;
}

#btn-span {
  position: relative;
  z-index: 2;
}

.list-el {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 4px;
  margin-right: 4px;
  padding: 0.2rem;
}

.close-places-list-container:nth-child(even){
  background-color: #e5eef07b;
}

.left {
    width: 75%;
    text-align: left;
    margin-left: 16px;
    margin-right: 16px;
}

.star {
    width: 25%;
    text-align: end;
    margin-right: 24px
}

.list-el > * {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
