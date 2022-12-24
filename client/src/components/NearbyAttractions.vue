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
                      >{{ distance.value }} km</option
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
                class="place-list-row"
                v-for="place in places"
                :key="place.id"
                @click="showPlaceOnMap(place)"
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
import axios from "axios";
import { exported_places } from "../services/places"
export default {
    data() {
        return {
            lat: 38.4237,// 0,
            lng: 27.1428,// 0,
            type: "",
            radius: "",
            places: [],
            attractions: [
                {value: "museum",name: "Museum"},
                {value: "mosque",name: "Mosque"},
                {value: "art_gallery",name: "Art Gallery"},
                {value: "tourist_attraction",name: "Touristic Attraction"} /* Historical Places */
            ],
            distances: [
                {value: 10},
                {value: 20},
                {value: 50}
            ]
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
        findCloseBuyButtonPressed() {
            if(!this.type){alert("Please Choose an Attraction Type");return;}
            if(!this.radius){alert("Please Choose a Radius");return;}
            // let type_str = this.type == 'all' ? '' : `&type=${this.type}`
            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.lat
                },${this.lng}&type=${this.type}&radius=${this.radius *
                1000}&key=AIzaSyAN4mAPIR6NfoaZsKvVz4FF0x8X01acxaw`;
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
                    infowindow.setContent(`
                    <div class="ui header">${place.name}</div>
                    <p>${place.vicinity}</p>
                    <p><i class="fa fa-star fa-lg" aria-hidden="true" style="color: gold;"></i>&nbsp; ${place.rating}</p>`
                    );
                    infowindow.open(map, marker);
                });
            });
        },
        getStars: function(rating){
            if(!rating){
                return "No info :("
            } else {
                // Round to nearest half
                rating = Math.round(rating * 2) / 2;
                let output = [];

                // Append all the filled whole stars
                for (var i = rating; i >= 1; i--)
                    output.push('<i class="fa fa-star fa-lg" aria-hidden="true" style="color: gold;"></i>&nbsp;');

                // If there is a half a star, append it
                if (i == .5) output.push('<i class="fa fa-star-half-o fa-lg" aria-hidden="true" style="color: gold;"></i>&nbsp;');

                // Fill the empty stars
                for (let i = (5 - rating); i >= 1; i--)
                    output.push('<i class="fa fa-star-o fa-lg" aria-hidden="true" style="color: gold;"></i>&nbsp;');

                return output.join('');
            }
            
        },
        showPlaceOnMap: function(place){
            let lat = place.geometry.location.lat;
            let lng = place.geometry.location.lng;

            let place_id = place.place_id;
            let detailed_place = exported_places.filter(key => key.id === place_id).length > 0 ? exported_places.filter(key => key.id === place_id)[0] : "";
            let place_description = detailed_place != "" ? detailed_place.description : "";
            let place_establishment_date = detailed_place != "" ? `Kuruluş Tarihi: ${detailed_place.establishment_date}` : ""
            place_establishment_date = place_establishment_date == -1 ? "Bilgi Yok" : place_establishment_date;

                var infowindow = new google.maps.InfoWindow();
                var map = new google.maps.Map(this.$refs['map'], {
                    zoom: 15,
                    center: new google.maps.LatLng(this.lat, this.lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

            let marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: map
                });

                let rateContent = place.rating ? `<p><i class="fa fa-star fa-lg" aria-hidden="true" style="color: gold;"></i>&nbsp; ${place.rating}</p>` : ``
                infowindow.setContent(`
                <div class="ui header">${place.name}</div>
                <p style="font-size:16px">${place_description}</p>
                <p style="color:grey">${place_establishment_date}</p>
                <p>${place.vicinity}</p>
                ${ rateContent }
                `
                );
                infowindow.open(map, marker);

                const locationButton = document.createElement("button");
                locationButton.textContent = "See All Places";
                locationButton.classList.add("see-all-button");
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
                locationButton.addEventListener("click",this.findCloseBuyButtonPressed)

        }
    }
}
</script>
<style>
* {
    font-family: sans-serif;
}
#container {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    height: 50vh;
}

#filter-result {
    width: 30%;
    min-width: 400px;
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
    height: 100%;
    min-height: 400px;
    max-height: 400px;
    background-color: #FEFBF6;
    border: 1px solid transparent;
    border-radius: 24px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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

form>div:nth-child(1) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

@media only screen and (max-width: 1180px) {

    /* 980px idi */
    #container {
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        height: 200vh;
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
    background-color: #D9ECF2;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 1rem
}



#lat-lng {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
}

#lat-lng>input {
    width: 60%;
    border-radius: 8px;
    text-align: center;
}

#lat-lng>a {
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

.attraction-type>select,
.radius>select {
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

button {
    border: none;
    cursor: pointer;
}

input {
    border: 1px solid black;
}

#fancy-button {
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
    background-color: white;
}

#btn-span {
    position: relative;
    z-index: 2;
}

#fancy-button:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #ff003b;
    transition: all .35s;
}

#fancy-button:hover {
    color: #fff;
}

#fancy-button:hover:after {
    width: 100%;
}

.list-el {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 4px;
    margin-right: 4px;
    padding-top: 12px;
    padding-bottom:12px;
    cursor: pointer;
}

.list-el:hover{
    color: white;
    background: #B2B2B2;
}

.list-el > * {
    display: flex;
    justify-content: center;
    align-items: center;
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

hr {
    margin: 0;
    padding: 0;
}

.see-all-button{
    color: white;
    width: 128px;
    height: 64px;
    background: #ff003b;
    border-radius: 24px;
}
</style>