<template lang="html">
    <div>
        <h2>Nearby Attractions</h2>
        <div id="map"></div>
    </div>
</template>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaq0kwX1z12NrkTiGDo4SZ4SSPJH5U03E&callback=initMap&libraries=localContext&v=beta"></script>
<script>
import { initMap } from './../services/GoogleMapAPI'

export default {
    name: 'NearbyAttractions',
    mounted() {
        initMap();
    }
}
</script>



