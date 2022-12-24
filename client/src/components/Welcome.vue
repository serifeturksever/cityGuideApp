<template lang="html">
  <div id="welcome-container">
    <Modal/>
    <h1>Welcome to City Guide App</h1>
    <h2>Discover your city before it's too late!</h2>
    <div class="ui container social">
      <SocialFeed
        author="John Doe"
        where="Rome"
        date="4 days ago"
        summary="added 1 new photos"
        v-bind:imgSrc="require('../assets/rome.jpg')"
        likeCount=4
      />
      <SocialFeed
        author="Giovan Clerk"
        where="Florence"
        date="2 hours ago"
        v-bind:imgSrc="require('../assets/florence.jpg')"
        desc="Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again."
        likeCount=65
      />
      <SocialFeed
      author="Michel Surf"
      date="09.14.2023"
      summary="going to join 'Yoga Session with Abele'"
      />
    </div>
    <div id="map" ref="map"></div>
    <div id="map-load">
      <p>Map düzgün yüklenemedi 😓</p>
      <button @click="this.showMap">yeniden dene!</button>
    </div>

    <div id="all-cards">
      <a class="notImplemented">
        <Card
          title="News & Events & Tips"
          v-bind:imgSrc="require('../assets/event.png')"
        />
      </a>
      <router-link id="active-route" to="/nearby-attractions">
        <Card
          title="Nearby Attractions"
          v-bind:imgSrc="require('../assets/attractions.png')"
        />
      </router-link>
      <a class="notImplemented">
        <Card
          title="Attractions"
          v-bind:imgSrc="require('../assets/attr.png')"
        />
      </a>
      <a class="notImplemented">
        <Card
          title="Weather"
          v-bind:imgSrc="require('../assets/weather.png')"
        />
      </a>
      <a class="notImplemented">
        <Card
          title="Where to Eat & Stay"
          v-bind:imgSrc="require('../assets/food.png')"
        />
      </a>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import SocialFeed from "./SocialFeed.vue";
import { notImplementedYet } from "./../services/helpers";
import Modal from './Modal';

export default {
  name: "Welcome",
  components: {
    Card,
    SocialFeed,
    Modal
  },
  mounted() {
    this.loadMap();
    setInterval(() => {
      let map = document.querySelector("#map");
      let map_load = document.querySelector("#map-load");
      if (map.childNodes.length == 0) {
        if (map) map.style.display = "none";
        if (map_load) map_load.style.display = "flex";
      }
    }, 200);
  },
  data() {
    return {
      lat: 0,
      lng: 0
    };
  },
  methods: {
    notImplementedYet,
    loadMap: function() {
      var map;
      const Izmir = { lat: 38.4237, lng: 27.1428 };
      if (google.maps.localContext) {
        const localContextMapView = new google.maps.localContext.LocalContextMapView(
          {
            element: this.$refs["map"],
            placeTypePreferences: [
              "restaurant",
              "tourist_attraction",
              "hospital",
              "bank",
              "park"
            ],
            maxPlaceCount: 24
          }
        );

        map = localContextMapView.map;
        map.setOptions({
          center: Izmir,
          zoom: 14
        });
        var infoWindow = new google.maps.InfoWindow();
        const locationButton = document.createElement("button");
        locationButton.textContent = "Find your Location";
        locationButton.classList.add("custom-map-control-button");
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(
          locationButton
        );
        locationButton.addEventListener("click", () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => {
                const pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                const localContextMapView = new google.maps.localContext.LocalContextMapView(
                  {
                    element: this.$refs["map"],
                    placeTypePreferences: [
                      "restaurant",
                      "tourist_attraction",
                      "hospital",
                      "bank",
                      "park"
                    ],
                    maxPlaceCount: 24
                  }
                );
                infoWindow.setPosition(pos);
                map = localContextMapView.map;
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setOptions({
                  center: pos,
                  zoom: 14
                });
              },
              () => {
                handleLocationError(true, infoWindow, map.getCenter());
              }
            );
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        });
      }
    },
    showMap: function() {
      let map = document.querySelector("#map");
      let map_load = document.querySelector("#map-load");
      if (map) map.style.display = "block";
      if (map_load) map_load.style.display = "none";
      this.loadMap();
    }
  }
};
</script>
<style>
.social {
  padding: 4rem;
}
#welcome-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 800px;
}

#all-cards {
  margin: 5rem auto;
  width: 75%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 3rem;
}

#map,
#map-load {
  width: 70%;
  height: 400px;
  border: 1px solid transparent;
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  padding: 1rem;
}

#map {
  display: block;
}

#map-load {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 800px) {
  h1 {
    font-size: 3rem;
  }
  #all-cards {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
}

#welcome-container {
  min-width: 300px;
}

#map,
#map-load {
  width: 70%;
  min-width: 300px;
  height: 250px;
  margin: 1rem auto;
}

h1 {
  font-size: 4.3rem;
  background: -webkit-linear-gradient(rgb(9, 9, 9), rgba(21, 33, 27, 0.648));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#all-cards *:hover {
  color: rgb(27, 29, 29);
  cursor: pointer;
}

#all-cards * {
  color: rgba(0, 0, 0, 0.768);
  text-decoration: none;
}
</style>
