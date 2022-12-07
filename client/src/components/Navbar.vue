<template>
    <div id="navbar">
        <div class="left">
            <router-link id="active-route" to="/">
                <a style="color:black">8</a>    
            </router-link>
            <router-link id="active-route" to="/">
                <a>Home</a>    
            </router-link>
            <router-link id="active-route" to="/nearby-attractions">
                <a>Nearby Attractions</a>
            </router-link>
        </div>
        <div class="right">
            <a @click="this.notImplementedYet">Buy transport card</a>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        notImplementedYet: function () {
            alert('This feature is not implemented yet!');
        },
    },
}
</script>

<style>
#navbar {
    display: flex;
    position: fixed;
    width: 100%;
    height: 64px;
    background-color: black;
    margin-top: 0px;
    align-items: center;
}

#navbar a {
    padding: 4px;
}

.left,
.right {
    font-size: 20px;
    font-family: sans-serif;
}

.left{ 
    width: 70%;
    display: flex;
    justify-content: flex-start;
    padding-left: 32px;
}

.left > a:nth-child(1){ 
    width: fit-content;
    height: fit-content;
    margin-left: 10px;
    border: 1px solid white;
    background-color: white;
    border-radius: 100%;
}

.left > a:nth-child(2){
    margin-left: 10px;
}

.left > a:nth-child(3){
    margin-left: 10px;
}

.right {
    width: 30%;
    padding-right: 10px;
}

a,a:hover, a:focus, a:active {
    color: white;
    text-decoration: none;
    cursor: pointer;
}
</style>