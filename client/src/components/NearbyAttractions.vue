<template>
    <div class="ui grid">
        <div class="six wide column">
            <form class="ui segment large form">
                <div class="ui segment">
                    <div class="field">
                        <div class="ui right icon input large">
                            <input type="text" placeholder="Enter your address" v-model="coordinates" />
                            <i class="dot circle link icon" @click="locatorButtonPressed"></i>
                        </div>
                    </div>
                    <div class="field">
                        <div class="two fields">
                            <div class="field">
                                <select v-model="type">
                                    <option value="all">See All</option>
                                    <option value="restaurant">Restaurant</option>
                                    <option selected value="travel_agency">Travel Agency</option>
                                    <option value="hospital">Hospital</option>
                                    <option value="hair_care">Hair Care</option>
                                    <option value="stadium">Stadium</option>
                                    <option value="police">Police</option>
                                    <option value="pharmacy">Pharmacy</option>
                                    <option value="night_club">Night Club</option>
                                    <option value="museum">Museum</option>
                                    <option value="mosque">Mosque</option>
                                    <option value="amusement_park">Amusement Park</option>
                                    <option value="art_gallery">Art Gallery</option>
                                </select>
                            </div>
                            <div class="field">
                                <select v-model="radius">
                                    <option value="1">1 KM</option>
                                    <option value="5">5 KM</option>
                                    <option value="10">10 KM</option>
                                    <option value="15">15 KM</option>
                                    <option value="20">20 KM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button class="ui button" @click="findCloseBuyButtonPressed">Find CloseBuy</button>
                </div>
                <div class="ui segment" style="max-height:500px;overflow:scroll">
                    <div class="ui divided items">
                        <div class="item" v-for="place in places" :key="place.id">
                            <div class="content">
                                <div class="header">{{ place.name }}</div>
                                <div class="meta">{{ place.vicinity }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="ten wide column segment ui" width="500px" height="500px" ref="map"></div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    mounted() {
        navigator.geolocation.getCurrentPosition(
                position => {
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                },
                error => {
                    console.log("Error getting location");
                }
            );
  },
    data() {
        return {
            lat: 0,
            lng: 0,
            type: "",
            radius: "",
            places: []
        };
    },
    computed: {
        coordinates() {
            return `${this.lat}, ${this.lng}`;
        }
    },
    methods: {
        locatorButtonPressed() {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                },
                error => {
                    console.log("Error getting location");
                }
            );
        },
        // 46.288896, -79.44192
        findCloseBuyButtonPressed() {
            let type_str = this.type == 'all' ? '' : `&type=${this.type}`
            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.lat
                },${this.lng}${type_str}&radius=${this.radius *
                1000}&key=AIzaSyA6VsFQVixA00O1Qg4_wKy_WuaVa77zc5I`;
            axios.get(URL).then(response => {
                this.places = response.data.results;
                this.addLocationsToGoogleMaps();
            }).catch(error => {
                console.log(error.message);
            });
        },
        addLocationsToGoogleMaps() {

            var infowindow = new google.maps.InfoWindow();
            var map = new google.maps.Map(this.$refs['map'], {
                zoom: 15,
                center: new google.maps.LatLng(this.lat, this.lng),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            this.places.forEach((place) => {
                const lat = place.geometry.location.lat;
                const lng = place.geometry.location.lng;
                let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map
                });

                google.maps.event.addListener(marker, "click", () => {
                    infowindow.setContent(`<div class="ui header">${place.name}</div><p>${place.vicinity}</p>`);
                    infowindow.open(map, marker);
                });
            });


        }
    }
}
</script>