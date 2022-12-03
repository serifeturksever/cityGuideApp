<template>
    <div class="ui grid">
        <div class="six wide column">
            <form class="ui segment large form">
                <div class="ui segment">
                    <div class="field">
                        <div class="ui right icon input large">
                            <input id="lon-lat" type="text" placeholder="Enter your address" v-model="coordinates" />
                            <button id="find-me" @click="locatorButtonPressed">find my location</button>
                            <!-- <i class="dot circle link icon" @click="locatorButtonPressed"></i> -->
                        </div>
                    </div>
                    <div class="field">
                        <div class="two fields">
                            <div class="field">
                                <select v-model="type">
                                    <option disabled value="">Attraction Type</option>
                                    <option value="all">See All Attractions</option>
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
                                    <option disabled value="">Radius</option>
                                    <option value="1">1 KM</option>
                                    <option value="5">5 KM</option>
                                    <option value="10">10 KM</option>
                                    <option value="15">15 KM</option>
                                    <option value="20">20 KM</option>
                                    <option value="25">25 KM</option>
                                    <option value="50">50 KM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button class="ui button" @click="findCloseBuyButtonPressed" style="background-color:cadetblue;color:white">Find CloseBuy</button>
                </div>
                <div id="close-places-list" class="ui segment" style="max-height:500px;overflow:scroll;display:none">
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
        <div id="map" class="ten wide column segment ui" width="500px" height="800px" ref="map" style="display:none"></div>
        <div id="map-preinformation" class="ten wide column segment ui" width="500px" height="800px" style="display:flex;align-items:center;justify-content:center;font-size:24px">
            Please locate yourself, choose attraction type and radius you want to see
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
//     mounted() {
//         navigator.geolocation.getCurrentPosition(
//                 position => {
//                     this.lat = position.coords.latitude;
//                     this.lng = position.coords.longitude;
//                 },
//                 error => {
//                     console.log("Error getting location");
//                 }
//             );
//   },
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
                document.querySelector("#close-places-list").style.display = "block";
                document.querySelector("#map-preinformation").style.display = "none";
                document.querySelector("#map").style.display = "block";
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
<style>
#find-me {
    border: 1px solid transparent;
    border-radius: 12px;
    background-color: crimson;
    color: gainsboro;
    box-shadow: rgba(236, 136, 136, 0.35) 0px 5px 15px;
    cursor: pointer;

}

#lon-lat {
    margin-right: 8px;
}
</style>