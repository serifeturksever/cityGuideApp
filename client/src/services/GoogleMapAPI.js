/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
 let map;

 function initMap() {
   // ! local context
 
 
   const Izmir = { lat: 38.4237, lng: 27.1428 };
 
   map = new google.maps.Map(document.getElementById("map"), {
     center: Izmir,
     zoom: 9,
   });
  
 
   // ! Find current location
   infoWindow = new google.maps.InfoWindow();
 
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
             element: document.getElementById("map"),
             placeTypePreferences: [
               "restaurant",
               "tourist_attraction",
               "hospital",
               "bank",
               "park",
             ],
             maxPlaceCount: 24,
           });
           console.log("info.window",infoWindow)
           console.log("map",map)
           infoWindow.setPosition(pos);
           map = localContextMapView.map;
           console.log("info.window",infoWindow)
           console.log("map",map)
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
 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
   infoWindow.setPosition(pos);
   infoWindow.setContent(
     browserHasGeolocation
       ? "Error: The Geolocation service failed."
       : "Error: Your browser doesn't support geolocation."
   );
   infoWindow.open(map);
 }
 window.initMap = initMap;
 