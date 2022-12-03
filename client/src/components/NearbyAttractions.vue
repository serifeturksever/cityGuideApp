<template>
    <div id="container">
        <div id="filter-attraction">
            <form>
                <div>
                    <div>
                        <div id="lat-lng">
                            <input type="text" placeholder="Enter your address" v-model="coordinates" />
                            <!-- <button id="find-me" @click="locatorButtonPressed">find me</button> find my location -->
                            <a id="fancy-button" href="#"><span id="btn-span" @click="locatorButtonPressed">Find me!</span></a>
                        </div>
                    </div>
                    <div class="filter-container">
                        <div class="sub-filter-container">
                            <div class="attraction-type">
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
                            <div class="radius">
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
                        <a id="fancy-button" href="#"><span id="btn-span" @click="findCloseBuyButtonPressed">Find Nearby Attractions</span></a>
                    <!-- <button id="find-nearby-attractions-btn" @click="findCloseBuyButtonPressed">Find Nearby Attractions</button> -->
                </div>
                <!-- <div id="close-places-list" class="ui segment" style="max-height:500px;overflow:scroll;display:none">
                    <div class="ui divided items">
                        <div class="item" v-for="place in places" :key="place.id">
                            <div class="content">
                                <div class="header">{{ place.name }}</div>
                                <div class="meta">{{ place.vicinity }}</div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </form>
        </div>
        <div id="map" ref="map" style="display:none"></div>
        <div id="map-preinformation" style="display:flex;align-items:center;justify-content:center;font-size:24px">
            <span class="span-info">Please locate yourself, choose attraction type and radius 🥳🎉</span>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            lat: 38.4237,// 0,
            lng: 27.1428,// 0,
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
                // document.querySelector("#close-places-list").style.display = "block";
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
    #container { /* height: 50vh*/
        display: flex;
        width: 100%;
        justify-content:space-evenly;
        height: 50vh;
    }

    #filter-attraction {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        min-width: 300px;
        border: 1px solid transparent;
        border-radius: 24px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    #map,
    #map-preinformation
    {
        border: 1px solid transparent;
        border-radius: 24px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        padding: 8px;
        width: 60%;
        min-width: 580px;
    }
    #map {
        height: 600px;
    }    
    form {
        width: 80%;
        height: 60%;
    }

    form > div {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    @media only screen and (max-width: 1180px) { /* 980px idi */
        #container {
            width: 100%;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            overflow: hidden;
            height: 100vh;
        }
        #filter-attraction,
        #map,
        #map-preinformation {
            width: 90%;
        }
        #filter-attraction {
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
            height: 500px;
            justify-content: center;
            align-items: center;
        }
      }

    .span-info {
        border: 1px solid transparent;
        border-radius: 24px;
        background-color: #BFD6FA;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        padding: 1rem
    }

    

    #lat-lng {
        width: 100%;
        height: 48px;
        display: flex;
        justify-content: space-between;
    }

    #lat-lng > input {
        width: 60%;
        border-radius: 8px;
    }

    #lat-lng > a {
        width: 35%;
        border-radius: 8px;
        min-width: 48px;
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
    }
    .radius {
        width: 36%;
        height: 48px;
    }

    #find-nearby-attractions-btn {
        height: 48px;
        border-radius: 8px;
    }
    
    button {
        border: none;
        cursor: pointer;
    }

    input {
        border: 1px solid black;
    }

    /* button */
/*
    .wrapper{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      */
      #fancy-button{
        display: block;
        width: 100%;
        height: 48px;
        line-height: 40px;
        font-size: 18px;
        font-family: sans-serif;
        text-decoration: none;
        color: #333;
        border: 2px solid #333;
        letter-spacing: 2px;
        text-align: center;
        position: relative;
        transition: all .35s;
        border-radius: 8px;
      }
      
      #btn-span{
        position: relative;
        z-index: 2;
      }
      
      #fancy-button:after{
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background: #ff003b;
        transition: all .35s;
      }
      
      #fancy-button:hover{
        color: #fff;
      }
      
      #fancy-button:hover:after{
        width: 100%;
      }
</style>