<template lang="html">
    <div id="welcome-container">

        <!-- The Modal -->
        <div id="myModal" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>This feature is not Implemented Yet!</h2>
                </div>
                <h4 style="color: grey">These are the some options for you to go</h4>
                <div class="modal-body">
                    <ul class="modal-list">
                        <li>
                            <router-link to="/nearby-attractions">
                                1.) Nearby Attractions
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/public-transport-card">
                                2.) Public Transport Card
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <div id="map" ref="map"></div>
        <div id="map-load">
            <p>Map düzgün yüklenemedi 😓</p>
            <button @click="this.showMap">yeniden dene!</button>
        </div>
        <h1>Welcome to City Guide App</h1>
        <h2>See what happens in your city!</h2>
        <br>
        <div id="all-cards">
            <a class="notImplemented">
                <Card id="events" title="News,Events & Tips" />
            </a>
            <router-link id="active-route" to="/nearby-attractions">
                <Card title="Nearby Attractions" />
            </router-link>
            <a class="notImplemented">
                <Card title="Attractions" />
            </a>
            <a class="notImplemented">
                <Card title="Weather" />
            </a>
            <a class="notImplemented">
                <Card title="Where to Eat & Stay" />
            </a>
        </div>

    </div>
</template>

<script>
import Card from './Card'
import { notImplementedYet } from './../services/helpers'

export default {
    name: 'Welcome',
    components: {
        Card
    },
    mounted() {
        this.notImplementedYet();
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
        loadMap: function () {
            var map;
            const Izmir = { lat: 38.4237, lng: 27.1428 };
            if (google.maps.localContext) {
                const localContextMapView = new google.maps.localContext.LocalContextMapView({
                    element: this.$refs['map'],
                    placeTypePreferences: [
                        "restaurant",
                        "tourist_attraction",
                        "hospital",
                        "bank",
                        "park",
                    ],
                    maxPlaceCount: 24,
                });
                map = localContextMapView.map;

                map.setOptions({
                    center: Izmir,
                    zoom: 14,
                });
                var infoWindow = new google.maps.InfoWindow();
                const locationButton = document.createElement("button");
                locationButton.textContent = "Find your Location";
                locationButton.classList.add("custom-map-control-button");
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
                locationButton.addEventListener("click", () => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                };
                                const localContextMapView = new google.maps.localContext.LocalContextMapView({
                                    element: this.$refs['map'],
                                    placeTypePreferences: [
                                        "restaurant",
                                        "tourist_attraction",
                                        "hospital",
                                        "bank",
                                        "park",
                                    ],
                                    maxPlaceCount: 24,
                                });
                                infoWindow.setPosition(pos);
                                map = localContextMapView.map;
                                infoWindow.setContent("Location found.");
                                infoWindow.open(map);
                                map.setOptions({
                                    center: pos,
                                    zoom: 14,
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
        showMap: function () {
            let map = document.querySelector("#map");
            let map_load = document.querySelector("#map-load");
            if (map) map.style.display = "block";
            if (map_load) map_load.style.display = "none";
            this.loadMap();
        }
    },
}
</script>
<style>
#welcome-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 800px;
}

#all-cards {
    width: 80%;
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    margin-bottom: 5vh;
}

#map,
#map-load {
    width: 90%;
    height: 400px;
    border: 1px solid transparent;
    border-radius: 24px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 8px;
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
    #all-cards {
        width: 90%;
        display: grid;
        grid-template-columns: 100%;
    }

    #welcome-container {
        min-width: 300px;
    }

    #map,
    #map-load {
        width: 80%;
        min-width: 300px;
        height: 250px;
    }
}

h1 {
    font-size: 72px;
    background: -webkit-linear-gradient(rgb(7, 30, 233), rgb(14, 217, 119));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

#all-cards *:hover {
    color: cadetblue;
    cursor: pointer;
}

#all-cards * {
    color: black;
    text-decoration: none;
}

/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 200px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
  }
  
  /* Modal Content */
  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 60%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
  }
  
  /* Add Animation */
  @-webkit-keyframes animatetop {
    from {top:-300px; opacity:0} 
    to {top:0; opacity:1}
  }
  
  @keyframes animatetop {
    from {top:-300px; opacity:0}
    to {top:0; opacity:1}
  }
  
  /* The Close Button */
  .close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
  
  .modal-header {
    padding: 2px 16px;
    background-color: #A5C9CA;
    color: white;
  }
  
  .modal-body {padding: 2px 16px;}
  .modal-list > li {
    list-style: none;
    font-size: 18px;
    margin-bottom: 8px;
  } 
  .modal-list > li > a {
    color: black;
  }
</style>
