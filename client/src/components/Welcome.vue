<template lang="html">
    <div id="welcome-container">
        <h1>Welcome to City Guide App</h1>
        <h2>See what happens in your city!</h2>
        <br>
        <div id="all-cards">
            <a @click="this.notImplementedInfo"><Card title="News,Events & Tips"/></a>
            <router-link id="active-route" to="/nearby-attractions"><Card title="Nearby Attractions"/></router-link>
            <a @click="this.notImplementedInfo"><Card title="Attractions"/></a>
            <a @click="this.notImplementedInfo"><Card title="Weather"/></a>
            <a @click="this.notImplementedInfo"><Card title="Where to Eat & Stay"/></a>
        </div>
    </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'Welcome',
  components: {
    Card
  },
  methods: {
    notImplementedInfo: function() {
        alert('This feature is not implemented yet!');
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

@media only screen and (max-width: 800px) {
    #all-cards {
        width: 90%;
        display: grid;
        grid-template-columns: 100%;
    }

    #welcome-container {
        min-width: 300px;
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
