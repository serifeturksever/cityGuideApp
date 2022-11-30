<template lang="html">
    <div>
        <h2>Nearby Attractions</h2>
    </div>
</template>

<script>
import { initMap } from './../services/GoogleMapAPI'

export default {
    name: 'NearbyAttractions',
    mounted() {
        initMap();
    }
}
</script>



