<template>
    <div class="nav-container">
        <div id="navbar">
            <div class="left">
                <router-link to="/">
                    <a style="color:black">G8</a>
                </router-link>
                <router-link to="/">
                    <a>Home</a>
                </router-link>
                <router-link to="/nearby-attractions">
                    <a>Nearby Attractions</a>
                </router-link>
            </div>
            <div class="right">
                <a @click="this.notImplementedYet">Buy transport card</a>
            </div>
        </div>

        <div id="hamburger-menu">
            <router-link to="/">
                <a class="logo" style="color:black">G8</a>
            </router-link>
            <div class="hamburger-container">
                <button @click="this.toggleHamburger" class="hamburger-btn">
                    <font-awesome-icon id="hamburger-icon" icon="fa-solid fa-bars" size="2xl" />
                </button>
                <div style="display:none;" class="hamburger-links">
                    <router-link to="/">
                        <a>Home</a>
                    </router-link>
                    <router-link to="/nearby-attractions">
                        <a>Nearby Attractions</a>
                    </router-link>
                    <a @click="this.notImplementedYet">Buy transport card</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        notImplementedYet: function () {
            alert('This feature is not implemented yet!');
        },
        toggleHamburger: function() {
            let hamburgerLinks = document.querySelector(".hamburger-links")
            if (hamburgerLinks.style.display === "none") {
                hamburgerLinks.style.display = "flex";
                
            } else {
                hamburgerLinks.style.display = "none";
            }
        }
    },
}
</script>

<style>
.nav-container {
    display: flex;
    margin-bottom: 128px;
}

#navbar,
#hamburger-menu {
    position: fixed;
    width: 100%;
    height: 64px;
    background-color: black;
    margin-top: 0px;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    z-index: 99999;
}

#navbar {
    display: flex;
}

#hamburger-menu {
    display: none;
    justify-content: space-between;
}

#navbar a {
    padding: 8px 3px;
}

.left,
.right {
    font-size: 20px;
    font-family: sans-serif;
}

.left {
    width: 70%;
    display: flex;
    justify-content: flex-start;
    padding-left: 32px;
}

.logo {
    font-family: sans-serif;
    font-size: 20px;
    width: fit-content;
    height: fit-content;
    margin-left: 10px;
    border: 1px solid white;
    background-color: white;
    border-radius: 100%;
    padding: 8px;
}

.left>a:nth-child(1) {
    width: fit-content;
    height: fit-content;
    margin-left: 10px;
    border: 1px solid white;
    background-color: white;
    border-radius: 100%;
}

.left>a:nth-child(2) {
    margin-left: 10px;
}

.left>a:nth-child(3) {
    margin-left: 10px;
}

.right {
    width: 30%;
    padding-right: 10px;
}

a,
a:hover,
a:focus,
a:active {
    color: white;
    text-decoration: none;
    cursor: pointer;
}

.hamburger-links {
    gap: 10px;
    display: flex;
    flex-direction: column;
    position: absolute;
    width: fit-content;
    height: fit-content;
    background-color: grey;
    opacity: 0.95;
    z-index: 99999;
    padding: 16px;
    right: 16px;
    border-radius: 16px;
    font-size: 20px;
    font-family: sans-serif;
    text-align: left;
}

.hamburger-links *:hover {
    color: #f27894;
}

.hamburger-btn {
    background: none;
    border: none;
    padding: 8px;
    
}

#hamburger-icon {
    color: white;
}

@media only screen and (max-width: 660px) {
    #navbar {
        display: none;
    }
    #hamburger-menu {
        display: flex;
    }
}
</style>