<template>
    <!-- The Modal -->
    <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2>This feature is not Implemented Yet!</h2>
            </div>
            <h4 style="color: grey">These are the some options for you to go</h4>
            <br>
            <div class="modal-body">
                <div class="options">
                            <router-link to="/nearby-attractions">
                                Nearby Attractions
                            </router-link>
                            <router-link to="/public-transport-card">
                                Public Transport Card
                            </router-link>
                            <router-link to="/">
                                Main Page
                            </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.notImplementedYet();
    },
    methods: {
        notImplementedYet: function () {
            var modal = document.getElementById("myModal");
            var btn = document.querySelectorAll(".notImplemented");
            var span = document.getElementsByClassName("close")[0];
            btn.forEach(val => {val.onclick = function () {modal.style.display = "block";}});
            span.onclick = function () {modal.style.display = "none";}
            window.onclick = function (event) {if (event.target == modal) {modal.style.display = "none";}}
        }
    }
}
</script>

<style>
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 200px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.7);
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 60%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

@keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

/* The Close Button */
.close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.modal-header {
    padding: 2px 16px;
    background-color: #6B7AA1;
    color: white;
}

.modal-body {
    padding: 2px 16px;
}

.modal-list>li {
    list-style: none;
    font-size: 18px;
    margin-bottom: 8px;
}

.modal-list>li>a {
    color: black;
}

.options{
    margin-bottom: 32px;
}

.options > a {
    width: fit-content;
    height: fit-content;
    padding: 8px;
    background-color: #C1CFC0;
    margin: 8px 16px;
    border-radius: 8px;
    color: white;
    border: 1px solid transparent;
    font-family: sans-serif;
    cursor: pointer;
    font-size: larger;
}
</style>