<template lang="html">
    <div id="welcome-container">
        <div id="map" ref="map"></div>
        <div id="map-load">
            <p>Map düzgün yüklenemedi 😓</p>
            <button @click="this.showMap">yeniden dene!</button>
        </div>
        <h1>Welcome to City Guide App</h1>
        <h2>See what happens in your city!</h2>
        <br>
        <div id="all-cards">
            <a @click="this.notImplementedYet">
                <Card title="News,Events & Tips" />
            </a>
            <router-link id="active-route" to="/nearby-attractions">
                <Card title="Nearby Attractions" />
            </router-link>
            <a @click="this.notImplementedYet">
                <Card title="Attractions" />
            </a>
            <a @click="this.notImplementedYet">
                <Card title="Weather" />
            </a>
            <a @click="this.notImplementedYet">
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
        this.loadMap();
        setInterval(() => {
            let map = document.querySelector("#map");
            let map_load = document.querySelector("#map-load");
            if (map.childNodes.length == 0) {
                if(map) map.style.display = "none";
                if(map_load) map_load.style.display = "flex";
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
            if(map) map.style.display = "block";
            if(map_load) map_load.style.display = "none";
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
</style>
